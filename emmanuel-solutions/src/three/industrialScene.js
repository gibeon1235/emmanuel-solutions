import * as THREE from "three";
import {
  poseAt, padAt, buildingAt, windowAt, SITES, BUILDINGS, WINDOWS,
  GROUND_Y, CRANE_X, TOTAL
} from "./industrialTimeline.js";

/* Industrial marketing — a build timelapse that ends in occupancy.

   Four structures rise from poured foundations while a crane slews the
   site. Once the last tops out, the windows come on one at a time across
   the whole skyline and it holds there: the site is not just finished,
   it is in use.

   No characters, by design.

   Timing lives in industrialTimeline.js. Nothing here decides when
   anything happens — this file only decides what it looks like. */

/* Matches the circular economy scene's finished scale so the two
   character-free cards sit at the same weight. */
const SCENE_SCALE = 1.04;

function mkm(c, o) {
  o = o || {};
  return new THREE.MeshStandardMaterial({
    color: c,
    roughness: o.r === undefined ? 0.75 : o.r,
    metalness: o.m || 0,
    emissive: o.e || 0x000000,
    emissiveIntensity: o.ei || 0,
    transparent: !!o.t,
    opacity: o.o === undefined ? 1 : o.o,
    envMapIntensity: o.env === undefined ? 0.08 : o.env
  });
}
function deepen(hex) {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  const f = 0.87;
  return (Math.round(r * f) << 16) | (Math.round(g * f) << 8) | Math.round(b * f);
}

