import * as THREE from "three";
import { poseAt, panelAt, PANELS, STAND_X, BASE_Y, BOARD_X, TOTAL }
  from "./innovationTimeline.js";

/* Innovation capability — a presenter at a board in a workshop.

   The rig and face are the farmer's construction with a different
   wardrobe: same head sphere, face patch, dot eyes with a catchlight,
   and the same brow and mouth treatment — but in a business suit, with
   no straw hat and no beard. Because there is no beard the mouth sits at
   z=0.284 rather than the farmer's 0.318: the surface it has to lie on
   is the face patch, not a beard bulging in front of it.
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
  /* Same deepened, roughened skin as the farmer — the pale low-roughness
     version caught the environment map and read waxy. */
  const skin = mat(0xdc9a68, { r: 0.74 }), skin2 = mat(0xc98a58, { r: 0.76 });
  /* Business suit: charcoal jacket and trousers, white shirt, clay tie,
     dark shoes. Wool is matte — nothing in here above 0.9 metalness-free
     roughness would read as cloth. */
  const suit = mat(0x353d4a, { r: 0.93 });
  const suit2 = mat(0x2a313c, { r: 0.93 });
  const shirtM = mat(0xf4efe4, { r: 0.9 });
  const tieM = mat(0x8a4234, { r: 0.86 });
  const shoe = mat(0x2a2118, { r: 0.78 });
  const hairM = mat(0x3f2d21, { r: 0.92 });
  const hiM = mat(0xfff6ea, { r: 0.3 });
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

  /* ── the suit ─────────────────────────────────────────
     Rebuilt. The previous version was a bare capsule with a shirt slab
     and a flat tie plane laid across it, which read as a tube with
     decals rather than as tailoring.

     The torso capsule's front surface sits at z=0.263 through the
     straight part of its barrel, so every garment piece has to be in
     front of that number or it is simply inside the body and invisible.
     That single fact drives all the z values below. */
  const jacket = M(new THREE.CapsuleGeometry(0.28, 0.34, 8, 24), suit, 0, 0.52, 0);
  jacket.scale.set(1.24, 1, 0.94); bodyG.add(jacket);

  /* Shoulder line: a yoke wider than the capsule (half-width 0.36
     against the body's 0.338, so it actually protrudes) plus deltoid
     caps at the arm pivots. Without this the shoulders are a smooth
     dome and the silhouette has no tailoring in it at all. */
  const yoke = M(new THREE.BoxGeometry(0.72, 0.1, 0.30), suit, 0, 0.75, 0);
  bodyG.add(yoke);
  for (const s of [-1, 1]) {
    const delt = M(new THREE.SphereGeometry(0.13, 20, 16), suit, s * 0.355, 0.735, 0);
    delt.scale.set(1.05, 0.78, 1.0);
    bodyG.add(delt);
  }

  /* Shirt, visible only inside the V. Three stacked panels narrowing as
     they descend, so what shows between the lapels is a wedge rather
     than a rectangle of shirt across the whole chest. */
  bodyG.add(M(new THREE.BoxGeometry(0.145, 0.09, 0.03), shirtM, 0, 0.715, 0.266));
  bodyG.add(M(new THREE.BoxGeometry(0.105, 0.09, 0.03), shirtM, 0, 0.635, 0.267));
  bodyG.add(M(new THREE.BoxGeometry(0.065, 0.09, 0.03), shirtM, 0, 0.558, 0.266));

  /* Lapels: from the shoulders down to mid-chest, meeting at the button
     stance. Running (±0.16, 0.75) to (±0.03, 0.52) gives a 0.515 rad
     lean, which is the V. They sit slightly proud of the shirt so they
     overlap its edges and crop it into that wedge. */
  const LAPEL_LEAN = 0.515;
  for (const s of [-1, 1]) {
    const lap = M(new THREE.BoxGeometry(0.115, 0.30, 0.04), suit2, s * 0.095, 0.635, 0.271);
    lap.rotation.z = s * LAPEL_LEAN;
    bodyG.add(lap);
    /* A narrower under-collar continuing the lapel up to the neck. */
    const roll = M(new THREE.BoxGeometry(0.075, 0.12, 0.038), suit2, s * 0.15, 0.766, 0.252);
    roll.rotation.z = s * 0.62;
    bodyG.add(roll);
  }

  /* Shirt collar points either side of the notch. */
  for (const s of [-1, 1]) {
    const col = M(new THREE.BoxGeometry(0.085, 0.065, 0.032), shirtM, s * 0.062, 0.756, 0.264);
    col.rotation.z = s * 0.44;
    bodyG.add(col);
  }

  /* Tie: knot at the collar notch, then four tapering segments that bow
     forward over the chest and pull back in at the bottom. Narrower than
     the shirt wedge at every height, and it stops at 0.375 — above the
     waist, not running into it. */
  bodyG.add(M(new THREE.BoxGeometry(0.052, 0.05, 0.042), tieM, 0, 0.716, 0.279));
  const TIE = [
    { y: 0.660, w: 0.048, h: 0.10, z: 0.281 },
    { y: 0.565, w: 0.042, h: 0.10, z: 0.286 },
    { y: 0.470, w: 0.034, h: 0.10, z: 0.284 },
    { y: 0.390, w: 0.024, h: 0.08, z: 0.276 }
  ];
  for (const seg of TIE) {
    bodyG.add(M(new THREE.BoxGeometry(seg.w, seg.h, 0.026), tieM, 0, seg.y, seg.z));
  }

  /* Jacket hem over the trouser waist. */
  const hips = M(new THREE.CylinderGeometry(0.29, 0.26, 0.28, 30), suit, 0, 0.16, 0);
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

  /* Same eye treatment as the farmer: one dark dot per eye with a small
     off-centre catchlight. The four-part white/iris/pupil/highlight eye
     resolved into a grey smudge at card size, and a grey smudge either
     side of the nose is a large part of what read as a mask. */
  const EYE_R = 0.040, EYE_FLAT = 0.6;
  const HI_R = 0.012, HI_X = -0.013, HI_Y = 0.013, HI_Z = 0.024;
  function mkEye(side) {
    const g = new THREE.Group();
    g.position.set(side * 0.115, 0.375, 0.246);
    const look = new THREE.Group();
    g.add(look);
    const dot = M(new THREE.SphereGeometry(EYE_R, 18, 16), darkM, 0, 0, 0);
    dot.scale.set(1, 1, EYE_FLAT);
    look.add(dot);
    look.add(M(new THREE.SphereGeometry(HI_R, 10, 10), hiM, HI_X, HI_Y, HI_Z));
    headG.add(g);
    return { g, look };
  }
  const eyeL = mkEye(-1), eyeR = mkEye(1);

  /* 0.452, matching the farmer — at 0.437 the brow underside sat 0.002
     above the eye and read as a band across the face. */
  const BROW_Y = 0.452, BROW_TILT = 0.14;
  const bwL = M(new THREE.CapsuleGeometry(0.017, 0.078, 8, 16), browM, -0.108, BROW_Y, 0.220);
  bwL.rotation.z = Math.PI / 2 + BROW_TILT; headG.add(bwL);
  const bwR = M(new THREE.CapsuleGeometry(0.017, 0.078, 8, 16), browM, 0.108, BROW_Y, 0.220);
  bwR.rotation.z = Math.PI / 2 - BROW_TILT; headG.add(bwR);
  /* Same short stroke as the farmer, but at 0.284: there is no beard
     here, so the surface it lies on is the face patch, not the beard. */
  const MOUTH_ARC = Math.PI * 0.55;
  const mouth = M(new THREE.TorusGeometry(0.017, 0.0055, 6, 16, MOUTH_ARC),
    mouthM, 0, 0.205, 0.284);
  mouth.rotation.z = -Math.PI / 2 - MOUTH_ARC / 2;
  headG.add(mouth);
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
    th.add(M(new THREE.CapsuleGeometry(0.125, 0.14, 10, 24), suit, 0, -0.13, 0));
    const sh = new THREE.Group(); sh.position.set(0, -0.26, 0); th.add(sh);
    sh.add(M(new THREE.CapsuleGeometry(0.11, 0.1, 10, 24), suit, 0, -0.08, 0));
    sh.add(M(new THREE.CylinderGeometry(0.12, 0.128, 0.14, 24), suit, 0, -0.2, 0));
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
    /* Lifts at the corners rather than stretching wide, so the stroke
       keeps its shape at every value. */
    mouth.scale.set(0.9 + p.smile * 0.28, 0.85 + p.smile * 0.4, 1);
    cheekM.opacity = p.smile * 0.45;
    /* BROW_Y, not the literal 0.437 the geometry used to sit at — writing
       the old number here would drop the brows back onto the eyes on the
       very first frame. */
    bwL.position.y = BROW_Y + p.brow * 0.04;
    bwR.position.y = BROW_Y + p.brow * 0.04;
    bwL.rotation.z = Math.PI / 2 + BROW_TILT + p.nod * 0.3;
    bwR.rotation.z = Math.PI / 2 - BROW_TILT - p.nod * 0.3;
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
