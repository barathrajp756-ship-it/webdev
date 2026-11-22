import Nav from "./components/Nav.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Hero from "./components/Hero.jsx";
import ToolStrip from "./components/ToolStrip.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Founders from "./components/Founders.jsx";
import PromiseSection from "./components/PromiseSection.jsx";
import Pricing from "./components/Pricing.jsx";
import ContactCTA from "./components/ContactCTA.jsx";
import Footer from "./components/Footer.jsx";
import useReveal from "./hooks/useReveal.js";
import useMagnetic from "./hooks/useMagnetic.js";

export default function App() {
  useReveal();
  useMagnetic(".btn");

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollProgress />
      <CursorGlow />

      <Nav />

      <main id="main">
        <Hero />
        <ToolStrip />
        <Services />
        <Process />
        <Founders />
        <PromiseSection />
        <Pricing />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
