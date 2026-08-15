import * as THREE from "three";
import {
  poseAt, fragmentAt, pelletAt, returnAt,
  FRAGMENTS, PELLETS, FEED_X, FEED_Y, TRAY_X, TOTAL
} from "./circularTimeline.js";

/* Circular economy — chemical recycling, no characters.

   Reads left to right: foam waste rides the belt into the reactor drum,
   tumbles apart behind the porthole, pours out as amber polyol pellets,
   fills the tray while the recovery gauge climbs to 90%, then flies back
   along the return arc and reassembles into the block it started as.

   Timing lives in circularTimeline.js. Nothing here decides when
   anything happens — this file only decides what it looks like. */

const DRUM_X = 0, DRUM_Y = -0.10;
const DRUM_R = 0.62;
const GAUGE_R = 0.22;
const GAUGE_SEGMENTS = 12;
/* First scaled up (1.18) to sit at the farmer's visual weight — he
   fills the stage height and this machine read as a thin band across
   the middle. Then both scenes were scaled down 12% together because
   the pair read a touch large overall: 1.18 * 0.88 ≈ 1.04. The offset
   re-centres the scene on the camera target after scaling, so growing
   it does not push the feed belt off the left edge. */
const WORLD_SCALE = 1.04;

function mkm(c, o) {
  o = o || {};
  return new THREE.MeshStandardMaterial({
    color: c,
    roughness: o.r === undefined ? 0.75 : o.r,
    metalness: o.m || 0,
    emissive: o.e || 0x000000,
    emissiveIntensity: o.ei || 0,
    transparent: !!o.t,
    opacity: o.o === undefined ? 1 : o.o,
    /* 0.08, not 0.16 — the higher default was reflecting enough of the
       procedural room environment to read as a plasticky sheen. */
    envMapIntensity: o.env === undefined ? 0.08 : o.env
  });
}
/* Base colours were washing out under the lighting rig. Diffuse colour
   only, never emissive, so the reaction glow and gauge lights stay
   vivid while surfaces read as pigment rather than pastel. */
function deepen(hex) {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  const f = 0.87;
  return (Math.round(r * f) << 16) | (Math.round(g * f) << 8) | Math.round(b * f);
}

