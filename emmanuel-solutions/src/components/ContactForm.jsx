import { m } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const CONTACT_EMAIL = "isaac@emmanuelsolutionss.com";

const ENGAGEMENT_OPTS = [
  { value: "consultation",  label: "💼  Get Consultation — discuss your challenge" },
  { value: "ai-solutions",  label: "AI Solutions — automation and intelligent systems" },
  { value: "partnership",   label: "🤝  Explore Partnership — collaborate on impact" },
  { value: "training",      label: "🎓  Innovation Training — build team capability" },
  { value: "career",        label: "⭐  Join Our Team — impact-driven work" }
];

export function ContactForm() {
  const [form, setForm] = useState({
    engagementType: "consultation",
    name: "", email: "", company: "", message: "", phone: ""
  });
  const [status, setStatus]     = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in Name, Email and Message."); return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address."); return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const engagementLabel = ENGAGEMENT_OPTS.find(o => o.value === form.engagementType)?.value || "Consultation";

      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name:            form.name,
          Email:           form.email,
          Phone:           form.phone    || "—",
          Company:         form.company  || "—",
          "Enquiry Type":  engagementLabel,
          Message:         form.message,
          _subject:        `Emmanuel Solutions — ${engagementLabel} enquiry from ${form.name}`,
          _captcha:        "false",
          _template:       "table"
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== "false") {
        setStatus("success");
        setForm({ engagementType: "consultation", name: "", email: "", company: "", message: "", phone: "" });
      } else {
        setErrorMsg("Something went wrong. Please email us directly.");
        setStatus("idle");
      }
    } catch {
      setErrorMsg("Network error — please email us directly.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <m.div className="form-success"
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="success-icon">✓</div>
        <h4>Message Received</h4>
        <p>Thank you — we'll respond within one business day.</p>
        <button className="btn btn-secondary" style={{ marginTop: "1rem" }}
          onClick={() => setStatus("idle")}>
          Send Another Message
        </button>
      </m.div>
    );
  }

  return (
    <m.form className="contact-form"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={1} variants={fadeUp}
      onSubmit={handleSubmit} noValidate
    >
      <div className="form-group">
        <label htmlFor="engagement-type">How can we help you?</label>
        <select id="engagement-type" name="engagementType"
          value={form.engagementType} onChange={handleChange} className="form-input"
        >
          {ENGAGEMENT_OPTS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name <span className="required">*</span></label>
          <input id="name" type="text" name="name" value={form.name}
            onChange={handleChange} placeholder="Your full name" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input id="email" type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="your@email.com" className="form-input" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">Company / Organisation</label>
          <input id="company" type="text" name="company" value={form.company}
            onChange={handleChange} placeholder="Your company name" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="tel" name="phone" value={form.phone}
            onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="form-input" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message <span className="required">*</span></label>
        <textarea id="message" name="message" value={form.message}
          onChange={handleChange}
          placeholder="Describe your challenge, opportunity, or question…"
          rows="5" className="form-input form-textarea" required
        />
      </div>

      {errorMsg && (
        <m.div className="form-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {errorMsg}
        </m.div>
      )}

      <button type="submit" className="btn btn-primary btn-large"
        disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      <p className="form-note">
        Or email directly: <a href={`mailto:${CONTACT_EMAIL}?subject=Enquiry via Emmanuel Solutions`}>{CONTACT_EMAIL}</a>
      </p>
    </m.form>
  );
}
