import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export function InsightCard({ insight, index }) {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

  return (
    <motion.article className="insight-card"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index} variants={fadeUp}
    >
      <div className="insight-meta">
        <span className="insight-category">{insight.category}</span>
        <span className="insight-date">{formatDate(insight.date)}</span>
      </div>
      <h3>{insight.title}</h3>
      <p className="insight-excerpt">{insight.excerpt}</p>
      <div className="insight-footer">
        <span className="insight-read-time">{insight.readTime} read</span>
        {/* Opens full article page */}
        <Link to={`/insights/${insight.id}`} className="insight-link">
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
