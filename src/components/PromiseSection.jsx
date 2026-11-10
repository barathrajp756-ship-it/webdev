import { Check } from "./icons.jsx";

const commitments = [
  {
    title: "Fixed quote",
    text: "Agreed in writing before any work begins. The price doesn't move.",
  },
  {
    title: "Design first",
    text: "You see and approve every page before a single line is built.",
  },
  {
    title: "You own it all",
    text: "Domain, hosting, files, and accounts stay in your name — always.",
  },
];

export default function PromiseSection() {
  return (
    <section className="section promise" id="promise">
      <div className="container">
        <div className="promise-card" data-reveal>
          <p className="eyebrow">The Dev Studio promise</p>
          <h2>No retainers. No hourly billing. No surprises.</h2>
          <p className="promise-sub">
            You get a fixed quote before we start, a design you approve before we build, and full
            ownership of everything when we're done. If something needs fixing in the first 30 days,
            we fix it — free.
          </p>

          <div className="commitments">
            {commitments.map((commitment) => (
              <div className="commit" key={commitment.title}>
                <h3>
                  <span className="commit-check" aria-hidden="true">
                    <Check />
                  </span>
                  {commitment.title}
                </h3>
                <p>{commitment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
