/* Innovation capability — choreography as pure maths.

   A presenter stands at a board in a workshop, marker in hand, and
   points as four panels appear and lock in one at a time. The panels are
   the Creatrix model's four drivers — ambiguity, independence,
   inner-directedness, uniqueness — but carry no text: at card size a
   label would be unreadable mush, so each panel is distinguished by its
   own colour and glyph instead. When the fourth locks he nods.

   No Three.js here on purpose — the timing is unit tested without a GPU.
   Geometry lives in innovationScene.js.

   Loop note: like the farmer's build-up and unlike the circular economy
   loop, this cycle ends fuller than it starts — four locked panels at
   TOTAL, an empty board at 0. That restart pop is inherent to a
   sequence whose whole point is accumulation, and matches the
   established behaviour of the sustainable-tech scene. What is asserted
   instead is that t=0 is a genuine rest state: nothing part-way. */

export const TOTAL = 4.7;

export const PANELS = 4;

/* Where the presenter stands and where the board sits. The camera frames
   roughly -2.8..3.2, so both stay comfortably inside it. */
export const STAND_X = -1.75;
export const BASE_Y = -0.4;
export const BOARD_X = 0.95;

/* ── beats ────────────────────────────────────────────── */
const POINT_T0 = 0.30, POINT_DUR = 0.50;     // arm comes up before panel 1
const POINT_DOWN_T0 = 4.05, POINT_DOWN_DUR = 0.40;
const P_T0 = 0.90, P_DUR = 0.42, P_STAGGER = 0.72, P_LIGHT = 0.25;
const NOD_DUR = 0.72;

/* The fourth panel finishes travelling here; the nod answers it. */
export const LAST_LOCK = P_T0 + (PANELS - 1) * P_STAGGER + P_DUR;   // 3.48
const NOD_T0 = LAST_LOCK;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth  = (p) => p * p * (3 - 2 * p);
const mix     = (a, b, p) => a + (b - a) * p;

export function backOut(p) {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

/* A panel: flies in toward the board, snaps home with overshoot, then
   lights. `lit` cannot start before `p` reaches 1 — a panel that glowed
   while still travelling would read as an effect rather than a lock. */
export function panelAt(i, t) {
  const t0 = P_T0 + i * P_STAGGER;
  const p = clamp01((t - t0) / P_DUR);
  const lit = clamp01((t - (t0 + P_DUR)) / P_LIGHT);
  return { visible: p > 0.001, p, e: p >= 1 ? 1 : backOut(p), lit, t0 };
}

/* Which panel the arm is aiming at, as a continuous 0..PANELS-1 so the
   pointing hand drifts between targets instead of snapping. */
export function aimAt(t) {
  let idx = 0;
  for (let i = 0; i < PANELS; i++) {
    const t0 = P_T0 + i * P_STAGGER;
    if (t >= t0 - 0.25) idx = i;
  }
  const prev = Math.max(0, idx - 1);
  const t0 = P_T0 + idx * P_STAGGER - 0.25;
  const tp = P_T0 + prev * P_STAGGER - 0.25;
  const span = t0 - tp;
  const blend = span > 0 ? clamp01((t - tp) / span) : 1;
  return mix(prev, idx, smooth(blend));
}

/* Everything the scene needs for one frame. */
export function poseAt(t) {
  const up = clamp01((t - POINT_T0) / POINT_DUR);
  const down = clamp01((t - POINT_DOWN_T0) / POINT_DOWN_DUR);
  const point = smooth(up) * (1 - smooth(down));
  const nodP = clamp01((t - NOD_T0) / NOD_DUR);
  const locked = t >= LAST_LOCK;

  const aim = aimAt(t);
  /* Row 0 is the top pair, row 1 the bottom — the arm lifts a little for
     the upper panels so the point tracks what is actually appearing. */
  const row = aim < 2 ? 0 : 1;

  return {
    point,
    aim,
    /* Shoulder and elbow for the pointing arm, and the relaxed arm that
       holds the marker. Mirrors the farmer's convention: positive z on
       the +x-side arm swings it outward toward the board. */
    armPoint: {
      up: mix(-0.16, 1.46 + (row === 0 ? 0.16 : -0.04), point),
      fo: mix(0.34, -0.12, point)
    },
    armMarker: { up: -0.2 + point * 0.06, fo: 0.42 },
    nod: nodP > 0 ? Math.sin(nodP * Math.PI * 2) * 0.12 : 0,
    /* He warms up as the model comes together, then a little more on the
       nod. Never a wide grin — same restraint as the farmer's mouth. */
    smile: 0.22 + clamp01((t - 0.9) / 2.4) * 0.24 + nodP * 0.3,
    brow: clamp01((t - 0.6) / 1.2) * 0.28 + nodP * 0.35,
    /* Looks at the board through the sequence, back out to the viewer
       once the fourth has locked. */
    look: mix(0.9, 0.2, clamp01((t - LAST_LOCK) / 0.6)),
    locked,
    /* The rail lights the card border once the model is complete. */
    powered: locked
  };
}
