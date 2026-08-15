import { buildFarmerScene } from "./farmerScene.js";
import { TOTAL as FARMER_TOTAL } from "./farmerTimeline.js";
import { buildCircularScene } from "./circularScene.js";
import { TOTAL as CIRCULAR_TOTAL } from "./circularTimeline.js";

/* One entry per service. As each scene is built it registers here and
   the rail picks it up automatically — nothing else needs changing. */
export const SCENES = {
  /* `bounds` is optional and only read by scripts/scene-contract.mjs.
     This scene reaches well outside the camera's 6-unit frame on purpose:
     the farmer walks in from x=-4.2, and every part of the installation
     flies in from an offset — the solar panel from +2.4 beyond the rig at
     2.5, and most of the rest from 3+ units overhead. Without saying so,
     a bounds check reads those entrances as parts escaping the card.
     Measured extent is x[-4.61, 4.50] y[-1.25, 2.64]; the values below
     are that plus a small margin, so a part that genuinely runs away
     still trips the check. */
  "sustainable-tech": {
    build: buildFarmerScene, total: FARMER_TOTAL,
    bounds: { x: [-4.8, 4.7], y: [-1.5, 2.85] }
  },
  /* This one is meant to stay wholly inside the camera frame — nothing
     enters from off-stage — so its bounds are tight to the measured
     extent x[-2.48, 2.81] y[-1.12, 1.35] rather than to the frame edge.
     If the scene is rescaled again this is what catches it leaving. */
  "circular-economy": {
    build: buildCircularScene, total: CIRCULAR_TOTAL,
    bounds: { x: [-2.75, 3.05], y: [-1.30, 1.55] }
  }
};

/* hasScene lives in sceneIds.js instead — importing this file pulls in
   Three.js, so the rail must not touch it. */
