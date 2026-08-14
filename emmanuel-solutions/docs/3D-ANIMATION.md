# 3D and animation guide

Everything learned building the service scenes. Read this before writing or
changing anything in `src/three/`.

---

## 1. What actually makes these look good

The geometry is built from primitives in code — there is no modelling pipeline,
no sculpted meshes, no texture maps. Within that constraint, quality comes from
four things, in this order of impact:

1. **Motion quality.** Good timing on crude geometry beats bad timing on
   beautiful geometry. Spend effort here first.
2. **Lighting and shadow.** A grounded contact shadow and a rim light do more
   than any amount of extra polygons.
3. **Silhouette.** Readable at a glance, at the size it actually renders. Test
   by squinting: if the shape is unclear, more detail will not help.
4. **Detail.** Last, and only where the eye goes — the face, the hands, the
   thing being interacted with.

Do not chase photorealism. Aim for "deliberately stylised", which reads as a
choice rather than a limitation.

---

## 2. The scene contract

Every scene is a plain function returning three things. No React inside.

```js
export function buildXScene() {
  const group = new THREE.Group();
  // ... lights, meshes, materials
  function update(t, dt) { /* pose everything for time t */ return pose; }
  function dispose() { /* dispose every geometry and material created */ }
  return { group, update, dispose };
}
```

Timing lives in a **separate pure module** with no Three.js import, so it can be
tested without a GPU:

```js
// xTimeline.js
export const TOTAL = 4.9;
export function poseAt(t) { return { /* numbers only */ }; }
```

Register in `sceneRegistry.js` (imports Three.js) and add the id to
`sceneIds.js` (must never import Three.js — see the bundle rule).

`update()` returns the pose object so the React layer can react to it — for
example lighting the card border when the cold store powers up.

---

## 3. Lighting rig

This rig is tuned. Start from it rather than inventing one.

```js
const hemi = new THREE.HemisphereLight(0xfff2e0, 0x5b6544, 0.72);  // ambient shape
const key  = new THREE.DirectionalLight(0xfff0d4, 1.15);           // the sun
key.position.set(3.0, 4.3, 2.6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -5; key.shadow.camera.right = 5;
key.shadow.camera.top = 4;   key.shadow.camera.bottom = -3;
key.shadow.radius = 2;
const fill = new THREE.DirectionalLight(0xd8e8ff, 0.34);           // opens shadows
fill.position.set(-2.6, 1.4, 2.2);
const rim  = new THREE.DirectionalLight(0xbfe4ff, 0.5);            // separates from bg
rim.position.set(-3.2, 2.0, -2.6);
```

Plus `ACESFilmicToneMapping` at exposure `0.94`, and a procedural
`RoomEnvironment` for reflections with `envMapIntensity` around `0.16`.

**Total light is cumulative and easy to overdo.** Hemisphere + key + fill + rim +
point + environment once blew the farmer's skin and clothes out to near-white.
If everything looks washed out, reduce before adding.

**Only one light casts shadows.** Shadow maps are the most expensive thing here.

**Keep the shadow frustum tight to the scene.** A frustum covering 16 × 11 units
for a 6-unit-wide scene spends most of its resolution on empty space. Tightening
it is free sharpness.

---

## 4. Materials

`MeshStandardMaterial` everywhere. Rough guide:

| Surface | roughness | metalness |
|---|---|---|
| Skin | 0.58–0.62 | 0 |
| Cloth, denim, straw | 0.75–0.86 | 0 |
| Painted metal, casing | 0.32–0.40 | 0.6–0.75 |
| Glass, solar cell | 0.14–0.28 | 0.45–0.55 |
| Foliage, produce | 0.5–0.7 | 0 |

Avoid pure white (`0xffffff`) and pure black — both look synthetic under tone
mapping. Use `0xf5efe6` and `0x2a2118` style values instead.

Emissive is for things that genuinely emit: LEDs, energy pulses, the sun. Drive
`emissiveIntensity` from the timeline rather than leaving it constant.

Additive glow shells make convincing light sources without postprocessing:
stack three transparent spheres of increasing radius and decreasing opacity with
`blending: THREE.AdditiveBlending, depthWrite: false`.

---

## 5. Geometry rules

**Segment counts.** Character parts that catch the eye: capsules at 10 caps / 24
radial, spheres at 26–40. Background props: half that. Faceting shows most on
slow-moving silhouettes.

**Features must clear what is in front of them.** Overlapping spheres — a head,
a face patch, a beard — will swallow anything placed flush. For a sphere with
radius `r`, scales `(sx, sy, sz)` and centre `(0, cy, cz)`, the surface depth at
`(x, y)` is:

```
dx = x / (r * sx)
dy = (y - cy) / (r * sy)
z  = cz + r * sz * sqrt(1 - dx² - dy²)
```

A feature's front face must exceed that by at least `0.012`. This is enforced by
`npm run face`. Five of six facial features were once buried — the mouth sat
0.051 units behind the beard, so the smile animation was invisible for several
iterations while everything "worked".

**Never leave surfaces coplanar.** Offset by at least 0.01 or you get z-fighting
that flickers as the camera moves.

**Overlap joints.** Limb segments should interpenetrate slightly so no gap opens
when they rotate.

---

## 6. Rigging pattern

Nested groups, one per joint, rotated rather than repositioned:

