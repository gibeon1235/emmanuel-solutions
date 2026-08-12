import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { poseAt, pipeAt, T_TOTAL } from "./sailorTimeline.js";

/* Original geometric mascot — not modeled on any licensed character.
   Built from primitives (capsule torso, sphere head and fists,
   cylinder limbs), low-poly and flat-shaded, so it reads as a clean
   graphic mark rather than a sculpted figure.

   All timing lives in sailorTimeline.js as pure maths, which is unit
   tested; this file only maps a pose onto meshes. onLift(amount, x)
   fires each frame so the parent can drive the real DOM card in sync. */

export function Sailor({ onLift, onCycleEnd, colorAccent = "#3E8E8A" }) {
  const root  = useRef();
  const armR  = useRef();
  const armL  = useRef();
  const legR  = useRef();
  const legL  = useRef();
  const pipe  = useRef();
  const clock = useRef(0);

  const mats = useMemo(() => ({
    shirt: { color: "#1c2b3a" },
    skin:  { color: "#e3a56f" },
    pants: { color: colorAccent },
    dark:  { color: "#101820" },
    leaf:  { color: "#4a7c3f" }
  }), [colorAccent]);

  useFrame((_, delta) => {
    clock.current += delta;
    if (clock.current >= T_TOTAL) {
      clock.current = 0;
      onCycleEnd && onCycleEnd();
      return;
    }

    const t = clock.current;
    const pose = poseAt(t);
    const pip  = pipeAt(t);

    if (root.current) root.current.position.set(pose.x, pose.y + pose.bob, 0);
    if (armR.current) armR.current.rotation.z = pose.armR;
    if (armL.current) armL.current.rotation.z = pose.armL;
    if (legR.current) legR.current.rotation.x = Math.sin(pose.walkPhase) * 0.55;
    if (legL.current) legL.current.rotation.x = Math.sin(pose.walkPhase + Math.PI) * 0.55;
    if (pipe.current) {
      pipe.current.visible = pip.visible;
      pipe.current.position.y = 1.24 + pip.y;
      pipe.current.rotation.z = pip.rot;
    }

    onLift && onLift(pose.lift, pose.x);
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.32, 0.55, 4, 8]} />
        <meshStandardMaterial {...mats.shirt} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial {...mats.skin} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.24, 0.27, 0.18, 12]} />
        <meshStandardMaterial {...mats.dark} />
      </mesh>
      <mesh ref={pipe} position={[0.2, 1.24, 0.22]}>
        <cylinderGeometry args={[0.02, 0.02, 0.32, 6]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>

      <group position={[-0.36, 0.78, 0]}>
        <group ref={armR}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
        </group>
      </group>

      <group position={[0.36, 0.78, 0]}>
        <group ref={armL}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.skin} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial {...mats.leaf} />
          </mesh>
        </group>
      </group>

      <group position={[-0.14, 0.05, 0]}>
        <group ref={legR}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.pants} />
          </mesh>
        </group>
      </group>
      <group position={[0.14, 0.05, 0]}>
        <group ref={legL}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
            <meshStandardMaterial {...mats.pants} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
