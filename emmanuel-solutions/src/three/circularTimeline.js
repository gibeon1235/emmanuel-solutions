/* Circular economy — choreography as pure maths.

   Polyurethane foam waste rides a feed chute into a reactor drum, is
   broken into fragments, and pours out the far side as clean polyol
   pellets. A recovery gauge climbs to 90% — the real Thaal figure from
   the case study. Then the pellets fly back along a return arc and
   reassemble into the block they came from, so the loop is not a claim
   in the copy, it is the mechanic you watch.

   No characters, by design: the process is the subject.

   No Three.js here on purpose — the timing is unit tested without a GPU.
   Geometry lives in circularScene.js.

   Loop hygiene note: this cycle is genuinely circular, so t=0 is not an
   empty stage the way the farmer's is. Rest is "block waiting at the
   feed head, drum still, gauge at zero", and the end of the cycle must
   land back on exactly that — see LOOP CLOSURE below. */

export const TOTAL = 4.8;

/* Where things live on the x axis.

   These were originally spread much wider, with the feed belt running
   from (-2.30, 0.52) down to the drum on a steep diagonal. Across three
   card widths that read as a seesaw rather than a production line, so
   the whole machine is now compact and close to level: the belt drops
   0.12 over 1.06 instead of 0.58 over 1.52, and the tray has come in
   from 1.62 to 1.34. The flow is still strictly left to right — feed,
   drum, outlet, tray — which is the thing that has to survive. */
export const FEED_X  = -1.72;
export const FEED_Y  = 0.10;
export const MOUTH_X = -0.66;
export const MOUTH_Y = -0.02;
export const TRAY_X  = 1.34;

/* Thaal recover up to 90% of the material. The gauge stops there, not
   at a rounder-looking 100% — the number is the point. */
export const RECOVERY_MAX = 0.9;

export const FRAGMENTS = 7;
export const PELLETS = 8;

/* ── beats ────────────────────────────────────────────── */
const FEED_T0 = 0.35, FEED_DUR = 0.70;      // block slides to the mouth
const INGEST_T0 = 1.00, INGEST_DUR = 0.30;  // overlaps the feed on purpose
const FRAG_T0 = 1.22, FRAG_DUR = 1.35, FRAG_STAGGER = 0.045;
const PELLET_T0 = 2.10, PELLET_DUR = 0.62, PELLET_STAGGER = 0.105;
const GAUGE_T0 = 2.28, GAUGE_DUR = 1.42;
const RETURN_T0 = 3.55, RETURN_DUR = 0.50, RETURN_STAGGER = 0.05;
const BLOCK_T0 = 4.00, BLOCK_DUR = 0.50;    // reassembly completes at 4.50

/* Drum spin envelope: ramps up, holds, ramps down. */
const SPIN_A = 0.95, SPIN_B = 1.30, SPIN_C = 3.70, SPIN_D = 4.10;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease    = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smooth  = (p) => p * p * (3 - 2 * p);
const mix     = (a, b, p) => a + (b - a) * p;

