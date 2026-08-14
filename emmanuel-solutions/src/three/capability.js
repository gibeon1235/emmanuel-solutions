/* Who gets the 3D scene. Kept free of any Three.js import so it can be
   unit tested, and so asking the question never costs a download.

   A media query alone is not enough: plenty of machines report a fine
   pointer and no reduced-motion preference but cannot hand back a GL
   context — locked-down browsers, blocklisted drivers, virtualised
   desktops. Better to find that out before fetching 830 kB. */

export function hasWebGL(win) {
  const w = win || (typeof window !== "undefined" ? window : null);
  if (!w || !w.document) return false;
  try {
    const c = w.document.createElement("canvas");
    if (!c || !c.getContext) return false;
    return !!(w.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

export function eligible(win) {
  const w = win || (typeof window !== "undefined" ? window : null);
  if (!w || typeof w.matchMedia !== "function") return false;
  if (w.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!w.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
  return hasWebGL(w);
}
