import {
  poseAt, panelAt, aimAt, backOut, TOTAL, PANELS, LAST_LOCK
} from "../src/three/innovationTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

ok("cycle is 4.7s", Math.abs(TOTAL - 4.7) < 1e-9);

/* Compare when each panel starts moving, not progress at one instant —
   clamping makes a snapshot read as a tie at both ends. */
const onset = (i) => {
  for (let t = 0; t <= TOTAL; t += 0.005) if (panelAt(i, t).visible) return t;
  return Infinity;
};

// ── the board fills one panel at a time ────────────────
ok("board is empty at t=0", (() => {
  for (let i = 0; i < PANELS; i++) if (panelAt(i, 0).visible) return false;
  return true;
})());
ok("panels appear in order, staggered", (() => {
  for (let i = 1; i < PANELS; i++) if (!(onset(i) > onset(i - 1))) return false;
  return Number.isFinite(onset(PANELS - 1));
})(), `first=${onset(0).toFixed(3)}s last=${onset(PANELS - 1).toFixed(3)}s`);
/* One at a time is the brief: if the next arrived while the previous was
   still travelling they would read as a batch. */
ok("each panel locks before the next appears", (() => {
  for (let i = 1; i < PANELS; i++) {
    const prevLock = panelAt(i - 1, 0).t0 + 0.42;
    if (onset(i) < prevLock - 1e-9) return false;
  }
  return true;
})());
ok("every panel travels forward only", (() => {
  for (let i = 0; i < PANELS; i++) {
    let prev = -Infinity;
    for (let t = 0; t <= TOTAL; t += 0.005) {
      const p = panelAt(i, t).p;
      if (p < prev - 1e-9) return false;
      prev = p;
    }
  }
  return true;
})());
ok("every panel settles exactly on target", (() => {
  for (let i = 0; i < PANELS; i++) if (panelAt(i, TOTAL).e !== 1) return false;
  return true;
})());
ok("overshoot actually overshoots", (() => {
  for (let q = 0.5; q < 1; q += 0.01) if (backOut(q) > 1.001) return true;
  return false;
})());

// ── lighting means locked, not arriving ────────────────
ok("no panel lights before it has landed", (() => {
  for (let t = 0; t <= TOTAL; t += 0.005) {
    for (let i = 0; i < PANELS; i++) {
      const a = panelAt(i, t);
      if (a.lit > 0 && a.p < 1) return false;
    }
  }
  return true;
})());
ok("panels light in the order they arrive", (() => {
  for (let i = 1; i < PANELS; i++) {
    if (!(panelAt(i - 1, 3.0).lit >= panelAt(i, 3.0).lit)) return false;
  }
  return true;
})());
ok("all four are lit by the end", (() => {
  for (let i = 0; i < PANELS; i++) if (panelAt(i, TOTAL).lit < 0.999) return false;
  return true;
})());

// ── the presenter ──────────────────────────────────────
ok("arm is down at rest", poseAt(0).point === 0);
ok("points before the first panel appears", poseAt(0.9).point > 0.85,
  `point=${poseAt(0.9).point.toFixed(3)}`);
ok("keeps pointing through the sequence", (() => {
  for (let t = 0.9; t <= LAST_LOCK; t += 0.01) if (poseAt(t).point < 0.8) return false;
  return true;
})());
ok("lowers the arm at the end", poseAt(TOTAL).point < 0.2,
  `point=${poseAt(TOTAL).point.toFixed(3)}`);
ok("aim tracks the panel being shown", (() => {
  const a0 = aimAt(1.0), a3 = aimAt(3.3);
  return a0 < 0.6 && a3 > 2.4;
})(), `aim@1.0=${aimAt(1.0).toFixed(2)} aim@3.3=${aimAt(3.3).toFixed(2)}`);
ok("aim never runs backwards", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= TOTAL; t += 0.005) {
    const a = aimAt(t);
    if (a < prev - 1e-9) return false;
    prev = a;
  }
  return true;
})());
ok("no nod before the fourth panel locks", poseAt(LAST_LOCK - 0.01).nod === 0);
ok("nods once the fourth locks", (() => {
  let peak = 0;
  for (let t = LAST_LOCK; t <= TOTAL; t += 0.005) peak = Math.max(peak, Math.abs(poseAt(t).nod));
  return peak > 0.1;
})());
ok("smile grows across the cycle", poseAt(TOTAL).smile > poseAt(0.2).smile);
ok("watches the board, then looks back out",
  poseAt(1.5).look > 0.5 && poseAt(TOTAL).look < 0.4);
ok("card border lights only once the model is complete",
  poseAt(LAST_LOCK - 0.01).powered === false && poseAt(TOTAL).powered === true);

// ── loop hygiene and safety ────────────────────────────
ok("pose at t=0 is a complete rest state", (() => {
  const a = poseAt(0);
  return a.point === 0 && a.nod === 0 && a.locked === false && a.powered === false;
})());
ok("no NaN anywhere across the cycle", (() => {
  for (let t = 0; t <= TOTAL; t += 0.002) {
    const p = poseAt(t);
    const vals = [p.point, p.aim, p.nod, p.smile, p.brow, p.look,
                  p.armPoint.up, p.armPoint.fo, p.armMarker.up, p.armMarker.fo];
    for (const v of vals) if (!Number.isFinite(v)) return false;
    for (let i = 0; i < PANELS; i++) {
      const a = panelAt(i, t);
      if (!Number.isFinite(a.p) || !Number.isFinite(a.e) || !Number.isFinite(a.lit)) return false;
    }
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall innovation timeline assertions passed");
process.exit(fails ? 1 : 0);
