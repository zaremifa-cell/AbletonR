import Quartet from "./Quartet";

interface Props {
  onLive12Click: () => void;
}

function Hero({ onLive12Click }: Props) {
  return (
    <section className="hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <div>
            <div className="hero-label reveal">
              <span>Programm / 2026</span>
              <span>No. 12.4</span>
            </div>
            <h1 className="hero-title reveal" style={{ marginTop: "32px" }}>
              <span className="stop">Four instruments.</span>
              <span className="stop">One idea.</span>
            </h1>
          </div>
          <p className="hero-sub reveal">
            Music as <em>a grid, not a timeline</em> &mdash; the philosophy that connects Live, Push,
            Move and Note. Designed in Berlin, built to be used, not admired.
          </p>
        </div>
        <div className="hero-divider" aria-hidden="true"></div>
        <Quartet onLive12Click={onLive12Click} />
      </div>
    </section>
  );
}

export default Hero;
