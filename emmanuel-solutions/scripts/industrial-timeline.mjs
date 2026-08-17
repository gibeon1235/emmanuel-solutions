import {
  poseAt, padAt, buildingAt, craneAt, windowAt, backOut,
  TOTAL, BUILDINGS, SITES, WINDOWS, TOP_OUT, LIGHT_T0, LIGHTS_DONE
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
  return craneAt(0).visible === false;
})());
ok("every pad is poured before its building rises", (() => {
  for (let i = 0; i < BUILDINGS; i++) {
    const padDone = onset((t) => padAt(i, t));
    const riseStart = onset((t) => buildingAt(i, t));
    if (!(padDone < riseStart)) return false;
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
  let flat = 0;
  for (let t = 0.5; t < 1.3; t += 0.01) {
    if (Math.abs(buildingAt(0, t + 0.01).h - buildingAt(0, t).h) < 0.004) flat++;
  }
  return flat > 5;
})());

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
ok("crane has stopped slewing before the lights come on",
  Math.abs(craneAt(TOTAL).slew - craneAt(LIGHT_T0).slew) < 1e-9);

// ── the payoff: windows light in sequence, then hold ───
ok("every storey has a window", WINDOWS.length === SITES.reduce((n, s) => n + s.storeys, 0),
  `${WINDOWS.length} windows`);
ok("site is dark at t=0", (() => {
  for (let i = 0; i < WINDOWS.length; i++) if (windowAt(i, 0).on) return false;
  return true;
})());
/* The whole point of the sequence is that it answers completion. A
   window lit while a frame is still going up would undercut it. */
ok("no window lights until every building has topped out", (() => {
  for (let t = 0; t <= TOTAL; t += 0.005) {
    let anyOn = false;
    for (let i = 0; i < WINDOWS.length; i++) if (windowAt(i, t).on) anyOn = true;
    if (!anyOn) continue;
    for (let i = 0; i < BUILDINGS; i++) if (!buildingAt(i, t).topped) return false;
  }
  return true;
})(), `top-out=${TOP_OUT.toFixed(2)}s lights=${LIGHT_T0.toFixed(2)}s`);
ok("windows come on one after another, never together", (() => {
  const onsets = WINDOWS.map((_, i) => {
    for (let t = 0; t <= TOTAL; t += 0.002) if (windowAt(i, t).on) return t;
    return Infinity;
  });
  for (let i = 1; i < onsets.length; i++) if (!(onsets[i] > onsets[i - 1])) return false;
  return Number.isFinite(onsets[onsets.length - 1]);
})());
ok("the sequence runs left to right across the skyline", (() => {
  /* WINDOWS is ordered by building then storey, so the building index
     must never go backwards through the sequence. */
  for (let i = 1; i < WINDOWS.length; i++) {
    if (WINDOWS[i].building < WINDOWS[i - 1].building) return false;
  }
  return true;
})());
ok("and bottom to top within each building", (() => {
  for (let i = 1; i < WINDOWS.length; i++) {
    if (WINDOWS[i].building === WINDOWS[i - 1].building &&
        WINDOWS[i].storey <= WINDOWS[i - 1].storey) return false;
  }
  return true;
})());
ok("no window ever goes dark again", (() => {
  for (let i = 0; i < WINDOWS.length; i++) {
    let prev = -Infinity;
    for (let t = 0; t <= TOTAL; t += 0.005) {
      const l = windowAt(i, t).lit;
      if (l < prev - 1e-9) return false;
      prev = l;
    }
  }
  return true;
})());
ok("every window is lit by the end", (() => {
  for (let i = 0; i < WINDOWS.length; i++) if (windowAt(i, TOTAL).lit < 0.999) return false;
  return true;
})(), `sequence ends at ${LIGHTS_DONE.toFixed(2)}s`);
/* Hold at the end, so the loop does not restart the instant the last
   window lands. */
ok("holds once the last window is lit", LIGHTS_DONE < TOTAL - 0.15,
  `hold=${(TOTAL - LIGHTS_DONE).toFixed(2)}s`);
ok("card border lights as the payoff begins",
  poseAt(LIGHT_T0 - 0.01).powered === false && poseAt(LIGHT_T0).powered === true);
ok("lit fraction climbs from nothing to everything",
  poseAt(0).litFraction === 0 && Math.abs(poseAt(TOTAL).litFraction - 1) < 1e-9);
ok("overshoot actually overshoots", (() => {
  for (let q = 0.5; q < 1; q += 0.01) if (backOut(q) > 1.001) return true;
  return false;
})());

// ── loop hygiene and safety ────────────────────────────
ok("pose at t=0 is a complete rest state", (() => {
  const p = poseAt(0);
  return p.crane.visible === false && p.glow === 0 &&
         p.litFraction === 0 && p.powered === false;
})());
ok("no NaN anywhere across the cycle", (() => {
  for (let t = 0; t <= TOTAL; t += 0.002) {
    const p = poseAt(t);
    const vals = [p.glow, p.litFraction, p.crane.e, p.crane.slew, p.crane.hook];
    for (const v of vals) if (!Number.isFinite(v)) return false;
    for (let i = 0; i < BUILDINGS; i++) {
      const b = buildingAt(i, t), q = padAt(i, t);
      if (!Number.isFinite(b.h) || !Number.isFinite(q.e)) return false;
    }
    for (let i = 0; i < WINDOWS.length; i++) {
      if (!Number.isFinite(windowAt(i, t).lit)) return false;
    }
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall industrial timeline assertions passed");
process.exit(fails ? 1 : 0);
