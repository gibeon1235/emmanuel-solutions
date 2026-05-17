import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

import { Navigation }         from "./components/Navigation";
import { CookieConsent }      from "./components/CookieConsent";
import { ServiceCard }        from "./components/ServiceCard";
import { CaseStudy }          from "./components/CaseStudy";
import { TeamMember }         from "./components/TeamMember";
import { InsightCard }        from "./components/InsightCard";
import { ContactForm }        from "./components/ContactForm";
import { Footer }             from "./components/Footer";
import { ServiceDetailPage }  from "./pages/ServiceDetailPage";
import { InsightDetailPage }  from "./pages/InsightDetailPage";

import {
  services, caseStudies, team, insights, galleryImages, heroStats
} from "./data/content";

// ── Scroll to top on route change ────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ── Animations ───────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};
const reveal = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// ── Gallery image with error fallback ────────────────────
function GalleryImage({ img, index }) {
  const [broken, setBroken] = useState(false);
  return (
    <motion.figure className="gallery-card"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index} variants={fadeUp}
    >
      <div className="gallery-img-wrap">
        {!broken ? (
          <img src={img.src} alt={img.alt} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="gallery-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>{img.alt}</span>
            <small>Add image to /public/assets/</small>
          </div>
        )}
      </div>
      <figcaption>{img.caption}</figcaption>
    </motion.figure>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────
function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.25 });

  return (
    <>
      <CookieConsent />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navigation />

      <main>

        {/* HERO ───────────────────────────────────── */}
        <section id="home" className="hero">
          <div className="hero-content">
            <motion.p className="eyebrow" initial="hidden" animate="visible" variants={fadeUp}>
              Strategic Consultancy · Navi Mumbai
            </motion.p>
            <motion.h1 initial="hidden" animate="visible" custom={1.5} variants={fadeUp}>
              Transforming Industries.<br />Sustaining the Future.
            </motion.h1>
            <motion.p className="lead" initial="hidden" animate="visible" custom={2.5} variants={fadeUp}>
              Emmanuel Solutions guides organisations through sustainable technology,
              circular economy transformation, and innovation capability — backed by
              30+ years of leadership at Bayer MaterialScience and Covestro.
            </motion.p>
            <motion.div className="hero-ctas" initial="hidden" animate="visible" custom={3.5} variants={fadeUp}>
              <a className="btn btn-primary" href="#about">Explore Our Work</a>
              <a className="btn btn-secondary"
                 href="/docs/emmanuel-solutions-profile.html"
                 target="_blank" rel="noreferrer">
                Download One-Pager ↗
              </a>
            </motion.div>
            <motion.div className="hero-stats" initial="hidden" animate="visible" custom={4.5} variants={fadeUp}>
              {heroStats.map(s => (
                <div key={s.label} className="hero-stat">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT ──────────────────────────────────── */}
        <div className="section-alt" id="about">
          <motion.div className="section about-section"
            variants={reveal} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="section-label">About Emmanuel Solutions</div>
            <div className="about-grid">
              <div className="about-text">
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  A Venture Built on Three Decades of Deep Industry Experience
                </motion.h2>
                <motion.p className="about-lead" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Emmanuel Solutions is conceived to deliver transformational initiatives through
                  two defining phenomena of this century:{" "}
                  <strong>Sustainable Technologies</strong> and{" "}
                  <strong>Training in Innovation and Industrial Marketing</strong>.
                </motion.p>
                <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  We engage with exceptional technologies in renewable energy, energy efficiency,
                  sustainable materials, and sustainable agriculture — specifically addressing pain
                  points in <em>construction</em>, <em>food security</em>, and the{" "}
                  <em>environment</em>. Within this, we focus on Plastic Pollution Cleanups and
                  Circular Economy: waste management technologies including collection and upcycling
                  of waste for continued use through a non-linear economic model.
                </motion.p>
                <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  As a Certified Consultant of the{" "}
                  <strong>Creatrix Innovation Model</strong>, we impart training that uplifts
                  creativity and risk-taking indices through structured assessment — leading to
                  conscious methods that increase your organisation's innovation capacity.
                </motion.p>
              </div>

              <motion.div className="founder-card" variants={fadeUp} custom={2}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <div className="founder-avatar">
                  

                  <img src="/assets/isaac-headshot.jpg" alt="Isaac Emmanuel Yenubari" />
                </div>
                <div className="founder-name">Isaac Emmanuel Yenubari</div>
                <div className="founder-role">Founder &amp; Principal Consultant</div>
                <p className="founder-bio">
                  30+ years in the polymer industry across Sales, Marketing, Business Development,
                  Advocacy, Innovation and Sustainability — almost entirely with multinationals that
                  invented high-tech materials:{" "}
                  <strong>Bayer MaterialScience / Covestro</strong>.
                </p>
                <div className="founder-education">M.Sc. Polymer Chemistry · Navi Mumbai</div>
                <div className="founder-assocs">
                  <span className="assoc-badge">IPUA</span>
                  <span className="assoc-badge">India Insulation Forum</span>
                  <span className="assoc-badge">Spray Foam Alliance</span>
                  <span className="assoc-badge">PU Today — Editor</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* SERVICES ───────────────────────────────── */}
        <motion.section id="services" className="section"
          variants={reveal} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="section-label">What We Do</div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Four Domains of Practice
          </motion.h2>
          <motion.p className="section-intro" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Each service domain is grounded in hands-on deployment — not theory.
            We bring industry relationships, technical depth, and 30+ years of market intelligence.
          </motion.p>
          <div className="grid two">
            {services.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx + 1} />
            ))}
          </div>
        </motion.section>

        <hr className="section-rule" />

        {/* GALLERY ────────────────────────────────── */}
        <motion.section id="gallery" className="section"
          variants={reveal} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="section-label">On the Ground</div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Projects in Action
          </motion.h2>
          <motion.p className="section-intro" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            From inauguration ceremonies to interior commissioning — real installations,
            real communities, real impact.
          </motion.p>
          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <GalleryImage key={idx} img={img} index={idx + 1} />
            ))}
          </div>
        </motion.section>

        {/* CASE STUDIES ───────────────────────────── */}
        <div className="section-alt">
          <motion.section id="case-studies" className="section"
            variants={reveal} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="section-label">Our Work</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Featured Projects &amp; Partnerships
            </motion.h2>
            <motion.p className="section-intro" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Real-world applications across sustainable technology, circular economy,
              and innovation deployment.
            </motion.p>
            <div className="grid three">
              {caseStudies.map((study, idx) => (
                <CaseStudy key={study.id} study={study} index={idx + 1} />
              ))}
            </div>
          </motion.section>
        </div>

        {/* INSIGHTS ───────────────────────────────── */}
        <motion.section id="insights" className="section"
          variants={reveal} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="section-label">Thought Leadership</div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Latest Insights
          </motion.h2>
          <motion.p className="section-intro" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Perspectives on sustainability, circular economy, innovation, and industrial
            strategy from 30+ years at the forefront of the polymer and materials industry.
          </motion.p>
          <div className="grid three">
            {insights.map((insight, idx) => (
              <InsightCard key={insight.id} insight={insight} index={idx + 1} />
            ))}
          </div>
        </motion.section>

        {/* CONTACT ────────────────────────────────── */}
        <div className="contact-section" id="contact">
          <div className="section">
            <div className="contact-container">
              <div className="contact-header">
                <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <span>Get In Touch</span>
                </div>
                <motion.h2 style={{ color: "#fff" }}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Let's Build Something Together
                </motion.h2>
                <motion.p className="contact-intro"
                  variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Whether you need consulting, a strategic partnership, innovation training,
                  or simply want to explore what's possible — we'd love to hear from you.
                </motion.p>
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

// ── ROOT APP WITH ROUTES ──────────────────────────────────
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"                      element={<HomePage />} />
        <Route path="/services/:serviceId"   element={<ServiceDetailPage />} />
        <Route path="/insights/:insightId"   element={<InsightDetailPage />} />
        {/* Catch-all → home */}
        <Route path="*"                      element={<HomePage />} />
      </Routes>
    </>
  );
}