export function backOut(p) {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

/* Trapezoid envelope: 0 before a, 1 between b and c, 0 after d. */
function window4(t, a, b, c, d) {
  if (t <= a) return 0;
  if (t < b) return (t - a) / (b - a);
  if (t <= c) return 1;
  if (t < d) return 1 - (t - c) / (d - c);
  return 0;
}

/* Area under that envelope from its start to t — the drum's rotation is
   the integral of its speed, so it can never run backwards. */
function window4Area(t, a, b, c, d) {
  if (t <= a) return 0;
  if (t < b) return ((t - a) * (t - a)) / (2 * (b - a));
  const upto = (b - a) / 2;
  if (t <= c) return upto + (t - b);
  const upto2 = upto + (c - b);
  if (t < d) {
    const k = t - c;
    return upto2 + k - (k * k) / (2 * (d - c));
  }
  return upto2 + (d - c) / 2;
}

/* LOOP CLOSURE: the drum carries visible paddles, so if the cycle ended
   mid-turn it would snap back to zero on restart. Speed is derived from
   the envelope's total area so the drum completes exactly TURNS whole
   revolutions — never hand-tune this to a round number like 7.0. */
export const TURNS = 3;
const SPIN_AREA = window4Area(TOTAL, SPIN_A, SPIN_B, SPIN_C, SPIN_D);
export const SPIN_SPEED = (2 * Math.PI * TURNS) / SPIN_AREA;

export function drumAngleAt(t) {
  return SPIN_SPEED * window4Area(t, SPIN_A, SPIN_B, SPIN_C, SPIN_D);
}

/* The waste block: waiting, sliding in, swallowed, then reassembled
   back at the feed head. Its state at TOTAL matches its state at 0. */
export function blockAt(t) {
  const reform = clamp01((t - BLOCK_T0) / BLOCK_DUR);
  if (reform > 0) {
    const e = reform >= 1 ? 1 : backOut(reform);
    return { x: FEED_X, y: FEED_Y, scale: e, visible: e > 0.001, reforming: true };
  }
  const fp = clamp01((t - FEED_T0) / FEED_DUR);
  const ip = clamp01((t - INGEST_T0) / INGEST_DUR);
  const s = smooth(fp);
  const scale = 1 - ip;
  return {
    x: mix(FEED_X, MOUTH_X, s),
    y: mix(FEED_Y, MOUTH_Y, s),
    scale,
    visible: scale > 0.001,
    reforming: false
  };
}

/* A fragment tumbling inside the drum. Spirals inward and shrinks as it
   breaks down; scale is a sine so it grows in and out without needing a
   transparent material per fragment. */
export function fragmentAt(i, t) {
  const p = clamp01((t - FRAG_T0 - i * FRAG_STAGGER) / FRAG_DUR);
  const live = p > 0.001 && p < 0.999;
  return {
    visible: live,
    p,
    angle: (i / FRAGMENTS) * Math.PI * 2,
    radius: 0.34 * (1 - 0.5 * p),
    scale: live ? Math.sin(p * Math.PI) : 0
  };
}

/* A pellet pouring down the outlet. p is 0-1 along the chute; once it
   reaches 1 it rests in the tray at its own slot. */
export function pelletAt(i, t) {
  const p = clamp01((t - PELLET_T0 - i * PELLET_STAGGER) / PELLET_DUR);
  return { visible: p > 0.001, p: smooth(p), raw: p, landed: p >= 1 };
}

/* The flight home: pellets leave the tray along the return arc and are
   absorbed into the reassembling block when they arrive. */
export function returnAt(i, t) {
  const p = clamp01((t - RETURN_T0 - i * RETURN_STAGGER) / RETURN_DUR);
  return { visible: p > 0.001 && p < 0.999, p: smooth(p) };
}

/* Recovery rate, 0 to 0.90. Monotonic by construction. */
export function recoveryAt(t) {
  return RECOVERY_MAX * ease(clamp01((t - GAUGE_T0) / GAUGE_DUR));
}

/* Everything the scene needs for one frame. */
export function poseAt(t) {
  const recovery = recoveryAt(t);
  const heat = window4(t, 1.15, 1.5, 3.45, 3.9);
  const ret = clamp01((t - RETURN_T0) / (RETURN_DUR + RETURN_STAGGER * (PELLETS - 1)));

  return {
    block: blockAt(t),
    drum: drumAngleAt(t),
    spin: window4(t, SPIN_A, SPIN_B, SPIN_C, SPIN_D),
    heat,
    recovery,
    /* Fraction of the gauge arc that is lit — 0.9 at the end, so the
       last tenth of the arc stays dark. That gap is the message. */
    gauge: recovery,
    loop: ret,
    /* The rail lights the card border off this, the way the farmer's
       cold store powering up does. */
    powered: recovery > RECOVERY_MAX * 0.5
  };
}
