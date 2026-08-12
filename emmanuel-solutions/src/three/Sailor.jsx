import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

/* Original geometric mascot — not modeled on any licensed character.
   Built from primitives: capsule torso, sphere head/fists, cylinder
   limbs. Low-poly, flat-shaded, meant to read as a clean graphic mark
   rather than a sculpted figure.

   Animation is a single authored timeline driven by an internal clock:
     0.00–0.45   rise      — climbs up from below the card
     0.45–1.05   lift      — plants feet, raises the box overhead
     1.05–1.55   spinach   — free arm curls a can up to the mouth
     1.55–2.65   walk      — strides off-frame to the left, box held high
     2.65–2.95   hold      — brief pause off-frame
   Total cycle ~2.95s. Calls onLift(0-1) every frame so the parent can
   drive the real DOM card's transform in sync, and onCycleEnd() once
   a full pass completes. */

const DUR = { rise: 0.45, lift: 0.6, spinach: 0.5, walk: 1.1, hold: 0.3 };
const T_LIFT_END    = DUR.rise + DUR.lift;
const T_SPINACH_END = T_LIFT_END + DUR.spinach;
const T_WALK_END    = T_SPINACH_END + DUR.walk;
const T_TOTAL        = T_WALK_END + DUR.hold;

function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

export function Sailor({ onLift, onCycleEnd, colorAccent = "#3E8E8A" }) {
  const root   = useRef();
  const armR   = useRef();   // lifting arm (character's right, screen left)
  const armL   = useRef();   // spinach arm
  const legR   = useRef();
  const legL   = useRef();
  const cigar  = useRef();
  const clock  = useRef(0);
  const done   = useRef(false);

  const mats = useMemo(() => ({
    shirt: { color: "#1c2b3a" },
    skin:  { color: "#e3a56f" },
    pants: { color: colorAccent },
    metal: { color: "#dfe3e6", metalness: 0.4, roughness: 0.5 },
    dark:  { color: "#101820" }
  }), [colorAccent]);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;

    if (t >= T_TOTAL) {
      clock.current = 0;
      done.current = false;
      onCycleEnd && onCycleEnd();
      return;
    }

    let y = -2.4, x = 0, liftAmt = 0, armRAngle = 0.15, armLAngle = -0.2, walkPhase = 0, bob = 0;

    if (t < DUR.rise) {
      const p = ease(clamp01(t / DUR.rise));
      y = -2.4 + p * 1.55;
    } else if (t < T_LIFT_END) {
      const p = ease(clamp01((t - DUR.rise) / DUR.lift));
      y = -0.85 + p * 0.35;
      armRAngle = 0.15 + p * (Math.PI * 0.62 - 0.15);
      liftAmt = p;
    } else if (t < T_SPINACH_END) {
      y = -0.5;
      armRAngle = Math.PI * 0.62;
      liftAmt = 1;
      const p = clamp01((t - T_LIFT_END) / DUR.spinach);
      armLAngle = -0.2 + Math.sin(p * Math.PI) * 1.9;
    } else if (t < T_WALK_END) {
      const p = clamp01((t - T_SPINACH_END) / DUR.walk);
      const pe = p * p * (3 - 2 * p);
      x = -pe * 5.6;
      y = -0.5;
      armRAngle = Math.PI * 0.62;
      liftAmt = 1;
      armLAngle = -0.3;
      walkPhase = p * Math.PI * 9;
      bob = Math.abs(Math.sin(walkPhase)) * 0.09;
    } else {
      x = -5.6; y = -0.5; liftAmt = 1; armRAngle = Math.PI * 0.62; armLAngle = -0.3;
    }

    if (root.current) root.current.position.set(x, y + bob, 0);
    if (armR.current) armR.current.rotation.z = armRAngle;
    if (armL.current) armL.current.rotation.z = armLAngle;
    if (legR.current) legR.current.rotation.x = Math.sin(walkPhase) * 0.55;
    if (legL.current) legL.current.rotation.x = Math.sin(walkPhase + Math.PI) * 0.55;

    if (cigar.current) {
      const cigarT = clamp01((t - T_SPINACH_END - 0.15) / 0.5);
      cigar.current.visible = t > T_SPINACH_END && cigarT < 1;
      cigar.current.position.y = -cigarT * 1.4;
      cigar.current.rotation.z = cigarT * 2.2;
    }

    onLift && onLift(liftAmt, x);
  });

  return (
    <group ref={root}>
      {/* torso */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.55, 4, 8]} />
        <meshStandardMaterial {...mats.shirt} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.28, 0]} castShadow>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial {...mats.skin} />
      </mesh>
      {/* cap */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.24, 0.27, 0.18, 12]} />
        <meshStandardMaterial {...mats.dark} />
      </mesh>
      {/* pipe/cigar */}
      <mesh ref={cigar} position={[0.2, 1.24, 0.22]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.32, 6]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      {/* right arm (lifts) */}
      <group position={[-0.36, 0.78, 0]}>
        <group ref={armR}>
          <mesh position={[0, -0.32, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
        </group>
      </group>
      {/* left arm (spinach) */}
      <group position={[0.36, 0.78, 0]}>
        <group ref={armL}>
          <mesh position={[0, -0.32, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color="#4a7c3f" />
          </mesh>
        </group>
      </group>
      {/* legs */}
      <group position={[-0.14, 0.05, 0]}>
        <group ref={legR}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.pants} />
          </mesh>
        </group>
      </group>
      <group position={[0.14, 0.05, 0]}>
        <group ref={legL}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.pants} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
