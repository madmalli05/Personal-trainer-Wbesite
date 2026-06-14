import { useState } from "react";
import { contact } from "../content";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import MagneticButton from "./motion/MagneticButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Fallback when no Formspree id is configured: open the visitor's email app.
    if (!contact.formspreeId) {
      const subject = encodeURIComponent(`Coaching enquiry from ${form.name || "website"}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const data = new FormData(e.target); // collects name, email, message, _gotcha
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json?.errors?.map((er) => er.message).join(", ") || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="section" id="apply">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <Reveal>
              <span className="kicker">{contact.kicker}</span>
            </Reveal>
            <SplitHeading className="section-title">{contact.title}</SplitHeading>
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

              {/* Honeypot: hidden from people, tempting to bots. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hp-field"
              />

              <MagneticButton
                as="button"
                type="submit"
                className="btn btn-primary magnetic"
                style={{ justifyContent: "center" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </MagneticButton>

              <p
                className={`form-status ${status === "error" ? "error" : ""} ${
                  status === "success" ? "success" : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {status === "success" && "Thanks — I'll reply within 24 hours."}
                {status === "error" && error}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
