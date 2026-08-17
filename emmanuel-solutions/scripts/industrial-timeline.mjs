import {
  poseAt, padAt, buildingAt, craneAt, stampAt, dustAt, backOut,
  TOTAL, BUILDINGS, SITES, TOP_OUT, STAMP_T0, CONTACT, STAMP_X, STAMP_REST_ROT
} from "../src/three/industrialTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

ok("cycle is 4.8s", Math.abs(TOTAL - 4.8) < 1e-9);
ok("four sites on the plot", SITES.length === BUILDINGS);

const onset = (fn) => {
  for (let t = 0; t <= TOTAL; t += 0.005) if (fn(t).visible) return t;
  return Infinity;
};

// ── nothing stands on ground that has not been poured ──
ok("site is empty at t=0", (() => {
  for (let i = 0; i < BUILDINGS; i++) {
    if (padAt(i, 0).visible || buildingAt(i, 0).visible) return false;
  }
  return craneAt(0).visible === false && stampAt(0).visible === false;
})());
ok("every pad is poured before its building rises", (() => {
  for (let i = 0; i < BUILDINGS; i++) {
    const padDone = onset((t) => padAt(i, t)) ;
    const riseStart = onset((t) => buildingAt(i, t));
    if (!(padDone < riseStart)) return false;
    /* and the pad has fully landed, not merely started */
    if (padAt(i, riseStart).e < 0.999) return false;
  }
  return true;
})());
ok("buildings rise in staggered order", (() => {
  for (let i = 1; i < BUILDINGS; i++) {
    if (!(onset((t) => buildingAt(i, t)) > onset((t) => buildingAt(i - 1, t)))) return false;
  }
  return true;
})(), `first=${onset((t) => buildingAt(0, t)).toFixed(2)}s last=${onset((t) => buildingAt(3, t)).toFixed(2)}s`);
/* A building that dips mid-rise is exactly what a monotonicity check
   catches and nothing else does — the stepped timelapse growth makes it
   easy to get wrong. */
ok("no building ever shrinks", (() => {
  for (let i = 0; i < BUILDINGS; i++) {
    let prev = -Infinity;
    for (let t = 0; t <= TOTAL; t += 0.005) {
      const h = buildingAt(i, t).h;
      if (h < prev - 1e-9) return false;
      prev = h;
    }
  }
  return true;
})());
ok("every building reaches full height", (() => {
  for (let i = 0; i < BUILDINGS; i++) if (Math.abs(buildingAt(i, TOTAL).h - 1) > 1e-9) return false;
  return true;
})());
ok("growth is stepped, not a smooth inflate", (() => {
  /* Consecutive samples through the rise must include at least one flat
     run — the storey plateaus. */
  let flat = 0;
  for (let t = 0.5; t < 1.3; t += 0.01) {
    if (Math.abs(buildingAt(0, t + 0.01).h - buildingAt(0, t).h) < 0.004) flat++;
  }
  return flat > 5;
})());
ok("windows light only after a building tops out", (() => {
  for (let t = 0; t <= TOTAL; t += 0.005) {
    for (let i = 0; i < BUILDINGS; i++) {
      const b = buildingAt(i, t);
      if (b.lit > 0 && !b.topped) return false;
    }
  }
  return true;
})());
ok("all four are topped out before the stamp arrives", (() => {
  for (let i = 0; i < BUILDINGS; i++) if (!buildingAt(i, STAMP_T0).topped) return false;
  return true;
})(), `top-out=${TOP_OUT.toFixed(2)}s stamp=${STAMP_T0}s`);

// ── the crane works the site, then holds ───────────────
ok("crane stands up before the first building rises",
  onset(craneAt) < onset((t) => buildingAt(0, t)));
ok("crane only ever slews one way", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= TOTAL; t += 0.005) {
    const s = craneAt(t).slew;
    if (s < prev - 1e-9) return false;
    prev = s;
  }
  return true;
})());
ok("crane has stopped slewing by the time the stamp lands",
  Math.abs(craneAt(TOTAL).slew - craneAt(CONTACT).slew) < 1e-9);

