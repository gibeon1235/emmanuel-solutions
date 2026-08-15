import {
  poseAt, blockAt, drumAngleAt, fragmentAt, pelletAt, returnAt, recoveryAt,
  backOut, TOTAL, FEED_X, FEED_Y, MOUTH_X, RECOVERY_MAX, FRAGMENTS, PELLETS,
  TURNS, SPIN_SPEED
} from "../src/three/circularTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

ok("cycle is 4.8s", Math.abs(TOTAL - 4.8) < 1e-9);

// ── the feed: waste travels one way, into the drum ──────
ok("block waits at the feed head", Math.abs(blockAt(0).x - FEED_X) < 1e-9,
   `x=${blockAt(0).x.toFixed(2)}`);
ok("block reaches the drum mouth", Math.abs(blockAt(1.05).x - MOUTH_X) < 0.02,
   `x=${blockAt(1.05).x.toFixed(2)}`);
ok("block only ever moves toward the drum", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= 1.05; t += 0.005) {
    const x = blockAt(t).x;
    if (x < prev - 1e-9) return false;
    prev = x;
  }
  return true;
})());
ok("block is swallowed by the drum", blockAt(1.32).scale < 0.001);
ok("block stays gone through the whole reaction", (() => {
  for (let t = 1.35; t <= 3.9; t += 0.02) if (blockAt(t).visible) return false;
  return true;
})());

// ── the drum: rotation is an integral, it cannot run backwards ──
ok("drum is still at rest", drumAngleAt(0) === 0);
ok("drum never rotates backwards", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= TOTAL; t += 0.005) {
    const a = drumAngleAt(t);
    if (a < prev - 1e-12) return false;
    prev = a;
  }
  return true;
})());
ok("drum spins up only once waste is on its way", drumAngleAt(0.9) === 0);
ok("drum has stopped before the cycle ends",
   Math.abs(drumAngleAt(TOTAL) - drumAngleAt(4.2)) < 1e-9);
/* If this fails the drum's paddles visibly snap back on loop restart. */
ok("drum completes whole turns so the loop does not jump", (() => {
  const turns = drumAngleAt(TOTAL) / (Math.PI * 2);
  return Math.abs(turns - TURNS) < 1e-9;
})(), `turns=${(drumAngleAt(TOTAL) / (Math.PI * 2)).toFixed(6)}`);
ok("drum speed is derived, not hand-tuned", Number.isFinite(SPIN_SPEED) && SPIN_SPEED > 0);

// ── ordering: break down, then pour, then recover, then return ──
ok("nothing has broken down at t=0", (() => {
  for (let i = 0; i < FRAGMENTS; i++) if (fragmentAt(i, 0).visible) return false;
  return true;
})());
ok("fragments appear only after the block is inside", (() => {
  for (let t = 0; t <= TOTAL; t += 0.01) {
    for (let i = 0; i < FRAGMENTS; i++) {
      if (fragmentAt(i, t).visible && blockAt(t).scale > 0.35) return false;
    }
  }
  return true;
})());
ok("fragments spiral inward as they break down",
   fragmentAt(0, 2.2).radius < fragmentAt(0, 1.4).radius);
ok("no pellets at t=0", (() => {
  for (let i = 0; i < PELLETS; i++) if (pelletAt(i, 0).visible) return false;
  return true;
})());
ok("pellets pour only after fragments exist", (() => {
  for (let t = 0; t <= TOTAL; t += 0.01) {
    if (pelletAt(0, t).visible) {
      let any = false;
      for (let i = 0; i < FRAGMENTS; i++) if (fragmentAt(i, t).p > 0) any = true;
      if (!any) return false;
    }
  }
  return true;
})());
/* Compare when each pellet starts moving, not their progress at one
   instant — clamping makes a snapshot read as a tie at both ends. */
const onset = (fn, i) => {
  for (let t = 0; t <= TOTAL; t += 0.005) if (fn(i, t).visible) return t;
  return Infinity;
};
ok("pellets arrive in order, staggered", (() => {
  for (let i = 1; i < PELLETS; i++) {
    const a = onset(pelletAt, i - 1), b = onset(pelletAt, i);
    if (!(b > a)) return false;
  }
  return Number.isFinite(onset(pelletAt, PELLETS - 1));
})(), `first=${onset(pelletAt, 0).toFixed(3)}s last=${onset(pelletAt, PELLETS - 1).toFixed(3)}s`);
ok("return flight is staggered too", (() => {
  for (let i = 1; i < PELLETS; i++) {
    if (!(onset(returnAt, i) > onset(returnAt, i - 1))) return false;
  }
  return true;
})());
ok("pellets only ever travel forward down the chute", (() => {
  for (let i = 0; i < PELLETS; i++) {
    let prev = -Infinity;
    for (let t = 0; t <= TOTAL; t += 0.005) {
      const p = pelletAt(i, t).p;
      if (p < prev - 1e-9) return false;
      prev = p;
    }
  }
  return true;
})());
ok("every pellet has landed before the return flight",
   (() => {
     for (let i = 0; i < PELLETS; i++) if (!pelletAt(i, 3.55).landed) return false;
     return true;
   })());