export function buildCircularScene() {
  const group = new THREE.Group();
  const mats = [];
  const geos = [];
  const M = (g, m, x, y, z) => {
    const e = new THREE.Mesh(g, m);
    e.position.set(x || 0, y || 0, z || 0);
    e.castShadow = true;
    geos.push(g);
    return e;
  };
  const mat = (c, o) => { const m = mkm(deepen(c), o); mats.push(m); return m; };

  /* ── lighting ─────────────────────────────────────────
     The tuned rig from the farmer scene. Only the key casts shadows,
     and the frustum is kept tight to what this scene actually occupies
     (roughly -2.7..2.4 across) rather than a generous box of empty air. */
  const hemi = new THREE.HemisphereLight(0xfff2e0, 0x4c5a4e, 0.72);
  const key = new THREE.DirectionalLight(0xfff0d4, 1.15);
  key.position.set(3.0, 4.3, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -3.2; key.shadow.camera.right = 3.2;
  key.shadow.camera.top = 2.2; key.shadow.camera.bottom = -1.7;
  key.shadow.radius = 2;
  const fill = new THREE.DirectionalLight(0xd8e8ff, 0.34);
  fill.position.set(-2.6, 1.4, 2.2);
  const rim = new THREE.DirectionalLight(0xbfe4ff, 0.5);
  rim.position.set(-3.2, 2.0, -2.6);
  /* Reaction light — the only thing in here that emits, driven by heat. */
  const react = new THREE.PointLight(0x3fd39a, 0, 6);
  react.position.set(DRUM_X, DRUM_Y, 0.2);
  group.add(hemi, key, fill, rim, react);

  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.17 });
  mats.push(shadowMat);
  const groundGeo = new THREE.PlaneGeometry(30, 30);
  geos.push(groundGeo);
  const ground = new THREE.Mesh(groundGeo, shadowMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.06;
  ground.receiveShadow = true;
  group.add(ground);

  /* ── materials ────────────────────────────────────────
     No pure white or black — both read as synthetic under ACES.
     Roughness raised across the board for a matte finish; painted
     surfaces (inner drum wall, gauge backing) sit at 0.85-0.95.
     Metalness stays only on parts that are genuinely metal — the drum
     shell and tray keep it, the pellets and tray gauge frame do not. */
  const foamM = mat(0xa8a196, { r: 0.93 });
  const foamM2 = mat(0x8d867b, { r: 0.91 });
  const shell = mat(0xb2b8bd, { r: 0.42, m: 0.62 });
  const shell2 = mat(0x8f979d, { r: 0.46, m: 0.52 });
  const rubber = mat(0x4a4740, { r: 0.9 });
  /* Porthole tint. Keep metalness at zero: metalness suppresses what
     shows through, and at 0.5 with the RoomEnvironment this reads as a
     mirror rather than a window. Opacity is deliberately low — this is
     a pane to see the reaction through, not a surface in its own right.
     Note none of this is what hid the fragments; that was the barrel's
     end cap, see the drum below. */
  const glassM = mat(0x1d4436, { r: 0.32, m: 0, e: 0x2fbd86, ei: 0, t: true, o: 0.12, env: 0.03 });
  const innerM = mat(0x22302b, { r: 0.88 });
  /* Fragments sit inside an enclosed drum, so they get almost no key
     light. Pale base colour plus a constant emissive floor keeps them
     from reading as dark specks in a dark box. */
  const fragM = mat(0xe8cfa8, { r: 0.72, e: 0x8a6a3a, ei: 0.45 });
  const pelletM = mat(0xd9a441, { r: 0.5, m: 0.04 });
  const trayM = mat(0x9aa2a8, { r: 0.5, m: 0.48 });
  const gaugeBackM = mat(0x2a2118, { r: 0.85 });
  const loopM = mat(0x3fd39a, { r: 0.45, e: 0x2fbd86, ei: 0.6, t: true, o: 0 });

  /* ── feed belt ────────────────────────────────────────
     Angled to match the block's travel line exactly, so the block rides
     the surface instead of hovering above it or sinking through. */
  const feedAng = Math.atan2(-0.58, 1.52);
  const belt = new THREE.Group();
  belt.position.set(-1.54, 0.03, 0);
  belt.rotation.z = feedAng;
  group.add(belt);
  belt.add(M(new THREE.BoxGeometry(2.10, 0.055, 0.46), rubber));
  belt.add(M(new THREE.BoxGeometry(2.10, 0.05, 0.045), shell2, 0, 0.02, 0.235));
  belt.add(M(new THREE.BoxGeometry(2.10, 0.05, 0.045), shell2, 0, 0.02, -0.235));
  for (let i = 0; i < 2; i++) {
    const roll = M(new THREE.CylinderGeometry(0.075, 0.075, 0.5, 18), shell2,
      i ? 1.02 : -1.02, 0, 0);
    roll.rotation.x = Math.PI / 2;
    belt.add(roll);
  }
  for (let i = 0; i < 2; i++) {
    const leg = M(new THREE.BoxGeometry(0.07, 0.62, 0.07), shell2, i ? 0.8 : -0.8, -0.34, 0);
    leg.rotation.z = -feedAng;
    belt.add(leg);
  }

  /* ── the waste block ──────────────────────────────────
     A cluster rather than a cube: offcuts of foam read as scrap, a
     single box reads as a parcel. */
  const block = new THREE.Group();
  group.add(block);
  block.add(M(new THREE.BoxGeometry(0.40, 0.30, 0.34), foamM, 0, 0, 0));
  block.add(M(new THREE.BoxGeometry(0.20, 0.16, 0.22), foamM2, 0.16, 0.16, 0.06));
  block.add(M(new THREE.BoxGeometry(0.16, 0.14, 0.18), foamM2, -0.17, 0.13, -0.05));
  block.add(M(new THREE.BoxGeometry(0.13, 0.12, 0.15), foamM, -0.05, -0.17, 0.12));

  /* ── the reactor drum ─────────────────────────────────
     Axis points at the camera so the porthole faces front and the
     rotation is legible. A drum lying across the view would show its
     curved side and the spin would be nearly invisible. */
  const drum = new THREE.Group();
  drum.position.set(DRUM_X, DRUM_Y, 0);
  group.add(drum);

  /* Open-ended, and this matters: CylinderGeometry caps both ends by
     default, so the drum's own front cap rendered as a solid steel disc
     at z=+0.475 — in front of the glass, the paddles and every fragment.
     The reaction was running correctly behind it for the entire cycle
     and nothing could be seen. Same class as the buried facial features:
     the geometry in front has to be opened or moved, not the thing
     behind it brightened. DoubleSide so the far inner wall still draws. */
  const shellIn = mat(0xb2b8bd, { r: 0.42, m: 0.62 });
  shellIn.side = THREE.DoubleSide;
  const barrel = M(new THREE.CylinderGeometry(DRUM_R, DRUM_R, 0.95, 40, 1, true), shellIn);
  barrel.rotation.x = Math.PI / 2;
  drum.add(barrel);
  const rimF = M(new THREE.TorusGeometry(DRUM_R, 0.055, 12, 44), shell2, 0, 0, 0.47);
  drum.add(rimF);
  drum.add(M(new THREE.TorusGeometry(DRUM_R + 0.015, 0.04, 10, 44), shell2, 0, 0, 0.1));
  /* Back plate sits inside the barrel so fragments have something to
     read against; offset from the cap to avoid coplanar z-fighting. */
  const backPlate = M(new THREE.CircleGeometry(DRUM_R - 0.03, 36), innerM, 0, 0, -0.40);
  drum.add(backPlate);

  const spinner = new THREE.Group();
  spinner.position.set(0, 0, 0.06);
  drum.add(spinner);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const pad = M(new THREE.BoxGeometry(0.07, 0.30, 0.70), shell2,
      Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0);
    pad.rotation.z = a;
    spinner.add(pad);
  }

  const frags = [];
  /* 0.165 radius is a 0.191-unit bounding box, which at 620px across
     6.0 world units and the 1.18 scene scale is ~23px at peak animated
     scale and ~19px at the typical 0.8. The previous 0.105 gave 10px,
     which simply did not read on the card. */
  const fragGeo = new THREE.TetrahedronGeometry(0.165);
  geos.push(fragGeo);
  for (let i = 0; i < FRAGMENTS; i++) {
    const f = new THREE.Mesh(fragGeo, fragM);
    f.castShadow = false;
    f.visible = false;
    spinner.add(f);
    frags.push(f);
  }

  /* Porthole glass last, so it sits in front of the fragments. */
  const glass = M(new THREE.CircleGeometry(DRUM_R - 0.045, 36), glassM, 0, 0, 0.455);
  glass.castShadow = false;
  drum.add(glass);

  /* Feed funnel into the drum, and the outlet spout. */
  const funnel = M(new THREE.ConeGeometry(0.28, 0.44, 20, 1, true), shell2, -0.76, 0.04, 0);
  funnel.rotation.z = -Math.PI / 2;
  group.add(funnel);
  const spout = M(new THREE.CylinderGeometry(0.15, 0.19, 0.34, 20), shell2, 0.68, -0.30, 0.08);
  spout.rotation.z = -0.9;
  group.add(spout);

  /* ── outlet chute and tray ────────────────────────────*/
  const chuteAng = Math.atan2(-0.40, 0.84);
  const chute = new THREE.Group();
  chute.position.set(1.08, -0.56, 0.08);
  chute.rotation.z = chuteAng;
  group.add(chute);
  chute.add(M(new THREE.BoxGeometry(0.95, 0.04, 0.40), shell2));
  chute.add(M(new THREE.BoxGeometry(0.95, 0.09, 0.035), shell2, 0, 0.05, 0.20));
  chute.add(M(new THREE.BoxGeometry(0.95, 0.09, 0.035), shell2, 0, 0.05, -0.20));

  const tray = new THREE.Group();
  tray.position.set(TRAY_X, -0.86, 0);
  group.add(tray);
  tray.add(M(new THREE.BoxGeometry(0.78, 0.05, 0.54), trayM));
  tray.add(M(new THREE.BoxGeometry(0.78, 0.18, 0.04), trayM, 0, 0.09, 0.25));
  tray.add(M(new THREE.BoxGeometry(0.78, 0.18, 0.04), trayM, 0, 0.09, -0.25));
  tray.add(M(new THREE.BoxGeometry(0.04, 0.18, 0.54), trayM, 0.37, 0.09, 0));
  tray.add(M(new THREE.BoxGeometry(0.04, 0.18, 0.54), trayM, -0.37, 0.09, 0));

  /* ── pellets ──────────────────────────────────────────
     Eight meshes serve both journeys: down the chute into the tray, and
     home along the return arc. One pellet is never in two places, so
     reusing them keeps the count honest as well as cheap. */
  const pourCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.60, -0.42, 0.10),
    new THREE.Vector3(0.95, -0.58, 0.09),
    new THREE.Vector3(1.30, -0.70, 0.06),
    new THREE.Vector3(TRAY_X, -0.74, 0.02)
  ]);
  const returnCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(TRAY_X, -0.60, 0.05),
    new THREE.Vector3(1.35, 0.34, 0.05),
    new THREE.Vector3(0.55, 0.92, 0.02),
    new THREE.Vector3(-0.90, 1.02, 0),
    new THREE.Vector3(-1.90, 0.82, 0),
    new THREE.Vector3(FEED_X, FEED_Y, 0)
  ]);

  const pellets = [];
  const slots = [];
  const pelletGeo = new THREE.SphereGeometry(0.072, 20, 16);
  geos.push(pelletGeo);
  for (let i = 0; i < PELLETS; i++) {
    const m = new THREE.Mesh(pelletGeo, pelletM);
    m.visible = false;
    group.add(m);
    pellets.push(m);
    /* Resting slots: two rows of four, so the tray fills rather than
       stacking every pellet on one spot. */
    const col = i % 4, row = Math.floor(i / 4);
    slots.push({ x: -0.24 + col * 0.16, y: row * 0.105, z: 0.13 - row * 0.26 });
  }

  /* ── the return arc ───────────────────────────────────*/
  const loopGeo = new THREE.TubeGeometry(returnCurve, 60, 0.017, 8);
  geos.push(loopGeo);
  const loopTube = new THREE.Mesh(loopGeo, loopM);
  loopTube.castShadow = false;
  loopTube.visible = false;
  group.add(loopTube);
  const arrowHead = M(new THREE.ConeGeometry(0.075, 0.20, 14), loopM, FEED_X + 0.16, FEED_Y + 0.13, 0);
  arrowHead.rotation.z = 2.25;
  arrowHead.castShadow = false;
  arrowHead.visible = false;
  group.add(arrowHead);

  /* ── recovery gauge ───────────────────────────────────
     A segmented arc rather than a growing one: regenerating an arc
     geometry every frame would allocate in the loop. Each segment owns
     a material so it can light independently.

     Mounted on the drum housing, not floating in space. As a free arc
     above the tray it hung over the neighbouring card and read as
     detached decoration rather than an instrument on this machine. As a
     child of `drum` it also inherits the housing's shake, which is what
     sells it as bolted on. `drum` itself does not rotate — `spinner`
     does — so the dial stays upright. */
  const gauge = new THREE.Group();
  gauge.position.set(0, 0.74, 0.30);
  drum.add(gauge);
  gauge.add(M(new THREE.BoxGeometry(0.06, 0.18, 0.07), shell2, 0, -0.17, -0.02));
  const gaugePlate = M(new THREE.BoxGeometry(0.58, 0.34, 0.045), gaugeBackM, 0, 0, 0);
  gauge.add(gaugePlate);
  const gaugeBack = M(new THREE.TorusGeometry(GAUGE_R, 0.012, 8, 40, Math.PI), innerM, 0, -0.06, 0.03);
  gaugeBack.castShadow = false;
  gauge.add(gaugeBack);
  const segMats = [];
  const segGeo = new THREE.BoxGeometry(0.038, 0.075, 0.03);
  geos.push(segGeo);
  for (let i = 0; i < GAUGE_SEGMENTS; i++) {
    const sm = mkm(deepen(0x2f3a34), { r: 0.85, e: 0x3fd39a, ei: 0 });
    mats.push(sm);
    segMats.push(sm);
    const a = Math.PI - ((i + 0.5) / GAUGE_SEGMENTS) * Math.PI;
    const s = new THREE.Mesh(segGeo, sm);
    s.position.set(Math.cos(a) * GAUGE_R, Math.sin(a) * GAUGE_R - 0.06, 0.045);
    s.rotation.z = a - Math.PI / 2;
    s.castShadow = false;
    gauge.add(s);
  }

  group.scale.setScalar(WORLD_SCALE);
  group.position.set(0.46, 0.13, 0);

  /* Scratch vectors — never allocate inside update(). */
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();

  function update(t, dt) {
    const p = poseAt(t);

    /* Block: rides the belt, is swallowed, comes back. */
    block.position.set(p.block.x, p.block.y, 0);
    block.scale.setScalar(Math.max(0.0001, p.block.scale));
    block.visible = p.block.visible;
    block.rotation.z = p.block.reforming
      ? (1 - p.block.scale) * 0.9
      : feedAng + Math.sin(t * 6) * 0.015;

    /* Drum. The barrel shakes a little while it runs — cheap secondary
       motion that stops the machine reading as a still image. */
    spinner.rotation.z = -p.drum;
    drum.position.y = DRUM_Y + Math.sin(t * 38) * 0.005 * p.spin;
    glassM.emissiveIntensity = p.heat * 0.5;
    glassM.opacity = 0.12 + p.heat * 0.04;
    fragM.emissiveIntensity = 0.45 + p.heat * 0.35;
    react.intensity = p.heat * 2.2;

    for (let i = 0; i < FRAGMENTS; i++) {
      const f = fragmentAt(i, t);
      const m = frags[i];
      m.visible = f.visible;
      if (!f.visible) continue;
      const a = f.angle + p.drum * 0.85;
      m.position.set(Math.cos(a) * f.radius, Math.sin(a) * f.radius, 0);
      m.scale.setScalar(f.scale);
      m.rotation.x = t * (1.8 + i * 0.35);
      m.rotation.y = t * (1.3 + i * 0.22);
    }

    /* Pellets: pour, rest, then fly home and are absorbed. */
    for (let i = 0; i < PELLETS; i++) {
      const m = pellets[i];
      const r = returnAt(i, t);
      if (r.visible) {
        returnCurve.getPoint(r.p, tmp);
        m.position.copy(tmp);
        m.visible = true;
        m.scale.setScalar(1 - r.p * 0.25);
        continue;
      }
      if (r.p >= 0.999) { m.visible = false; continue; }
      const q = pelletAt(i, t);
      m.visible = q.visible;
      if (!q.visible) continue;
      pourCurve.getPoint(q.p, tmp2);
      const s = slots[i];
      m.position.set(
        tmp2.x + s.x * q.p,
        tmp2.y + s.y * q.p,
        tmp2.z + s.z * q.p
      );
      m.scale.setScalar(1);
    }

    const loopOn = p.loop > 0.02;
    loopTube.visible = loopOn;
    arrowHead.visible = loopOn;
    loopM.opacity = p.loop * 0.5;

    /* Gauge: each segment lights in turn, and the arc stops at 90%. */
    for (let i = 0; i < GAUGE_SEGMENTS; i++) {
      const lit = Math.max(0, Math.min(1, p.gauge * GAUGE_SEGMENTS - i));
      segMats[i].emissiveIntensity = lit * 2.6;
    }

    return p;
  }

  function dispose() {
    for (const g of geos) { if (g && g.dispose) g.dispose(); }
    for (const m of mats) { if (m && m.dispose) m.dispose(); }
  }

  return { group, update, dispose, TOTAL };
}
