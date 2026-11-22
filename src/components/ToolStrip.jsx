import useTilt from "../hooks/useTilt.js";
import { toolLogos } from "../config/toolLogos.js";

const rows = [toolLogos.slice(0, 6), toolLogos.slice(6)];

function ToolChip({ tool, clone }) {
  const tilt = useTilt({ max: 12 });

  return (
    <span
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className={`stack-item tool-chip${clone ? " is-clone" : ""}`}
      aria-hidden={clone ? "true" : undefined}
    >
      <span className="tool-mark" style={{ "--brand": tool.color }}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={tool.path} fill="currentColor" />
        </svg>
      </span>
      <span className="tool-name">{tool.name}</span>
    </span>
  );
}

export default function ToolStrip() {
  return (
    <section className="stack" aria-label="Tools we build with">
      <div className="container">
        <p className="stack-label" data-reveal>
          Built with tools that hold up
        </p>
      </div>

      <div className="stack-marquee" data-reveal>
        {rows.map((row, rowIndex) => (
          <div
            className={`stack-track${rowIndex ? " stack-track--reverse" : ""}`}
            key={rowIndex}
          >
            {[...row, ...row].map((tool, index) => (
              <ToolChip
                key={`${tool.name}-${index}`}
                tool={tool}
                clone={index >= row.length}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
