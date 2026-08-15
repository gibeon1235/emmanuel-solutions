/* The fragments must actually be visible through the porthole.

   This exists because they were not. The drum barrel was built with a
   default CylinderGeometry, which caps both ends, so a solid steel disc
   sat at z=+0.475 — in front of the glass, the paddles and every
   fragment. The whole reaction ran correctly behind it for the entire
   cycle and the porthole rendered as a flat grey circle. Nothing failed;
   the tests were green; it simply could not be seen.

   Same family as scripts/farmer-face.mjs, but the geometry here is a
   cylinder rather than overlapping spheres, so instead of comparing
   sphere depths it casts a ray from the real camera position to each
   fragment and asserts nothing opaque is in the way. Transparent things
   (the tinted glass) are allowed through — that is what a window is. */

import * as THREE from "three";
import { buildCircularScene } from "../src/three/circularScene.js";
import { fragmentAt, FRAGMENTS } from "../src/three/circularTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

/* Matches FitCamera in MascotScene.jsx: 30deg vertical FOV framing
   WORLD_WIDTH 6.0, aimed at (0.2, 0.12, 0). The stage renders at
   620x300 css px, so aspect ~2.07. */
const WORLD_WIDTH = 6.0;
const ASPECT = 620 / 300;
const visibleHeight = WORLD_WIDTH / ASPECT;
const dist = (visibleHeight / 2) / Math.tan((30 * Math.PI / 180) / 2);
const camera = new THREE.Vector3(0.2, 0.2, dist);

const scene = buildCircularScene();

/* A moment when the reaction is in full swing. */
const T = 1.9;
scene.update(T, 1 / 60);
scene.group.updateMatrixWorld(true);

const live = [];
for (let i = 0; i < FRAGMENTS; i++) if (fragmentAt(i, T).visible) live.push(i);
ok("fragments are live at t=1.9", live.length > 0, `${live.length} of ${FRAGMENTS}`);

/* Collect the fragment meshes: the only TetrahedronGeometry in the scene. */
const fragMeshes = [];
scene.group.traverse((o) => {
  if (o.isMesh && o.visible && o.geometry && o.geometry.type === "TetrahedronGeometry") {
    let hidden = false;
    for (let a = o.parent; a; a = a.parent) if (!a.visible) hidden = true;
    if (!hidden) fragMeshes.push(o);
  }
});
ok("fragment meshes are in the graph and visible", fragMeshes.length === live.length,
  `${fragMeshes.length} meshes for ${live.length} live`);

const isOpaque = (m) => {
  const list = Array.isArray(m) ? m : [m];
  return list.some((x) => x && (!x.transparent || x.opacity > 0.9));
};

const ray = new THREE.Raycaster();
const dir = new THREE.Vector3();
const target = new THREE.Vector3();
let blocked = 0, worst = "";

for (const f of fragMeshes) {
  target.setFromMatrixPosition(f.matrixWorld);
  dir.copy(target).sub(camera).normalize();
  ray.set(camera, dir);
  const hits = ray.intersectObject(scene.group, true);
  const fragDist = camera.distanceTo(target);
  for (const h of hits) {
    if (h.object === f) break;                 // reached it — clear
    if (h.distance >= fragDist - 1e-6) break;  // nothing else in front
    if (isOpaque(h.object.material)) {
      blocked++;
      worst = `${h.object.geometry.type} at ${h.distance.toFixed(3)} blocks fragment at ${fragDist.toFixed(3)}`;
      break;
    }
  }
}
ok("nothing opaque blocks the porthole", blocked === 0,
  blocked ? `${blocked} of ${fragMeshes.length} blocked — ${worst}` : `${fragMeshes.length} fragments clear`);

/* The drum must stay open at the front. Guards the exact regression. */
let barrelOpen = null;
scene.group.traverse((o) => {
  if (o.isMesh && o.geometry && o.geometry.type === "CylinderGeometry") {
    const p = o.geometry.parameters;
    if (p && Math.abs(p.radiusTop - 0.62) < 1e-6 && Math.abs(p.radiusBottom - 0.62) < 1e-6) {
      barrelOpen = p.openEnded === true;
    }
  }
});
ok("drum barrel is open-ended", barrelOpen === true,
  barrelOpen === null ? "barrel not found" : "");

scene.dispose();
console.log(fails ? `\n${fails} FAILED` : "\nthe reaction is visible through the porthole");
process.exit(fails ? 1 : 0);
