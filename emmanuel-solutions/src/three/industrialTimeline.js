/* Industrial marketing — choreography as pure maths.

   A timelapse: four foundations are poured, four structures rise from
   them at staggered times while a crane slews across the site, windows
   come on as each tops out, and then a large approval stamp swings in
   from the right and slams down — squash on contact, a dust ring, and it
   settles at a slight angle.

   The stamp is the payoff, so it is the only thing here that moves
   fast. Everything before it is patient; the contrast is what gives the
   slam its weight.

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
const WINDOW_DUR = 0.30;
const CRANE_T0 = 0.30, CRANE_DUR = 0.55;
const SLEW_T0 = 0.60, SLEW_DUR = 2.30;

/* The last structure tops out here; the stamp answers it. */
export const TOP_OUT = RISE[BUILDINGS - 1].t0 + RISE[BUILDINGS - 1].dur;  // 2.80

export const STAMP_T0 = 3.05, STAMP_DUR = 0.57;
export const CONTACT = STAMP_T0 + STAMP_DUR;                              // 3.62
const SQUASH_DUR = 0.30, SETTLE_DUR = 0.42, DUST_DUR = 0.52;

/* Where the stamp comes from and where it lands. */
const STAMP_FROM_X = 3.55, STAMP_FROM_Y = 1.85, STAMP_FROM_ROT = -0.85;
export const STAMP_X = 0.10, STAMP_Y = 0.30;
export const STAMP_REST_ROT = -0.14;

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
  return {
    visible: p > 0.001,
    p,
    h,
    topped: done,
    /* Windows come on only once the frame is finished. */
    lit: clamp01((t - (r.t0 + r.dur)) / WINDOW_DUR)
  };
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

/* The stamp. Accelerating approach — p^2.2 rather than a symmetric ease
   — so it is still gaining speed at the moment of contact instead of
   gliding politely into place. */
export function stampAt(t) {
  const raw = clamp01((t - STAMP_T0) / STAMP_DUR);
  const p = Math.pow(raw, 2.2);

  /* Impact decay, 1 at the instant of contact falling to 0. */
  const tau = clamp01((t - CONTACT) / SQUASH_DUR);
  const bump = t >= CONTACT && tau < 1 ? (1 - tau) * (1 - tau) : 0;

  /* A short recoil after the hit, so it does not simply stick. */
  const sTau = clamp01((t - CONTACT) / SETTLE_DUR);
  const recoil = t >= CONTACT && sTau < 1 ? Math.sin(sTau * Math.PI) * (1 - sTau) : 0;

  return {
    visible: raw > 0.001,
    approach: raw,
    landed: t >= CONTACT,
    x: mix(STAMP_FROM_X, STAMP_X, p),
    y: mix(STAMP_FROM_Y, STAMP_Y, p) + recoil * 0.08,
    rot: mix(STAMP_FROM_ROT, STAMP_REST_ROT, p) + bump * 0.1,
    /* Volume-preserving squash: flattens on the y it hit along, spreads
       on the other two. */
    squashY: 1 - 0.34 * bump,
    squashXZ: 1 + 0.26 * bump,
    bump
  };
}

/* The dust ring thrown out by the slam. */
export function dustAt(t) {
  const p = clamp01((t - CONTACT) / DUST_DUR);
  return { visible: p > 0.001 && p < 0.999, p };
}

/* Everything the scene needs for one frame. */
export function poseAt(t) {
  const stamp = stampAt(t);
  return {
    crane: craneAt(t),
    stamp,
    dust: dustAt(t),
    /* Site floodlights warm up as the last structure tops out. */
    glow: clamp01((t - TOP_OUT) / 0.5),
    /* The rail lights the card border the moment the stamp lands. */
    powered: stamp.landed
  };
}
