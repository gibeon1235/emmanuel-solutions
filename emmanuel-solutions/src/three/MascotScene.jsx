import { Canvas } from "@react-three/fiber";
import { Sailor } from "./Sailor.jsx";

/* Lazy-loaded chunk — only fetched on first hover-intent over a
   mascot rail item, and only for hover-capable, non-reduced-motion
   desktop pointers (gated by the caller). Kept dependency-free of
   drei to hold the chunk size down: plain Canvas, two lights, one
   primitive-built character. */

export default function MascotScene({ active, onLift, onCycleEnd, colorAccent }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0.35, 5.4], fov: 30 }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[3, 4, 3]} intensity={1.3} />
      <directionalLight position={[-2, 1, -2]} intensity={0.35} />
      {active && (
        <Sailor onLift={onLift} onCycleEnd={onCycleEnd} colorAccent={colorAccent} />
      )}
    </Canvas>
  );
}
