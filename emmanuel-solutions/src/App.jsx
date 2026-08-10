import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { LazyMotion, domAnimation, m, useScroll, useSpring } from "framer-motion";

import { Navigation }  from "./components/Navigation";
import { ServiceCard } from "./components/ServiceCard";
import { CaseStudy }   from "./components/CaseStudy";
import { InsightCard } from "./components/InsightCard";
import { ContactForm } from "./components/ContactForm";
import { Footer }      from "./components/Footer";
import { HeroSystem }  from "./components/HeroSystem";
import { Reveal, MaskLine } from "./components/Reveal";
import { useAct } from "./hooks/useAct";
import { Seo }         from "./components/Seo";
import { ErrorBoundary } from "./components/ErrorBoundary";

import {
  services, caseStudies, insights, galleryImages, heroCopy, practiceAreas, credibilityStats, aiCapabilities
} from "./data/content";

/* Detail pages are code-split — they are never needed on first paint. */
const ServiceDetailPage   = lazy(() => import("./pages/ServiceDetailPage").then(m => ({ default: m.ServiceDetailPage })));
const InsightDetailPage   = lazy(() => import("./pages/InsightDetailPage").then(m => ({ default: m.InsightDetailPage })));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage").then(m => ({ default: m.CaseStudyDetailPage })));
const AlliancePage        = lazy(() => import("./pages/AlliancePage").then(m => ({ default: m.AlliancePage })));

