import SectionHead from "./SectionHead.jsx";
import useTilt from "../hooks/useTilt.js";

const founders = [
  {
    name: "Harish",
    role: "Co-founder",
    image: "/founders/harish.jpg",
  },
  {
    name: "Barath",
    role: "Co-founder",
    image: "/founders/barath.jpg",
  },
];

function FounderCard({ founder, delay }) {
  const tilt = useTilt({ max: 9 });

  return (
    <article
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="founder-card tilt-card"
      data-reveal
      style={delay ? { "--d": delay } : undefined}
    >
      <div className="founder-float">
        <div className="founder-photo">
          <img
            src={founder.image}
            alt={`${founder.name}, ${founder.role} at Dev Studio`}
            width="1000"
            height="558"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="founder-meta">
          <h3>{founder.name}</h3>
          <p>{founder.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function Founders() {
  return (
    <section className="section founders" id="team">
      <div className="container">
        <SectionHead eyebrow="The founders" title="Two people, no handoffs">
          You talk directly to the people designing and building your site. No account managers, no
          outsourced teams — just the two of us, from the first call to launch.
        </SectionHead>

        <div className="founder-grid">
          {founders.map((founder, index) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              delay={index ? ".08s" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
