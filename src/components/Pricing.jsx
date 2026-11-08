import SectionHead from "./SectionHead.jsx";
import { site } from "../config/site.js";

const plans = [
  {
    name: "Starter",
    description: "A sharp one-page site for new businesses.",
    priceLabel: "Fixed price",
    price: "$1,200",
    suffix: "one-time",
    features: [
      "1-page custom website",
      "Mobile-first design",
      "Contact form & map",
      "Basic SEO setup",
      "1 round of revisions",
      "Live in 1–2 weeks",
    ],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Business",
    description: "For businesses ready to look established.",
    priceLabel: "Fixed price",
    price: "$2,400",
    suffix: "one-time",
    features: [
      "Up to 5 custom pages",
      "Copywriting support",
      "On-page local SEO",
      "Analytics & tracking",
      "2 rounds of revisions",
      "Live in 2–3 weeks",
    ],
    cta: "Start with Business",
    popular: true,
    delay: ".07s",
  },
  {
    name: "Custom",
    description: "Shops, bookings, and custom features.",
    priceLabel: "Starting at",
    price: "$4,800",
    suffix: "one-time",
    features: [
      "E-commerce or booking system",
      "Unlimited pages",
      "Third-party integrations",
      "CMS training & handoff",
      "Priority support",
      "60 days of care included",
    ],
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
              <h3>{plan.name}</h3>
              <p className="price-desc">{plan.description}</p>
              <p className="price-label">{plan.priceLabel}</p>
              <p className="price">
                {plan.price} <span className="suffix">{plan.suffix}</span>
              </p>
              <ul className="features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
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
