import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { Footer }     from "../components/Footer";
import { insightDetails } from "../data/content";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });
}

export function InsightDetailPage() {
  const { insightId } = useParams();
  const navigate      = useNavigate();
  const article       = insightDetails[insightId];

  useEffect(() => { window.scrollTo(0, 0); }, [insightId]);

  const goToContact = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  if (!article) {
    return (
      <div className="page">
        <Navigation />
        <div className="detail-not-found">
          <h2>Article not found</h2>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherArticles = Object.entries(insightDetails).filter(([id]) => id !== insightId);

  return (
    <div className="page">
      <Navigation />

      {/* ── ARTICLE HERO ────────────────────────────── */}
      <div className="detail-hero article-hero">
        <div className="detail-hero-inner">
          <motion.div className="breadcrumb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <a href="/#insights" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" }), 120); }}>
              Insights
            </a>
            <span className="breadcrumb-sep">›</span>
            <span>{article.category}</span>
          </motion.div>

          <motion.div className="insight-meta" style={{ marginBottom: "1.2rem" }}
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <span className="insight-category">{article.category}</span>
            <span className="insight-date">{formatDate(article.date)}</span>
            <span className="insight-date">{article.readTime} read</span>
          </motion.div>

          <motion.h1 className="article-title"
            variants={fadeUp} custom={1.5} initial="hidden" animate="visible"
          >
            {article.title}
          </motion.h1>

          <motion.div className="article-byline"
            variants={fadeUp} custom={2.5} initial="hidden" animate="visible"
          >
            <div className="byline-avatar">IE</div>
            <div>
              <span className="byline-name">{article.author}</span>
              <span className="byline-role">Founder &amp; Principal Consultant, Emmanuel Solutions</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── ARTICLE BODY ────────────────────────────── */}
      <main className="detail-main">
        <div className="article-body">

          {/* Main content */}
          <div className="article-content">
            <motion.p className="article-intro"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {article.intro}
            </motion.p>

            {article.sections.map((section, i) => (
              <motion.div key={i} className="article-section"
                variants={fadeUp} custom={1}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              >
                <h2 className="article-section-heading">{section.heading}</h2>
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </motion.div>
            ))}

            {/* Author + CTA at bottom of article */}
            <div className="article-footer">
              <div className="article-author-card">
                <div className="byline-avatar byline-avatar-lg">IE</div>
                <div>
                  <p className="byline-name">{article.author}</p>
                  <p className="byline-role">Founder &amp; Principal Consultant, Emmanuel Solutions</p>
                  <p className="byline-bio">
                    30+ years of polymer industry leadership at Bayer MaterialScience and Covestro.
                    Advisor to sustainable technology innovators across food security and circular economy.
                  </p>
                </div>
              </div>

              <div className="article-cta">
                <h3>Discuss This Topic</h3>
                <p>Interested in how these ideas apply to your organisation? Isaac is happy to talk.</p>
                <a href={`https://mail.google.com/mail/?view=cm&to=emmanuelsolutions00@gmail.com&subject=Re: ${article.title}`}
                   className="btn btn-primary">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="article-sidebar">
            <div className="sidebar-card">
              <h4 className="detail-card-label">About the Author</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.7, margin: 0 }}>
                Isaac Emmanuel Yenubari brings 30+ years of leadership at Bayer MaterialScience and Covestro,
                with deep expertise in polymer chemistry, sustainability, and industrial market development.
              </p>
            </div>

            <div className="sidebar-card">
              <h4 className="detail-card-label">More Insights</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {otherArticles.map(([id, ins]) => (
                  <Link key={id} to={`/insights/${id}`} className="sidebar-insight-link">
                    <span className="insight-category" style={{ fontSize: "0.65rem" }}>{ins.category}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.4, display: "block", marginTop: "0.3rem" }}>
                      {ins.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h4 className="detail-card-label">Work With Us</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.6, margin: "0 0 0.8rem" }}>
                Explore how Emmanuel Solutions can help your organisation.
              </p>
              <a href="/#contact" className="btn btn-primary btn-small"
                 style={{ display: "inline-flex" }}
                 onClick={goToContact}>
                Get Started
              </a>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