export function buildIndustrialScene() {
  const group = new THREE.Group();
  const mats = [];
  const geos = [];
  const M = (g, m, x, y, z) => {
    const e = new THREE.Mesh(g, m);
    e.position.set(x || 0, y || 0, z || 0);
    e.castShadow = true;
    geos.push(g);
    return e;
  };
  const mat = (c, o) => { const m = mkm(deepen(c), o); mats.push(m); return m; };

  /* ── lighting ─────────────────────────────────────────*/
  const hemi = new THREE.HemisphereLight(0xfff2e0, 0x585f63, 0.72);
  const key = new THREE.DirectionalLight(0xfff0d4, 1.15);
  key.position.set(3.0, 4.3, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -3.4; key.shadow.camera.right = 3.6;
  key.shadow.camera.top = 2.6; key.shadow.camera.bottom = -1.7;
  key.shadow.radius = 2;
  const fill = new THREE.DirectionalLight(0xd8e8ff, 0.34);
  fill.position.set(-2.6, 1.4, 2.2);
  const rim = new THREE.DirectionalLight(0xbfe4ff, 0.5);
  rim.position.set(-3.2, 2.0, -2.6);
  /* Site floodlight, up once the last structure tops out. */
  const flood = new THREE.PointLight(0xffcf8a, 0, 9);
  flood.position.set(0.4, 2.0, 1.4);
  group.add(hemi, key, fill, rim, flood);

  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.17 });
  mats.push(shadowMat);
  const groundGeo = new THREE.PlaneGeometry(30, 30);
  geos.push(groundGeo);
  const ground = new THREE.Mesh(groundGeo, shadowMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = GROUND_Y - 0.02;
  ground.receiveShadow = true;
  group.add(ground);

  /* ── materials ────────────────────────────────────────
     Painted concrete and cladding, matte; metalness only on the crane
     mast and jib. */
  const concrete = mat(0xc4bcae, { r: 0.93 });
  const concrete2 = mat(0xa79e91, { r: 0.93 });
  const cladding = mat(0x8d97a0, { r: 0.9 });
  const cladding2 = mat(0xa3aab0, { r: 0.9 });
  const roofM = mat(0x6f7a80, { r: 0.9 });
  const padM = mat(0x9a938a, { r: 0.94 });
  const craneM = mat(0xd08a3a, { r: 0.5, m: 0.42 });
  const craneM2 = mat(0x8f979d, { r: 0.5, m: 0.5 });
  const cableM = mat(0x3a352e, { r: 0.85 });

  /* ── foundations and structures ───────────────────────
     Each building is a group scaled on y from its base, so growth reads
     as rising out of the ground rather than inflating in place. */
  const pads = [];
  const towers = [];
  const winMats = [];
  for (let i = 0; i < BUILDINGS; i++) {
    const s = SITES[i];

    const pad = M(new THREE.BoxGeometry(s.w + 0.22, 0.09, s.w + 0.16), padM,
      s.x, GROUND_Y + 0.045, 0);
    pad.visible = false;
    group.add(pad);
    pads.push(pad);

    /* Anchored at the ground so scale.y grows upward. */
    const anchor = new THREE.Group();
    anchor.position.set(s.x, GROUND_Y + 0.09, 0);
    anchor.visible = false;
    group.add(anchor);

    const shell = new THREE.Group();
    anchor.add(shell);
    const body = M(new THREE.BoxGeometry(s.w, s.h, s.w * 0.82),
      i % 2 ? cladding : cladding2, 0, s.h / 2, 0);
    shell.add(body);
    /* Storey bands, so the stepped growth has something to read against. */
    for (let k = 1; k < s.storeys; k++) {
      shell.add(M(new THREE.BoxGeometry(s.w + 0.03, 0.03, s.w * 0.82 + 0.03),
        i % 2 ? cladding2 : cladding, 0, (k / s.storeys) * s.h, 0));
    }
    shell.add(M(new THREE.BoxGeometry(s.w + 0.09, 0.06, s.w * 0.82 + 0.09), roofM, 0, s.h, 0));
    shell.add(M(new THREE.BoxGeometry(s.w * 0.42, 0.12, s.w * 0.3), concrete2, 0, s.h + 0.09, 0));

    /* One strip per storey, and each owns its material so it can light
       independently — the payoff is the sequence, so they cannot share. */
    const winGeo = new THREE.BoxGeometry(s.w * 0.62, 0.11, 0.02);
    geos.push(winGeo);
    for (let k = 0; k < s.storeys; k++) {
      const wm = mkm(deepen(0x2f4356), { r: 0.55, e: 0xffcf8a, ei: 0 });
      mats.push(wm);
      winMats.push(wm);
      const w = new THREE.Mesh(winGeo, wm);
      w.position.set(0, (k + 0.5) * (s.h / s.storeys), s.w * 0.41 + 0.012);
      w.castShadow = false;
      shell.add(w);
    }

    towers.push({ anchor, shell, h: s.h });
  }

  /* ── crane ────────────────────────────────────────────*/
  const craneBase = new THREE.Group();
  craneBase.position.set(CRANE_X, GROUND_Y, 0);
  craneBase.visible = false;
  group.add(craneBase);
  craneBase.add(M(new THREE.BoxGeometry(0.42, 0.08, 0.42), concrete, 0, 0.04, 0));
  const mast = new THREE.Group();
  craneBase.add(mast);
  mast.add(M(new THREE.BoxGeometry(0.13, 2.15, 0.13), craneM, 0, 1.12, 0));
  for (let k = 0; k < 5; k++) {
    mast.add(M(new THREE.BoxGeometry(0.17, 0.035, 0.17), craneM2, 0, 0.3 + k * 0.42, 0));
  }
  /* The jib slews on its own pivot at the mast head. */
  const jib = new THREE.Group();
  jib.position.set(0, 2.16, 0);
  mast.add(jib);
  jib.add(M(new THREE.BoxGeometry(1.85, 0.09, 0.09), craneM, -0.62, 0, 0));
  jib.add(M(new THREE.BoxGeometry(0.5, 0.08, 0.08), craneM2, 0.35, 0, 0));
  jib.add(M(new THREE.BoxGeometry(0.2, 0.16, 0.2), craneM2, 0.5, -0.06, 0));
  const hookLine = M(new THREE.CylinderGeometry(0.012, 0.012, 1.0, 8), cableM, -1.15, -0.5, 0);
  jib.add(hookLine);
  const hook = M(new THREE.BoxGeometry(0.12, 0.14, 0.12), craneM2, -1.15, -1.02, 0);
  jib.add(hook);

  group.scale.setScalar(SCENE_SCALE);

  function update(t, dt) {
    const p = poseAt(t);

    for (let i = 0; i < BUILDINGS; i++) {
      const b = buildingAt(i, t);
      const q = padAt(i, t);
      pads[i].visible = q.visible;
      if (q.visible) {
        pads[i].scale.set(q.e, 1, q.e);
        pads[i].position.y = GROUND_Y + 0.045;
      }
      const tw = towers[i];
      tw.anchor.visible = b.visible;
      if (b.visible) {
        /* Clamped low so a zero scale never collapses the matrix. */
        tw.shell.scale.y = Math.max(0.001, b.h);
      }
    }

    /* Windows are driven by their index in the global sequence, not by
       which building they belong to — the payoff is one wave crossing
       the whole skyline. winMats is built in the same order as WINDOWS. */
    for (let i = 0; i < WINDOWS.length; i++) {
      winMats[i].emissiveIntensity = windowAt(i, t).lit * 1.8;
    }

    craneBase.visible = p.crane.visible;
    if (p.crane.visible) {
      mast.scale.y = Math.max(0.001, p.crane.e);
      jib.position.y = 2.16 * p.crane.e;
      jib.rotation.y = p.crane.slew;
      const drop = 0.55 + p.crane.hook * 0.5;
      hookLine.scale.y = drop / 1.0;
      hookLine.position.y = -drop / 2;
      hook.position.y = -drop - 0.02;
    }

    /* Floodlight rises with the topping out, then again with the
       windows, so the site keeps warming through the payoff. */
    flood.intensity = p.glow * 0.8 + p.litFraction * 1.4;

    return p;
  }

  function dispose() {
    for (const g of geos) { if (g && g.dispose) g.dispose(); }
    for (const m of mats) { if (m && m.dispose) m.dispose(); }
  }

  return { group, update, dispose, TOTAL };
}
