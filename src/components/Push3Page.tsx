import { useEffect, useState } from "react";

const DEFAULT_PUSH_IMAGE = "/push/Push3 product.png";

const PUSH_ROLES = [
  {
    label: "01",
    title: "Expressive instrument",
    text: "Play melodies, beats and textures through 64 MPE pads that respond to pressure, position and movement.",
    image: "/push/Expressive Instrument.png",
  },
  {
    label: "02",
    title: "Sampler",
    text: "Record, slice and reshape audio until a sound becomes playable material under your hands.",
  },
  {
    label: "03",
    title: "Live controller",
    text: "Use the screen, pads and encoders as a physical surface for clips, devices, mixer decisions and arrangement work.",
  },
  {
    label: "04",
    title: "Recording studio",
    text: "Capture microphones, guitars and synthesizers through the built-in audio interface directly into clips.",
  },
  {
    label: "05",
    title: "Synthesizer",
    text: "Shape native Live instruments and effects without losing the tactile focus of a dedicated hardware instrument.",
  },
  {
    label: "06",
    title: "Live show",
    text: "Launch clips, sequence parts and perform ideas when the studio sketch needs to become a real-time set.",
  },
];

const PUSH_FLOW = [
  "Play",
  "Capture",
  "Resample",
  "Arrange",
];

const PUSH_CONFIGS = [
  {
    title: "Push Standalone",
    meta: "Processor / battery / SSD",
    text: "The same Push, with internal components for making music away from the computer. Start a Set, record audio and keep ideas moving outside the studio.",
  },
  {
    title: "Push Tethered",
    meta: "USB-C / Mac or PC / Live",
    text: "The same creative surface connected to Live. Use Push as the physical layer of your MacBook-based studio and upgrade later if standalone becomes useful.",
  },
];

const CONNECTIONS = [
  ["1", "Audio Output", "2 x 6.35 mm balanced audio outputs."],
  ["2", "Audio Input", "2 x 6.35 mm balanced audio inputs; line or instrument level."],
  ["3", "ADAT", "In and out for extending Push with additional inputs and outputs."],
  ["4", "MIDI", "MIDI in and out via Type A 5-pin socket to 3.5 mm cables."],
  ["5", "USB-A", "Connect MIDI controllers or class-compliant MIDI interfaces."],
  ["6", "Power", "External power and charging, DC 20V 3A."],
  ["7", "USB-C", "Use Push as a control surface for Ableton Live."],
  ["8", "Dynamic Ports", "Switch between pedal input and CV output with break-out cables."],
  ["9", "Headphones", "1 x stereo 6.35 mm headphone output."],
  ["10", "Power Button", "Press to turn Push on and off."],
];

function Push3Page() {
  const [productImage, setProductImage] = useState(DEFAULT_PUSH_IMAGE);
  const [previousProductImage, setPreviousProductImage] = useState<string | null>(null);

  useEffect(() => {
    if (!previousProductImage) return;

    const timeoutId = window.setTimeout(() => {
      setPreviousProductImage(null);
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, [previousProductImage]);

  const changeProductImage = (nextImage: string) => {
    if (nextImage === productImage) return;

    setPreviousProductImage(productImage);
    setProductImage(nextImage);
  };

  return (
    <main className="push-page">
      <section className="push-split" aria-labelledby="push-title">
        <aside className="push-product" aria-label="Push 3 product image">
          <div className={`push-product-frame${previousProductImage ? " is-transitioning" : ""}`}>
            <img
              key={productImage}
              className="push-product-image push-product-image--current"
              src={productImage}
              alt="Ableton Push 3 hardware"
            />
            {previousProductImage && (
              <img
                className="push-product-image push-product-image--previous"
                src={previousProductImage}
                alt=""
                aria-hidden="true"
              />
            )}
          </div>
          <div className="push-product-note">
            <span className="mono">PUSH 3</span>
            <span>Hardware surface for Ableton Live</span>
          </div>
        </aside>

        <div className="push-scroll">
          <header className="push-intro">
            <p className="push-kicker">Overview</p>
            <h1 id="push-title">Push 3</h1>
            <p className="push-statement">Turn Live into something you can touch with Push.</p>
            <p className="push-copy">
              Push is the physical layer of Ableton Live: a surface for shaping melody, rhythm,
              texture and arrangement through touch instead of distance.
            </p>
          </header>

          <section className="push-section push-section--tight">
            <p className="push-kicker">What Push really is</p>
            <div className="push-role-grid">
              {PUSH_ROLES.map((role) => {
                const roleImage = "image" in role ? role.image : undefined;
                const isRoleImageActive = Boolean(roleImage && productImage === roleImage);

                return (
                  <article
                    key={role.title}
                    className={[
                      "push-role",
                      roleImage ? "push-role--has-control" : "",
                      isRoleImageActive ? "is-active" : "",
                    ].filter(Boolean).join(" ")}
                  >
                    {roleImage && (
                      <button
                        className={`push-role-toggle${isRoleImageActive ? " is-active" : ""}`}
                        type="button"
                        aria-label={isRoleImageActive ? "Reset Push image" : "Show expressive instrument image"}
                        onClick={() => {
                          changeProductImage(isRoleImageActive ? DEFAULT_PUSH_IMAGE : roleImage);
                        }}
                      >
                        <span />
                      </button>
                    )}
                    {!roleImage && <span className="push-role-n mono">{role.label}</span>}
                    <h2>{role.title}</h2>
                    <p>{role.text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="push-section">
            <p className="push-kicker">Continuity</p>
            <h2 className="push-section-title">From hands to arrangement.</h2>
            <p className="push-copy">
              Sketch with the pads, record into clips, resample the result and continue the Set in
              Live. Push does not replace the computer; it makes the computer feel like an
              instrument.
            </p>
            <ol className="push-flow" aria-label="Push workflow">
              {PUSH_FLOW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="push-section">
            <p className="push-kicker">Configurations</p>
            <h2 className="push-section-title">Two ways to work.</h2>
            <div className="push-config-grid">
              {PUSH_CONFIGS.map((config) => (
                <article key={config.title} className="push-config">
                  <h3>{config.title}</h3>
                  <span>{config.meta}</span>
                  <p>{config.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="push-section">
            <p className="push-kicker">Connections</p>
            <h2 className="push-section-title">A compact studio hub.</h2>
            <div className="push-ports" aria-hidden="true">
              <img
                className="push-connections-image"
                src="/push/push3-connections-panel.png"
                alt=""
              />
            </div>
            <ol className="push-connection-list">
              {CONNECTIONS.map(([n, title, text]) => (
                <li key={n}>
                  <span className="mono">{n}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Push3Page;
