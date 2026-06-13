import { useState } from "react";
import { contact } from "../content";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // No backend needed: open the visitor's email app with a pre-filled message
  // addressed to you. Swap this for a form service (Formspree, etc.) anytime.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Coaching enquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <Reveal>
              <span className="kicker">{contact.kicker}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">{contact.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="section-subtitle" style={{ marginTop: 0 }}>
                {contact.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "grid", gap: "1rem", marginTop: "0.5rem" }}>
                <div className="info-row">
                  ✉️ <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
                <div className="info-row">
                  📞 <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
                </div>
                <div className="info-row">📍 <strong>{contact.location}</strong></div>
                <div className="contact-socials">
                  {contact.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="message">Your goals</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your goals, experience and timeline..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>
                Send Message →
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
