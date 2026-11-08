export default function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
