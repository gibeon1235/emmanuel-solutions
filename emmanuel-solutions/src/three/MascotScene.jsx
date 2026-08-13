import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildFarmerScene } from "./farmerScene.js";
import { TOTAL } from "./farmerTimeline.js";

/* Lazy-loaded chunk. Only fetched on first hover-intent over a service
   rail item, and only for hover-capable, non-reduced-motion pointers
   with a working WebGL context (gated by the caller).

   Everything is built in plain Three.js and mounted through <primitive>,
   so React owns the lifecycle while the scene owns its own internals —
   and disposal is explicit rather than left to the garbage collector. */

const WORLD_WIDTH = 6.4;

function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = Math.max(0.2, size.width / Math.max(1, size.height));
    const vFov = (30 * Math.PI) / 180;
    const visibleHeight = WORLD_WIDTH / aspect;
    const dist = (visibleHeight / 2) / Math.tan(vFov / 2);
    camera.fov = 30;
    camera.position.set(0.2, 0.35, Math.min(12, Math.max(3.0, dist)));
    camera.lookAt(0.2, 0.2, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* A procedural room environment — no HDRI file to download. Gives the
   materials something to reflect, which is most of the difference
   between "solid object" and "flat shape". */
function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    return () => {
      scene.environment = null;
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Rig({ onProgress }) {
  const built = useMemo(() => buildFarmerScene(), []);
  const clock = useRef(0);
  const lastChill = useRef(-1);

  useEffect(() => () => built.dispose(), [built]);

  useFrame((_, delta) => {
    const dt = Math.min(0.05, delta);
    clock.current = (clock.current + dt) % TOTAL;
    const p = built.update(clock.current, dt);
    if (onProgress) {
      const chilled = p.chill > 0.5;
      if (chilled !== (lastChill.current > 0.5)) onProgress(p.chill);
      lastChill.current = p.chill;
    }
  });

  return <primitive object={built.group} />;
}

export default function MascotScene({ onProgress }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <FitCamera />
      <Environment />
      <Rig onProgress={onProgress} />
    </Canvas>
  );
}
