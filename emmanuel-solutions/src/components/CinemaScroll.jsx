import { useEffect, useRef, useState } from "react";

/* Scroll-scrubbed cinema.
   Ties a video's currentTime to scroll position, so the visitor
   drives the footage frame by frame — the technique Apple uses for
   product pages, and photoreal because the footage is real.

   Falls back to the poster with parallax when video cannot be
   scrubbed reliably: no source supplied, reduced-motion, a slow
   connection, or a touch device (mobile browsers throttle seeking,
   which makes frame-accurate scrubbing stutter badly).

   Drop footage in and it activates automatically — no other change. */

function canScrub() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(hover: hover)").matches) return false;
  const c = navigator.connection;
  if (c && (c.saveData || /2g|slow-2g|3g/.test(c.effectiveType || ""))) return false;
  return true;
}

export function CinemaScroll({
  src,
  srcWebm,
  poster,
  alt = "",
  caption,
  note,
  objectPosition = "52% 38%",
  className = ""
}) {
  const wrap = useRef(null);
  const video = useRef(null);
  const still = useRef(null);
  const [mode, setMode] = useState("poster");   // poster | scrub
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src || !canScrub()) return;
    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));
      idle(() => { if (!cancelled) setMode("scrub"); });
    };
    if (document.readyState === "complete") activate();
    else window.addEventListener("load", activate, { once: true });
    return () => { cancelled = true; window.removeEventListener("load", activate); };
  }, [src]);

  /* Scrub: map the element's travel through the viewport onto duration */
  useEffect(() => {
    if (mode !== "scrub") return;
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;

    let target = 0, current = 0, raf = null, duration = 0;

    const onMeta = () => { duration = v.duration || 0; setReady(true); };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();

    const measure = () => {
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      const seen = window.innerHeight - r.top;
      const p = Math.min(Math.max(seen / total, 0), 1);
      target = p * (duration || 0);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      current += (target - current) * 0.12;          // damped, so scrubbing feels weighted
      if (duration && Math.abs(target - current) > 0.008) {
        try { v.currentTime = current; } catch { /* seeking mid-load */ }
        raf = requestAnimationFrame(tick);
      } else {
        if (duration) { try { v.currentTime = target; } catch {} }
        raf = null;
      }
    };

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      v.removeEventListener("loadedmetadata", onMeta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);

  /* Poster mode still earns its place — slow parallax on the still */
  useEffect(() => {
    if (mode !== "poster") return;
    const el = wrap.current, img = still.current;
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (r.height + window.innerHeight);
      const shift = (Math.min(Math.max(p, 0), 1) - 0.5) * 7;
      img.style.transform = `translate3d(0, ${shift}%, 0) scale(1.08)`;
      raf = null;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mode]);

  return (
    <figure className={`es-cinema ${className}`} ref={wrap}>
      {mode === "scrub" && (
        <video
          ref={video}
          className="es-cinema-media"
          poster={poster}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          style={{ objectPosition, opacity: ready ? 1 : 0 }}
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* The still stays mounted underneath: nothing ever renders empty */}
      <img
        ref={still}
        className="es-cinema-media es-cinema-still"
        src={poster}
        alt={alt}
        width="899" height="1599"
        decoding="async"
        style={{ objectPosition, opacity: mode === "scrub" && ready ? 0 : 1 }}
      />
      <span className="es-cinema-grade" aria-hidden="true" />
      {caption && (
        <figcaption className="es-hero-caption">
          <span className="dot" aria-hidden="true" />
          <span>{caption}</span>
          {note && <span className="es-cinema-note">{note}</span>}
        </figcaption>
      )}
    </figure>
  );
}
