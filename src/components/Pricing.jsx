import SectionHead from "./SectionHead.jsx";
import { site } from "../config/site.js";

const plans = [
  {
    tier: "01 · Basic",
    name: "Starter",
    description: "Perfect for individuals, portfolios and small businesses.",
    priceLabel: "One-time payment · Introductory price",
    price: "₹4,999",
    suffix: "",
    features: [
      "1-page custom website",
      "Mobile-first responsive design",
      "Contact form & Google Maps",
      "Basic SEO setup",
      "1 round of revisions",
    ],
    delivery: "1–2 weeks",
    bestFor: "Beginners",
    cta: "Start with Starter",
    popular: false,
  },
  {
    tier: "02 · Moderate",
    name: "Business",
    description: "Ideal for growing businesses that need a professional online presence.",
    priceLabel: "One-time payment",
    price: "₹14,999",
    suffix: "",
    features: [
      "Up to 5 custom pages",
      "Copywriting support",
      "On-page local SEO",
      "Analytics & tracking",
      "2 rounds of revisions",
      "Google Maps & contact integration",
    ],
    delivery: "2–3 weeks",
    bestFor: "Growing businesses",
    cta: "Start with Business",
    popular: true,
    delay: ".07s",
  },
  {
    tier: "03 · Premium",
    name: "Advanced",
    description: "For established businesses looking for advanced features and online growth.",
    priceLabel: "Starting price · One-time payment",
    price: "₹49,999+",
    suffix: "",
    features: [
      "E-commerce or booking system",
      "Unlimited pages*",
      "Third-party integrations",
      "CMS training & handoff",
      "Priority support",
      "60 days of post-launch care",
    ],
    delivery: "4–8 weeks, depending on scope",
    bestFor: "Established businesses",
    cta: "Request a quote",
    popular: false,
    delay: ".14s",
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHead eyebrow="Pricing" title="Simple, transparent pricing">
          Choose a package or tell us what you need. Either way, you'll get a fixed quote before
          anything starts.
        </SectionHead>

        <div className="price-grid">
          {plans.map((plan) => (
            <article
              className={`price-card${plan.popular ? " popular" : ""}`}
              key={plan.name}
              data-reveal
              style={plan.delay ? { "--d": plan.delay } : undefined}
            >
              {plan.popular ? <span className="popular-badge">Most popular</span> : null}
              <p className="price-tier">{plan.tier}</p>
              <h3>{plan.name}</h3>
              <p className="price-desc">{plan.description}</p>
              <p className="price-label">{plan.priceLabel}</p>
              <p className="price">
                {plan.price} {plan.suffix ? <span className="suffix">{plan.suffix}</span> : null}
              </p>
              <ul className="features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="price-foot">
                <p>
                  <span>Delivery</span>
                  <strong>{plan.delivery}</strong>
                </p>
                {plan.bestFor ? (
                  <p>
                    <span>Best for</span>
                    <strong>{plan.bestFor}</strong>
                  </p>
                ) : null}
              </div>
              <a
                className={`btn ${plan.popular ? "btn-primary" : "btn-secondary"} btn-block`}
                href="#contact"
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="pricing-note" data-reveal>
          Every project includes hosting setup, SSL, and 30 days of post-launch care. Payments are
          split 50% to start, 50% at launch.
          <br />
          Not sure which fits?{" "}
          <a href={`tel:${site.phones[0].href}`}>Book a call</a> and we'll point you in the right
          direction.
        </p>
      </div>
    </section>
  );
}
