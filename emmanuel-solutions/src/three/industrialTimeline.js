/* Industrial marketing — choreography as pure maths.

   A timelapse: four foundations are poured and four structures rise from
   them at staggered times while a crane slews across the site. Once the
   last one tops out, the windows come on in sequence across the whole
   skyline — left to right, bottom to top — and it holds there.

   The lighting sequence is the payoff. It reads as occupancy: the site
   is not just built, it is in use.

   No Three.js here on purpose — the timing is unit tested without a GPU.
   Geometry lives in industrialScene.js. */

export const TOTAL = 4.8;

export const BUILDINGS = 4;

/* Site layout. x positions and full heights are shared with the scene so
   the timing test can reason about the same numbers the geometry uses. */
export const SITES = [
  { x: -1.88, w: 0.62, h: 1.05, storeys: 4 },
  { x: -0.72, w: 0.80, h: 1.58, storeys: 6 },
  { x:  0.46, w: 0.66, h: 1.24, storeys: 5 },
  { x:  1.62, w: 0.74, h: 1.88, storeys: 7 }
];

export const GROUND_Y = -1.00;
export const CRANE_X = 2.45;

/* ── beats ────────────────────────────────────────────── */
const PAD_T0 = 0.15, PAD_DUR = 0.25, PAD_STAGGER = 0.35;
const RISE = [
  { t0: 0.45, dur: 0.90 },
  { t0: 0.80, dur: 1.05 },
  { t0: 1.25, dur: 1.10 },
  { t0: 1.70, dur: 1.10 }
];
const CRANE_T0 = 0.30, CRANE_DUR = 0.55;
const SLEW_T0 = 0.60, SLEW_DUR = 2.30;

/* The last structure tops out here; the lighting sequence answers it. */
export const TOP_OUT = RISE[BUILDINGS - 1].t0 + RISE[BUILDINGS - 1].dur;  // 2.80

/* Every window on the site, in the order it comes on: left to right by
   building, bottom to top within each. Precomputed so both the timeline
   and the geometry agree on which window is which. */
export const WINDOWS = [];
for (let b = 0; b < BUILDINGS; b++) {
  for (let k = 0; k < SITES[b].storeys; k++) WINDOWS.push({ building: b, storey: k });
}

export const LIGHT_T0 = TOP_OUT + 0.15;      // 2.95
const LIGHT_STAGGER = 0.062, LIGHT_DUR = 0.28;
/* Last window finishes here; what remains of the cycle is the hold. */
export const LIGHTS_DONE = LIGHT_T0 + (WINDOWS.length - 1) * LIGHT_STAGGER + LIGHT_DUR;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth  = (p) => p * p * (3 - 2 * p);
const mix     = (a, b, p) => a + (b - a) * p;

export function backOut(p) {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

/* A foundation pad, poured before anything stands on it. */
export function padAt(i, t) {
  const p = clamp01((t - (PAD_T0 + i * PAD_STAGGER)) / PAD_DUR);
  return { visible: p > 0.001, p, e: p >= 1 ? 1 : backOut(p) };
}

/* A structure rising. Height is half smooth growth and half discrete
   storeys, which reads as a timelapse rather than an inflating balloon.
   Both halves are non-decreasing, so the total can never dip — asserted
   in the timing test, because a building that shrinks mid-rise is the
   kind of thing only a monotonicity check catches. */
export function buildingAt(i, t) {
  const r = RISE[i];
  const p = clamp01((t - r.t0) / r.dur);
  const stepped = Math.floor(p * SITES[i].storeys) / SITES[i].storeys;
  const h = 0.5 * smooth(p) + 0.5 * stepped;
  const done = t >= r.t0 + r.dur;
  return { visible: p > 0.001, p, h, topped: done };
}

/* One window's light, by its index in WINDOWS. Nothing comes on until
   every structure is finished — a lit window in a half-built frame would
   undercut the whole sequence. */
export function windowAt(index, t) {
  const p = clamp01((t - (LIGHT_T0 + index * LIGHT_STAGGER)) / LIGHT_DUR);
  return { lit: p, on: p > 0.001 };
}

/* The crane: stands up early, slews across the site while the buildings
   go up, then holds. Slew is monotonic — it sweeps one way. */
export function craneAt(t) {
  const e = clamp01((t - CRANE_T0) / CRANE_DUR);
  const s = clamp01((t - SLEW_T0) / SLEW_DUR);
  return {
    visible: e > 0.001,
    e: e >= 1 ? 1 : backOut(e),
    slew: mix(-0.38, 0.55, smooth(s)),
    /* Hook rides up and down on its own cycle while the crane works. */
    hook: 0.5 + Math.sin(t * 2.1) * 0.5 * (s > 0 && s < 1 ? 1 : 0)
  };
}

/* Everything the scene needs for one frame. */
export function poseAt(t) {
  let litSum = 0;
  for (let i = 0; i < WINDOWS.length; i++) litSum += windowAt(i, t).lit;
  const litFraction = litSum / WINDOWS.length;

  return {
    crane: craneAt(t),
    /* How far through the lighting sequence the site is, 0 to 1. */
    litFraction,
    /* Site floodlights warm up as the last structure tops out. */
    glow: clamp01((t - TOP_OUT) / 0.5),
    /* The rail lights the card border as the payoff begins. */
    powered: t >= LIGHT_T0
  };
}
