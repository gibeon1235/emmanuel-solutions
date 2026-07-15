import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Footer }     from "../components/Footer";
import { divisionDetails } from "../data/content";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

export function DivisionDetailPage() {
  const { divisionId } = useParams();
  const navigate       = useNavigate();
  const detail         = divisionDetails[divisionId];

  useEffect(() => { window.scrollTo(0, 0); }, [divisionId]);

  const goToContact = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  if (!detail) {
    return (
      <div className="page">
        <Navigation />
        <div className="detail-not-found">
          <h2>Page not found</h2>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />

      {/* ── HERO ──────────────────────────────────────── */}
      <div className="detail-hero division-hero" data-division={divisionId}>
        <div className="detail-hero-inner">
          <motion.div className="breadcrumb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <a href="/#group" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("group")?.scrollIntoView({ behavior: "smooth" }), 120); }}>
              The Group
            </a>
            <span className="breadcrumb-sep">›</span>
            <span>{detail.title}</span>
          </motion.div>

          <motion.div className="detail-hero-label" variants={fadeUp} initial="hidden" animate="visible">
            {detail.label}
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1.5} initial="hidden" animate="visible">
            {detail.title}
          </motion.h1>

          <motion.p className="detail-hero-tagline" variants={fadeUp} custom={2.5} initial="hidden" animate="visible">
            {detail.tagline}
          </motion.p>

          <motion.div variants={fadeUp} custom={3.5} initial="hidden" animate="visible">
            <a href="/#contact" className="btn btn-primary" onClick={goToContact}>
              {detail.comingSoon ? "Register Interest" : "Start a Conversation"}
            </a>
          </motion.div>
        </div>
      </div>

      <main className="detail-main">

        {/* ── OVERVIEW ──────────────────────────────────── */}
        <section className="detail-section">
          <div className="detail-section-inner">
            <div className="detail-overview-grid">
              <div className="detail-overview-text">
                <div className="section-label">Overview</div>
                {detail.overview.map((para, i) => (
                  <motion.p key={i} className={i === 0 ? "detail-lead" : ""}
                    variants={fadeUp} custom={i + 1}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {detail.audience && (
                <motion.div className="detail-audience-card"
                  variants={fadeUp} custom={2}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  <h4 className="detail-card-label">Who This Is For</h4>
                  <ul className="detail-audience-list">
                    {detail.audience.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                  <a href="/#contact" className="btn btn-ghost btn-small"
                    style={{ marginTop: "1.2rem" }} onClick={goToContact}
                  >
                    Get in Touch →
                  </a>
                </motion.div>
              )}

              {detail.comingSoon && detail.whatToExpect && (
                <motion.div className="detail-audience-card coming-soon-card"
                  variants={fadeUp} custom={2}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  <div className="coming-soon-pill">Profile Coming Soon</div>
                  <h4 className="detail-card-label">What to Expect Here</h4>
                  <ul className="detail-audience-list">
                    {detail.whatToExpect.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                  <a href="/#contact" className="btn btn-ghost btn-small"
                    style={{ marginTop: "1.2rem" }} onClick={goToContact}
                  >
                    Be the First to Know →
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ──────────────────────────── */}
        {(detail.mission || detail.vision) && (
          <>
            <hr className="detail-rule" />
            <section className="detail-section">
              <div className="detail-section-inner">
                <div className="detail-focus-grid">
                  {detail.mission && (
                    <motion.div className="detail-focus-card"
                      variants={fadeUp} custom={1}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                      <div className="section-label">Mission</div>
                      <p className="detail-lead" style={{ marginBottom: 0 }}>{detail.mission}</p>
                    </motion.div>
                  )}
                  {detail.vision && (
                    <motion.div className="detail-focus-card"
                      variants={fadeUp} custom={2}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                      <div className="section-label">Vision</div>
                      <p className="detail-lead" style={{ marginBottom: 0 }}>{detail.vision}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── APPROACH (full divisions only) ───────────── */}
        {detail.approach && (
          <>
            <hr className="detail-rule" />
            <section className="detail-section">
              <div className="detail-section-inner">
                <div className="section-label">{detail.approach.title}</div>
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  How We Work
                </motion.h2>
                <div className="detail-steps">
                  {detail.approach.steps.map((step, i) => (
                    <motion.div key={i} className="detail-step"
                      variants={fadeUp} custom={i + 1}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                      <div className="detail-step-num">0{i + 1}</div>
                      <div className="detail-step-body">
                        <h3>{step.label}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── FOCUS AREAS ───────────────────────────────── */}
        {detail.focusAreas && (
          <div className="detail-section-alt">
            <div className="detail-section-inner" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
              <div className="section-label">What We Offer</div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Services
              </motion.h2>
              <div className="detail-focus-grid" style={{ marginTop: "2rem" }}>
                {detail.focusAreas.map((area, i) => (
                  <motion.div key={i} className="detail-focus-card"
                    variants={fadeUp} custom={i + 1}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                  >
                    <h3>{area.title}</h3>
                    <p>{area.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT CTA ───────────────────────────────── */}
        <div className="contact-section">
          <div className="detail-section-inner" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <div className="contact-container">
              <div className="contact-header">
                <motion.h2 style={{ color: "#fff" }}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  {detail.comingSoon
                    ? "Want to Hear More as This Launches?"
                    : "Explore How We Can Work Together"}
                </motion.h2>
                <motion.p className="contact-intro"
                  variants={fadeUp} custom={1}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  Tell us about your challenge. We'll respond within one business day.
                </motion.p>
              </div>
              <div className="detail-cta-buttons">
                <a href={`mailto:isaac@emmanuelsolutionss.com?subject=Enquiry: ${detail.title}`}
                   className="btn btn-primary">
                  Email Isaac Directly
                </a>
                <a href="/#contact" className="btn btn-secondary detail-cta-secondary"
                   onClick={goToContact}>
                  Use Contact Form
                </a>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
