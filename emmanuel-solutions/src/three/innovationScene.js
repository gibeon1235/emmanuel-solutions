import * as THREE from "three";
import { poseAt, panelAt, PANELS, STAND_X, BASE_Y, BOARD_X, TOTAL }
  from "./innovationTimeline.js";

/* Innovation capability — a presenter at a board in a workshop.

   The rig and face are the farmer's construction with a different
   wardrobe: same head sphere, face patch, eye groups and clearance
   offsets, no straw hat and no beard. Because the beard is gone the
   mouth had to move back to z=0.288 — at the farmer's 0.330 it cleared
   a beard that no longer exists and floated in front of the face.
   scripts/farmer-face.mjs checks both characters for that.

   Timing lives in innovationTimeline.js. Nothing here decides when
   anything happens — this file only decides what it looks like. */

const BOARD_Y = 0.42;
const PANEL_Z = 0.02;

/* Matches the farmer's 0.88 so the two characters read at the same
   height when the cursor moves between their cards. */
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
    envMapIntensity: o.env === undefined ? 0.08 : o.env
  });
}
/* Diffuse only, never emissive — the panels have to stay vivid when
   they light. Same 0.87 factor as the other two scenes. */
function deepen(hex) {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  const f = 0.87;
  return (Math.round(r * f) << 16) | (Math.round(g * f) << 8) | Math.round(b * f);
}

/* The four Creatrix drivers, distinguished by colour and glyph rather
   than text — a label would be unreadable at the size this renders. */
const PANEL_TONES = [0x3e8e8a, 0xd69a3c, 0xb4674a, 0x7fa8c9];

