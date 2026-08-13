import { useRef, useState, useCallback, useEffect, Suspense, lazy } from "react";
import { m } from "framer-motion";
import { QuietBoundary } from "./QuietBoundary";

const MascotScene = lazy(() => import("../three/MascotScene.jsx"));

/* The sustainable-technology rail item. On hover, a farmer walks in and
   watches a solar-powered cold store assemble itself.

   Three rules keep this from costing anything it shouldn't:
     1. the Three.js chunk is only fetched on first pointer-enter
     2. the canvas unmounts a moment after the pointer leaves, releasing
        the WebGL context rather than leaving it running behind the page
     3. touch, reduced-motion and no-WebGL visitors get the plain link,
        and never download the renderer at all                       */

const UNMOUNT_DELAY = 900;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

function eligible() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
  return hasWebGL();
}

export function RailMascotItem({ p, delay }) {
  const [live, setLive] = useState(false);
  const [chilled, setChilled] = useState(false);
  const capable = useRef(null);
  const timer = useRef(null);
  if (capable.current === null) capable.current = eligible();

  const clearTimer = () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
  };

  const handleEnter = () => {
    if (!capable.current) return;
    clearTimer();
    setLive(true);
  };

  const handleLeave = () => {
    clearTimer();
    timer.current = setTimeout(() => {
      setLive(false);
      setChilled(false);
    }, UNMOUNT_DELAY);
  };

  const handleFail = useCallback(() => {
    capable.current = false;
    clearTimer();
    setLive(false);
    setChilled(false);
  }, []);

  const handleProgress = useCallback((chill) => setChilled(chill > 0.5), []);

  useEffect(() => () => clearTimer(), []);

  return (
    <m.a
      className={"es-rail-item es-rail-item-mascot" + (chilled ? " is-powered" : "")}
      href={`/services/${p.id}`}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      onFocus={handleEnter} onBlur={handleLeave}
    >
      <span className="es-rail-name">
        <span className="es-rail-tone" style={{ background: p.tone }} aria-hidden="true" />
        {p.name}
      </span>
      <span className="es-rail-note">{p.note}</span>

      {live && (
        <span className="es-rail-mascot-stage" aria-hidden="true">
          <QuietBoundary onFail={handleFail}>
            <Suspense fallback={null}>
              <MascotScene onProgress={handleProgress} />
            </Suspense>
          </QuietBoundary>
        </span>
      )}
    </m.a>
  );
}
