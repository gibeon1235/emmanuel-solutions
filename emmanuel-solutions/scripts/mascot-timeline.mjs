import { poseAt, pipeAt, DUR, T_LIFT_END, T_SPINACH_END, T_WALK_END, T_TOTAL, WALK_DISTANCE, ARM_UP }
  from "../src/three/sailorTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

// Phases occur in the intended order.
ok("phase at 0.1s is rise",      poseAt(0.1).phase === "rise");
ok("phase at 0.7s is lift",      poseAt(0.7).phase === "lift");
ok("phase at 1.3s is spinach",   poseAt(1.3).phase === "spinach");
ok("phase at 2.0s is walk",      poseAt(2.0).phase === "walk");
ok("phase at 2.8s is hold",      poseAt(2.8).phase === "hold");

// Rise: starts below the card, arrives at standing height.
ok("starts below the card",      poseAt(0).y < -2.3, `y=${poseAt(0).y.toFixed(2)}`);
ok("rises monotonically", (() => {
  let prev = -Infinity;
  for (let t = 0; t < DUR.rise; t += 0.01) { const y = poseAt(t).y; if (y < prev - 1e-9) return false; prev = y; }
  return true;
})());

// Lift: ramps 0 -> 1 monotonically, arm reaches overhead.
ok("lift reaches 1 by end of lift", Math.abs(poseAt(T_LIFT_END - 0.001).lift - 1) < 0.02);
ok("lift is monotonic during lift", (() => {
  let prev = -Infinity;
  for (let t = DUR.rise; t < T_LIFT_END; t += 0.005) { const l = poseAt(t).lift; if (l < prev - 1e-9) return false; prev = l; }
  return true;
})());
ok("arm ends overhead", Math.abs(poseAt(T_LIFT_END - 0.001).armR - ARM_UP) < 0.02);
ok("no lift before the character has risen", poseAt(DUR.rise * 0.5).lift === 0);

// Spinach: free arm goes up and comes back down (a curl, not a hold).
const spinachPeak = poseAt(T_LIFT_END + DUR.spinach / 2).armL;
ok("spinach arm curls up",   spinachPeak > 1.5, `armL=${spinachPeak.toFixed(2)}`);
ok("spinach arm returns",    poseAt(T_SPINACH_END - 0.001).armL < 0.1);
ok("box stays lifted through spinach", poseAt(T_LIFT_END + 0.25).lift === 1);

// Walk: travels left the full distance, box stays up, legs actually cycle.
ok("walk starts at x=0",          Math.abs(poseAt(T_SPINACH_END).x) < 0.01);
ok("walk ends off-frame left",    poseAt(T_WALK_END - 0.001).x < WALK_DISTANCE + 0.1,
   `x=${poseAt(T_WALK_END - 0.001).x.toFixed(2)}`);
ok("walk only moves left", (() => {
  let prev = Infinity;
  for (let t = T_SPINACH_END; t < T_WALK_END; t += 0.005) { const x = poseAt(t).x; if (x > prev + 1e-9) return false; prev = x; }
  return true;
})());
ok("legs cycle more than once", poseAt(T_WALK_END - 0.001).walkPhase > Math.PI * 4);
ok("box held up for whole walk", (() => {
  for (let t = T_SPINACH_END; t < T_WALK_END; t += 0.01) if (poseAt(t).lift !== 1) return false;
  return true;
})());

// Pipe toss.
ok("pipe hidden before the walk", !pipeAt(T_LIFT_END).visible);
ok("pipe appears during walk",     pipeAt(T_SPINACH_END + 0.3).visible);
ok("pipe falls downward",          pipeAt(T_SPINACH_END + 0.5).y < pipeAt(T_SPINACH_END + 0.2).y);
ok("pipe gone by end of cycle",   !pipeAt(T_TOTAL - 0.01).visible);

// Loop hygiene: nothing jumps at the moment of restart, and the card
// is released back to rest at t=0 rather than staying lifted.
ok("cycle is ~2.95s",  Math.abs(T_TOTAL - 2.95) < 0.001, `T_TOTAL=${T_TOTAL}`);
ok("pose at t=0 is fully at rest", poseAt(0).lift === 0 && Math.abs(poseAt(0).x) < 1e-9);

// No NaN anywhere across the whole cycle — a single NaN would blank the mesh.
ok("no NaN across the cycle", (() => {
  for (let t = 0; t <= T_TOTAL; t += 0.002) {
    const p = poseAt(t);
    for (const k of ["x","y","bob","lift","armR","armL","walkPhase"]) if (!Number.isFinite(p[k])) return false;
    const q = pipeAt(t);
    if (!Number.isFinite(q.y) || !Number.isFinite(q.rot)) return false;
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall timeline assertions passed");
process.exit(fails ? 1 : 0);
