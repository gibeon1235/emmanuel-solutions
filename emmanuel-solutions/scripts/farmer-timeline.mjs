import { poseAt, partAt, pulseAt, PARTS, TOTAL, HOME, START, backOut }
  from "../src/three/farmerTimeline.js";

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

ok("cycle is 4.9s", Math.abs(TOTAL - 4.9) < 1e-9);

// Walk-in: arrives from off-frame left and stops at his mark.
ok("starts off-frame left", poseAt(0).x <= START + 0.01, `x=${poseAt(0).x.toFixed(2)}`);
ok("reaches his mark", Math.abs(poseAt(0.7).x - HOME) < 0.02, `x=${poseAt(0.7).x.toFixed(2)}`);
ok("only ever moves right while walking", (() => {
  let prev = -Infinity;
  for (let t = 0; t <= 0.7; t += 0.01) { const x = poseAt(t).x; if (x < prev - 1e-9) return false; prev = x; }
  return true;
})());
ok("stops moving after arrival", (() => {
  for (let t = 0.75; t <= TOTAL; t += 0.02) if (Math.abs(poseAt(t).x - HOME) > 1e-9) return false;
  return true;
})());
ok("legs cycle while walking", poseAt(0.35).wp > 1);
ok("legs still once stopped", poseAt(2.0).wp === 0);
ok("turns to face the build", poseAt(1.5).turn > 0.25);

// Assembly: bottom-up, nothing floats before its support exists.
const at = (id, t) => partAt(PARTS.find(p => p.id === id), t);
ok("pad lands before the store body", (() => {
  const pad = PARTS.find(p => p.id === "pad"), bodyP = PARTS.find(p => p.id === "storeBody");
  return pad.t0 + pad.dur <= bodyP.t0 + bodyP.dur;
})());
ok("store body before its lid", (() => {
  const b = PARTS.find(p => p.id === "storeBody"), tp = PARTS.find(p => p.id === "storeTop");
  return b.t0 < tp.t0;
})());
ok("rig base before the pole", (() => {
  const b = PARTS.find(p => p.id === "rigBase"), pl = PARTS.find(p => p.id === "pole");
  return b.t0 < pl.t0;
})());
ok("pole before the panel", (() => {
  const pl = PARTS.find(p => p.id === "pole"), pn = PARTS.find(p => p.id === "panel");
  return pl.t0 < pn.t0;
})());
ok("panel before its cells", (() => {
  const pn = PARTS.find(p => p.id === "panel");
  return PARTS.filter(p => p.id.startsWith("cell")).every(c => c.t0 > pn.t0);
})());
ok("cells arrive in order", (() => {
  const cs = PARTS.filter(p => p.id.startsWith("cell"));
  for (let i = 1; i < cs.length; i++) if (cs[i].t0 <= cs[i - 1].t0) return false;
  return true;
})());
ok("nothing is visible at t=0", PARTS.every(p => !partAt(p, 0).visible));
ok("everything has landed before the sun peaks", (() => {
  return PARTS.every(p => p.t0 + p.dur <= 2.35);
})());
ok("every part settles exactly on target", PARTS.every(p => partAt(p, TOTAL).e === 1));
ok("overshoot actually overshoots", (() => {
  let over = false;
  for (let q = 0.5; q < 1; q += 0.01) if (backOut(q) > 1.001) over = true;
  return over;
})());

// Power chain: sun, then flow, then chill — never out of order.
ok("sun rises after the build", poseAt(2.0).sun === 0 && poseAt(2.9).sun > 0.999,
   `sun@2.9=${poseAt(2.9).sun.toFixed(4)}`);
ok("energy flows only after sun", (() => {
  for (let t = 0; t <= TOTAL; t += 0.01) {
    const p = poseAt(t);
    if (p.flow > 0 && p.sun < 1) return false;
  }
  return true;
})());
ok("store chills only after energy flows", (() => {
  for (let t = 0; t <= TOTAL; t += 0.01) {
    const p = poseAt(t);
    if (p.chill > 0 && p.flow < 0.7) return false;
  }
  return true;
})());
ok("panel tilts toward the sun", poseAt(2.9).panelTilt < poseAt(1.0).panelTilt);
ok("panel is fully tilted once sun is up", Math.abs(poseAt(3.5).panelTilt - (-0.64)) < 0.01);
ok("cable appears before the pulses", poseAt(2.3).cable === 1);
ok("pulses run only during flow", pulseAt(0, 0) === null && pulseAt(0, 0.5) !== null);
ok("pulses travel forward along the cable", (() => {
  let prev = -1;
  for (let f = 0.1; f <= 1; f += 0.05) {
    const v = pulseAt(0, f);
    if (v !== null) { if (v < prev) return false; prev = v; }
  }
  return true;
})());

// Reaction: he approves at the end, not before.
ok("no approval before the store is powered", poseAt(3.0).appr === 0);
ok("approves at the end", poseAt(4.4).appr > 0.9);
ok("thumb only extends during approval", poseAt(3.0).thumb === 0 && poseAt(4.5).thumb > 0.9);
ok("smile grows across the cycle", poseAt(4.5).smile > poseAt(0.2).smile);
ok("watches the build, then looks back out", poseAt(1.5).look > 0.5 && poseAt(4.6).look < 0.4);

// Loop hygiene and safety.
ok("pose at t=0 matches a fresh start", (() => {
  const a = poseAt(0);
  return a.sun === 0 && a.flow === 0 && a.chill === 0 && a.appr === 0 && a.thumb === 0;
})());
ok("no NaN anywhere across the cycle", (() => {
  for (let t = 0; t <= TOTAL; t += 0.002) {
    const p = poseAt(t);
    const vals = [p.x, p.y, p.bob, p.wp, p.turn, p.smile, p.brow, p.nod, p.look,
                  p.sun, p.flow, p.chill, p.appr, p.sunY, p.panelTilt, p.cable, p.thumb,
                  p.armR.up, p.armR.fo, p.armL.up, p.armL.fo];
    for (const v of vals) if (!Number.isFinite(v)) return false;
    for (const spec of PARTS) {
      const st = partAt(spec, t);
      if (!Number.isFinite(st.e) || !Number.isFinite(st.p)) return false;
    }
  }
  return true;
})());

console.log(fails ? `\n${fails} FAILED` : "\nall timeline assertions passed");
process.exit(fails ? 1 : 0);
