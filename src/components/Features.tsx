const items = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="18" r="4" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 14V9a6 6 0 0 1 12 0v5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Sounds",
    desc: "Find your next sound.",
    href: "#sounds",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="16" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="4" y="16" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="16" y="16" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Max for Live",
    desc: "Expand and customize Live.",
    href: "#max",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="8,5 23,14 8,23" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    title: "Tutorials",
    desc: "Learn new skills.",
    href: "#tutorials",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="19" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 23c0-4 3.5-6 8-6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M26 23c0-4-3.5-6-8-6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 17c1 0 2.5.5 4.5 2.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Community",
    desc: "Join other music makers.",
    href: "#community",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="features-label">Discover More</div>
      <div className="features-inner">
        {items.map((item) => (
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
