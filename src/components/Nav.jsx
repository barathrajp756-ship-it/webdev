import { useEffect, useState } from "react";
import { site } from "../config/site.js";

const callHref = `tel:${site.phones[0].href}`;

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="nav-wrap">
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Main">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            D
          </span>
          <span className="brand-name">Dev Studio</span>
        </a>

        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm" href={callHref} title={`Call ${site.phones[0].display}`}>
            Book a call
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className="btn btn-primary" href={callHref} onClick={close}>
          Book a free call
        </a>
      </div>
    </div>
  );
}
