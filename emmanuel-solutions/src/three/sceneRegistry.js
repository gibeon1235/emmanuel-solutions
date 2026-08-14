import { buildFarmerScene } from "./farmerScene.js";
import { TOTAL as FARMER_TOTAL } from "./farmerTimeline.js";

/* One entry per service. As each scene is built it registers here and
   the rail picks it up automatically — nothing else needs changing. */
export const SCENES = {
  "sustainable-tech": { build: buildFarmerScene, total: FARMER_TOTAL }
};

/* hasScene lives in sceneIds.js instead — importing this file pulls in
   Three.js, so the rail must not touch it. */