// ── the stamp is the payoff ────────────────────────────
ok("stamp waits until the site is built", onset(stampAt) >= STAMP_T0 - 1e-9,
  `enters at ${onset(stampAt).toFixed(2)}s`);
ok("stamp only ever travels leftward", (() => {
  let prev = Infinity;
  for (let t = 0; t <= TOTAL; t += 0.005) {
    const s = stampAt(t);
    if (!s.visible) continue;
    if (s.x > prev + 1e-9) return false;
    prev = s.x;
  }
  return true;
})());
/* Accelerating, not gliding: the second half of the approach must cover
   more ground than the first, or the slam has no weight. */
ok("stamp is still accelerating at contact", (() => {
  const first = stampAt(STAMP_T0 + 0.285).x - stampAt(STAMP_T0).x;
  const second = stampAt(CONTACT).x - stampAt(STAMP_T0 + 0.285).x;
  return Math.abs(second) > Math.abs(first) * 1.5;
})(), `first half=${(stampAt(STAMP_T0 + 0.285).x - stampAt(STAMP_T0).x).toFixed(2)} second=${(stampAt(CONTACT).x - stampAt(STAMP_T0 + 0.285).x).toFixed(2)}`);
ok("no squash before contact", (() => {
  for (let t = 0; t < CONTACT - 1e-6; t += 0.005) {
    if (Math.abs(stampAt(t).squashY - 1) > 1e-9) return false;
  }
  return true;
})());
ok("squashes hardest at the moment of contact", (() => {
  const at = stampAt(CONTACT).squashY;
  return at < 0.7 && stampAt(CONTACT + 0.2).squashY > at;
})(), `squashY=${stampAt(CONTACT).squashY.toFixed(3)}`);
ok("squash preserves volume, spreading as it flattens",
  stampAt(CONTACT).squashXZ > 1.2 && stampAt(CONTACT).squashY < 0.8);
ok("no dust before contact", dustAt(CONTACT - 0.01).visible === false);
ok("dust ring expands after contact", dustAt(CONTACT + 0.2).p > dustAt(CONTACT + 0.05).p);
ok("dust has cleared by the end", dustAt(TOTAL).visible === false);
ok("stamp settles at a slight angle, not square", (() => {
  const r = stampAt(TOTAL).rot;
  return Math.abs(r - STAMP_REST_ROT) < 1e-9 && Math.abs(r) > 0.05 && Math.abs(r) < 0.4;
})(), `rot=${stampAt(TOTAL).rot.toFixed(3)}`);
ok("stamp comes to rest and stays there", (() => {
  const a = stampAt(4.5), b = stampAt(TOTAL);
  return Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9 &&
         Math.abs(b.x - STAMP_X) < 1e-9;
})());
ok("card border lights the moment the stamp lands",
  poseAt(CONTACT - 0.01).powered === false && poseAt(CONTACT).powered === true);
ok("overshoot actually overshoots", (() => {
  for (let q = 0.5; q < 1; q += 0.01) if (backOut(q) > 1.001) return true;
  return false;
})());

// ── loop hygiene and safety ────────────────────────────
ok("pose at t=0 is a complete rest state", (() => {
  const p = poseAt(0);
  return p.stamp.visible === false && p.dust.visible === false &&
         p.crane.visible === false && p.glow === 0 && p.powered === false;
})());
ok("no NaN anywhere across the cycle", (() => {
  for (let t = 0; t <= TOTAL; t += 0.002) {
    const p = poseAt(t);
    const vals = [p.glow, p.crane.e, p.crane.slew, p.crane.hook,
                  p.stamp.x, p.stamp.y, p.stamp.rot, p.stamp.squashY,
                  p.stamp.squashXZ, p.stamp.bump, p.dust.p];
    for (const v of vals) if (!Number.isFinite(v)) return false;
    for (let i = 0; i < BUILDINGS; i++) {
      const b = buildingAt(i, t), q = padAt(i, t);
      if (!Number.isFinite(b.h) || !Number.isFinite(b.lit) || !Number.isFinite(q.e)) return false;
    }
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall industrial timeline assertions passed");
process.exit(fails ? 1 : 0);
