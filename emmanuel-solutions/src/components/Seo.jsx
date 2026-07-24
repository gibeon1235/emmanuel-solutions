import { useEffect } from "react";

const SITE = "https://www.emmanuelsolutionss.com";

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/* Per-route head management. No dependency, ~30 lines. */
export function Seo({ title, description, path = "" }) {
  useEffect(() => {
    const full = title ? `${title} | Emmanuel Solutions` : "Emmanuel Solutions | Sustainable Growth Consultancy";
    document.title = full;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:url"]', "content", SITE + path);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", SITE + path);
  }, [title, description, path]);

  return null;
}
