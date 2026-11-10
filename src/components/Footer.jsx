import { site } from "../config/site.js";
import { Mail, Phone } from "./icons.jsx";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web design", href: "#services" },
      { label: "Development", href: "#services" },
      { label: "SEO setup", href: "#services" },
      { label: "Care plans", href: "#pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Our promise", href: "#promise" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

const month = new Date().toLocaleString("en-US", { month: "long" });

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">
                D
              </span>
              <span className="brand-name">Dev Studio</span>
            </a>
            <p>
              A small studio building websites that earn their keep. Design and development for
              businesses that care how they show up.
            </p>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Booking {month} projects
            </span>
          </div>

          {columns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="footer-col footer-contact">
            <h3>Get in touch</h3>
            {site.phones.map((phone) => (
              <a key={phone.href} href={`tel:${phone.href}`}>
                <Phone />
                {phone.display}
              </a>
            ))}
            {site.emails.map((email) => (
              <a key={email.address} href={`mailto:${email.address}`}>
                <Mail />
                {email.address}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dev Studio. All rights reserved.</p>
          <div className="footer-socials" aria-label="Social links">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="footer-bottom-links">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
