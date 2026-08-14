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

// Force the eligibility gate open so the scene really mounts.
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
try {
  root.render(React.createElement(LazyMotion, { features: domAnimation },
    React.createElement(ServiceRail, { areas })));
  await new Promise(r => setTimeout(r, 300));

  const links = document.querySelectorAll(".es-rail-item");
  if (links.length !== 4) throw new Error("expected 4 rail items, got " + links.length);

  // Hover the card that has a scene — triggers the lazy chunk + canvas.
  links[0].dispatchEvent(new dom.window.MouseEvent("mouseover", { bubbles: true }));
  await new Promise(r => setTimeout(r, 1200));
  const stageAfterEnter = !!document.querySelector(".es-rail-stage");

  // Move to a card with no scene yet — the stage must stand down.
  links[1].dispatchEvent(new dom.window.MouseEvent("mouseout", { bubbles: true, relatedTarget: links[1] }));
  links[1].dispatchEvent(new dom.window.MouseEvent("mouseover", { bubbles: true }));
  await new Promise(r => setTimeout(r, 400));
  const stageAfterSwitch = !!document.querySelector(".es-rail-stage");

  console.log("stage appears on the card with a scene:", stageAfterEnter ? "YES (good)" : "NO (bad)");
  console.log("stage stands down on a card without one:", stageAfterSwitch ? "NO (bad)" : "YES (good)");
} catch (e) {
  threw = e;
}

console.warn = origWarn; console.error = origErr;

const html = document.getElementById("root").innerHTML;
const crashed = html.includes("es-crash");
const stillThere = html.includes("Sustainable Technology") && html.includes("Circular Economy");

console.log("mounted without throwing to top level:", threw === null ? "YES" : "NO -> " + threw.message);
console.log("crash panel rendered:", crashed ? "YES (bad)" : "NO (good)");
console.log("all four rail items still present:", stillThere ? "YES (good)" : "NO (bad)");
const reactErr = warnings.filter(w => /ERR:/.test(w) && !/not wrapped in act|WebGL|Could not create/i.test(w));
console.log("unexpected React errors:", reactErr.length ? reactErr.slice(0,3) : "none");
const degraded = warnings.filter(w => /degrading silently/.test(w));
console.log("QuietBoundary caught + degraded:", degraded.length ? "YES" : "no (scene did not fail)");
