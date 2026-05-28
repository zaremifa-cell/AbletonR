import { featureItems } from "@/data/features";

function Features() {
  return (
    <section className="features" id="features">
      <div className="features-label">Discover More</div>
      <div className="features-inner">
        {featureItems.map((item) => (
          <a key={item.title} href={item.href} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Features;
