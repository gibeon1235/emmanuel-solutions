import { useRef, useState, useCallback, useEffect, Suspense, lazy } from "react";
import { m } from "framer-motion";
import { QuietBoundary } from "./QuietBoundary";
import { hasScene } from "../three/sceneIds.js";
import { eligible } from "../three/capability.js";

const MascotScene = lazy(() => import("../three/MascotScene.jsx"));

/* The four practice-area cards under the hero, with a single shared 3D
   stage that follows the cursor.

   The stage is a sibling of the cards rather than a child of any one of
   them: it is positioned over whichever card is hovered and is free to
   overflow sideways and above. Because it sits above the cards it must
   not swallow pointer events, or moving onto it would read as leaving
   the card underneath and the scene would flicker off. Hence
   pointer-events: none on the stage.

   Leaving the rail entirely stops playback and releases the canvas. The
   short delay stops a fast diagonal sweep from tearing the renderer
   down and immediately rebuilding it. */

const LEAVE_DELAY = 160;

/* Card hover glow needs the service's own tone at partial opacity, and
   CSS can't apply alpha to a hex custom property on its own. Precompute
   the rgb triplet once per render instead of reaching for color-mix(),
   which is one dependency this restrained a treatment doesn't need. */
function hexToRgbTriplet(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!m) return "0,0,0";
  return [m[1], m[2], m[3]].map((h) => parseInt(h, 16)).join(",");
}

export function ServiceRail({ areas }) {
  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const leaveTimer = useRef(null);
  const capable = useRef(null);
  const [active, setActive] = useState(null);
  const [centre, setCentre] = useState(0);
  const [powered, setPowered] = useState(false);

  if (capable.current === null) capable.current = eligible();

  const clearTimer = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  };

  const focusItem = useCallback((index, id) => {
    if (!capable.current || !hasScene(id)) {
      clearTimer();
      setActive(null);
      return;
    }
    clearTimer();
    const rail = railRef.current;
    const item = itemRefs.current[index];
    if (rail && item) {
      const r = rail.getBoundingClientRect();
      const b = item.getBoundingClientRect();
      setCentre(b.left - r.left + b.width / 2);
    }
    setPowered(false);
    setActive(id);
  }, []);

  const leaveRail = useCallback(() => {
    clearTimer();
    leaveTimer.current = setTimeout(() => {
      setActive(null);
      setPowered(false);
    }, LEAVE_DELAY);
  }, []);

  const handleFail = useCallback(() => {
    capable.current = false;
    clearTimer();
    setActive(null);
  }, []);

  useEffect(() => () => clearTimer(), []);

  /* Prefetch the renderer chunk.

     Without this the first hover pays for the whole Three.js download
     before anything moves. On a normal connection that is several
     seconds — long enough that the cursor has usually left the card by
     the time the scene appears, so the animation may as well not exist.

     Gated on the same eligible() the rail itself uses, so touch,
     coarse-pointer and reduced-motion visitors still download nothing:
     the point of the gate is that they never pay for the renderer, and
     prefetching unconditionally would quietly undo it.

     Idle, and after load, so it never competes with the hero video or
     the fonts. The timeout stops a busy main thread starving it. */
  useEffect(() => {
    if (!capable.current) return;
    let cancelled = false;
    let handle = null;
    let viaIdle = false;

    const prefetch = () => {
      if (cancelled) return;
      const idle = window.requestIdleCallback;
      if (idle) {
        viaIdle = true;
        handle = idle(() => {
          if (!cancelled) import("../three/MascotScene.jsx");
        }, { timeout: 2500 });
      } else {
        handle = setTimeout(() => {
          if (!cancelled) import("../three/MascotScene.jsx");
        }, 1200);
      }
    };

    if (document.readyState === "complete") prefetch();
    else window.addEventListener("load", prefetch, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", prefetch);
      if (handle === null) return;
      if (viaIdle) { if (window.cancelIdleCallback) window.cancelIdleCallback(handle); }
      else clearTimeout(handle);
    };
  }, []);

  /* Keep the stage aligned if the layout reflows while hovering. */
  useEffect(() => {
    if (!active) return;
    const onResize = () => {
      const index = areas.findIndex((a) => a.id === active);
      const rail = railRef.current;
      const item = itemRefs.current[index];
      if (rail && item) {
        const r = rail.getBoundingClientRect();
        const b = item.getBoundingClientRect();
        setCentre(b.left - r.left + b.width / 2);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, areas]);

  return (
    <div className="es-rail es-rail-warm" ref={railRef} onMouseLeave={leaveRail}>
      {areas.map((p, i) => (
        <m.a
          key={p.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className={"es-rail-item" + (active === p.id && powered ? " is-powered" : "")}
          style={{ "--rail-tone": p.tone, "--rail-tone-rgb": hexToRgbTriplet(p.tone) }}
          href={`/services/${p.id}`}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.98 + i * 0.09, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => focusItem(i, p.id)}
          onFocus={() => focusItem(i, p.id)}
          onBlur={leaveRail}
        >
          <span className="es-rail-name">
            <span className="es-rail-tone" style={{ background: p.tone }} aria-hidden="true" />
            {p.name}
          </span>
          <span className="es-rail-note">{p.note}</span>
          <span className="es-rail-arrow" aria-hidden="true">→</span>
        </m.a>
      ))}

      {active && (
        <span className="es-rail-stage" style={{ left: centre }} aria-hidden="true">
          <QuietBoundary onFail={handleFail}>
            <Suspense fallback={null}>
              <MascotScene sceneId={active} onProgress={setPowered} />
            </Suspense>
          </QuietBoundary>
        </span>
      )}
    </div>
  );
}
