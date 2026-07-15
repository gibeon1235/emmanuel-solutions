import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" }
  })
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <motion.div className="footer-container"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="footer-section" custom={0} variants={fadeUp}>
          <h4>Emmanuel Solutions</h4>
          <p className="footer-mission">
            Strategic consultancy delivering sustainable technology, circular economy solutions,
            and innovation capability — for organisations building lasting impact.
          </p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/isaac-emmanuel" aria-label="LinkedIn"
               target="_blank" rel="noreferrer">in</a>
          </div>
        </motion.div>

        <motion.div className="footer-section" custom={1} variants={fadeUp}>
          <h5>Services</h5>
          <ul>
            <li><a href="#sustainable-tech">Sustainable Technology</a></li>
            <li><a href="#circular-economy">Circular Economy</a></li>
            <li><a href="#innovation-training">Innovation Training</a></li>
            <li><a href="#industrial-marketing">Industrial Marketing</a></li>
          </ul>
        </motion.div>

        <motion.div className="footer-section" custom={2} variants={fadeUp}>
          <h5>The Group</h5>
          <ul>
            <li><a href="/group/ai-solutions">AI Solutions</a></li>
            <li><a href="/group/iif">IIF</a></li>
            <li><a href="/group/sfai">SFAI</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#insights">Insights</a></li>
          </ul>
        </motion.div>

        <motion.div className="footer-section" custom={3} variants={fadeUp}>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:isaac@emmanuelsolutionss.com?subject=Enquiry via Emmanuel Solutions">isaac@emmanuelsolutionss.com</a></li>
            <li><a href="#contact">Book a Consultation</a></li>
            <li><a href="/docs/emmanuel-solutions-one-pager.pdf" target="_blank" rel="noreferrer">One-Pager PDF ↗</a></li>
          </ul>
        </motion.div>

        <motion.div className="footer-bottom" custom={4} variants={fadeUp}>
          <div className="footer-legal">
            <p>&copy; {year} Emmanuel Solutions. All rights reserved. · Navi Mumbai, India</p>
          </div>
          <div className="footer-links">
            <a href="#" onClick={e => { e.preventDefault(); localStorage.removeItem("cookie-consent"); window.location.reload(); }}>
              Cookie Preferences
            </a>
          </div>
        </motion.div>

        <motion.div className="footer-accreditations" custom={5} variants={fadeUp}>
          <p className="accred-label">Industry Associations</p>
          <div className="accred-list">
            <span className="accred-badge">Indian Polyurethane Association (IPUA)</span>
            <span className="accred-badge">India Insulation Forum</span>
            <span className="accred-badge">Spray Foam Alliance of India</span>
            <span className="accred-badge">Creatrix Certified Consultant</span>
            <span className="accred-badge">PU Today — Editor</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
