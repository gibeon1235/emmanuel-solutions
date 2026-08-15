/* Which services have a 3D scene — deliberately free of any Three.js
   import so the rail can ask this question without dragging the whole
   renderer into the main bundle. Keep in step with sceneRegistry.js. */
export const SCENE_IDS = ["sustainable-tech", "circular-economy"];

export function hasScene(id) {
  return SCENE_IDS.indexOf(id) !== -1;
}
