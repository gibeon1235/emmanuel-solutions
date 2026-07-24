import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   HERO SYSTEM — the Emmanuel Solutions visual language
   Five acts. Graphite draws, blueprint grey measures,
   cyan senses, teal understands, emerald thinks, amber marks.
   Colour only ever appears where it carries meaning.
   Pure SVG + CSS. No canvas, no dependency.
───────────────────────────────────────────────────────────── */

const GR = "#2A3238";  // graphite — structure
const BG = "#8A98A0";  // blueprint grey — measurement
const CY = "#5E93A3";  // muted cyan — sensing
const TL = "#3E8E8A";  // soft teal — understanding
const EM = "#2C6048";  // emerald — intelligence
const SG = "#4FAE7E";  // signal — intelligence in motion
const AM = "#B98A4B";  // warm amber — significance
const SL = "#6E7F8C";  // blue-grey — directional
const HX = 1050;
const HY = 302;

function buildLayers() {
  const p = [];

  // ── Act 1 · blueprint: construction guides and measurement ──
  p.push('<g class="es-g es-bp">');
  p.push(`<path class="es-dw" pathLength="1" style="--dn:.15;stroke:${GR};opacity:.15" d="M64,302 H1400"/>`);
  p.push(`<path class="es-dw" pathLength="1" style="--dn:.3;stroke:${GR};opacity:.15" d="M318,52 V572"/>`);
  p.push(`<path class="es-dw" pathLength="1" style="--dn:.55;stroke:${GR};opacity:.22" d="M300,302 H336 M318,284 V320"/>`);
  p.push(`<path class="es-dw" pathLength="1" style="--dn:.7;stroke:${BG};opacity:.3" d="M86,566 H596"/>`);
  for (let i = 0; i < 13; i++) {
    p.push(`<path class="es-dw" pathLength="1" style="--dn:${(0.8 + i * 0.03).toFixed(2)};stroke:${BG};opacity:.32" d="M${86 + i * 40},566 V${i % 4 === 0 ? 554 : 560}"/>`);
  }
  p.push(`<path class="es-dw" pathLength="1" style="--dn:1;stroke:${BG};opacity:.26" d="M128,192 A176,176 0 0 1 300,126"/>`);
  p.push(`<path class="es-dw" pathLength="1" style="--dn:1.15;stroke:${BG};opacity:.24" d="M660,86 V560 M652,86 h16 M652,560 h16"/>`);
  p.push("</g>");

  // ── Act 1/2 · sensing: expanding instrumentation rings ──
  p.push('<g class="es-g es-se">');
  for (let r = 0; r < 3; r++) {
    p.push(`<circle class="es-ring" style="--dn:${2 + r * 3}" cx="${HX}" cy="${HY}" r="342" fill="none" stroke="${CY}" stroke-width="1"/>`);
  }
  p.push(`<path class="es-dw" pathLength="1" style="--dn:2.2;stroke:${TL};opacity:.5" d="M${HX - 8},${HY} H${HX + 8} M${HX},${HY - 8} V${HY + 8}"/>`);
  [[880, 170], [1252, 208], [904, 440], [1248, 420]].forEach(([x, y], i) => {
    p.push(`<path class="es-dw" pathLength="1" style="--dn:${2.4 + i * 0.1};stroke:${CY};opacity:.26" d="M${x - 6},${y} H${x + 6} M${x},${y - 6} V${y + 6}"/>`);
    p.push(`<circle cx="${x}" cy="${y}" r="1.8" fill="${TL}" opacity=".5" style="animation:es-bre ${7 + i}s ease-in-out infinite"/>`);
  });
  p.push("</g>");

  // ── Act 2 · systems map ──
  p.push('<g class="es-g es-map">');
  [
    ["M880,170 H972 V288 H1010", [972, 288]],
    ["M1252,208 H1148 V290 H1090", [1148, 290]],
    ["M904,440 H972 V316 H1010", [972, 316]],
    ["M1248,420 H1148 V314 H1090", [1148, 314]]
  ].forEach(([d, j], i) => {
    p.push(`<path d="${d}" fill="none" stroke="${GR}" stroke-width="1" opacity=".28"/>`);
    p.push(`<rect x="${j[0] - 3.5}" y="${j[1] - 3.5}" width="7" height="7" fill="var(--es-canvas)" stroke="${GR}" stroke-width="1.1" opacity=".46"/>`);
    p.push(`<circle r="2.3" fill="${GR}" opacity=".45" class="es-pl" style="--pd:${6 + i * 0.8}s;--dn:0;offset-path:path('${d}')"/>`);
  });
  p.push(`<circle cx="${HX}" cy="${HY}" r="40" fill="none" stroke="${GR}" stroke-width="1" opacity=".26"/>`);
  p.push(`<circle cx="${HX}" cy="${HY}" r="22" fill="none" stroke="${GR}" stroke-width="1" opacity=".34"/>`);
  p.push("</g>");

  // ── Act 3 · four capability clusters, never labelled ──
  p.push('<g class="es-g es-cl-wrap">');

  p.push('<g class="es-cl es-c1">');
  for (let a = 0; a < 5; a++) {
    const an = ((202 + a * 34) * Math.PI) / 180;
    const px = (880 + Math.cos(an) * 46).toFixed(1);
    const py = (170 + Math.sin(an) * 46).toFixed(1);
    p.push(`<line x1="880" y1="170" x2="${px}" y2="${py}" stroke="${TL}" stroke-width="1" opacity=".34"/>`);
    p.push(`<circle cx="${px}" cy="${py}" r="2.6" fill="var(--es-canvas)" stroke="${TL}" stroke-width="1.2" opacity=".62"/>`);
  }
  p.push(`<circle cx="880" cy="170" r="4.6" fill="var(--es-canvas)" stroke="${TL}" stroke-width="1.4" opacity=".76"/>`);
  p.push(`<g class="es-xt es-x1"><circle cx="880" cy="170" r="68" fill="none" stroke="${CY}" stroke-width="1" stroke-dasharray="2 7"/><circle cx="880" cy="170" r="92" fill="none" stroke="${CY}" stroke-width="1" stroke-dasharray="2 11" opacity=".5"/></g></g>`);

  p.push('<g class="es-cl es-c2">');
  p.push(`<path d="M1252,168 a40,40 0 1,1 -.1,0 Z" fill="none" stroke="${EM}" stroke-width="1" opacity=".34"/>`);
  [0, 90, 180, 270].forEach((d) => {
    const ra = (d * Math.PI) / 180;
    p.push(`<circle cx="${(1252 + Math.cos(ra) * 40).toFixed(1)}" cy="${(208 + Math.sin(ra) * 40).toFixed(1)}" r="2.6" fill="var(--es-canvas)" stroke="${EM}" stroke-width="1.2" opacity=".62"/>`);
  });
  p.push(`<circle cx="1252" cy="208" r="4.6" fill="var(--es-canvas)" stroke="${EM}" stroke-width="1.4" opacity=".76"/>`);
  p.push(`<circle r="2.6" fill="${EM}" opacity=".6" class="es-pl" style="--pd:7s;--dn:0;offset-path:path('M1252,168 a40,40 0 1,1 -.1,0 Z')"/>`);
  p.push(`<g class="es-xt es-x2"><circle r="2.2" fill="${SG}"><animateMotion dur="3.2s" repeatCount="indefinite" path="M1252,178 a30,30 0 1,0 -.1,0 Z"/></circle></g></g>`);

  p.push('<g class="es-cl es-c3">');
  [[904, 440, 854, 406], [904, 440, 854, 476], [854, 406, 810, 386], [854, 406, 814, 426], [854, 476, 810, 458], [854, 476, 814, 498]].forEach(([x1, y1, x2, y2]) => {
    p.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${AM}" stroke-width="1" opacity=".3"/>`);
    p.push(`<circle cx="${x2}" cy="${y2}" r="2.4" fill="var(--es-canvas)" stroke="${AM}" stroke-width="1.2" opacity=".56"/>`);
  });
  p.push(`<circle cx="904" cy="440" r="4.6" fill="var(--es-canvas)" stroke="${AM}" stroke-width="1.4" opacity=".72"/>`);
  p.push(`<g class="es-xt es-x3"><line x1="810" y1="386" x2="766" y2="370" stroke="${AM}" stroke-width="1"/><line x1="814" y1="426" x2="768" y2="432" stroke="${AM}" stroke-width="1"/><line x1="810" y1="458" x2="764" y2="452" stroke="${AM}" stroke-width="1"/><line x1="814" y1="498" x2="770" y2="514" stroke="${AM}" stroke-width="1"/></g></g>`);

  p.push('<g class="es-cl es-c4">');
  [-24, -8, 8, 24].forEach((d) => {
    const ra = (d * Math.PI) / 180;
    const px = (1248 + Math.cos(ra) * 70).toFixed(1);
    const py = (420 + Math.sin(ra) * 70).toFixed(1);
    p.push(`<line x1="1248" y1="420" x2="${px}" y2="${py}" stroke="${SL}" stroke-width="1" opacity=".32"/>`);
    p.push(`<path d="M${px - 7},${py - 4} L${px},${py} L${px - 7},${py + 4}" fill="none" stroke="${SL}" stroke-width="1" opacity=".46"/>`);
  });
  p.push(`<circle cx="1248" cy="420" r="4.6" fill="var(--es-canvas)" stroke="${SL}" stroke-width="1.4" opacity=".72"/>`);
  p.push('<g class="es-xt es-x4">');
  [-24, -8, 8, 24].forEach((d, i) => {
    const ra = (d * Math.PI) / 180;
    p.push(`<circle r="2.2" fill="${SL}"><animateMotion dur="${(1.7 + i * 0.22).toFixed(2)}s" repeatCount="indefinite" path="M1248,420 L${(1248 + Math.cos(ra) * 70).toFixed(1)},${(420 + Math.sin(ra) * 70).toFixed(1)}"/></circle>`);
  });
  p.push("</g></g></g>");

  // ── The single seed of intelligence, present from act 1 ──
  p.push(`<circle cx="${HX}" cy="${HY}" r="3.4" fill="${SG}" style="animation:es-bre 6s ease-in-out infinite"/>`);

  // ── Act 4 · intelligence woven between what already exists ──
  p.push('<g class="es-g es-in">');
  [
    ["M880,170 C1030,128 1140,134 1252,208", 0],
    ["M1252,208 C1346,302 1334,366 1248,420", 0.6],
    ["M1248,420 C1098,488 1010,488 904,440", 1.2],
    ["M904,440 C812,344 818,254 880,170", 1.8]
  ].forEach(([d, dn], i) => {
    p.push(`<path d="${d}" fill="none" stroke="${SG}" stroke-width="1" stroke-dasharray="3 6" opacity=".46"/>`);
    p.push(`<circle r="2.6" fill="${SG}" class="es-sg es-pl" style="--pd:${7 + i}s;--dn:${dn};offset-path:path('${d}')"/>`);
  });
  [[1064, 142], [1318, 316], [1072, 472], [832, 302]].forEach(([x, y]) => {
    p.push(`<rect x="${x - 4}" y="${y - 4}" width="8" height="8" transform="rotate(45 ${x} ${y})" fill="var(--es-canvas)" stroke="${SG}" stroke-width="1.2" opacity=".78"/>`);
  });
  p.push(`<circle class="es-ring" style="--dn:1" cx="${HX}" cy="${HY}" r="152" fill="none" stroke="${SG}" stroke-width="1"/>`);
  p.push(`<g class="es-xt es-xa"><path d="M880,170 L${HX},${HY} M1252,208 L${HX},${HY} M904,440 L${HX},${HY} M1248,420 L${HX},${HY}" stroke="${SG}" stroke-width="1" stroke-dasharray="2 6" fill="none"/><circle cx="${HX}" cy="${HY}" r="84" fill="none" stroke="${SG}" stroke-width="1" stroke-dasharray="3 9"><animateTransform attributeName="transform" type="rotate" from="0 ${HX} ${HY}" to="360 ${HX} ${HY}" dur="26s" repeatCount="indefinite"/></circle></g>`);
  p.push("</g>");

  return p.join("");
}

