import SectionHead from "./SectionHead.jsx";
import { Bolt, Cart, PenTool, Search, Shield } from "./icons.jsx";

function ServiceCard({ className = "", delay, icon, title, description, children }) {
  return (
    <article
      className={`service-card${className ? ` ${className}` : ""}`}
      data-reveal
      style={delay ? { "--d": delay } : undefined}
    >
      <span className="icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </article>
  );
}

function BrowserMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="mock-url">devstudio.com/your-business</span>
        <span className="mock-live">
          <i />
          Live
        </span>
      </div>
      <div className="mock-body">
        <div className="mock-top">
          <div className="mock-copy">
            <span className="sk sk-title" />
            <span className="sk w70" />
            <span className="sk w45" />
            <span className="mock-btn">Book a table</span>
          </div>
          <div className="mock-img" />
        </div>
        <div className="mock-row">
          <span className="mock-tile" />
          <span className="mock-tile" />
          <span className="mock-tile" />
        </div>
      </div>
    </div>
  );
}

function SpeedVisual() {
  return (
    <div className="speed" aria-hidden="true">
      <div className="speed-top">
        <span className="speed-score">98</span>
        <span className="speed-label">
          PageSpeed
          <em>mobile · Lighthouse</em>
        </span>
      </div>
      <div className="meter">
        <span />
      </div>
      <div className="speed-foot">Measured on production, not a demo</div>
    </div>
  );
}

function SearchMock() {
  return (
    <div className="search-mock" aria-hidden="true">
      <div className="search-bar">
        <Search />
        <span>coffee shop near me</span>
        <kbd>↵</kbd>
      </div>
      <div className="search-result">
        <span className="rank">1</span>
        <span className="result-text">
          <strong>yourbusiness.com</strong>
          <em>Open today — order ahead</em>
        </span>
      </div>
    </div>
  );
}

function UptimeVisual() {
  return (
    <div className="uptime" aria-hidden="true">
      <div className="uptime-bars">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="uptime-foot">
        <span className="status-dot" />
        99.9% uptime · 24h response
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead eyebrow="What we do" title="Everything your website needs">
          Design, build, and launch — handled end to end. No plugins to babysit, no handoff to a
          developer you've never met.
        </SectionHead>

        <div className="bento">
          <ServiceCard
            className="card-design"
            icon={<PenTool />}
            title="Design that feels like you"
            description="A custom site built around your brand, your customers, and the one action you want them to take. No templates, no stock-photo sameness."
          >
            <BrowserMock />
          </ServiceCard>

          <ServiceCard
            className="card-speed"
            delay=".06s"
            icon={<Bolt />}
            title="Fast by default"
            description="Hand-coded and optimised so every page loads in under a second — on desktop, and on a phone in a parking lot."
          >
            <SpeedVisual />
          </ServiceCard>

          <ServiceCard
            className="card-mini"
            delay=".06s"
            icon={<Cart />}
            title="Bookings & sales"
            description="Take payments, bookings, and enquiries without leaving your site. Wired in, tested, and ready on day one."
          >
            <div className="chips" aria-hidden="true">
              <span>Stripe</span>
              <span>Calendly</span>
              <span>Shopify</span>
              <span>+ more</span>
            </div>
          </ServiceCard>

          <ServiceCard
            className="card-mini"
            delay=".12s"
            icon={<Search />}
            title="Found on Google"
            description="Clean structure, local SEO, and the technical basics done right — so the right people find you first."
          >
            <SearchMock />
          </ServiceCard>

          <ServiceCard
            className="card-mini"
            delay=".18s"
            icon={<Shield />}
            title="Care that continues"
            description="Hosting, updates, backups, and small edits handled every month. Your site stays fast, secure, and current."
          >
            <UptimeVisual />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}
