import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Navigates to home page and scrolls to a hash section.
// Works whether you're already on home or on a detail page.
function useHomeScroll() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (hash) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home — just scroll
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // On a detail page — navigate home, then scroll after paint
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  };
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown]          = useState(null);
  const servicesTimer = useRef(null);
  const engageTimer   = useRef(null);
  const scrollTo      = useHomeScroll();
  const closeMobile   = () => setIsMobileMenuOpen(false);

  const openMenu  = (key) => {
    const t = key === "services" ? servicesTimer : engageTimer;
    if (t.current) clearTimeout(t.current);
    setOpenDropdown(key);
  };
  const closeMenu = (key) => {
    const t = key === "services" ? servicesTimer : engageTimer;
    t.current = setTimeout(
      () => setOpenDropdown(prev => (prev === key ? null : prev)),
      130
    );
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">

          {/* Logo — always goes to home */}
          <div className="brand">
            <Link to="/" className="brand-link">
              <div className="brand-word">
                <span className="brand-script">Emmanuel Solutions</span>
                <span className="brand-tagline">Change for Good</span>
              </div>
            </Link>
          </div>

          {/* ── Desktop nav ───────────────────────────── */}
          <nav className="nav-desktop">

            {/* Services dropdown — items link to detail pages */}
            <div className="nav-group"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={() => closeMenu("services")}
            >
              <button className="nav-link dropdown-trigger">
                Services <span className="chevron">▼</span>
              </button>
              <AnimatePresence>
                {openDropdown === "services" && (
                  <motion.div className="dropdown-menu"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    onMouseEnter={() => openMenu("services")}
                    onMouseLeave={() => closeMenu("services")}
                  >
                    <Link to="/services/sustainable-tech"    className="dropdown-item" onClick={() => setOpenDropdown(null)}>Sustainable Technology</Link>
                    <Link to="/services/circular-economy"    className="dropdown-item" onClick={() => setOpenDropdown(null)}>Circular Economy</Link>
                    <Link to="/services/innovation-training" className="dropdown-item" onClick={() => setOpenDropdown(null)}>Innovation Training</Link>
                    <Link to="/services/industrial-marketing" className="dropdown-item" onClick={() => setOpenDropdown(null)}>Industrial Marketing</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Home-section links — scroll to section regardless of current page */}
            <a href="/#case-studies" className="nav-link" onClick={scrollTo("case-studies")}>Our Work</a>
            <a href="/#about"        className="nav-link" onClick={scrollTo("about")}>About</a>
            <a href="/#insights"     className="nav-link" onClick={scrollTo("insights")}>Insights</a>

            {/* Engage dropdown */}
            <div className="nav-group"
              onMouseEnter={() => openMenu("engage")}
              onMouseLeave={() => closeMenu("engage")}
            >
              <button className="nav-link dropdown-trigger">
                Engage <span className="chevron">▼</span>
              </button>
              <AnimatePresence>
                {openDropdown === "engage" && (
                  <motion.div className="dropdown-menu"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    onMouseEnter={() => openMenu("engage")}
                    onMouseLeave={() => closeMenu("engage")}
                  >
                    <a href="/#contact" className="dropdown-item" onClick={(e) => { setOpenDropdown(null); scrollTo("contact")(e); }}>Get Consultation</a>
                    <a href="/#contact" className="dropdown-item" onClick={(e) => { setOpenDropdown(null); scrollTo("contact")(e); }}>Explore Partnership</a>
                    <a href="/#contact" className="dropdown-item" onClick={(e) => { setOpenDropdown(null); scrollTo("contact")(e); }}>Innovation Training</a>
                    <a href="mailto:isaac@emmanuel-solutions.in" className="dropdown-item">Direct Email ↗</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="/#contact" className="btn btn-primary btn-nav" onClick={scrollTo("contact")}>
              Get Started
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile nav ────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav className="nav-mobile"
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
          >
            <div className="mobile-menu-content">
              <p className="mobile-section-label">Services</p>
              <Link to="/services/sustainable-tech"     onClick={closeMobile} className="mobile-nav-link">Sustainable Technology</Link>
              <Link to="/services/circular-economy"     onClick={closeMobile} className="mobile-nav-link">Circular Economy</Link>
              <Link to="/services/innovation-training"  onClick={closeMobile} className="mobile-nav-link">Innovation Training</Link>
              <Link to="/services/industrial-marketing" onClick={closeMobile} className="mobile-nav-link">Industrial Marketing</Link>
              <hr className="mobile-divider" />
              <a href="/#case-studies" onClick={(e) => { closeMobile(); scrollTo("case-studies")(e); }} className="mobile-nav-link">Our Work</a>
              <a href="/#about"        onClick={(e) => { closeMobile(); scrollTo("about")(e); }}        className="mobile-nav-link">About</a>
              <a href="/#insights"     onClick={(e) => { closeMobile(); scrollTo("insights")(e); }}     className="mobile-nav-link">Insights</a>
              <hr className="mobile-divider" />
              <a href="/#contact" onClick={(e) => { closeMobile(); scrollTo("contact")(e); }} className="mobile-nav-link mobile-nav-cta">Get Consultation</a>
              <a href="mailto:isaac@emmanuel-solutions.in" className="mobile-nav-link">Direct Email ↗</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="mobile-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>
    </>
  );
}
