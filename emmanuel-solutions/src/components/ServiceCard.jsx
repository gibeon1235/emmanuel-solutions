import { m } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export function ServiceCard({ service, index }) {
  return (
    <m.div className="service-card"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index} variants={fadeUp}
    >
      <h3>{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-highlights">
        <h4>Key Focus Areas</h4>
        <ul>{service.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
      </div>
      {/* Opens the full service detail page in the same tab */}
      <Link to={`/services/${service.id}`} className="btn btn-ghost btn-small">
        Learn More →
      </Link>
    </m.div>
  );
}
