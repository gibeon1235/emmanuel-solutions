import { m, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* Navigation — keyboard accessible.
   The v12 version was hover-only with no key handling, which made the
   Services links unreachable for keyboard and screen reader users. */

const SERVICES = [
  { to: "/services/sustainable-tech", label: "Sustainable Technology" },
  { to: "/services/circular-economy", label: "Circular Economy" },
  { to: "/services/innovation-training", label: "Innovation Capability" },
  { to: "/services/industrial-marketing", label: "Industrial Marketing" }
];

const ABOUT = [
  { to: "/#about", label: "The founder", hash: "about" },
  { to: "/#case-studies", label: "Partnerships", hash: "case-studies" },
  { to: "/alliances/sfai", label: "Spray Foam Alliance of India" },
  { to: "/alliances/iif", label: "India Insulation Forum" },
  { to: "/#contact", label: "Contact", hash: "contact" }
];

function useHashScroll() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback((hash) => (e) => {
    if (e) e.preventDefault();
    const go = () => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname === "/") go();
    else { navigate("/"); setTimeout(go, 130); }
  }, [location.pathname, navigate]);
}

function Dropdown({ id, label, items, open, setOpen, onHashLink, badge }) {
  const wrap = useRef(null);
  const isOpen = open === id;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(null); wrap.current?.querySelector("button")?.focus(); } };
    const onClickOut = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOut);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClickOut); };
  }, [isOpen, setOpen]);

  const onTriggerKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(id);
      requestAnimationFrame(() => wrap.current?.querySelector('[role="menuitem"]')?.focus());
    }
  };

  const onItemKey = (e) => {
    const items = Array.from(wrap.current?.querySelectorAll('[role="menuitem"]') || []);
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus(); }
    if (e.key === "Tab" && i === items.length - 1) setOpen(null);
  };

  return (
    <div
      className="es-navgroup"
      ref={wrap}
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
    >
      <button
        className="es-navlink es-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onKeyDown={onTriggerKey}
        onClick={() => setOpen(isOpen ? null : id)}
      >
        {label}{badge}<span className="es-chev" aria-hidden="true">▾</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="es-menu"
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onItemKey}
          >
            {items.map((item) =>
              item.hash ? (
                <a key={item.label} role="menuitem" href={item.to} className="es-menuitem"
                   onClick={(e) => { setOpen(null); onHashLink(item.hash)(e); }}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} role="menuitem" to={item.to} className="es-menuitem"
                      onClick={() => setOpen(null)}>
                  {item.label}
                </Link>
              )
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation({ onFocusChange }) {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(null);
  const scrollTo = useHashScroll();
  const closeMobile = () => setMobile(false);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  const signal = (key) => ({
    onMouseEnter: () => onFocusChange && onFocusChange(key),
    onMouseLeave: () => onFocusChange && onFocusChange(null),
    onFocus: () => onFocusChange && onFocusChange(key),
    onBlur: () => onFocusChange && onFocusChange(null)
  });

  return (
    <>
      <header className="es-topbar">
        <div className="es-topbar-inner">
          <div className="brand">
            <Link to="/" className="brand-link">
              <div className="brand-word">
                <span className="brand-script">Emmanuel Solutions</span>
                <span className="brand-tagline">Change for Good</span>
              </div>
            </Link>
          </div>

          <nav className="es-nav-desktop" aria-label="Primary">
            <span {...signal("all")}>
              <Dropdown id="services" label="Services" items={SERVICES} open={open} setOpen={setOpen} onHashLink={scrollTo} />
            </span>
            <a href="/#ai-solutions" className="es-navlink" onClick={scrollTo("ai-solutions")} {...signal("ai")}>
              AI Solutions<span className="es-pil" aria-hidden="true" />
            </a>
            <a href="/#case-studies" className="es-navlink" onClick={scrollTo("case-studies")}>Work</a>
            <a href="/#insights" className="es-navlink" onClick={scrollTo("insights")}>Insights</a>
            <Dropdown id="about" label="About" items={ABOUT} open={open} setOpen={setOpen} onHashLink={scrollTo} />
            <a href="/#contact" className="btn btn-primary btn-nav" onClick={scrollTo("contact")}>
              Start a conversation
            </a>
          </nav>

          <button
            className={`mobile-menu-toggle ${mobile ? "open" : ""}`}
            onClick={() => setMobile((v) => !v)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <m.nav className="nav-mobile" aria-label="Mobile"
            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-content">
              <p className="mobile-section-label">Services</p>
              {SERVICES.map((s) => (
                <Link key={s.to} to={s.to} onClick={closeMobile} className="mobile-nav-link">{s.label}</Link>
              ))}
              <hr className="mobile-divider" />
              <a href="/#ai-solutions" onClick={(e) => { closeMobile(); scrollTo("ai-solutions")(e); }} className="mobile-nav-link">AI Solutions</a>
              <a href="/#case-studies" onClick={(e) => { closeMobile(); scrollTo("case-studies")(e); }} className="mobile-nav-link">Work</a>
              <a href="/#insights" onClick={(e) => { closeMobile(); scrollTo("insights")(e); }} className="mobile-nav-link">Insights</a>
              <hr className="mobile-divider" />
              <p className="mobile-section-label">About</p>
              <a href="/#about" onClick={(e) => { closeMobile(); scrollTo("about")(e); }} className="mobile-nav-link">The founder</a>
              <hr className="mobile-divider" />
              <a href="/#contact" onClick={(e) => { closeMobile(); scrollTo("contact")(e); }} className="mobile-nav-link mobile-nav-cta">Start a conversation</a>
              <a href="mailto:isaac@emmanuelsolutionss.com" className="mobile-nav-link">isaac@emmanuelsolutionss.com</a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <m.div className="mobile-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile} />
        )}
      </AnimatePresence>
    </>
  );
}
