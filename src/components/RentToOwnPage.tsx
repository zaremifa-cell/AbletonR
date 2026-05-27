import { Link } from "react-router-dom";

const PLAN_STEPS = [
  {
    label: "01",
    title: "Start today",
    text: "Access Live 12 Suite now without paying the full cost upfront.",
  },
  {
    label: "02",
    title: "Pay monthly",
    text: "Spread the same regular purchase price over time, with no interest or mark-up fees.",
  },
  {
    label: "03",
    title: "Pause anytime",
    text: "Take a break when you need to. Your ownership progress continues when you resume.",
  },
  {
    label: "04",
    title: "Own it",
    text: "Complete the payments and the Live 12 Suite license is yours to keep.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is this a subscription?",
    a: "No. Each payment counts toward owning a full Live 12 Suite license. When the plan is complete, the license stays with you.",
  },
  {
    q: "Which edition is available?",
    a: "Rent-to-own is available for Live 12 Suite, including new licenses, eligible upgrades, and education licenses.",
  },
  {
    q: "Can I upgrade from another Live version?",
    a: "Yes. Upgrade plans are available from older Live versions and from Live Lite, Intro, or Standard.",
  },
  {
    q: "Can I pay it off early?",
    a: "Yes. You can pay the remaining balance at any time and own the license in full.",
  },
];

function RentToOwnPage() {
  return (
    <main className="rto-page">
      <section className="rto-hero">
        <div className="rto-hero-copy">
          <p className="rto-kicker">Rent-to-own</p>
          <h1>Live 12 Suite, paid for over time.</h1>
          <p>
            Get the complete studio immediately, then spread the cost of ownership across monthly
            payments. No subscription lock-in, no interest, no mark-up.
          </p>
        </div>
        <aside className="rto-panel" aria-label="Rent-to-own plan summary">
          <span className="mono">LIVE 12 SUITE</span>
          <strong>24 monthly payments</strong>
          <p>New licenses use a 24-month plan. Eligible upgrades range from 8 to 21 months.</p>
          <Link to="/shop/product/live-12" className="btn">
            Start plan <span className="arr">&rarr;</span>
          </Link>
        </aside>
      </section>

      <section className="rto-section rto-section--grid">
        <div className="rto-section-head">
          <p className="rto-kicker">How it works</p>
          <h2>Ownership, not access rented forever.</h2>
        </div>
        <div className="rto-step-grid">
          {PLAN_STEPS.map((step) => (
            <article className="rto-step" key={step.title}>
              <span className="mono">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rto-comparison" aria-label="Rent-to-own comparison">
        <div>
          <p className="rto-kicker">The difference</p>
          <h2>Monthly payments that end.</h2>
        </div>
        <div className="rto-compare-grid">
          <article>
            <span className="mono">RENT-TO-OWN</span>
            <p>Payments reduce the remaining balance until the license is fully yours.</p>
          </article>
          <article>
            <span className="mono">SUBSCRIPTION</span>
            <p>Recurring access continues indefinitely and does not become ownership.</p>
          </article>
        </div>
      </section>

      <section className="rto-section rto-faq">
        <div className="rto-section-head">
          <p className="rto-kicker">FAQ</p>
          <h2>Useful details before starting.</h2>
        </div>
        <div className="rto-faq-list">
          {FAQ_ITEMS.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rto-cta">
        <div>
          <p className="rto-kicker">Create with the full version</p>
          <h2>Start with Suite. Finish by owning it.</h2>
        </div>
        <Link to="/shop/product/live-12" className="btn">
          Open Live 12 <span className="arr">&rarr;</span>
        </Link>
      </section>
    </main>
  );
}

export default RentToOwnPage;
