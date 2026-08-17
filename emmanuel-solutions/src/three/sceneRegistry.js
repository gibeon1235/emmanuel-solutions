import { buildFarmerScene } from "./farmerScene.js";
import { TOTAL as FARMER_TOTAL } from "./farmerTimeline.js";
import { buildCircularScene } from "./circularScene.js";
import { TOTAL as CIRCULAR_TOTAL } from "./circularTimeline.js";
import { buildInnovationScene } from "./innovationScene.js";
import { TOTAL as INNOVATION_TOTAL } from "./innovationTimeline.js";
import { buildIndustrialScene } from "./industrialScene.js";
import { TOTAL as INDUSTRIAL_TOTAL } from "./industrialTimeline.js";

/* One entry per service. As each scene is built it registers here and
   the rail picks it up automatically — nothing else needs changing. */
export const SCENES = {
  /* `bounds` is optional and only read by scripts/scene-contract.mjs.
     This scene reaches well outside the camera's 6-unit frame on purpose:
     the farmer walks in from x=-4.2, and every part of the installation
     flies in from an offset — the solar panel from +2.4 beyond the rig at
     2.5, and most of the rest from 3+ units overhead. Without saying so,
     a bounds check reads those entrances as parts escaping the card.
     Measured extent at SCENE_SCALE 0.88 is x[-4.05, 3.96] y[-1.10, 2.33];
     the values below are that plus a small margin, so a part that
     genuinely runs away still trips the check. */
  "sustainable-tech": {
    build: buildFarmerScene, total: FARMER_TOTAL,
    bounds: { x: [-4.25, 4.15], y: [-1.3, 2.5] }
  },
  /* This one is meant to stay wholly inside the camera frame — nothing
     enters from off-stage — so its bounds are tight to the measured
     extent x[-1.82, 2.23] y[-1.06, 1.16] rather than to the frame edge.
     If the scene is rescaled again this is what catches it leaving. */
  "circular-economy": {
    build: buildCircularScene, total: CIRCULAR_TOTAL,
    bounds: { x: [-2.05, 2.45], y: [-1.25, 1.4] }
  },
  /* Presenter and board both sit inside the frame; nothing enters from
     off-stage, so these are tight to the measured extent
     x[-1.61, 1.93] y[-0.90, 0.86]. */
  "innovation-training": {
    build: buildInnovationScene, total: INNOVATION_TOTAL,
    bounds: { x: [-1.85, 2.15], y: [-1.1, 1.1] }
  },
  /* Everything stays on the card now that the stamp is gone — the crane
     at x=2.45 is the rightmost thing on the site. Measured extent
     x[-1.96, 3.07] y[-1.11, 1.58]. */
  "industrial-marketing": {
    build: buildIndustrialScene, total: INDUSTRIAL_TOTAL,
    bounds: { x: [-2.2, 3.3], y: [-1.3, 1.8] }
  }
};

/* hasScene lives in sceneIds.js instead — importing this file pulls in
   Three.js, so the rail must not touch it. */
