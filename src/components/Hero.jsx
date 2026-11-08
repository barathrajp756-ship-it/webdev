import { ArrowRight } from "./icons.jsx";

export default function Hero() {

  const today = new Date();
  const month = today.toLocaleString('en-US', {
    month: 'long'
});

  return (
    <section className="hero">
      <div className="container">
        <span className="hero-badge" data-reveal>
          <span className="status-dot" aria-hidden="true" />
          Booking projects for {month}.
        </span>

        <h1 data-reveal style={{ "--d": ".06s" }}>
          Build Your Website and App
          <span className="line-muted">as low as ₹199.</span>
        </h1>

        <p className="hero-sub" data-reveal style={{ "--d": ".12s" }}>
          <strong className="hero-sub-title">Launch Your Business Online 🚀</strong>
          We create stunning websites that capture attention. Convert visitors into loyal customers
          with a seamless experience. Mobile-friendly, SEO-ready, and built for growth. Your success
          story starts with a great website.
        </p>

        <div className="hero-actions" data-reveal style={{ "--d": ".18s" }}>
          <a className="btn btn-primary" href="#contact">
            Start your project
            <ArrowRight />
          </a>
          <a className="btn btn-secondary" href="#pricing">
            See pricing
          </a>
        </div>

        {/* <p className="hero-micro" data-reveal style={{ "--d": ".24s" }}>
          Fixed-price projects from $1,200 &nbsp;·&nbsp; Delivered in 2–3 weeks
        </p> */}
      </div>
    </section>
  );
}