```
pivot (at shoulder)
  └── upper (rotate for shoulder)
        └── forearm group (offset to elbow, rotate for elbow)
              └── hand group (offset to wrist)
                    └── held prop
```

Three techniques worth reusing:

**Counter-rotation for held props.** A carrot held in a hand inherits every
rotation above it and ends up waving around. Cancel it:

```js
prop.rotation.z = -(arm.upper.rotation.z + arm.forearm.rotation.z) + 0.15;
```

**Eyes as groups.** Each eye is a group containing white, iris, pupil and
highlight. Blink by scaling the group's `y`, look around by translating an inner
group. Do not use a separate eyelid mesh — one was once placed *behind* the eye
where it could never occlude anything.

**Randomised idle motion.** Blinks on a random 1.8–4.2s interval read as alive.
Perfectly regular ones read as mechanical.

---

## 7. Animation craft

Easing catalogue in use:

```js
const ease   = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;  // in-out
const smooth = p => p*p*(3-2*p);                                   // smoothstep
function backOut(p) {            // overshoot, for things snapping into place
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3*Math.pow(p-1,3) + c1*Math.pow(p-1,2);
}
```

Principles that matter most here:

- **Overshoot on arrival.** Parts that snap into place with `backOut` feel
  physical. Straight lerps feel like a slideshow.
- **Overlap the beats.** Do not wait for one action to finish before the next
  starts. In the farmer scene the store is still assembling while the rig base
  lands.
- **Secondary motion.** Walk bob, a dust ring on impact, a slight body squash on
  taking weight. Cheap, and it is most of what sells the movement.
- **Stagger repeats.** Six solar cells arriving 0.055s apart reads as assembly;
  all at once reads as a glitch.
- **Hold at the end.** A brief pause before the loop restarts stops it feeling
  frantic.

**Loop hygiene.** The pose at `t = 0` must be a complete rest state. If any value
is non-zero at the start, the restart visibly jumps.

Total cycle length: 4–5 seconds. Long enough to tell a story, short enough that a
hover sees the whole thing.

---

## 8. Performance rules

**Entry chunk must stay under 420 kB and contain no Three.js.** Enforced by
`npm run bundle`. Importing `sceneRegistry.js` into a component once took the
entry chunk from 350 kB to 1,046 kB with no warning from the build.

**One canvas for the whole rail.** Switching cards swaps scene contents; the
renderer never restarts. Browsers cap concurrent WebGL contexts.

**Dispose everything.** Collect geometries and materials as you create them and
dispose them in `dispose()`. React removes the group from the scene graph; it
does not free GPU memory.

**No allocation in the frame loop.** Reuse a module-level `THREE.Vector3` for
scratch maths. Never create geometries or materials inside `update()`.

**`dpr={[1, 2]}` and no postprocessing.** Bloom and depth of field are not worth
their cost for a hover decoration.

---

## 9. Testing

Every scene needs a timing test. Model it on `scripts/farmer-timeline.mjs` and
assert the things that would actually break:

- **Ordering** — supports arrive before what sits on them; effects follow causes
- **Monotonicity** — a lift ramps up without dipping; a walk only moves one way
- **Bounds** — every part settles exactly on target (`e === 1` at the end)
- **Rest state** — `t = 0` is fully at rest
- **No NaN** — sweep the whole cycle at 2ms and check every returned number

Use tolerances, not equality, for anything derived from floating-point time. A
test once failed on `sun === 1` because `2.9 - 2.35` evaluates to
`0.5499999999999998`.

Run `npm run verify` before every deploy.

---

## 10. Pitfalls that have actually bitten

| Symptom | Cause |
|---|---|
| Nothing renders, no error visible | A `var` shadowing a function name — `var frame = mesh` overwrote the `frame()` loop |
| Whole page crashes, back button dead | `.map((m, i) => ...)` shadowing the framer-motion `m` import |
| Builds fine, explodes on mount | React Three Fiber 9 requires React 19; this project is React 18, so fiber 8.x |
| A pivot stops rotating | Adding a child group to the scene re-parents it away from its pivot |
| Feature invisible but animating | Buried inside a larger sphere — see the clearance formula |
| Hover animation flickers off | Overlay stage capturing pointer events; it needs `pointer-events: none` |
| Video or animation stutters | `mix-blend-mode` above it forcing full stacking-context repaints |
| `CapsuleGeometry is not a constructor` | Three.js older than r142 |

---

## 11. The remaining scenes

Briefs as agreed:

**Circular economy** — chemical recycling, **no characters**. Waste feeds a
drum, breaks into fragments, clean polyol pellets pour out, and the input
reassembles from them. The mechanic is the message: a closed loop. A recovery
gauge climbing to 90% matches the real Thaal figure.

**Innovation capability** — a character presenting at a board in a classroom or
workshop setting, pointing as ideas appear. The Creatrix model's four drivers
(ambiguity, independence, inner-directedness, uniqueness) can lock in one by one.

**Industrial marketing** — a timelapse of industrial buildings rising, ending
with an approval stamp slamming in from the side with a stamp impact effect.

## 12. Definition of done

- `npm run verify` passes
- Cycle is 4–5 seconds and loops without a visible jump
- Nothing clips out of the stage at any point in the cycle — check numerically
- Disposal is complete; hovering repeatedly does not grow memory
- Reads clearly at actual render size, not just zoomed in
