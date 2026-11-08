const tools = [
  { mark: "F", name: "Figma" },
  { mark: "W", name: "Webflow" },
  { mark: "S", name: "Shopify" },
  { mark: "R", name: "React" },
  { mark: "N", name: "Next.js" },
  { mark: "St", name: "Stripe" },
];

export default function ToolStrip() {
  return (
    <section className="stack" aria-label="Tools we build with">
      <div className="container">
        <p className="stack-label" data-reveal>
          Built with tools that hold up
        </p>
        <div className="stack-row" data-reveal style={{ "--d": ".06s" }}>
          {tools.map((tool) => (
            <span className="stack-item" key={tool.name}>
              <i aria-hidden="true">{tool.mark}</i>
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
