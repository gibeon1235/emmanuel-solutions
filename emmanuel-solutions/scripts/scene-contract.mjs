/* Runs every registered scene headlessly, for the whole cycle.

   The timeline tests prove the choreography, but they never touch the
   geometry — a scene file can be entirely broken and still ship, because
   the build only type-checks nothing and the rail loads it lazily on
   hover. This is the "builds fine, explodes on mount" case from the
   pitfalls table, caught without a GPU: Three.js needs WebGL to render,
   but building a scene graph and posing it is plain maths.

   Checks the scene contract itself: builds, updates across the cycle
   without NaN, stays inside the stage, and disposes everything it made. */

import * as THREE from "three";
import { SCENES } from "../src/three/sceneRegistry.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

/* The camera frames WORLD_WIDTH 6.0 centred on x=0.2, so anything
   outside this has drifted off the card. Generous on y because the
   visible height depends on the card's aspect ratio, and mesh origins
   are what get tested — a large mesh can still overhang the edge.
   A scene that goes outside deliberately declares its own `bounds` in
   sceneRegistry.js rather than this being widened for everyone. */
const DEFAULT_BOUNDS = { x: [-2.95, 3.35], y: [-2.0, 2.2] };

for (const [id, entry] of Object.entries(SCENES)) {
  console.log(`\n— ${id}`);

  let built = null;
  ok(`${id}: builds without throwing`, (() => {
    try { built = entry.build(); return true; }
    catch (e) { console.log("       " + e.message); return false; }
  })());
  if (!built) continue;

  ok(`${id}: returns the scene contract`,
    !!built.group && typeof built.update === "function" && typeof built.dispose === "function");
  ok(`${id}: cycle is 4-5 seconds`, entry.total >= 4 && entry.total <= 5,
    `total=${entry.total}`);

  /* Sweep the cycle the way the rail does, including a wrap past the
     end, and pose everything each frame. */
  const dt = 1 / 60;
  const BOUNDS = entry.bounds || DEFAULT_BOUNDS;
  let bad = null, out = null;
  const v = new THREE.Vector3();
  for (let f = 0; f <= Math.ceil(entry.total / dt) + 5 && !bad; f++) {
    const t = (f * dt) % entry.total;
    let pose;
    try { pose = built.update(t, dt); }
    catch (e) { bad = `threw at t=${t.toFixed(3)}: ${e.message}`; break; }
    if (!pose) { bad = `returned no pose at t=${t.toFixed(3)}`; break; }

    built.group.updateMatrixWorld(true);
    built.group.traverse((o) => {
      if (bad) return;
      const p = o.position, s = o.scale, r = o.rotation;
      for (const n of [p.x, p.y, p.z, s.x, s.y, s.z, r.x, r.y, r.z]) {
        if (!Number.isFinite(n)) { bad = `NaN on ${o.type} at t=${t.toFixed(3)}`; return; }
      }
      if (!o.isMesh || !o.visible) return;
      /* Hidden parents make a visible child invisible; skip those. */
      for (let a = o.parent; a; a = a.parent) if (!a.visible) return;
      v.setFromMatrixPosition(o.matrixWorld);
      if (out) return;   // report the first escape, not the last
      if (v.x < BOUNDS.x[0] || v.x > BOUNDS.x[1] || v.y < BOUNDS.y[0] || v.y > BOUNDS.y[1]) {
        out = `${o.type} at (${v.x.toFixed(2)}, ${v.y.toFixed(2)}) t=${t.toFixed(3)}`;
      }
    });
  }
  ok(`${id}: updates across the whole cycle`, bad === null, bad || "");
  ok(`${id}: nothing leaves the stage`, out === null, out || "");

  /* Disposal: every geometry and material in the graph must be released.
     React drops the group from the scene; it does not free GPU memory. */
  const geos = new Set(), matsSet = new Set();
  built.group.traverse((o) => {
    if (o.geometry) geos.add(o.geometry);
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => matsSet.add(m));
  });
  let freedG = 0, freedM = 0;
  geos.forEach(g => g.addEventListener("dispose", () => { freedG++; }));
  matsSet.forEach(m => m.addEventListener("dispose", () => { freedM++; }));

  let disposeErr = null;
  try { built.dispose(); } catch (e) { disposeErr = e.message; }
  ok(`${id}: dispose runs clean`, disposeErr === null, disposeErr || "");
  ok(`${id}: every geometry disposed`, freedG === geos.size, `${freedG}/${geos.size}`);
  ok(`${id}: every material disposed`, freedM === matsSet.size, `${freedM}/${matsSet.size}`);
}

console.log(fails ? `\n${fails} FAILED` : "\nevery scene honours the contract");
process.exit(fails ? 1 : 0);