export function buildInnovationScene() {
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
     The tuned rig. Only the key casts shadows, and the frustum is kept
     tight to what this scene occupies rather than a box of empty air. */
  const hemi = new THREE.HemisphereLight(0xfff2e0, 0x55605a, 0.72);
  const key = new THREE.DirectionalLight(0xfff0d4, 1.15);
  key.position.set(3.0, 4.3, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -3.4; key.shadow.camera.right = 3.4;
  key.shadow.camera.top = 2.4; key.shadow.camera.bottom = -1.8;
  key.shadow.radius = 2;
  const fill = new THREE.DirectionalLight(0xd8e8ff, 0.34);
  fill.position.set(-2.6, 1.4, 2.2);
  const rim = new THREE.DirectionalLight(0xbfe4ff, 0.5);
  rim.position.set(-3.2, 2.0, -2.6);
  /* Warms as the panels lock — the board is the light source here. */
  const boardLight = new THREE.PointLight(0xffd9a0, 0, 6);
  boardLight.position.set(BOARD_X, BOARD_Y, 0.9);
  group.add(hemi, key, fill, rim, boardLight);

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
     Matte throughout: cloth 0.88-0.93, metalness only on the board
     frame and the marker's clip. */
  const skin = mat(0xe9b184, { r: 0.66 }), skin2 = mat(0xd9a074, { r: 0.68 });
  /* Business suit: charcoal jacket and trousers, white shirt, clay tie,
     dark shoes. Wool is matte — nothing in here above 0.9 metalness-free
     roughness would read as cloth. */
  const suit = mat(0x353d4a, { r: 0.93 });
  const suit2 = mat(0x2a313c, { r: 0.93 });
  const shirtM = mat(0xf4efe4, { r: 0.9 });
  const tieM = mat(0x8a4234, { r: 0.86 });
  const trouser = mat(0x39414d, { r: 0.93 });
  const shoe = mat(0x2a2118, { r: 0.78 });
  const hairM = mat(0x3f2d21, { r: 0.92 });
  const eyeW = mat(0xf5efe6, { r: 0.42 });
  const irisM = mat(0x4a3524, { r: 0.5 });
  const whiteM = mat(0xffffff, { r: 0.35 });
  const darkM = mat(0x2a2118, { r: 0.75 });
  const browM = mat(0x4a3527, { r: 0.9 });
  const mouthM = mat(0x7a3a2e, { r: 0.68 });
  const cheekM = mat(0xd97a62, { r: 0.78, t: true, o: 0 });
  const frameM = mat(0x9aa2a8, { r: 0.46, m: 0.5 });
  const boardM = mat(0xf2ece0, { r: 0.93 });
  const legM = mat(0x8f979d, { r: 0.5, m: 0.45 });
  const tableM = mat(0xb49877, { r: 0.9 });
  const markerM = mat(0x2f4f4a, { r: 0.8 });

  /* ── presenter ────────────────────────────────────────*/
  const root = new THREE.Group();
  root.position.set(STAND_X, BASE_Y, 0);
  /* Three-quarter stance toward the board, so he reads as addressing it
     rather than the viewer. */
  root.rotation.y = 0.3;
  group.add(root);
  const bodyG = new THREE.Group();
  root.add(bodyG);

  /* Jacket over shirt. The jacket capsule encloses the torso entirely,
     so the shirt has to be a separate panel in front of it rather than
     a smaller shape underneath — otherwise none of it is ever seen. */
  const jacket = M(new THREE.CapsuleGeometry(0.28, 0.34, 8, 24), suit, 0, 0.52, 0);
  jacket.scale.set(1.24, 1, 0.94); bodyG.add(jacket);
  bodyG.add(M(new THREE.BoxGeometry(0.17, 0.44, 0.03), shirtM, 0, 0.55, 0.262));
  /* Lapels flank the shirt panel and are what actually says "jacket". */
  const lapL = M(new THREE.BoxGeometry(0.125, 0.4, 0.035), suit2, -0.113, 0.56, 0.258);
  lapL.rotation.z = 0.17; bodyG.add(lapL);
  const lapR = M(new THREE.BoxGeometry(0.125, 0.4, 0.035), suit2, 0.113, 0.56, 0.258);
  lapR.rotation.z = -0.17; bodyG.add(lapR);
  /* Shirt collar, then the tie knot and blade over the placket. */
  const colL = M(new THREE.BoxGeometry(0.1, 0.07, 0.035), shirtM, -0.072, 0.735, 0.252);
  colL.rotation.z = 0.42; bodyG.add(colL);
  const colR = M(new THREE.BoxGeometry(0.1, 0.07, 0.035), shirtM, 0.072, 0.735, 0.252);
  colR.rotation.z = -0.42; bodyG.add(colR);
  bodyG.add(M(new THREE.BoxGeometry(0.07, 0.06, 0.035), tieM, 0, 0.705, 0.285));
  const tie = M(new THREE.BoxGeometry(0.075, 0.32, 0.03), tieM, 0, 0.52, 0.283);
  tie.scale.set(1, 1, 1); bodyG.add(tie);
  /* Jacket hem sits over the trouser waist. */
  const hips = M(new THREE.CylinderGeometry(0.29, 0.26, 0.28, 30), trouser, 0, 0.16, 0);
  hips.scale.set(1.16, 1, 0.92); bodyG.add(hips);
  const hem = M(new THREE.CylinderGeometry(0.33, 0.315, 0.2, 30), suit, 0, 0.26, 0);
  hem.scale.set(1.14, 1, 0.94); bodyG.add(hem);
  bodyG.add(M(new THREE.CylinderGeometry(0.29, 0.29, 0.05, 30), shoe, 0, 0.06, 0));

  const headG = new THREE.Group();
  headG.position.set(0, 0.9, 0);
  root.add(headG);
  const headM = M(new THREE.SphereGeometry(0.3, 40, 32), skin, 0, 0.28, 0);
  headM.scale.set(1, 1.02, 0.95); headG.add(headM);
  headG.add(M(new THREE.CylinderGeometry(0.12, 0.15, 0.12, 24), skin, 0, 0.02, 0));
  const faceP = M(new THREE.SphereGeometry(0.278, 34, 28), skin, 0, 0.315, 0.03);
  faceP.scale.set(0.93, 0.72, 0.95); headG.add(faceP);
  headG.add(M(new THREE.SphereGeometry(0.056, 16, 14), skin2, 0, 0.295, 0.290));

  /* Hair, in two pieces, and the reason it is two.

     A single sphere cap descends by the same amount at the front as at
     the back. The previous one ran down to y=0.270 — below the eyes at
     0.375 — so it wrapped a dark band right across the eye region and
     the character read as wearing a bandit mask. The eyes cleared it by
     0.016 and poked through the middle of it, which is why nothing
     looked broken from the numbers alone.

     So: a crown cap whose rim stops at y=0.479, above even a raised brow
     at 0.467, and a separate mass behind the head for the back and
     sides. The hairline is high; the face is bare. */
  const CROWN_THETA = Math.PI * 0.25;
  const hairCap = M(new THREE.SphereGeometry(0.315, 32, 18, 0, Math.PI * 2, 0, CROWN_THETA),
    hairM, 0, 0.29, -0.01);
  hairCap.scale.set(1, 1.02, 0.98); headG.add(hairCap);
  /* Pushed back in z so it never reaches around to the face. */
  const hairBack = M(new THREE.SphereGeometry(0.3, 26, 20), hairM, 0, 0.3, -0.075);
  hairBack.scale.set(1.02, 1.0, 0.82); headG.add(hairBack);
  headG.add(M(new THREE.SphereGeometry(0.052, 12, 12), skin2, -0.288, 0.3, 0));
  headG.add(M(new THREE.SphereGeometry(0.052, 12, 12), skin2, 0.288, 0.3, 0));

  /* Eye groups, same construction and same EYE_SCALE as the farmer —
     shrinking the white alone would leave the iris proud or buried. */
  const EYE_SCALE = 0.72;
  function mkEye(side) {
    const g = new THREE.Group();
    g.position.set(side * 0.115, 0.375, 0.246);
    const white = M(new THREE.SphereGeometry(0.062 * EYE_SCALE, 26, 22), eyeW, 0, 0, 0);
    white.scale.set(0.94, 1, 0.62);
    g.add(white);
    const look = new THREE.Group();
    look.position.set(0, 0, 0.028 * EYE_SCALE);
    g.add(look);
    const iris = M(new THREE.SphereGeometry(0.032 * EYE_SCALE, 18, 16), irisM, 0, 0, 0.018 * EYE_SCALE);
    iris.scale.set(1, 1, 0.5);
    look.add(iris);
    look.add(M(new THREE.SphereGeometry(0.016 * EYE_SCALE, 12, 12), darkM, 0, 0, 0.03 * EYE_SCALE));
    look.add(M(new THREE.SphereGeometry(0.011 * EYE_SCALE, 10, 10), whiteM,
      -0.015 * EYE_SCALE, 0.018 * EYE_SCALE, 0.034 * EYE_SCALE));
    headG.add(g);
    return { g, look };
  }
  const eyeL = mkEye(-1), eyeR = mkEye(1);

  const bwL = M(new THREE.CapsuleGeometry(0.016, 0.07, 8, 16), browM, -0.108, 0.437, 0.240);
  bwL.rotation.z = Math.PI / 2; headG.add(bwL);
  const bwR = M(new THREE.CapsuleGeometry(0.016, 0.07, 8, 16), browM, 0.108, 0.437, 0.240);
  bwR.rotation.z = Math.PI / 2; headG.add(bwR);
  /* z=0.288, not the farmer's 0.330 — see the note at the top. */
  const mouth = M(new THREE.TorusGeometry(0.036, 0.009, 8, 18, Math.PI), mouthM, 0, 0.205, 0.288);
  mouth.rotation.z = Math.PI; headG.add(mouth);
  headG.add(M(new THREE.SphereGeometry(0.046, 12, 12), cheekM, -0.178, 0.283, 0.205));
  headG.add(M(new THREE.SphereGeometry(0.046, 12, 12), cheekM, 0.178, 0.283, 0.205));

  function mkArm(px) {
    const pv = new THREE.Group(); pv.position.set(px, 0.74, 0);
    const up = new THREE.Group(); pv.add(up);
    up.add(M(new THREE.CapsuleGeometry(0.102, 0.14, 10, 24), suit, 0, -0.12, 0));
    up.add(M(new THREE.CylinderGeometry(0.114, 0.102, 0.05, 22), suit, 0, -0.22, 0));
    const fo = new THREE.Group(); fo.position.set(0, -0.28, 0); up.add(fo);
    /* Full sleeve with a shirt cuff showing at the wrist — a suit does
       not stop at the elbow the way the farmer's shirt does. */
    fo.add(M(new THREE.CapsuleGeometry(0.09, 0.15, 10, 24), suit, 0, -0.11, 0));
    fo.add(M(new THREE.CylinderGeometry(0.084, 0.082, 0.05, 18), shirtM, 0, -0.235, 0));
    const hd = new THREE.Group(); hd.position.set(0, -0.28, 0); fo.add(hd);
    const palm = M(new THREE.SphereGeometry(0.115, 22, 18), skin, 0, -0.02, 0);
    palm.scale.set(1, 1.08, 0.82); hd.add(palm);
    hd.add(M(new THREE.BoxGeometry(0.13, 0.085, 0.115), skin, 0, 0.055, 0));
    const th = M(new THREE.CapsuleGeometry(0.034, 0.055, 8, 16), skin, 0.078, 0.035, 0.055);
    th.rotation.z = -0.62; hd.add(th);
    bodyG.add(pv);
    return { up, fo, hand: hd, thumb: th };
  }
  /* +x-side arm points at the board; the other keeps the marker. */
  const armPoint = mkArm(0.4), armMarker = mkArm(-0.4);

  /* The pointing hand: index extended, so the gesture reads as pointing
     rather than reaching. */
  const finger = M(new THREE.CapsuleGeometry(0.028, 0.1, 8, 16), skin, 0, -0.02, 0.13);
  finger.rotation.x = Math.PI / 2;
  armPoint.hand.add(finger);

  const marker = new THREE.Group();
  marker.add(M(new THREE.CylinderGeometry(0.026, 0.026, 0.19, 14), markerM));
  marker.add(M(new THREE.CylinderGeometry(0.028, 0.028, 0.05, 14), frameM, 0, 0.1, 0));
  marker.position.set(0.01, -0.04, 0.07);
  marker.rotation.x = 0.4;
  armMarker.hand.add(marker);

  function mkLeg(px) {
    const pv = new THREE.Group(); pv.position.set(px, 0.06, 0);
    const th = new THREE.Group(); pv.add(th);
    th.add(M(new THREE.CapsuleGeometry(0.125, 0.14, 10, 24), trouser, 0, -0.13, 0));
    const sh = new THREE.Group(); sh.position.set(0, -0.26, 0); th.add(sh);
    sh.add(M(new THREE.CapsuleGeometry(0.11, 0.1, 10, 24), trouser, 0, -0.08, 0));
    sh.add(M(new THREE.CylinderGeometry(0.12, 0.128, 0.14, 24), trouser, 0, -0.2, 0));
    sh.add(M(new THREE.SphereGeometry(0.128, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), shoe, 0, -0.27, 0.03));
    sh.add(M(new THREE.BoxGeometry(0.21, 0.05, 0.29), shoe, 0, -0.3, 0.04));
    bodyG.add(pv);
    return { th, sh };
  }
  mkLeg(-0.15); mkLeg(0.15);

  /* ── the board ────────────────────────────────────────*/
  const boardG = new THREE.Group();
  boardG.position.set(BOARD_X, 0, 0);
  group.add(boardG);
  boardG.add(M(new THREE.BoxGeometry(2.34, 1.54, 0.09), frameM, 0, BOARD_Y, -0.12));
  /* Offset from the frame rather than flush — coplanar faces z-fight. */
  boardG.add(M(new THREE.BoxGeometry(2.2, 1.4, 0.03), boardM, 0, BOARD_Y, -0.055));
  for (const s of [-1, 1]) {
    boardG.add(M(new THREE.CylinderGeometry(0.045, 0.05, 1.05, 16), legM, s * 0.9, -0.52, -0.12));
    const foot = M(new THREE.BoxGeometry(0.32, 0.05, 0.4), legM, s * 0.9, -1.02, -0.1);
    boardG.add(foot);
  }
  boardG.add(M(new THREE.BoxGeometry(1.84, 0.05, 0.05), legM, 0, -0.72, -0.12));
  /* Marker tray along the bottom edge. */
  boardG.add(M(new THREE.BoxGeometry(2.1, 0.05, 0.11), frameM, 0, BOARD_Y - 0.73, -0.02));

  /* ── the four panels ──────────────────────────────────
     Each owns its material so it can light independently as it locks.
     Glyphs give them distinct silhouettes without any text. */
  const panels = [];
  const panelGeo = new THREE.BoxGeometry(0.9, 0.5, 0.05);
  geos.push(panelGeo);
  const slots = [[-0.5, 0.3], [0.5, 0.3], [-0.5, -0.3], [0.5, -0.3]];
  for (let i = 0; i < PANELS; i++) {
    const pm = mkm(deepen(PANEL_TONES[i]), { r: 0.82, e: PANEL_TONES[i], ei: 0 });
    mats.push(pm);
    const g = new THREE.Group();
    g.position.set(slots[i][0], BOARD_Y + slots[i][1], PANEL_Z);
    g.visible = false;
    boardG.add(g);
    const face = new THREE.Mesh(panelGeo, pm);
    face.castShadow = true;
    g.add(face);

    /* One glyph per driver — ring, bar, core, spike. */
    const gm = mkm(deepen(0xf5efe6), { r: 0.7, e: 0xf5efe6, ei: 0 });
    mats.push(gm);
    let glyphGeo;
    if (i === 0) glyphGeo = new THREE.TorusGeometry(0.1, 0.024, 10, 26);
    else if (i === 1) glyphGeo = new THREE.CapsuleGeometry(0.026, 0.16, 8, 16);
    else if (i === 2) glyphGeo = new THREE.SphereGeometry(0.085, 20, 16);
    else glyphGeo = new THREE.TetrahedronGeometry(0.115);
    geos.push(glyphGeo);
    const glyph = new THREE.Mesh(glyphGeo, gm);
    glyph.position.set(0, 0, 0.045);
    glyph.castShadow = false;
    if (i === 3) glyph.rotation.set(0.5, 0.4, 0);
    g.add(glyph);

    panels.push({ g, pm, gm, glyph });
  }

  /* ── a low table, to place him in a workshop ──────────*/
  const table = new THREE.Group();
  table.position.set(-0.62, 0, 0.35);
  group.add(table);
  table.add(M(new THREE.BoxGeometry(0.62, 0.06, 0.44), tableM, 0, -0.42, 0));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    table.add(M(new THREE.CylinderGeometry(0.028, 0.028, 0.56, 12), legM,
      sx * 0.25, -0.72, sz * 0.16));
  }
  for (let k = 0; k < 2; k++) {
    const mk = M(new THREE.CylinderGeometry(0.022, 0.022, 0.16, 12), markerM,
      -0.1 + k * 0.12, -0.37, 0.06);
    mk.rotation.z = Math.PI / 2;
    table.add(mk);
  }

  group.scale.setScalar(SCENE_SCALE);
  /* Presenter at -1.75 and board at 0.95 put the content's centre at
     about -0.14, while the camera looks at 0.2 — this nudges the pair
     back under the lens instead of sitting left of it. */
  group.position.x = 0.3;

  let blinkT = 0, nextBlink = 2.1, lookCur = 0;

  function update(t, dt) {
    const p = poseAt(t);

    armPoint.up.rotation.z = p.armPoint.up;
    armPoint.fo.rotation.z = p.armPoint.fo;
    armMarker.up.rotation.z = p.armMarker.up;
    armMarker.fo.rotation.z = p.armMarker.fo;
    /* Counter-rotate the held marker so it does not wave about with
       every joint above it. */
    marker.rotation.z = -(p.armMarker.up + p.armMarker.fo) + 0.15;

    headG.rotation.x = p.nod;
    headG.rotation.y = p.look * 0.35;
    mouth.scale.set(0.92 + p.smile * 0.24, 0.85 + p.smile * 0.32, 1);
    cheekM.opacity = p.smile * 0.32;
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

    let litTotal = 0;
    for (let i = 0; i < PANELS; i++) {
      const a = panelAt(i, t);
      const it = panels[i];
      it.g.visible = a.visible;
      if (!a.visible) continue;
      /* Flies in toward the board and snaps flat against it. */
      it.g.position.z = PANEL_Z + (1 - a.e) * 0.85;
      it.g.scale.setScalar(0.35 + 0.65 * a.e);
      it.pm.emissiveIntensity = a.lit * 0.85;
      it.gm.emissiveIntensity = a.lit * 0.5;
      it.glyph.rotation.z = (1 - a.e) * 1.2;
      litTotal += a.lit;
    }
    boardLight.intensity = (litTotal / PANELS) * 1.1;

    return p;
  }

  function dispose() {
    for (const g of geos) { if (g && g.dispose) g.dispose(); }
    for (const m of mats) { if (m && m.dispose) m.dispose(); }
  }

  return { group, update, dispose, TOTAL };
}
