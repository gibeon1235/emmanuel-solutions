/* The mascot's choreography as pure maths — no Three.js, no React.
   Kept separate from the mesh so the timing can be unit-tested
   without a GPU, and so the same beats can drive the other three
   characters later with different geometry.

     rise     climbs up from beneath the card
     lift     plants feet, raises the box overhead
     spinach  free arm curls a can up to the mouth
     walk     strides off-frame left, box held high
     hold     brief beat off-frame before the loop restarts        */

export const DUR = { rise: 0.45, lift: 0.6, spinach: 0.5, walk: 1.1, hold: 0.3 };

export const T_LIFT_END    = DUR.rise + DUR.lift;
export const T_SPINACH_END = T_LIFT_END + DUR.spinach;
export const T_WALK_END    = T_SPINACH_END + DUR.walk;
export const T_TOTAL       = T_WALK_END + DUR.hold;

export const WALK_DISTANCE = -5.6;
export const ARM_UP        = Math.PI * 0.62;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease    = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smooth  = (p) => p * p * (3 - 2 * p);

/* Returns the full pose at time t within the cycle. */
export function poseAt(t) {
  let phase = "hold";
  let y = -0.5, x = 0, lift = 0, armR = 0.15, armL = -0.2, walkPhase = 0, bob = 0;

  if (t < DUR.rise) {
    phase = "rise";
    const p = ease(clamp01(t / DUR.rise));
    y = -2.4 + p * 1.55;
  } else if (t < T_LIFT_END) {
    phase = "lift";
    const p = ease(clamp01((t - DUR.rise) / DUR.lift));
    y = -0.85 + p * 0.35;
    armR = 0.15 + p * (ARM_UP - 0.15);
    lift = p;
  } else if (t < T_SPINACH_END) {
    phase = "spinach";
    const p = clamp01((t - T_LIFT_END) / DUR.spinach);
    armR = ARM_UP; lift = 1;
    armL = -0.2 + Math.sin(p * Math.PI) * 1.9;
  } else if (t < T_WALK_END) {
    phase = "walk";
    const p = clamp01((t - T_SPINACH_END) / DUR.walk);
    x = smooth(p) * WALK_DISTANCE;
    armR = ARM_UP; lift = 1; armL = -0.3;
    walkPhase = p * Math.PI * 9;
    bob = Math.abs(Math.sin(walkPhase)) * 0.09;
  } else {
    x = WALK_DISTANCE; armR = ARM_UP; lift = 1; armL = -0.3;
  }

  return { phase, x, y, bob, lift, armR, armL, walkPhase };
}

/* Visibility and travel of the tossed pipe during the walk. */
export function pipeAt(t) {
  const p = clamp01((t - T_SPINACH_END - 0.15) / 0.5);
  return { visible: t > T_SPINACH_END && p < 1, y: -p * 1.4, rot: p * 2.2 };
}
