import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SCENES } from "./sceneRegistry.js";

/* One canvas, shared by the whole rail. Moving the cursor between
   cards swaps the scene inside it rather than tearing down the
   renderer, so switching is instant and only ever one WebGL context
   exists no matter how fast someone sweeps across the row. */

const WORLD_WIDTH = 6.0;

function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = Math.max(0.2, size.width / Math.max(1, size.height));
    const vFov = (30 * Math.PI) / 180;
    const visibleHeight = WORLD_WIDTH / aspect;
    const dist = (visibleHeight / 2) / Math.tan(vFov / 2);
    camera.fov = 30;
    camera.position.set(0.2, 0.2, Math.min(14, Math.max(3.0, dist)));
    camera.lookAt(0.2, 0.12, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* Procedural room environment — no HDRI file to download. Built once
   and reused across scene switches. */
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

function Rig({ sceneId, onProgress }) {
  const entry = SCENES[sceneId];
  const built = useMemo(() => (entry ? entry.build() : null), [entry]);
  const clock = useRef(0);
  const lastPowered = useRef(false);

  /* Restart from the top whenever the cursor moves to a different card,
     so you always see the story from the beginning rather than joining
     it halfway through. */
  useEffect(() => {
    clock.current = 0;
    lastPowered.current = false;
  }, [sceneId]);

  useEffect(() => () => { if (built) built.dispose(); }, [built]);

  useFrame((_, delta) => {
    if (!built || !entry) return;
    const dt = Math.min(0.05, delta);
    clock.current = (clock.current + dt) % entry.total;
    const p = built.update(clock.current, dt);
    if (onProgress && p) {
      /* Scenes say when their story has landed. The farmer's cold store
         reports it as `chill`; anything newer sets `powered` directly,
         so this does not need a branch per scene. */
      const powered = p.powered !== undefined ? p.powered : p.chill > 0.5;
      if (powered !== lastPowered.current) onProgress(powered);
      lastPowered.current = powered;
    }
  });

  if (!built) return null;
  return <primitive object={built.group} />;
}

export default function MascotScene({ sceneId, onProgress }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.94;
      }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <FitCamera />
      <Environment />
      <Rig sceneId={sceneId} onProgress={onProgress} />
    </Canvas>
  );
}
