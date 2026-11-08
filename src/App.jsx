import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ToolStrip from "./components/ToolStrip.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import PromiseSection from "./components/PromiseSection.jsx";
import Pricing from "./components/Pricing.jsx";
import ContactCTA from "./components/ContactCTA.jsx";
import Footer from "./components/Footer.jsx";
import useReveal from "./hooks/useReveal.js";

export default function App() {
  useReveal();

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <ToolStrip />
        <Services />
        <Process />
        <PromiseSection />
        <Pricing />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
