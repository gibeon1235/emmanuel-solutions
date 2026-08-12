import { useRef, useState, useCallback, useEffect, Suspense, lazy } from "react";
import { m } from "framer-motion";
import { QuietBoundary } from "./QuietBoundary";

const MascotScene = lazy(() => import("../three/MascotScene.jsx"));

/* Prototype: an original low-poly 3D character performs a lift-and-
   carry-off bit on hover, for the Sustainable Technology rail item
   only, while we measure real cost before touching the other three.

   Gating mirrors CinemaScroll's pattern: hover-capable, fine pointer,
   no reduced-motion. Touch devices and keyboard/reduced-motion users
   simply get the plain rail item — no broken half-state.

   The Three.js chunk is only fetched on first pointer-enter, not on
   page load, so visitors who never hover this item pay nothing. */

/* Cheap one-off WebGL probe. Some machines and locked-down browsers
   report a pointer and no reduced-motion preference but cannot give
   us a GL context at all — better to find out before downloading
   900 KB of renderer. */
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
  const boxRef = useRef(null);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(false);
  const capable = useRef(null);
  if (capable.current === null) capable.current = eligible();

  const applyLift = useCallback((liftAmt, xOffset) => {
    const el = boxRef.current;
    if (!el) return;
    const lift = -18 * liftAmt;
    const tilt = -3 * liftAmt;
    const drift = Math.max(-44, xOffset * 6);
    el.style.transform = `translate(${drift}px, ${lift}px) rotate(${tilt}deg)`;
    el.style.opacity = xOffset < -0.25 ? String(Math.max(0.3, 1 + xOffset * 0.16)) : "1";
  }, []);

  const reset = useCallback(() => {
    const el = boxRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.opacity = "";
  }, []);

  /* If the scene throws on this device, stop trying: drop the canvas,
     restore the card, and never arm again for this session. */
  const handleFail = useCallback(() => {
    capable.current = false;
    setArmed(false);
    setActive(false);
    reset();
  }, [reset]);

  const handleEnter = () => {
    if (!capable.current) return;
    setArmed(true);
    setActive(true);
  };
  const handleLeave = () => {
    setActive(false);
    reset();
  };

  useEffect(() => () => reset(), [reset]);

  return (
    <m.a className="es-rail-item es-rail-item-mascot" href={`/services/${p.id}`}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}
    >
      <span className="es-rail-box" ref={boxRef}>
        <span className="es-rail-name">
          <span className="es-rail-tone" style={{ background: p.tone }} aria-hidden="true" />
          {p.name}
        </span>
        <span className="es-rail-note">{p.note}</span>
      </span>

      {armed && (
        <span className="es-rail-mascot-stage" aria-hidden="true">
          <QuietBoundary onFail={handleFail}>
            <Suspense fallback={null}>
              <MascotScene active={active} onLift={applyLift} onCycleEnd={reset} colorAccent={p.tone} />
            </Suspense>
          </QuietBoundary>
        </span>
      )}
    </m.a>
  );
}