/* Scroll behaviour that respects the back button.
   On a new navigation we go to the top; on back/forward the browser's
   own restored position is left alone. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}

function GalleryImage({ img, index }) {
  const [broken, setBroken] = useState(false);
  return (
    <Reveal as="figure" className="gallery-card" index={index}>
      <div className="gallery-img-wrap">
        {!broken ? (
          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" width="800" height="450"
               onError={() => setBroken(true)} />
        ) : (
          <div className="gallery-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
            <span>{img.alt}</span>
          </div>
        )}
      </div>
      <figcaption>{img.caption}</figcaption>
    </Reveal>
  );
}

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.25 });
  const [focus, setFocus] = useState(null);
  const act = useAct(1);

  return (
    <>
      <Seo
        title={null}
        description="Emmanuel Solutions is a strategic consultancy in sustainable technology, circular economy, innovation capability and industrial marketing, with a dedicated enterprise AI division. Founded on 30+ years at Bayer MaterialScience and Covestro."
        path="/"
      />
      <m.div className="scroll-progress" style={{ scaleX }} />

      {/* One system for the whole page. Acts advance as the visitor descends. */}
      <HeroSystem act={act} focus={focus} page />

      <Navigation onFocusChange={setFocus} />

      <main id="main">

        {/* ── ACT 1 · HERO ─────────────────────────────── */}
        <section id="home" className="es-hero" aria-label="Introduction">

          <div className="es-hero-inner">
            <m.p className="es-eyebrow"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span>{heroCopy.eyebrow}</span>
              <span className="es-rule" aria-hidden="true" />
              <span>{heroCopy.location}</span>
            </m.p>

            <h1 className="es-display">
              <MaskLine delay={0.42}>{heroCopy.line1}</MaskLine>
              <MaskLine delay={0.51} className="es-display-em">{heroCopy.line2}</MaskLine>
            </h1>

            <m.p className="es-lead"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>
              {heroCopy.lead}
            </m.p>

            <m.div className="es-hero-ctas"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.84, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>
              <a className="btn btn-primary" href={heroCopy.primaryCta.href}>
                {heroCopy.primaryCta.label} <span className="es-arrow" aria-hidden="true">→</span>
              </a>
              <a className="es-division-cta" href="#ai-solutions"
                    onMouseEnter={() => setFocus("ai")} onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus("ai")} onBlur={() => setFocus(null)}>
                <span>
                  <span className="es-division-head">
                    {heroCopy.divisionCta.label}
                    <span className="es-division-badge">{heroCopy.divisionCta.badge}</span>
                  </span>
                  <span className="es-division-note">{heroCopy.divisionCta.note}</span>
                </span>
                <span className="es-division-arrow" aria-hidden="true">→</span>
              </a>
            </m.div>

            <m.p className="es-credentials"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.94, duration: 0.8 }}>
              <span className="es-significance">
                {heroCopy.credentials}
                <span className="es-significance-light" aria-hidden="true" />
              </span>
            </m.p>
          </div>

          <div className="es-rail">
            {practiceAreas.map((p, i) => (
              <m.a key={p.id} className="es-rail-item" href={`/services/${p.id}`}
                onMouseEnter={() => setFocus(p.focus)} onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(p.focus)} onBlur={() => setFocus(null)}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.98 + i * 0.09, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>
                <span className="es-rail-name">
                  <span className="es-rail-tone" style={{ background: p.tone }} aria-hidden="true" />
                  {p.name}
                </span>
                <span className="es-rail-note">{p.note}</span>
              </m.a>
            ))}
          </div>
        </section>

        {/* ── ACT 2 · CREDIBILITY ──────────────────────── */}
        <div className="section-alt" id="about">
          <div className="section about-section">
            <div className="section-label">The founder</div>
            <div className="about-grid">
              <div className="about-text">
                <Reveal as="h2">Three decades inside the industry</Reveal>
                <Reveal as="p" index={1} className="about-lead">
                  Isaac Emmanuel Yenubari spent more than thirty years in the polymer industry across sales,
                  marketing, business development, advocacy, innovation and sustainability — almost entirely
                  with the multinationals that invented high-tech materials,{" "}
                  <strong>Bayer MaterialScience and Covestro</strong>.
                </Reveal>
                <Reveal as="p" index={2}>
                  He was a founding contributor to the <strong>Spray Foam Alliance of India</strong>, an initiative
                  of the Indian Polyurethane Association, serving on its content and promotion teams and organising
                  its first technical training programmes in 2016. Spray-applied polyurethane insulation is formally
                  standardised in India under IS 12432 (Part 3):2002.
                </Reveal>
                <Reveal as="p" index={3}>
                  Emmanuel Solutions was founded to apply that experience directly — engaging with exceptional
                  technologies in renewable energy, energy efficiency, sustainable materials and sustainable
                  agriculture, addressing pain points in construction, food security and the environment.
                </Reveal>

                <div className="es-stats">
                  {credibilityStats.map((stat, i) => (
                    <Reveal className="es-stat" index={i + 1} key={stat.label}>
                      <span className="es-stat-value">{stat.value}</span>
                      <span className="es-stat-label">{stat.label}</span>
                      <span className="es-stat-owner">{stat.owner}</span>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal className="founder-card" index={2}>
                <div className="founder-avatar">
                  <img src="/assets/isaac-headshot.jpg" alt="Isaac Emmanuel Yenubari"
                       width="1045" height="1280" loading="lazy" decoding="async" />
                </div>
                <div className="founder-name">Isaac Emmanuel Yenubari</div>
                <div className="founder-role">Founder &amp; Principal Consultant</div>
                <p className="founder-bio">
                  M.Sc. Polymer Chemistry. Last corporate role: Inclusive Business, Covestro India.
                  Certified Consultant of the Creatrix Innovation Model.
                </p>
                <div className="founder-assocs">
                  <span className="assoc-badge">IPUA</span>
                  <span className="assoc-badge">SFAI — founding contributor</span>
                  <span className="assoc-badge">India Insulation Forum</span>
                  <span className="assoc-badge">PU Today — Editor</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── ACT 3 · SERVICES ─────────────────────────── */}
        <section id="services" className="section">
          <div className="section-label">What we do</div>
          <Reveal as="h2">Four practice areas. One standard of work.</Reveal>
          <Reveal as="p" index={1} className="section-intro">
            Each practice area is grounded in hands-on deployment rather than theory — industry relationships,
            technical depth and thirty years of market intelligence.
          </Reveal>
          <div className="grid two">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i + 1} />
            ))}
          </div>
        </section>

        {/* ── ACT 4 · AI SOLUTIONS ─────────────────────── */}
        <section className="es-division-band" id="ai-solutions" aria-labelledby="ai-heading">
          <HeroSystem act={4} focus={focus} theme="dark" />
          <div className="es-division-inner">
            <div className="es-division-label">A division of Emmanuel Solutions</div>
            <Reveal as="h2" id="ai-heading" className="es-division-title">
              Intelligence, woven through the business.
            </Reveal>
            <Reveal as="p" index={1} className="es-division-lead">
              AI Solutions applies the same outside-in discipline to enterprise AI. We identify where
              intelligence genuinely returns value, build it to production standard, and hand your team
              the capability to run it — <em>not</em> a pilot that never leaves the slide deck.
            </Reveal>

            <div className="es-cap-grid">
              {["Strategy", "Automation", "Systems", "Commercial"].map((group, gi) => (
                <Reveal className="es-cap-group" index={gi + 1} key={group}>
                  <h3 className="es-cap-group-title">
                    <span className="es-cap-rule" aria-hidden="true" />
                    {group}
                  </h3>
                  <ul className="es-cap-list">
                    {aiCapabilities.filter((c) => c.group === group).map((c) => (
                      <li className="es-cap" key={c.title}>
                        <span className="es-cap-title">{c.title}</span>
                        <span className="es-cap-desc">{c.desc}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal index={2} className="es-division-actions">
              <a href="#contact" className="btn btn-primary">
                Discuss an AI project <span className="es-arrow" aria-hidden="true">→</span>
              </a>
              <span className="es-division-note-line">
                Typical engagements begin with a two-week discovery.
              </span>
            </Reveal>
          </div>
        </section>

        {/* ── ACT 5 · PROOF ────────────────────────────── */}
        <div className="section-alt">
          <section id="case-studies" className="section">
            <div className="section-label">Partnerships &amp; proof</div>
            <Reveal as="h2">Technologies we have helped bring to market</Reveal>
            <Reveal as="p" index={1} className="section-intro">
              Emmanuel Solutions advises the organisations below on commercialisation, market
              positioning and partnerships. <strong>All performance figures shown belong to the
              partner organisation named.</strong>
            </Reveal>
            <div className="grid three">
              {caseStudies.map((study, i) => <CaseStudy key={study.id} study={study} index={i + 1} />)}
            </div>

            <div id="gallery" className="es-proof-gallery">
              <div className="section-label">On the ground</div>
              <Reveal as="h3" className="es-subhead">Installations, training and community</Reveal>
              <div className="gallery-grid">
                {galleryImages.map((img, i) => <GalleryImage key={i} img={img} index={i + 1} />)}
              </div>
            </div>
          </section>
        </div>

        <section id="insights" className="section">
          <div className="section-label">Thought leadership</div>
          <Reveal as="h2">Latest insights</Reveal>
          <div className="grid three">
            {insights.map((insight, i) => <InsightCard key={insight.id} insight={insight} index={i + 1} />)}
          </div>
        </section>

        <div className="contact-section" id="contact">
          <div className="section">
            <div className="contact-container">
              <div className="contact-header">
                <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}><span>Get in touch</span></div>
                <Reveal as="h2" style={{ color: "#fff" }}>Let's build something together</Reveal>
                <Reveal as="p" index={1} className="contact-intro">
                  Whether you need consulting, a strategic partnership, innovation training or enterprise AI —
                  we'd like to hear from you.
                </Reveal>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

function RouteFallback() {
  return <div className="es-route-fallback" role="status" aria-live="polite">Loading…</div>;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#main" className="es-skip">Skip to content</a>
      <ScrollManager />
      <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/insights/:insightId" element={<InsightDetailPage />} />
          <Route path="/case-studies/:caseStudyId" element={<CaseStudyDetailPage />} />
          <Route path="/alliances/:allianceId" element={<AlliancePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </LazyMotion>
  );
}
