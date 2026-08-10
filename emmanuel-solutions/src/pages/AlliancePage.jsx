import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { HeroSystem } from "../components/HeroSystem";
import { Reveal, MaskLine } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { alliances } from "../data/content";

/* Alliances and industry leadership.
   These are industry bodies, not divisions. The page states the
   relationship precisely and never implies ownership. */

export function AlliancePage() {
  const { allianceId } = useParams();
  const navigate = useNavigate();
  const a = alliances[allianceId];

  useEffect(() => { window.scrollTo(0, 0); }, [allianceId]);

  const goToContact = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 130);
  };

  if (!a) {
    return (
      <div className="page">
        <Navigation />
        <div className="detail-not-found">
          <h2>Not found</h2>
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Seo title={a.name} description={a.tagline} path={`/alliances/${allianceId}`} />
      <Navigation />

      <section className="al-hero" aria-label={a.name}>
        <HeroSystem act={2} page />
        <div className="al-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <a href="/#about" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 130); }}>
              Industry leadership
            </a>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span>{a.abbr}</span>
          </nav>

          <p className="es-eyebrow"><span>{a.parent}</span></p>
          <h1 className="es-display al-title">
            <MaskLine delay={0.2}>{a.name}</MaskLine>
          </h1>
          <p className="es-lead">{a.tagline}</p>

          {a.comingSoon && <div className="al-soon">Profile in preparation</div>}
        </div>
      </section>

      <main id="main" className="al-main">

        <section className="section al-grid">
          <div>
            <div className="section-label">Overview</div>
            {a.overview.map((p, i) => (
              <Reveal as="p" key={i} index={i} className={i === 0 ? "detail-lead" : ""}>{p}</Reveal>
            ))}
          </div>

          <Reveal className="al-role" index={1}>
            <h2 className="es-subhead">{a.role.label}</h2>
            <ul className="al-role-list">
              {a.role.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <p className="al-role-note">{a.role.note}</p>
          </Reveal>
        </section>

        {(a.mission || a.vision) && (
          <div className="section-alt">
            <section className="section al-mv">
              <Reveal className="al-mv-card">
                <div className="section-label">Mission</div>
                <p className="al-quote">{a.mission}</p>
              </Reveal>
              <Reveal className="al-mv-card" index={1}>
                <div className="section-label">Vision</div>
                <p className="al-quote">{a.vision}</p>
              </Reveal>
            </section>
          </div>
        )}

        {a.charter && (
          <section className="section">
            <div className="section-label">Charter</div>
            <Reveal as="h2">{a.charter.objective}</Reveal>
            <ul className="al-deliverables">
              {a.charter.deliverables.map((d, i) => (
                <Reveal as="li" key={i} index={i}>{d}</Reveal>
              ))}
            </ul>
          </section>
        )}

        {a.focus && (
          <div className="section-alt">
            <section className="section">
              <div className="section-label">Areas of work</div>
              <Reveal as="h2">Why, where and how to insulate</Reveal>
              <div className="grid two al-focus">
                {a.focus.map((f, i) => (
                  <Reveal className="al-focus-card" key={f.title} index={i}>
                    <span className="al-tone" style={{ background: f.tone }} aria-hidden="true" />
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>
        )}

        {a.programmes && (
          <section className="section">
            <div className="section-label">Programmes</div>
            <Reveal as="h2">Training and stewardship</Reveal>
            <div className="grid two">
              {a.programmes.map((p, i) => (
                <Reveal className="al-prog" key={p.title} index={i}>
                  <h3 className="es-subhead">{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {a.standard && (
          <div className="section-alt">
            <section className="section">
              <div className="section-label">The standard</div>
              <Reveal as="h2" className="al-standard-code">{a.standard.code}</Reveal>
              <Reveal as="p" index={1} className="al-standard-title">{a.standard.title}</Reveal>
              <Reveal as="p" index={2}>{a.standard.body}</Reveal>
              <p className="al-owner">{a.standard.owner}</p>
            </section>
          </div>
        )}

        {a.timeline && (
          <section className="section">
            <div className="section-label">Record</div>
            <Reveal as="h2">Programmes delivered</Reveal>
            <ol className="al-timeline">
              {a.timeline.map((t, i) => (
                <Reveal as="li" className="al-tl-item" key={t.date + t.title} index={i}>
                  <span className="al-tl-date">{t.date}</span>
                  <span className="al-tl-body">
                    <span className="al-tl-title">{t.title}</span>
                    <span className="al-tl-place">{t.place}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {a.partners && (
          <section className="section al-partners-sec">
            <div className="section-label">Institutional partners</div>
            <div className="al-partners">
              {a.partners.map((p) => <span className="al-partner" key={p}>{p}</span>)}
            </div>
          </section>
        )}

        {a.resources && (
          <div className="section-alt">
            <section className="section">
              <div className="section-label">Resource library</div>
              <Reveal as="h2">Technical material</Reveal>
              <Reveal as="p" index={1} className="section-intro">
                Published by the Spray Foam Alliance of India and the Bureau of Indian Standards.
                Reproduced here as a reference library.
              </Reveal>
              <ul className="al-resources">
                {a.resources.map((r, i) => (
                  <Reveal as="li" key={r.file} index={i % 5}>
                    <a href={r.file} target="_blank" rel="noreferrer" className="al-resource">
                      <span className="al-res-name">{r.name}</span>
                      <span className="al-res-note">{r.note}</span>
                      <span className="al-res-arrow" aria-hidden="true">↗</span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </section>
          </div>
        )}

        {a.whatToExpect && (
          <section className="section">
            <div className="section-label">What will appear here</div>
            <ul className="al-deliverables">
              {a.whatToExpect.map((w, i) => <Reveal as="li" key={i} index={i}>{w}</Reveal>)}
            </ul>
          </section>
        )}

        <div className="contact-section">
          <div className="section">
            <div className="contact-container">
              <div className="contact-header">
                <Reveal as="h2" style={{ color: "#fff" }}>
                  {a.comingSoon ? "Interested in this work?" : "Working on insulation or the cold chain?"}
                </Reveal>
                <Reveal as="p" index={1} className="contact-intro">
                  Emmanuel Solutions advises on insulation, energy efficiency and cold chain projects
                  drawing on this industry experience.
                </Reveal>
              </div>
              <div className="detail-cta-buttons">
                <a href={`mailto:isaac@emmanuelsolutionss.com?subject=Enquiry: ${a.name}`} className="btn btn-primary">
                  Email Isaac directly
                </a>
                <a href="/#contact" className="btn btn-secondary detail-cta-secondary" onClick={goToContact}>
                  Use the contact form
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
