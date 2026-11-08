import SectionHead from "./SectionHead.jsx";

const steps = [
  {
    number: "01",
    title: "Free discovery call",
    text: "A 20-minute call to talk goals, budget, and timeline. You'll get a clear, fixed quote within 24 hours — no pressure to commit.",
  },
  {
    number: "02",
    title: "Design & build",
    text: "We design the site first and get your sign-off before building. You'll follow along in a shared preview link the whole way.",
  },
  {
    number: "03",
    title: "Launch & support",
    text: "We handle hosting, domain, and go-live. Then you get a walkthrough, 30 days of support, and a site you can actually update.",
  },
];

const stats = [
  {
    value: (
      <>
        2–3 <span>weeks</span>
      </>
    ),
    label: "Typical design-to-launch",
  },
  {
    value: (
      <>
        100<span>%</span>
      </>
    ),
    label: "Fixed-price projects",
  },
  {
    value: (
      <>
        30 <span>days</span>
      </>
    ),
    label: "Post-launch care included",
  },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead eyebrow="How it works" title="A simple, three-step process">
          You'll always know what's happening and what's next. Most sites go live within two to three
          weeks.
        </SectionHead>

        <div className="steps">
          {steps.map((step, index) => (
            <article
              className="step"
              key={step.number}
              data-reveal
              style={index ? { "--d": `${index * 0.07}s` } : undefined}
            >
              <p className="step-num">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="stats" data-reveal>
          {stats.map((stat, index) => (
            <div className="stat" key={index}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
