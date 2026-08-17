/* Facial features must sit in front of whatever is behind them.

   This test exists because five of the six features were once buried
   inside the head, face patch or beard — the mouth sat 0.051 units
   behind the beard, so the entire smile animation was invisible and
   one eye read as permanently shut at a three-quarter angle.

   Geometry is a sphere-vs-sphere depth comparison: for each feature we
   work out the z of the occluding surfaces at that x/y, and require the
   feature's front face to clear it.

   Both characters are checked. They share a head, face patch and eye
   construction, but the presenter has no beard — which cuts both ways:
   removing an occluder cannot bury anything, but the farmer's mouth sits
   at z=0.330 precisely because a beard bulges in front of it, and at
   that depth on a bare face it would float clear of the head instead.
   The presenter's mouth is at 0.288 for that reason, and this checks
   both are within a sane band rather than only checking the floor. */

/* farmerScene.js */
const FARMER_OCC = {
  head:  { r: 0.3,   sx: 1,    sy: 1.02, sz: 0.95, cy: 0.28,  cz: 0 },
  face:  { r: 0.278, sx: 0.93, sy: 0.72, sz: 0.95, cy: 0.315, cz: 0.03 },
  beard: { r: 0.283, sx: 1,    sy: 0.84, sz: 0.99, cy: 0.185, cz: 0.028 }
};
/* innovationScene.js — same head and face patch, no beard. */
const PRESENTER_OCC = {
  head: FARMER_OCC.head,
  face: FARMER_OCC.face
};

/* Eye depth mirrors EYE_SCALE (0.72) applied to the white sphere radius
   (0.062). Mouth depth mirrors the torus tube radius. */
const EYE_SCALE = 0.72;

/* The farmer's eyes are single flattened dots — no sclera, iris or
   highlight — and he has no mouth at all: the beard and mustache carry
   the lower face. Depth is the dot radius after its z flattening. */
const FARMER_EYE_DEPTH = 0.040 * 0.6;
const FARMER = [
  { name: "eye left",   x: -0.115, y: 0.375, z: 0.246, depth: FARMER_EYE_DEPTH, behind: ["head", "face"], flush: true },
  { name: "eye right",  x:  0.115, y: 0.375, z: 0.246, depth: FARMER_EYE_DEPTH, behind: ["head", "face"], flush: true },
  { name: "brow left",  x: -0.108, y: 0.437, z: 0.240, depth: 0.018,  behind: ["head", "face"], flush: true },
  { name: "brow right", x:  0.108, y: 0.437, z: 0.240, depth: 0.018,  behind: ["head", "face"], flush: true },
  { name: "mustache",   x:  0.000, y: 0.252, z: 0.320, depth: 0.038,  behind: ["head", "face", "beard"] },
  { name: "cheek left", x: -0.178, y: 0.283, z: 0.205, depth: 0.048,  behind: ["head", "face"], flush: true },
  { name: "cheek right",x:  0.178, y: 0.283, z: 0.205, depth: 0.048,  behind: ["head", "face"], flush: true },
  { name: "nose",       x:  0.000, y: 0.295, z: 0.290, depth: 0.056,  behind: ["head", "face", "beard"] }
];

const PRESENTER = [
  { name: "eye left",   x: -0.115, y: 0.375, z: 0.246, depth: 0.062 * EYE_SCALE * 0.62, behind: ["head", "face"], flush: true },
  { name: "eye right",  x:  0.115, y: 0.375, z: 0.246, depth: 0.062 * EYE_SCALE * 0.62, behind: ["head", "face"], flush: true },
  { name: "brow left",  x: -0.108, y: 0.437, z: 0.240, depth: 0.016,  behind: ["head", "face"], flush: true },
  { name: "brow right", x:  0.108, y: 0.437, z: 0.240, depth: 0.016,  behind: ["head", "face"], flush: true },
  { name: "mouth",      x:  0.000, y: 0.205, z: 0.288, depth: 0.009,  behind: ["head", "face"], flush: true },
  { name: "cheek left", x: -0.178, y: 0.283, z: 0.205, depth: 0.046,  behind: ["head", "face"], flush: true },
  { name: "cheek right",x:  0.178, y: 0.283, z: 0.205, depth: 0.046,  behind: ["head", "face"], flush: true },
  { name: "nose",       x:  0.000, y: 0.295, z: 0.290, depth: 0.056,  behind: ["head", "face"] }
];

