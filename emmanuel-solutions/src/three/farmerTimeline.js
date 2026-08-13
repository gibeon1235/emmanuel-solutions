/* Sustainable technology — choreography as pure maths.

   A farmer walks in from the left, turns, and watches a solar-powered
   cold store assemble itself piece by piece. The sun rises, the panel
   tilts to follow it, energy runs down the cable, the store chills,
   and he nods his approval.

   No Three.js here on purpose: the timing is unit tested without a GPU,
   and the same beats can drive the other three services later. */

export const TOTAL = 4.9;
export const HOME  = -1.95;
export const START = -4.2;
export const BASE_Y = -0.4;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease    = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smooth  = (p) => p * p * (3 - 2 * p);
const mix     = (a, b, p) => a + (b - a) * p;

/* Overshoot used by every part as it snaps into place. */
export function backOut(p) {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

/* The installation, as data. Each part flies in from an offset and
   settles at its target. Ordered so the structure builds bottom-up. */
export const PARTS = [
  { id: "pad",       t0: 0.55, dur: 0.30, from: [0, 3.2, 0] },
  { id: "storeBody", t0: 0.78, dur: 0.32, from: [0, 3.4, 0] },
  { id: "storeTop",  t0: 1.00, dur: 0.28, from: [0, 3.2, 0] },
  { id: "storeDoor", t0: 1.18, dur: 0.28, from: [0, 0, 2.6] },
  { id: "led",       t0: 1.42, dur: 0.22, from: [0, 0, 1.4] },
  { id: "rigBase",   t0: 1.00, dur: 0.28, from: [0, 3.0, 0] },
  { id: "pole",      t0: 1.20, dur: 0.30, from: [0, 3.2, 0] },
  { id: "panel",     t0: 1.42, dur: 0.34, from: [2.4, 0.7, 0] },
  { id: "cell0",     t0: 1.70, dur: 0.24, from: [0, 0, 1.2] },
  { id: "cell1",     t0: 1.755, dur: 0.24, from: [0, 0, 1.2] },
  { id: "cell2",     t0: 1.81, dur: 0.24, from: [0, 0, 1.2] },
  { id: "cell3",     t0: 1.865, dur: 0.24, from: [0, 0, 1.2] },
  { id: "cell4",     t0: 1.92, dur: 0.24, from: [0, 0, 1.2] },
  { id: "cell5",     t0: 1.975, dur: 0.24, from: [0, 0, 1.2] }
];

/* How far a part has travelled, 0 at rest offset, 1 at final position. */
export function partAt(part, t) {
  const p = clamp01((t - part.t0) / part.dur);
  return { visible: p > 0.001, p, e: p >= 1 ? 1 : backOut(p) };
}

/* Everything the scene needs for one frame. */
export function poseAt(t) {
  const walk  = clamp01(t / 0.7);
  const wp    = walk < 1 ? walk * Math.PI * 9 : 0;
  const sun   = clamp01((t - 2.35) / 0.55);
  const flow  = clamp01((t - 2.95) / 0.55);
  const chill = clamp01((t - 3.45) / 0.40);
  const appr  = clamp01((t - 3.80) / 0.65);
  const thumb = clamp01((appr - 0.35) / 0.4);

  const walking = walk < 1;

  return {
    walking,
    x: mix(START, HOME, smooth(walk)),
    y: BASE_Y,
    bob: walking ? Math.abs(Math.sin(wp)) * 0.07 : 0,
    wp,
    turn: walking ? 0 : mix(0, 0.3, clamp01((t - 0.7) / 0.3)),
    armR: walking
      ? { up: 0.2 + Math.sin(wp) * 0.35, fo: -0.3 }
      : { up: mix(0.85, 0.6, thumb), fo: mix(-1.45, -1.95, thumb) },
    armL: walking
      ? { up: -0.22 + Math.sin(wp) * 0.2, fo: 0.5 }
      : { up: mix(-0.26, -0.5, appr), fo: mix(0.55, 0.8, appr) },
    thumb,
    smile: 0.25 + clamp01((t - 1.0) / 1.2) * 0.25 + appr * 0.45,
    brow: clamp01((t - 1.0) / 1.0) * 0.3 + appr * 0.4,
    nod: appr > 0 ? Math.sin(appr * Math.PI * 2) * 0.11 : 0,
    look: walking ? -0.35 : mix(0.85, 0.15, appr),
    sun, flow, chill, appr,
    sunY: mix(0.55, 1.25, ease(sun)),
    panelTilt: -0.06 - sun * 0.58,
    cable: clamp01((t - 1.95) / 0.3)
  };
}

/* Position of an energy pulse travelling panel to store, 0-1 along the
   cable, or null when that pulse should not be drawn. */
export function pulseAt(index, flow) {
  const p = flow * 1.4 - index * 0.24;
  return p > 0 && p < 1 ? p : null;
}
