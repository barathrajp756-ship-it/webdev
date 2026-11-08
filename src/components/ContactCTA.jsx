import { useState } from "react";
import { formEndpoint, primaryEmail, primaryPhone, secondaryEmail, site } from "../config/site.js";
import { ArrowRight, Check, Mail, Phone, Send } from "./icons.jsx";

const topics = [
  "New website",
  "Website redesign",
  "Web app or custom build",
  "Online store or bookings",
  "Ongoing care & support",
  "Something else",
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  topic: "",
  message: "",
  _honey: "",
};

export default function ContactCTA() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      topic: form.topic,
      message: form.message,
      _honey: form._honey,
      _replyto: form.email,
      _subject: `New enquiry: ${form.topic}`,
      _template: "table",
      _captcha: "false",
      ...(secondaryEmail ? { _cc: secondaryEmail } : {}),
    };

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setForm(emptyForm);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Let&rsquo;s get your project moving.</h2>
            <p className="contact-sub">
              Tell us where you are and where you want to be. We reply within one business day with
              a plan, a timeline, and a fixed price — no sales pitch.
            </p>

            <a className="btn btn-primary contact-call" href={`tel:${primaryPhone.href}`}>
              <Phone />
              Book a free call
              <ArrowRight />
            </a>
            <p className="contact-call-note">
              20 minutes, no obligation. Dials {primaryPhone.display} directly.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <span className="contact-method-icon" aria-hidden="true">
                  <Phone />
                </span>
                <div>
                  <p className="contact-method-label">Call us</p>
                  <div className="contact-method-links">
                    {site.phones.map((phone) => (
                      <a key={phone.href} href={`tel:${phone.href}`}>
                        {phone.display}
                        <span>{phone.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-method">
                <span className="contact-method-icon" aria-hidden="true">
                  <Mail />
                </span>
                <div>
                  <p className="contact-method-label">Email us</p>
                  <div className="contact-method-links">
                    {site.emails.map((email) => (
                      <a key={email.address} href={`mailto:${email.address}`}>
                        {email.address}
                        <span>{email.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card" data-reveal style={{ "--d": ".08s" }}>
            <h3>Send us a message</h3>
            <p className="form-intro">
              Prefer typing? Share a few details and it lands straight in our inbox.
            </p>

            {status === "success" ? (
              <div className="form-success" role="status">
                <span className="form-success-icon" aria-hidden="true">
                  <Check />
                </span>
                <p className="form-success-title">Thanks — your message is on its way.</p>
                <p>
                  We&rsquo;ll reply within one business day. Need us sooner? Call{" "}
                  <a href={`tel:${primaryPhone.href}`}>{primaryPhone.display}</a>.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={update}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="contact-phone">
                      Phone <span className="optional">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={update}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={update}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="contact-topic">What is this about?</label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Tell us about your project</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="What are you building, and what would success look like?"
                    value={form.message}
                    onChange={update}
                    required
                  />
                </div>

                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="contact-honey">Leave this field empty</label>
                  <input
                    id="contact-honey"
                    name="_honey"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form._honey}
                    onChange={update}
                  />
                </div>

                {status === "error" ? (
                  <p className="form-status error" role="alert">
                    Something went wrong sending your message. Please try again, or email{" "}
                    <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a> / call{" "}
                    <a href={`tel:${primaryPhone.href}`}>{primaryPhone.display}</a>.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send message
                      <Send />
                    </>
                  )}
                </button>

                <p className="form-note">
                  Your details go straight to our inbox — never shared, never sold.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
