import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Footer }     from "../components/Footer";
import { caseStudyDetails } from "../data/content";

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

export function CaseStudyDetailPage() {
  const { caseStudyId } = useParams();
  const navigate        = useNavigate();
  const detail          = caseStudyDetails[caseStudyId];

  useEffect(() => { window.scrollTo(0, 0); }, [caseStudyId]);

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
          <h2>Case study not found</h2>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page cs-page" data-study={caseStudyId}>
      <Navigation />

      {/* ── HERO ── */}
      <div className="cs-hero">
        <div className="cs-hero__grid" />
        <div className="cs-hero__glow" />
        <div className="cs-hero__inner">
          <motion.div className="breadcrumb cs-breadcrumb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <a href="/#case-studies" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" }), 120); }}>
              Our Work
            </a>
            <span className="breadcrumb-sep">›</span>
            <span>{detail.title}</span>
          </motion.div>

          <motion.div className="cs-hero__eyebrow" variants={fadeUp} initial="hidden" animate="visible">
            Case Study · {SERVICE_LABELS[detail.service] || detail.service}
          </motion.div>

          <motion.div className="cs-hero__logo" variants={fadeUp} custom={1.5} initial="hidden" animate="visible">
            {detail.brandName}
          </motion.div>

          <motion.h1 className="cs-hero__product" variants={fadeUp} custom={2} initial="hidden" animate="visible">
            {detail.productName}
          </motion.h1>

          <motion.p className="cs-hero__tagline" variants={fadeUp} custom={2.5} initial="hidden" animate="visible">
            {detail.tagline}
          </motion.p>

          <motion.div className="cs-hero__stats" variants={fadeUp} custom={3} initial="hidden" animate="visible">
            {detail.heroStats.map((s, i) => (
              <div className="cs-stat" key={i}>
                <span className="cs-stat__val">{s.val}</span>
                <span className="cs-stat__label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <main className="cs-main">

        {/* ── CHALLENGE + SEGMENTS ── */}
        <section className="cs-section">
          <div className="cs-section__inner cs-split">
            <motion.div className="cs-split__col"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            >
              <div className="section-label">The Challenge</div>
              <motion.h2 variants={fadeUp}>
                {detail.challenge.heading}
              </motion.h2>
              {detail.challenge.body.map((p, i) => (
                <motion.p key={i} variants={fadeUp} custom={i + 1}>{p}</motion.p>
              ))}
            </motion.div>

            <motion.div className="cs-split__col"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            >
              <div className="section-label">Who It Serves</div>
              <motion.h2 variants={fadeUp}>Customer Segments</motion.h2>
              <div className="cs-segments">
                {detail.segments.map((seg, i) => (
                  <motion.div className="cs-segment-card" key={i} variants={fadeUp} custom={i + 1}>
                    <span className="cs-segment-card__icon">{seg.icon}</span>
                    <div>
                      <strong>{seg.title}</strong>
                      <p>{seg.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="cs-rule" />

        {/* ── PRODUCT ── */}
        <section className="cs-section cs-section--dark">
          <div className="cs-section__inner">
            <div className="section-label cs-label--light">The Product</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {detail.product.heading}
            </motion.h2>
            <div className="cs-product-grid">
              <div className="cs-product-text">
                {detail.product.body.map((p, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {p}
                  </motion.p>
                ))}
              </div>
              <div className="cs-pillars">
                {detail.product.pillars.map((p, i) => (
                  <motion.div className="cs-pillar" key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <span className="cs-pillar__icon">{p.icon}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="cs-rule" />

        {/* ── TECH PILLARS ── */}
        <section className="cs-section">
          <div className="cs-section__inner">
            <div className="section-label">Technology</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {detail.technology.heading}
            </motion.h2>
            <div className="cs-tech-grid">
              {detail.technology.pillars.map((t, i) => (
                <motion.div className="cs-tech-card" key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <hr className="cs-rule" />

        {/* ── BUSINESS MODELS ── */}
        {detail.businessModels && (
          <section className="cs-section cs-section--dark">
            <div className="cs-section__inner">
              <div className="section-label cs-label--light">Commercial Models</div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Customer-Centric Business Models
              </motion.h2>
              <div className="cs-biz-grid">
                {detail.businessModels.map((m, i) => (
                  <motion.div className="cs-biz-card" key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <span className="cs-biz-card__icon">{m.icon}</span>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <hr className="cs-rule" />

        {/* ── IMPACT ── */}
        <section className="cs-section cs-impact-section">
          <div className="cs-impact-bg" />
          <div className="cs-section__inner cs-impact-inner">
            <motion.div className="cs-impact-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Farmer Impact
            </motion.div>
            <motion.div className="cs-impact-number" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {detail.impact.headline}
            </motion.div>
            <motion.p className="cs-impact-sub" variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {detail.impact.subline}
            </motion.p>
            <div className="cs-impact-outcomes">
              {detail.impact.outcomes.map((o, i) => (
                <motion.div className="cs-outcome" key={i} variants={fadeUp} custom={i + 3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="cs-outcome__dot" />
                  {o}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <hr className="cs-rule" />

        {/* ── MANUFACTURING + GLOBAL ── */}
        <section className="cs-section">
          <div className="cs-section__inner">
            <div className="section-label">Scale</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Manufacturing & Global Presence
            </motion.h2>
            <div className="cs-scale-grid">
              {detail.scale.map((s, i) => (
                <motion.div className="cs-scale-card" key={i} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="cs-scale-card__val">{s.val}</span>
                  <span className="cs-scale-card__label">{s.label}</span>
                </motion.div>
              ))}
            </div>
            {detail.globalCustomers && (
              <motion.div className="cs-customers" variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="cs-customers__label">Key Customers & Partners</p>
                <div className="cs-customers__grid">
                  {detail.globalCustomers.map((c, i) => (
                    <span className="cs-customer-tag" key={i}>{c}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="contact-section cs-cta" id="cs-contact">
          <div className="cs-section__inner" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <div className="contact-container">
              <div className="contact-header">
                <motion.h2 style={{ color: "#fff" }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Explore How We Can Work Together
                </motion.h2>
                <motion.p className="contact-intro" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  Interested in deploying {detail.productName} or working with Emmanuel Solutions on food security technology? Get in touch.
                </motion.p>
              </div>
              <div className="detail-cta-buttons">
                <a
                  href={`https://mail.google.com/mail/?view=cm&to=emmanuelsolutions00@gmail.com&subject=Enquiry: ${detail.title}`}
                  className="btn btn-primary"
                >
                  Email Isaac Directly
                </a>
                <a href="/#contact" className="btn btn-secondary detail-cta-secondary" onClick={goToContact}>
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
