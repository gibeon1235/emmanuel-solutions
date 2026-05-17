import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Footer }     from "../components/Footer";
import { CaseStudy }  from "../components/CaseStudy";
import { serviceDetails, caseStudies } from "../data/content";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

const SERVICE_LABELS = {
  "sustainable-tech":     "Sustainable Technology",
  "circular-economy":     "Circular Economy",
  "innovation-training":  "Innovation Training",
  "industrial-marketing": "Industrial Marketing"
};

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate      = useNavigate();
  const detail        = serviceDetails[serviceId];

  useEffect(() => { window.scrollTo(0, 0); }, [serviceId]);

  // Navigate home then scroll to contact
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
          <h2>Service not found</h2>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedCaseStudies = caseStudies.filter(c => detail.projects.includes(c.id));

  return (
    <div className="page">
      <Navigation />

      {/* ── HERO ──────────────────────────────────────── */}
      <div className="detail-hero" data-service={serviceId}>
        <div className="detail-hero-inner">
          <motion.div className="breadcrumb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <a href="/#services" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 120); }}>
              Services
            </a>
            <span className="breadcrumb-sep">›</span>
            <span>{SERVICE_LABELS[serviceId]}</span>
          </motion.div>

          <motion.div className="detail-hero-label" variants={fadeUp} initial="hidden" animate="visible">
            Service
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1.5} initial="hidden" animate="visible">
            {detail.title}
          </motion.h1>

          <motion.p className="detail-hero-tagline" variants={fadeUp} custom={2.5} initial="hidden" animate="visible">
            {detail.tagline}
          </motion.p>

          <motion.div variants={fadeUp} custom={3.5} initial="hidden" animate="visible">
            <a href="#service-contact" className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("service-contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Discuss This Service
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

              <motion.div className="detail-audience-card"
                variants={fadeUp} custom={2}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <h4 className="detail-card-label">Who This Is For</h4>
                <ul className="detail-audience-list">
                  {detail.audience.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <a href="#service-contact" className="btn btn-ghost btn-small"
                  style={{ marginTop: "1.2rem" }}
                  onClick={(e) => { e.preventDefault(); document.getElementById("service-contact")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Get in Touch →
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <hr className="detail-rule" />

        {/* ── APPROACH ──────────────────────────────────── */}
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

        <hr className="detail-rule" />

        {/* ── FOCUS AREAS ───────────────────────────────── */}
        <div className="detail-section-alt">
          <div className="detail-section-inner" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <div className="section-label">Focus Areas</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What We Cover
            </motion.h2>
            <div className="detail-focus-grid" style={{ marginTop: "2rem" }}>
              {detail.focusAreas.map((area, i) => (
                <motion.div key={i} className="detail-focus-card"
                  variants={fadeUp} custom={i + 1}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  <h3>{area.title}</h3>
                  {area.body.split("\n\n").map((p, j) => <p key={j}>{p}</p>)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURED ENGAGEMENTS ─────────────────────── */}
        {detail.featuredEngagements && detail.featuredEngagements.length > 0 && (
          <>
            <hr className="detail-rule" />
            <section className="detail-section">
              <div className="detail-section-inner">
                <div className="section-label">In Action</div>
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Recent Engagements
                </motion.h2>
                {detail.featuredEngagements.map((eng, i) => (
                  <motion.div key={i} className="engagement-card"
                    variants={fadeUp} custom={i + 1}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                  >
                    <div className="engagement-header">
                      <div>
                        <h3 className="engagement-title">{eng.title}</h3>
                        <p className="engagement-meta">{eng.date} · {eng.location}</p>
                      </div>
                    </div>
                    <p className="engagement-desc">{eng.description}</p>
                    {eng.quote && (
                      <blockquote className="engagement-quote">
                        <p>"{eng.quote}"</p>
                        <cite>— Isaac Emmanuel Yenubari, Emmanuel Solutions</cite>
                      </blockquote>
                    )}
                    {eng.images && eng.images.length > 0 && (
                      <div className="engagement-gallery">
                        {eng.images.map((src, j) => (
                          <div key={j} className="engagement-img-wrap">
                            <img src={src} alt={`${eng.title} — photo ${j + 1}`} loading="lazy" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── RELATED CASE STUDIES ──────────────────────── */}
        {relatedCaseStudies.length > 0 && (
          <>
            <hr className="detail-rule" />
            <section className="detail-section">
              <div className="detail-section-inner">
                <div className="section-label">Real-World Application</div>
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Projects &amp; Partnerships
                </motion.h2>
                <div className={`grid ${relatedCaseStudies.length > 1 ? "two" : ""}`} style={{ marginTop: "2rem" }}>
                  {relatedCaseStudies.map((study, i) => (
                    <CaseStudy key={study.id} study={study} index={i + 1} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── CONTACT CTA ───────────────────────────────── */}
        <div className="contact-section" id="service-contact">
          <div className="detail-section-inner" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <div className="contact-container">
              <div className="contact-header">
                <motion.h2 style={{ color: "#fff" }}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  Explore How We Can Work Together
                </motion.h2>
                <motion.p className="contact-intro"
                  variants={fadeUp} custom={1}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  Tell us about your challenge. We'll respond within one business day.
                </motion.p>
              </div>
              <div className="detail-cta-buttons">
                <a href={`mailto:isaac@emmanuel-solutions.in?subject=Enquiry: ${detail.title}`}
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