const MARKUP = buildLayers();

export function HeroSystem({ act = 1, focus = null, page = false, theme = "light" }) {
  const stage = useRef(null);
  const volume = useRef(null);
  const paper = useRef(null);
  const glass = useRef(null);
  const svg = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  // Counter-directional parallax — depth comes from opposition, not offset
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const surface = el.classList.contains("es-system-page") ? window : el;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (volume.current) volume.current.style.transform = `translate3d(${cx * 1.3}px,${cy * 1.3}px,0)`;
      if (paper.current) paper.current.style.transform = `translate3d(${cx * 0.3}px,${cy * 0.3}px,0)`;
      if (glass.current) glass.current.style.transform = `translate3d(${cx * -0.8}px,${cy * -0.8}px,0)`;
      if (svg.current) svg.current.style.transform = `translate3d(${cx * -0.4}px,${cy * -0.4}px,0)`;
      if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    const move = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 20;
      ty = (e.clientY / window.innerHeight - 0.5) * 13;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
    surface.addEventListener("mousemove", move, { passive: true });
    surface.addEventListener("mouseleave", leave);
    return () => {
      surface.removeEventListener("mousemove", move);
      surface.removeEventListener("mouseleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={page ? "es-system es-system-page" : "es-system"}
      ref={stage}
      data-act={act}
      data-focus={focus || undefined}
      data-theme={theme}
      aria-hidden="true"
    >
      <div className="es-layer" ref={volume}><div className="es-volume" /></div>
      <div className="es-layer" ref={paper}><div className="es-paper" /></div>
      <div className="es-layer" ref={glass}>
        <div className="es-pane" style={{ "--dn": 1.2, "--fl": "15s", width: "272px", height: "174px", right: "96px", top: "112px" }} />
        <div className="es-pane" style={{ "--dn": 1.45, "--fl": "18s", width: "214px", height: "138px", right: "34px", top: "238px" }} />
        <div className="es-pane" style={{ "--dn": 1.7, "--fl": "21s", width: "170px", height: "112px", right: "212px", top: "320px" }} />
      </div>
      <svg
        className="es-layer es-net"
        ref={svg}
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        dangerouslySetInnerHTML={{ __html: ready ? MARKUP : "" }}
      />
    </div>
  );
}
