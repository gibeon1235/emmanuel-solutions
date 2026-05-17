import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const SERVICE_LABELS = {
  "sustainable-tech":    "Sustainable Technology",
  "circular-economy":    "Circular Economy",
  "innovation-training": "Innovation Training",
  "industrial-marketing":"Industrial Marketing"
};

export function CaseStudy({ study, index }) {
  return (
    <motion.article
      className="case-study"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      variants={fadeUp}
    >
      {/* Top strip: category tag + index number */}
      <div className="case-study-category-strip">
        <span className="case-study-tag">
          {SERVICE_LABELS[study.service] || study.service}
        </span>
        <span className="case-study-number">0{index}</span>
      </div>

      {/* Title + website */}
      <div className="case-study-title-row">
        <h3>{study.title}</h3>
        {study.website && (
          <a
            href={`https://${study.website}`}
            target="_blank"
            rel="noreferrer"
            className="case-study-website"
          >
            {study.website} ↗
          </a>
        )}
      </div>

      {/* Challenge */}
      <div className="case-study-section">
        <h4>The Challenge</h4>
        <p>{study.problem}</p>
      </div>

      {/* Approach */}
      <div className="case-study-section">
        <h4>Our Approach</h4>
        <p>{study.solution}</p>
        {study.approach && <p>{study.approach}</p>}
      </div>

      {/* Features */}
      {study.features && study.features.length > 0 && (
        <div className="case-study-section">
          <h4>Key Features</h4>
          <ul className="features-list">
            {study.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      {/* Trusted by */}
      {study.clients && study.clients.length > 0 && (
        <div className="case-study-section">
          <h4>Trusted By</h4>
          <div className="clients-grid">
            {study.clients.map((c, i) => <span key={i} className="client-tag">{c}</span>)}
          </div>
        </div>
      )}

      {/* Impact */}
      <div className="case-study-section">
        <h4>Impact</h4>
        <ul className="outcomes-list">
          {study.outcomes.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>

      {/* Status */}
      {study.metrics && (
        <div className="case-study-metrics">
          <p>{study.metrics}</p>
        </div>
      )}

      {study.profileUrl && (
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--rule)" }}>
          <a href={study.profileUrl} target="_blank" rel="noreferrer"
             className="btn btn-ghost btn-small"
             style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            View Partner Profile ↗
          </a>
        </div>
      )}

      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--rule)" }}>
        <Link to={`/case-studies/${study.id}`}
          className="btn btn-ghost btn-small"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
          Read Full Case Study →
        </Link>
      </div>
    </motion.article>
  );
}
