import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export function DivisionCard({ division, index }) {
  return (
    <motion.div
      variants={fadeUp} custom={index}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link to={`/group/${division.id}`} className={`division-card ${division.comingSoon ? "is-coming-soon" : ""}`}>
        <div className="division-card-top">
          <span className="division-abbr">{division.abbr}</span>
          <span className={`division-status ${division.comingSoon ? "status-soon" : "status-live"}`}>
            {division.status}
          </span>
        </div>
        <h3 className="division-name">{division.name}</h3>
        <p className="division-tagline">{division.tagline}</p>
        <ul className="division-highlights">
          {division.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
        <span className="division-cta">
          {division.comingSoon ? "Preview" : "Explore"} <span className="division-arrow">→</span>
        </span>
      </Link>
    </motion.div>
  );
}
