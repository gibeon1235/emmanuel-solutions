import * as THREE from "three";
import { PARTS, partAt, poseAt, pulseAt, TOTAL } from "./farmerTimeline.js";

/* Builds the whole sustainable-technology scene as plain Three.js.
   Kept framework-free so it can be created, updated and disposed
   without React knowing anything about its internals. */

const SX = 1.35;   // cold store x
const RX = 2.50;   // solar rig x

/* Scaled down 12% from the original build — both scenes read a touch
   large at 1:1 against the card. Applied to the whole top-level group,
   the same pattern circularScene.js uses, so lights scale with it. */
const SCENE_SCALE = 0.88;

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
       procedural room environment to read as a plasticky sheen across
       every matte surface in the scene. */
    envMapIntensity: o.env === undefined ? 0.08 : o.env
  });
}
/* Base colours were washing out under the lighting rig. Every material
   built through mat() below goes through this — deepen the diffuse
   colour only, never the emissive, so glowing parts (LED, pulse, sun)
   stay vivid while surfaces read as pigment rather than pastel. */
function deepen(hex) {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  const f = 0.87;
  return (Math.round(r * f) << 16) | (Math.round(g * f) << 8) | Math.round(b * f);
}
function glowm(c, o) {
  return new THREE.MeshBasicMaterial({
    color: c, transparent: true, opacity: o,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
}

export function buildFarmerScene() {
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
  const glow = (c, o) => { const m = glowm(c, o); mats.push(m); return m; };

  /* ── lighting ─────────────────────────────────────── */
  const hemi = new THREE.HemisphereLight(0xfff2e0, 0x5b6544, 0.72);
  const key = new THREE.DirectionalLight(0xfff0d4, 1.15);
  key.position.set(3.0, 4.3, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -5; key.shadow.camera.right = 5;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -3;
  key.shadow.radius = 2;
  const fill = new THREE.DirectionalLight(0xd8e8ff, 0.34);
  fill.position.set(-2.6, 1.4, 2.2);
  const rim = new THREE.DirectionalLight(0xbfe4ff, 0.5);
  rim.position.set(-3.2, 2.0, -2.6);
  const warm = new THREE.PointLight(0xffc94d, 0, 10);
  warm.position.set(2.5, 1.5, -0.5);
  group.add(hemi, key, fill, rim, warm);

  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.17 });
  mats.push(shadowMat);
  const groundGeo = new THREE.PlaneGeometry(30, 30);
  geos.push(groundGeo);
  const ground = new THREE.Mesh(groundGeo, shadowMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.02;
  ground.receiveShadow = true;
  group.add(ground);

  /* ── materials ────────────────────────────────────────
     Roughness raised across the board for a matte finish; cloth and
     painted surfaces (shirt, overalls, jeans, hat, cable sheath, cold
     store body) sit at 0.85-0.95. Metalness stays only on parts that
     are genuinely metal — the panel glass and solar cells were carrying
     metalness meant for chrome, which is why they read plasticky. */
  const skin = mat(0xe9b184, { r: 0.66 }), skin2 = mat(0xd9a074, { r: 0.68 });
  const cream = mat(0xf2ece0, { r: 0.92 });
  const olive = mat(0x6d7f4c, { r: 0.9 }), olive2 = mat(0x5d6d3f, { r: 0.9 });
  const jean = mat(0x7e8ea3, { r: 0.93 });
  const straw = mat(0xdcb96c, { r: 0.93 });
  const bandM = mat(0x8a5a34, { r: 0.88 });
  const beardM = mat(0x5b4030, { r: 0.92 });
  const leather = mat(0x7c4a28, { r: 0.82 }), leather2 = mat(0x5e371d, { r: 0.84 });
  const darkM = mat(0x2a2118, { r: 0.75 });
  const cableM = mat(0x2a2118, { r: 0.88, t: true, o: 0 });
  const brass = mat(0xc9a227, { r: 0.42, m: 0.62 });
  const metal = mat(0xb2b8bd, { r: 0.4, m: 0.62 });
  const metal2 = mat(0x8f979d, { r: 0.46, m: 0.52 });
  const glass = mat(0x14375a, { r: 0.2, m: 0.08, e: 0x2f7cc4, ei: 0 });
  const cellM = mat(0x2d5f92, { r: 0.38, m: 0.12 });
  const boxM = mat(0xe4ded1, { r: 0.9 });
  const ledM = mat(0x14231d, { r: 0.6, e: 0x3ce39a, ei: 0 });
  const pulseM = mat(0x9be8c4, { r: 0.45, e: 0x38d98d, ei: 2.4 });
  const frostM = mat(0xcfeaf5, { r: 0.3, t: true, o: 0 });
  const cheekM = mat(0xd97a62, { r: 0.78, t: true, o: 0 });
  const carrotM = mat(0xe8792b, { r: 0.68 }), carrotM2 = mat(0xcc6320, { r: 0.72 });
  const leafM = mat(0x4e8a3c, { r: 0.8 }), leafM2 = mat(0x66a34a, { r: 0.8 });

  /* ── farmer ───────────────────────────────────────── */
  const root = new THREE.Group();
  group.add(root);
  const bodyG = new THREE.Group();
  root.add(bodyG);

  const torso = M(new THREE.CapsuleGeometry(0.28, 0.34, 8, 24), cream, 0, 0.52, 0);
  torso.scale.set(1.2, 1, 0.9); bodyG.add(torso);
  bodyG.add(M(new THREE.BoxGeometry(0.4, 0.44, 0.06), olive, 0, 0.5, 0.2));
  bodyG.add(M(new THREE.BoxGeometry(0.2, 0.15, 0.02), olive2, 0, 0.44, 0.235));
  bodyG.add(M(new THREE.SphereGeometry(0.03, 10, 8), brass, -0.15, 0.68, 0.225));
  bodyG.add(M(new THREE.SphereGeometry(0.03, 10, 8), brass, 0.15, 0.68, 0.225));
  const stL = M(new THREE.BoxGeometry(0.085, 0.44, 0.045), olive, -0.17, 0.76, 0.09);
  stL.rotation.x = -0.42; bodyG.add(stL);
  const stR = M(new THREE.BoxGeometry(0.085, 0.44, 0.045), olive, 0.17, 0.76, 0.09);
  stR.rotation.x = -0.42; bodyG.add(stR);
  const hips = M(new THREE.CylinderGeometry(0.29, 0.26, 0.28, 30), olive, 0, 0.16, 0);
  hips.scale.set(1.16, 1, 0.92); bodyG.add(hips);
  bodyG.add(M(new THREE.CylinderGeometry(0.295, 0.295, 0.075, 30), leather, 0, 0.05, 0));
  bodyG.add(M(new THREE.BoxGeometry(0.11, 0.08, 0.03), brass, 0, 0.05, 0.265));

  const headG = new THREE.Group();
  headG.position.set(0, 0.9, 0);
  root.add(headG);
  const headM = M(new THREE.SphereGeometry(0.3, 40, 32), skin, 0, 0.28, 0);
  headM.scale.set(1, 1.02, 0.95); headG.add(headM);
  headG.add(M(new THREE.CylinderGeometry(0.12, 0.15, 0.12, 24), skin, 0, 0.02, 0));
  const beard = M(new THREE.SphereGeometry(0.283, 34, 28), beardM, 0, 0.185, 0.028);
  beard.scale.set(1, 0.84, 0.99); headG.add(beard);
  headG.add(M(new THREE.SphereGeometry(0.128, 24, 20), beardM, 0, 0.1, 0.2));
  const must = M(new THREE.CapsuleGeometry(0.038, 0.1, 8, 18), beardM, 0, 0.252, 0.320);
  must.rotation.z = Math.PI / 2; headG.add(must);
  const faceP = M(new THREE.SphereGeometry(0.278, 34, 28), skin, 0, 0.315, 0.03);
  faceP.scale.set(0.93, 0.72, 0.95); headG.add(faceP);
  headG.add(M(new THREE.SphereGeometry(0.056, 16, 14), skin2, 0, 0.295, 0.290));
  /* Eyes are built as groups that sit clearly proud of the face.
     The previous version laid the sclera almost flush with the head
     sphere, so at a three-quarter angle the far eye was swallowed by
     the head geometry and read as shut. Blinking now scales the whole
     eye group rather than relying on a separate lid mesh, which sat
     behind the eye and could never have occluded anything. */
  /* Eyes are single dark dots — no sclera, no iris, no highlight. At the
     size this renders, a four-part eye resolved into a grey smudge and
     read as a stare; one solid dot reads as an eye. The group structure
     is kept so blinking still scales `g` on y and the look drift still
     translates `look`. EYE_R is flattened on z so the dot hugs the face
     rather than bulging off it. */
  const EYE_R = 0.040, EYE_FLAT = 0.6;
  function mkEye(side) {
    const g = new THREE.Group();
    g.position.set(side * 0.115, 0.375, 0.246);
    const look = new THREE.Group();
    g.add(look);
    const dot = M(new THREE.SphereGeometry(EYE_R, 18, 16), darkM, 0, 0, 0);
    dot.scale.set(1, 1, EYE_FLAT);
    look.add(dot);
    headG.add(g);
    return { g, look };
  }
  const eyeL = mkEye(-1), eyeR = mkEye(1);

  const bwL = M(new THREE.CapsuleGeometry(0.018, 0.075, 8, 16), beardM, -0.108, 0.437, 0.240);
  bwL.rotation.z = Math.PI / 2; headG.add(bwL);
  const bwR = M(new THREE.CapsuleGeometry(0.018, 0.075, 8, 16), beardM, 0.108, 0.437, 0.240);
  bwR.rotation.z = Math.PI / 2; headG.add(bwR);
  /* No mouth. The beard and mustache carry the whole lower face; a
     smile drawn under them was never legible at card size, and the
     stretch of it was the thing that read as odd. `smile` still drives
     the cheeks and brows, so the expression change survives. */
  headG.add(M(new THREE.SphereGeometry(0.048, 12, 12), cheekM, -0.178, 0.283, 0.205));
  headG.add(M(new THREE.SphereGeometry(0.048, 12, 12), cheekM, 0.178, 0.283, 0.205));
  headG.add(M(new THREE.SphereGeometry(0.052, 12, 12), skin2, -0.288, 0.3, 0));
  headG.add(M(new THREE.SphereGeometry(0.052, 12, 12), skin2, 0.288, 0.3, 0));

  const hatG = new THREE.Group(); headG.add(hatG);
  hatG.add(M(new THREE.SphereGeometry(0.225, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.5), straw, 0, 0.585, 0));
  hatG.add(M(new THREE.CylinderGeometry(0.225, 0.248, 0.17, 30), straw, 0, 0.515, 0));
  const brim = M(new THREE.CylinderGeometry(0.42, 0.42, 0.032, 36), straw, 0, 0.45, 0);
  brim.scale.set(1, 1, 0.96); hatG.add(brim);
  hatG.add(M(new THREE.CylinderGeometry(0.252, 0.252, 0.05, 30), bandM, 0, 0.475, 0));

  function mkArm(px) {
    const pv = new THREE.Group(); pv.position.set(px, 0.74, 0);
    const up = new THREE.Group(); pv.add(up);
    up.add(M(new THREE.CapsuleGeometry(0.1, 0.14, 10, 24), cream, 0, -0.12, 0));
    up.add(M(new THREE.CylinderGeometry(0.112, 0.1, 0.05, 22), cream, 0, -0.22, 0));
    const fo = new THREE.Group(); fo.position.set(0, -0.28, 0); up.add(fo);
    fo.add(M(new THREE.CapsuleGeometry(0.088, 0.18, 10, 24), skin, 0, -0.12, 0));
    const hd = new THREE.Group(); hd.position.set(0, -0.28, 0); fo.add(hd);
    const palm = M(new THREE.SphereGeometry(0.115, 22, 18), skin, 0, -0.02, 0);
    palm.scale.set(1, 1.08, 0.82); hd.add(palm);
    const knuck = M(new THREE.BoxGeometry(0.13, 0.085, 0.115), skin, 0, 0.055, 0);
    hd.add(knuck);
    const th = M(new THREE.CapsuleGeometry(0.034, 0.055, 8, 16), skin, 0.078, 0.035, 0.055);
    th.rotation.z = -0.62; hd.add(th);
    bodyG.add(pv);
    return { up, fo, hand: hd, thumb: th };
  }
  const armR = mkArm(-0.4), armL = mkArm(0.4);

  const carrot = new THREE.Group();
  const croot = M(new THREE.ConeGeometry(0.06, 0.28, 22), carrotM, 0, 0, 0);
  croot.rotation.x = Math.PI; carrot.add(croot);
  for (let k = 0; k < 3; k++) {
    const rg = M(new THREE.TorusGeometry(0.05 - k * 0.012, 0.006, 6, 14), carrotM2, 0, 0.02 - k * 0.07, 0);
    rg.rotation.x = Math.PI / 2; carrot.add(rg);
  }
  carrot.add(M(new THREE.CylinderGeometry(0.018, 0.026, 0.05, 10), leafM, 0, 0.16, 0));
  for (let l = 0; l < 5; l++) {
    const a = (l / 5) * Math.PI * 2;
    const lf = M(new THREE.ConeGeometry(0.026, 0.17, 6), l % 2 ? leafM : leafM2,
      Math.cos(a) * 0.045, 0.25, Math.sin(a) * 0.035);
    lf.rotation.z = -Math.cos(a) * 0.5; lf.rotation.x = Math.sin(a) * 0.4;
    carrot.add(lf);
  }
  carrot.position.set(0.01, -0.02, 0.07);
  armL.hand.add(carrot);

  function mkLeg(px) {
    const pv = new THREE.Group(); pv.position.set(px, 0.06, 0);
    const th = new THREE.Group(); pv.add(th);
    th.add(M(new THREE.CapsuleGeometry(0.125, 0.14, 10, 24), jean, 0, -0.13, 0));
    const sh = new THREE.Group(); sh.position.set(0, -0.26, 0); th.add(sh);
    sh.add(M(new THREE.CapsuleGeometry(0.11, 0.1, 10, 24), jean, 0, -0.08, 0));
    sh.add(M(new THREE.CylinderGeometry(0.125, 0.135, 0.16, 24), leather, 0, -0.2, 0));
    sh.add(M(new THREE.SphereGeometry(0.135, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), leather, 0, -0.28, 0.03));
    sh.add(M(new THREE.BoxGeometry(0.22, 0.05, 0.3), leather2, 0, -0.31, 0.04));
    bodyG.add(pv);
    return { th, sh };
  }
  const legR = mkLeg(-0.15), legL = mkLeg(0.15);

  /* ── the installation ─────────────────────────────── */
  const pieces = {};
  const target = {
    pad: [SX, -0.99, 0], storeBody: [SX, -0.6, 0], storeTop: [SX, -0.21, 0],
    storeDoor: [SX, -0.59, 0.32], led: [SX + 0.29, -0.32, 0.3],
    rigBase: [RX, -0.98, 0], pole: [RX, -0.45, 0], panel: [0, 0, 0]
  };
  pieces.pad = M(new THREE.BoxGeometry(0.9, 0.08, 0.72), metal2); group.add(pieces.pad);
  pieces.storeBody = M(new THREE.BoxGeometry(0.8, 0.7, 0.62), boxM); group.add(pieces.storeBody);
  pieces.storeTop = M(new THREE.BoxGeometry(0.86, 0.09, 0.68), metal); group.add(pieces.storeTop);
  pieces.storeDoor = M(new THREE.BoxGeometry(0.46, 0.46, 0.04), metal); group.add(pieces.storeDoor);
  pieces.led = M(new THREE.SphereGeometry(0.055, 14, 14), ledM); group.add(pieces.led);
  pieces.rigBase = M(new THREE.CylinderGeometry(0.22, 0.3, 0.09, 18), metal2); group.add(pieces.rigBase);
  pieces.pole = M(new THREE.CylinderGeometry(0.05, 0.07, 1.15, 14), metal); group.add(pieces.pole);

  const pivot = new THREE.Group(); pivot.position.set(RX, 0.18, 0); group.add(pivot);
  const panG = new THREE.Group(); pivot.add(panG);
  panG.add(M(new THREE.BoxGeometry(1.28, 0.86, 0.045), metal, 0, 0, 0));
  panG.add(M(new THREE.BoxGeometry(1.2, 0.78, 0.05), glass, 0, 0, 0.03));
  pieces.panel = panG;
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 2; b++) {
      const idx = a * 2 + b;
      const cm = M(new THREE.BoxGeometry(0.33, 0.32, 0.016), cellM, 0, 0, 0);
      panG.add(cm);
      pieces["cell" + idx] = cm;
      target["cell" + idx] = [-0.37 + a * 0.37, 0.18 - b * 0.36, 0.062];
    }
  }

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(RX, -0.95, 0.1),
    new THREE.Vector3(1.95, -1.02, 0.18),
    new THREE.Vector3(SX + 0.25, -0.9, 0.24)
  ]);
  const cableGeo = new THREE.TubeGeometry(curve, 24, 0.026, 8);
  geos.push(cableGeo);
  const cable = new THREE.Mesh(cableGeo, cableM);
  group.add(cable);

  const dots = [];
  for (let d = 0; d < 3; d++) {
    const pd = M(new THREE.SphereGeometry(0.052, 12, 12), pulseM);
    pd.castShadow = false; pd.visible = false;
    group.add(pd); dots.push(pd);
  }
  const frost = M(new THREE.BoxGeometry(0.84, 0.74, 0.66), frostM, SX, -0.6, 0);
  group.add(frost);

  const dusts = [];
  for (let q = 0; q < 2; q++) {
    const dmat = new THREE.MeshBasicMaterial({ color: 0xd8cdb8, transparent: true, opacity: 0 });
    mats.push(dmat);
    const dgeo = new THREE.TorusGeometry(0.18, 0.05, 8, 20);
    geos.push(dgeo);
    const dm = new THREE.Mesh(dgeo, dmat);
    dm.rotation.x = -Math.PI / 2;
    dm.position.set(q === 0 ? SX : RX, -0.99, 0);
    group.add(dm); dusts.push(dm);
  }

  /* ── the sun ──────────────────────────────────────── */
  const sunG = new THREE.Group(); group.add(sunG);
  const coreM = new THREE.MeshBasicMaterial({ color: 0xffd23f });
  mats.push(coreM);
  sunG.add(M(new THREE.SphereGeometry(0.2, 24, 20), coreM));
  const g1 = glow(0xffc733, 0.34), g2 = glow(0xffb020, 0.16), g3 = glow(0xff9c12, 0.07);
  sunG.add(M(new THREE.SphereGeometry(0.29, 24, 20), g1));
  sunG.add(M(new THREE.SphereGeometry(0.42, 24, 20), g2));
  sunG.add(M(new THREE.SphereGeometry(0.58, 24, 20), g3));
  const rayM = glow(0xffd23f, 0.55);
  const rays = [];
  const rayGeo = new THREE.ConeGeometry(0.038, 0.26, 6);
  geos.push(rayGeo);
  for (let q = 0; q < 12; q++) {
    const ry = new THREE.Mesh(rayGeo, rayM);
    const a = (q / 12) * Math.PI * 2;
    ry.position.set(Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0);
    ry.rotation.z = a - Math.PI / 2;
    sunG.add(ry); rays.push(ry);
  }
  sunG.scale.setScalar(0.01);

  group.scale.setScalar(SCENE_SCALE);

  let blinkT = 0, nextBlink = 1.9, lookCur = 0;
  const tmp = new THREE.Vector3();

  function update(t, dt) {
    const p = poseAt(t);

    root.position.set(p.x, p.y + p.bob, 0);
    root.rotation.y = p.turn;
    armR.up.rotation.z = p.armR.up; armR.fo.rotation.z = p.armR.fo;
    armL.up.rotation.z = p.armL.up; armL.fo.rotation.z = p.armL.fo;
    armR.thumb.rotation.z = -0.6 - p.thumb * 0.95;
    carrot.rotation.z = -(p.armL.up + p.armL.fo) + 0.15;
    legR.th.rotation.x = Math.sin(p.wp) * 0.5;
    legL.th.rotation.x = Math.sin(p.wp + Math.PI) * 0.5;
    legR.sh.rotation.x = Math.max(0, -Math.sin(p.wp)) * 0.45;
    legL.sh.rotation.x = Math.max(0, -Math.sin(p.wp + Math.PI)) * 0.45;

    headG.rotation.x = p.nod;
    headG.rotation.y = p.look * 0.3;
    /* No mouth mesh to drive — smile now shows only in the cheeks and
       brows, which is all that was ever legible at this size. */
    cheekM.opacity = p.smile * 0.35;
    bwL.position.y = 0.437 + p.brow * 0.03;
    bwR.position.y = 0.437 + p.brow * 0.03;
    lookCur += (p.look - lookCur) * 0.1;
    const eo = lookCur * 0.016;
    eyeL.look.position.x = eo;
    eyeR.look.position.x = eo;

    blinkT += dt;
    let lidOpen = 1;
    if (blinkT > nextBlink) {
      const bp = (blinkT - nextBlink) / 0.13;
      if (bp < 1) {
        lidOpen = 1 - Math.sin(bp * Math.PI) * 0.92;
      } else {
        blinkT = 0; nextBlink = 1.8 + Math.random() * 2.4;
      }
    }
    eyeL.g.scale.y = lidOpen;
    eyeR.g.scale.y = lidOpen;

    for (let i = 0; i < PARTS.length; i++) {
      const spec = PARTS[i];
      const mesh = pieces[spec.id];
      if (!mesh) continue;
      const st = partAt(spec, t);
      const tg = target[spec.id];
      mesh.visible = st.visible;
      mesh.position.set(
        tg[0] + spec.from[0] * (1 - st.e),
        tg[1] + spec.from[1] * (1 - st.e),
        tg[2] + spec.from[2] * (1 - st.e)
      );
      mesh.scale.setScalar(st.p >= 1 ? 1 : 0.75 + 0.25 * st.e);
    }
    pivot.rotation.x = p.panelTilt;
    pivot.rotation.z = 0.05 * p.sun;

    for (let q = 0; q < dusts.length; q++) {
      const t0 = q === 0 ? 0.85 : 1.28;
      const dp = Math.max(0, Math.min(1, (t - t0) / 0.45));
      dusts[q].material.opacity = dp > 0 && dp < 1 ? (1 - dp) * 0.5 : 0;
      dusts[q].scale.setScalar(0.5 + dp * 2.2);
    }

    cableM.opacity = p.cable;
    cable.visible = p.cable > 0.02;

    sunG.position.set(2.62, p.sunY, -1.7);
    sunG.scale.setScalar(Math.max(0.01, p.sun) * (1 + Math.sin(t * 1.7) * 0.025));
    sunG.rotation.z = t * 0.16;
    g1.opacity = p.sun * (0.3 + Math.sin(t * 2.3) * 0.04);
    g2.opacity = p.sun * 0.15;
    g3.opacity = p.sun * 0.07;
    rayM.opacity = p.sun * (0.26 + Math.sin(t * 3.1) * 0.06);
    for (let i = 0; i < rays.length; i++) {
      rays[i].scale.y = 0.85 + Math.sin(t * 3 + i * 0.7) * 0.22;
    }
    hemi.intensity = 0.72 + p.sun * 0.22;
    key.intensity = 1.15 + p.sun * 0.45;
    warm.intensity = p.sun * 1.3;
    glass.emissiveIntensity = p.sun * 0.4 + p.flow * Math.abs(Math.sin(t * 6)) * 0.45;

    for (let j = 0; j < dots.length; j++) {
      const ph = pulseAt(j, p.flow);
      if (ph === null) { dots[j].visible = false; }
      else { dots[j].visible = true; curve.getPoint(ph, tmp); dots[j].position.copy(tmp); }
    }
    ledM.emissiveIntensity = p.chill * 2.9;
    frostM.opacity = p.chill * 0.3;
    frost.visible = p.chill > 0.02;

    return p;
  }

  function dispose() {
    for (const g of geos) { if (g && g.dispose) g.dispose(); }
    for (const m of mats) { if (m && m.dispose) m.dispose(); }
  }

  return { group, update, dispose, TOTAL };
}
