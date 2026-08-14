/* Facial features must sit in front of whatever is behind them.

   This test exists because five of the six features were once buried
   inside the head, face patch or beard — the mouth sat 0.051 units
   behind the beard, so the entire smile animation was invisible and
   one eye read as permanently shut at a three-quarter angle.

   Geometry is a sphere-vs-sphere depth comparison: for each feature we
   work out the z of the occluding surfaces at that x/y, and require the
   feature's front face to clear it. Values mirror farmerScene.js. */

const OCC = {
  head:  { r: 0.3,   sx: 1,    sy: 1.02, sz: 0.95, cy: 0.28,  cz: 0 },
  face:  { r: 0.278, sx: 0.93, sy: 0.72, sz: 0.95, cy: 0.315, cz: 0.03 },
  beard: { r: 0.283, sx: 1,    sy: 0.84, sz: 0.99, cy: 0.185, cz: 0.028 }
};

const FEATURES = [
  { name: "eye left",   x: -0.115, y: 0.375, z: 0.246, depth: 0.062 * 0.62, behind: ["head", "face"] },
  { name: "eye right",  x:  0.115, y: 0.375, z: 0.246, depth: 0.062 * 0.62, behind: ["head", "face"] },
  { name: "brow left",  x: -0.108, y: 0.437, z: 0.240, depth: 0.018,        behind: ["head", "face"] },
  { name: "brow right", x:  0.108, y: 0.437, z: 0.240, depth: 0.018,        behind: ["head", "face"] },
  { name: "mouth",      x:  0.000, y: 0.205, z: 0.330, depth: 0.0135,       behind: ["head", "face", "beard"] },
  { name: "mustache",   x:  0.000, y: 0.252, z: 0.320, depth: 0.038,        behind: ["head", "face", "beard"] },
  { name: "cheek left", x: -0.178, y: 0.283, z: 0.205, depth: 0.048,        behind: ["head", "face"] },
  { name: "cheek right",x:  0.178, y: 0.283, z: 0.205, depth: 0.048,        behind: ["head", "face"] },
  { name: "nose",       x:  0.000, y: 0.295, z: 0.290, depth: 0.056,        behind: ["head", "face", "beard"] }
];

const MIN_CLEARANCE = 0.012;

function surfZ(s, x, y) {
  const dx = x / (s.r * s.sx), dy = (y - s.cy) / (s.r * s.sy);
  const rem = 1 - dx * dx - dy * dy;
  return rem <= 0 ? null : s.cz + s.r * s.sz * Math.sqrt(rem);
}

let fails = 0;
for (const f of FEATURES) {
  let behind = -9;
  for (const k of f.behind) {
    const v = surfZ(OCC[k], f.x, f.y);
    if (v !== null && v > behind) behind = v;
  }
  const clear = (f.z + f.depth) - behind;
  const ok = clear > MIN_CLEARANCE;
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${f.name.padEnd(12)} clearance ${clear >= 0 ? "+" : ""}${clear.toFixed(3)}`);
}

/* The far eye must also stay clear of the nose once the head yaws to
   watch the build — that is the angle the old layout failed at. */
const YAW = 0.85 * 0.3;
const rot = (x, z) => -Math.sin(YAW) * x + Math.cos(YAW) * z;
const farEye = rot(-0.115, 0.246 + 0.062 * 0.62);
const nearEye = rot(0.115, 0.246 + 0.062 * 0.62);
const bothVisible = farEye > 0.1 && nearEye > 0.1;
console.log(`${bothVisible ? "PASS" : "FAIL"}  both eyes forward at ${(YAW * 57.3).toFixed(0)} degree yaw  far=${farEye.toFixed(3)} near=${nearEye.toFixed(3)}`);
if (!bothVisible) fails++;

console.log(fails ? `\n${fails} FAILED` : "\nevery facial feature is visible");
process.exit(fails ? 1 : 0);
