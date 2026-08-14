/* Mounts the mascot for real, in a DOM, with React 18 + fiber 8.
   Two things are being proven here:
     1. the fiber reconciler actually reconciles against React 18
        (the exact thing that broke with fiber 9 — it built fine and
        crashed on mount, so a build is not evidence)
     2. when WebGL is unavailable, QuietBoundary swallows it and the
        rail item survives, rather than the page going to the crash panel
*/
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  pretendToBeVisual: true, url: "http://localhost/"
});

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, "navigator", { value: dom.window.navigator, configurable: true, writable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = clearTimeout;
global.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
dom.window.ResizeObserver = global.ResizeObserver;
global.self = dom.window;

// Answer the media queries the rail asks about. This does NOT open the
// eligibility gate — see the note by the rail-item check below.
dom.window.matchMedia = (q) => ({
  matches: /hover: hover|pointer: fine/.test(q),
  media: q, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){}
});
dom.window.WebGLRenderingContext = function () {};

const React = (await import("react")).default;
const { createRoot } = await import("react-dom/client");
const { LazyMotion, domAnimation } = await import("framer-motion");
const { ServiceRail } = await import("../src/components/ServiceRail.jsx");

const warnings = [];
const origWarn = console.warn, origErr = console.error;
console.warn = (...a) => { warnings.push(String(a[0])); };
console.error = (...a) => { warnings.push("ERR:" + String(a[0])); };

const areas = [
  { id: "sustainable-tech",     tone: "#3E8E8A", name: "Sustainable Technology", note: "a" },
  { id: "circular-economy",     tone: "#4F6D3A", name: "Circular Economy",       note: "b" },
  { id: "innovation-training",  tone: "#C08A2E", name: "Innovation Capability",  note: "c" },
  { id: "industrial-marketing", tone: "#4A6785", name: "Industrial Marketing",   note: "d" }
];

const root = createRoot(document.getElementById("root"));
let threw = null;
let items = 0;
try {
  root.render(React.createElement(LazyMotion, { features: domAnimation },
    React.createElement(ServiceRail, { areas })));
  await new Promise(r => setTimeout(r, 300));

  items = document.querySelectorAll(".es-rail-item").length;

  /* Do NOT add a "the stage appears when you hover a card with a scene"
     assertion here. It cannot pass under jsdom and will always read as a
     failure: hasWebGL() calls canvas.getContext("webgl"), jsdom returns
     null, so eligible() correctly returns false and no stage ever mounts.
     Stubbing window.WebGLRenderingContext does not change that — the gate
     asks for a context, not for the constructor.

     That decision is not untested. `npm run capability` covers the whole
     eligibility matrix — WebGL present, absent, throwing, reduced motion,
     coarse pointer, SSR — against the same capability.js this rail uses.
     What THIS script proves is the part capability.js cannot: that the
     component tree mounts against React 18 + fiber 8 without crashing,
     and that failing the gate degrades quietly instead of taking the
     page to the crash panel. */
} catch (e) {
  threw = e;
}

console.warn = origWarn; console.error = origErr;

const html = document.getElementById("root").innerHTML;
const crashed = html.includes("es-crash");
// Every name, not just the first two — this check once passed with three of
// the four items rendered, because it only ever looked for areas[0] and [1].
const missing = areas.map(a => a.name).filter(n => !html.includes(n));
const reactErr = warnings.filter(w => /ERR:/.test(w) && !/not wrapped in act|WebGL|Could not create/i.test(w));

let fails = 0;
const check = (ok, label, detail) => {
  if (!ok) fails++;
  console.log((ok ? "PASS  " : "FAIL  ") + label + (detail ? "  " + detail : ""));
};

check(threw === null, "mounted without throwing to top level", threw ? "-> " + threw.message : "");
check(items === 4, "rail rendered four items", "got " + items);
check(!crashed, "crash panel not rendered");
// Both halves matter: `missing` catches an area that was passed in but never
// rendered, and the length catches the fixture itself drifting away from four.
// Without the second half this check is relative to whatever `areas` holds, so
// dropping an area would silently satisfy it — the same overpromising label
// this check already had once.
check(areas.length === 4 && missing.length === 0, "all four rail items still present",
  missing.length ? "missing: " + missing.join(", ")
    : areas.length !== 4 ? "fixture has " + areas.length + " areas, expected 4" : "");
check(reactErr.length === 0, "no unexpected React errors",
  reactErr.length ? JSON.stringify(reactErr.slice(0, 3)) : "");

const degraded = warnings.filter(w => /degrading silently/.test(w));
console.log("note: QuietBoundary caught + degraded:", degraded.length ? "YES" : "no (scene did not fail)");

console.log(fails ? `\n${fails} mount check(s) failed` : "\nthe rail mounts cleanly on React 18 + fiber 8");
process.exit(fails ? 1 : 0);