// ── the gauge: climbs to exactly 90%, never dips ────────
ok("gauge reads zero at rest", recoveryAt(0) === 0);
ok("gauge only climbs", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= TOTAL; t += 0.005) {
    const r = recoveryAt(t);
    if (r < prev - 1e-12) return false;
    prev = r;
  }
  return true;
})());
ok("gauge climbs only once pellets are being recovered", recoveryAt(2.1) === 0);
ok("gauge settles at 90%, not 100%", Math.abs(recoveryAt(TOTAL) - 0.9) < 1e-9,
   `recovery=${(recoveryAt(TOTAL) * 100).toFixed(1)}%`);
ok("gauge never exceeds the real figure", (() => {
  for (let t = 0; t <= TOTAL; t += 0.005) if (recoveryAt(t) > RECOVERY_MAX + 1e-12) return false;
  return true;
})());
ok("card border lights once recovery is under way",
   poseAt(1.0).powered === false && poseAt(4.0).powered === true);

// ── the return: the loop actually closes ────────────────
ok("no return flight at t=0", (() => {
  for (let i = 0; i < PELLETS; i++) if (returnAt(i, 0).visible) return false;
  return true;
})());
ok("return flight starts only after the gauge is nearly full",
   recoveryAt(3.55) > RECOVERY_MAX * 0.75,
   `recovery=${(recoveryAt(3.55) * 100).toFixed(1)}%`);
ok("returning pellets only fly homeward", (() => {
  for (let i = 0; i < PELLETS; i++) {
    let prev = -Infinity;
    for (let t = 0; t <= TOTAL; t += 0.005) {
      const p = returnAt(i, t).p;
      if (p < prev - 1e-9) return false;
      prev = p;
    }
  }
  return true;
})());
ok("block reassembles only after pellets have flown home",
   blockAt(3.9).scale === 0 && blockAt(4.5).scale > 0.99);
ok("reassembled block lands back at the feed head",
   Math.abs(blockAt(TOTAL).x - FEED_X) < 1e-9 && Math.abs(blockAt(TOTAL).y - FEED_Y) < 1e-9);
ok("overshoot actually overshoots", (() => {
  for (let q = 0.5; q < 1; q += 0.01) if (backOut(q) > 1.001) return true;
  return false;
})());

// ── loop hygiene: the end of the cycle IS the start ─────
ok("pose at t=0 matches a fresh start", (() => {
  const a = poseAt(0);
  return a.drum === 0 && a.recovery === 0 && a.heat === 0 && a.spin === 0 &&
         a.loop === 0 && a.powered === false;
})());
/* Unlike the farmer, this cycle is a genuine loop: the last frame must
   line up with the first or the restart is visible. */
ok("block state at TOTAL matches t=0", (() => {
  const a = blockAt(0), b = blockAt(TOTAL);
  return Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9 &&
         Math.abs(a.scale - b.scale) < 1e-9 && a.visible === b.visible;
})());
ok("nothing is mid-flight when the cycle ends", (() => {
  for (let i = 0; i < PELLETS; i++) if (returnAt(i, TOTAL).visible) return false;
  for (let i = 0; i < FRAGMENTS; i++) if (fragmentAt(i, TOTAL).visible) return false;
  return true;
})());

// ── safety ──────────────────────────────────────────────
ok("no NaN anywhere across the cycle", (() => {
  for (let t = 0; t <= TOTAL; t += 0.002) {
    const p = poseAt(t);
    const vals = [p.drum, p.spin, p.heat, p.recovery, p.gauge, p.loop,
                  p.block.x, p.block.y, p.block.scale];
    for (const v of vals) if (!Number.isFinite(v)) return false;
    for (let i = 0; i < FRAGMENTS; i++) {
      const f = fragmentAt(i, t);
      if (!Number.isFinite(f.p) || !Number.isFinite(f.radius) ||
          !Number.isFinite(f.angle) || !Number.isFinite(f.scale)) return false;
    }
    for (let i = 0; i < PELLETS; i++) {
      const q = pelletAt(i, t), r = returnAt(i, t);
      if (!Number.isFinite(q.p) || !Number.isFinite(q.raw) || !Number.isFinite(r.p)) return false;
    }
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall circular timeline assertions passed");
process.exit(fails ? 1 : 0);