const MIN_CLEARANCE = 0.012;
/* A feature further than this in front of what is behind it is not
   buried — it is detached, hanging in front of the face. Applies only to
   features marked `flush`, which are the ones meant to lie on the
   surface: eyes, brows, cheeks, mouth. A nose and a mustache are
   supposed to stick out, so they are exempt by omission rather than by
   a looser number that would let a floating mouth through. */
const MAX_CLEARANCE = 0.045;

function surfZ(s, x, y) {
  const dx = x / (s.r * s.sx), dy = (y - s.cy) / (s.r * s.sy);
  const rem = 1 - dx * dx - dy * dy;
  return rem <= 0 ? null : s.cz + s.r * s.sz * Math.sqrt(rem);
}

let fails = 0;

function checkFace(label, occ, features) {
  console.log(`\n— ${label}`);
  for (const f of features) {
    let behind = -9;
    for (const k of f.behind) {
      const v = surfZ(occ[k], f.x, f.y);
      if (v !== null && v > behind) behind = v;
    }
    const clear = (f.z + f.depth) - behind;
    const floored = clear > MIN_CLEARANCE;
    const notFloating = !f.flush || clear < MAX_CLEARANCE;
    const ok = floored && notFloating;
    if (!ok) fails++;
    const why = !floored ? " buried" : !notFloating ? " floating off the face" : "";
    console.log(`${ok ? "PASS" : "FAIL"}  ${f.name.padEnd(12)} clearance ${clear >= 0 ? "+" : ""}${clear.toFixed(3)}${why}`);
  }
}

checkFace("farmer", FARMER_OCC, FARMER);
checkFace("presenter", PRESENTER_OCC, PRESENTER);

/* The far eye must also stay clear once the head yaws — that is the
   angle the old layout failed at. Both characters yaw to watch
   something off to one side, so both are checked. */
console.log("");
for (const [label, yaw, eyeFront] of [
  ["farmer", 0.85 * 0.3, 0.246 + FARMER_EYE_DEPTH],
  ["presenter", 0.9 * 0.35, 0.246 + 0.062 * EYE_SCALE * 0.62]
]) {
  const rot = (x, z) => -Math.sin(yaw) * x + Math.cos(yaw) * z;
  const farEye = rot(-0.115, eyeFront);
  const nearEye = rot(0.115, eyeFront);
  const bothVisible = farEye > 0.1 && nearEye > 0.1;
  if (!bothVisible) fails++;
  console.log(`${bothVisible ? "PASS" : "FAIL"}  ${label}: both eyes forward at ${(yaw * 57.3).toFixed(0)} degree yaw  far=${farEye.toFixed(3)} near=${nearEye.toFixed(3)}`);
}

/* Hair must not come down over the face. The presenter's crown cap once
   descended to y=0.270, well below the eyes at 0.375, wrapping a dark
   band across the whole eye region — he read as masked. A sphere cap
   descends equally front and back, so the only safe rim is one above the
   brows; anything lower has to be a separate piece pushed back in z.
   Mirrors innovationScene.js. */
const CROWN = { r: 0.315, sy: 1.02, cy: 0.29, theta: Math.PI * 0.25 };
const BROW_TOP = 0.437 + 0.03 + 0.016;          // raised brow plus its radius
const hairRim = CROWN.cy + CROWN.r * CROWN.sy * Math.cos(CROWN.theta);
const hairClears = hairRim > BROW_TOP;
if (!hairClears) fails++;
console.log(`${hairClears ? "PASS" : "FAIL"}  presenter: hairline clears the brow  rim=${hairRim.toFixed(3)} brow top=${BROW_TOP.toFixed(3)}`);

/* And the mass behind the head must stay behind the face. */
const BACK = { r: 0.3, sx: 1.02, sy: 1.0, sz: 0.82, cy: 0.3, cz: -0.075 };
const backAtEye = surfZ(BACK, 0.115, 0.375);
const eyeFrontP = 0.246 + 0.062 * EYE_SCALE * 0.62;
const backClears = backAtEye === null || backAtEye < eyeFrontP - MIN_CLEARANCE;
if (!backClears) fails++;
console.log(`${backClears ? "PASS" : "FAIL"}  presenter: back hair stays behind the eyes  hair z=${backAtEye === null ? "n/a" : backAtEye.toFixed(3)} eye front=${eyeFrontP.toFixed(3)}`);

console.log(fails ? `\n${fails} FAILED` : "\nevery facial feature is visible");
process.exit(fails ? 1 : 0);
