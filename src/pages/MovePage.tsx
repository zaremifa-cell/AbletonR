import { usePageMeta } from "@/hooks/usePageMeta";

const MOVE_FEATURES = [
  { label: "Processor", icon: "processor" },
  { label: "Speaker", icon: "speaker" },
  { label: "Mic", icon: "mic" },
  { label: "Battery\n(up to 4 hours)", icon: "battery" },
];

const SAMPLE_INPUTS = [
  { label: "Mic", icon: "mic" },
  { label: "Line-in", icon: "line" },
  { label: "USB-C", icon: "usb" },
  { label: "Resampling", icon: "wave" },
];

const TRACKS = ["Drums", "Bass", "Synth", "Sample"];

const MOVE_SCREENSHOTS = [
  "Screenshot 2026-05-25 at 11.28.57.webp",
  "Screenshot 2026-05-25 at 11.29.22.webp",
  "Screenshot 2026-05-25 at 11.29.32.webp",
  "Screenshot 2026-05-25 at 11.29.47.webp",
  "Screenshot 2026-05-25 at 11.30.02.webp",
  "Screenshot 2026-05-25 at 11.30.27.webp",
  "Screenshot 2026-05-25 at 11.30.38.webp",
  "Screenshot 2026-05-25 at 11.30.50.webp",
  "Screenshot 2026-05-25 at 11.31.05.webp",
  "Screenshot 2026-05-25 at 11.31.22.webp",
  "Screenshot 2026-05-25 at 11.31.51.webp",
  "Screenshot 2026-05-25 at 11.32.08.webp",
  "Screenshot 2026-05-25 at 11.32.22.webp",
  "Screenshot 2026-05-25 at 11.32.39.webp",
];

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case "processor":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M11 2h2v6h-2zM15 2h2v6h-2zM19 2h2v6h-2zM11 24h2v6h-2zM15 24h2v6h-2zM19 24h2v6h-2z" />
          <path d="M2 11h6v2H2zM2 15h6v2H2zM2 19h6v2H2zM24 11h6v2h-6zM24 15h6v2h-6zM24 19h6v2h-6z" />
          <path d="M8 8h16v16H8z" />
          <path d="M12 12h8v8h-8z" className="move-icon-cutout" />
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 12h7l8-7v22l-8-7H3z" />
          <path d="M22 10c2.6 3.2 2.6 8.8 0 12M26 6c4.8 5.8 4.8 14.2 0 20" className="move-icon-stroke" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3c-3.2 0-5 2.2-5 5.4V16c0 3.2 1.8 5.4 5 5.4s5-2.2 5-5.4V8.4C21 5.2 19.2 3 16 3z" />
          <path d="M7 15.5c0 5.5 3.5 9.2 9 9.2s9-3.7 9-9.2M16 24.7V30M11 30h10" className="move-icon-stroke" />
        </svg>
      );
    case "battery":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M11 2h10v4h3v24H8V6h3zM11 8v19h10V8z" />
          <path d="M17 10l-5 9h4l-2 6 6-10h-4z" />
        </svg>
      );
    case "line":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="9" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
      );
    case "usb":
      return (
        <svg className="move-icon-usb" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="13" width="24" height="6" rx="3" />
        </svg>
      );
    case "wave":
      return (
        <svg className="move-icon-resample" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="15" width="3" height="2" />
          <rect x="9" y="11" width="3" height="10" />
          <rect x="14" y="7" width="3" height="18" />
          <rect x="19" y="12" width="3" height="8" />
          <rect x="24" y="14" width="3" height="4" />
        </svg>
      );
    default:
      return null;
  }
};

function MovePage() {
  usePageMeta({
    title: "Move — Ableton Programme",
    description:
      "Move product page in the Ableton Programme portfolio: a portable, battery-powered instrument with built-in speaker, mic and tracks for ideas on the go.",
    canonicalPath: "/move",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Ableton Move",
      description:
        "Portable, battery-powered music-making instrument with a built-in speaker, microphone and on-device track workflow.",
      brand: { "@type": "Brand", name: "Ableton" },
      category: "Portable music hardware",
    },
  });

  return (
    <main className="move-page">
      <section className="move-section move-hero" aria-labelledby="move-title">
        <div className="move-hero-bg" aria-hidden="true">
          <img src="/move/hero-girl.webp" alt="" />
        </div>
        <div className="move-copy">
          <span className="move-number">01</span>
          <h1 id="move-title">
            Start ideas anywhere.
            <span>Finish them in Live.</span>
          </h1>
          <p>Move keeps you close to the moment: pick it up, trust what feels right, and let the idea lead.</p>
        </div>
        <div className="move-media move-media--photo">
          <img src="/move/hero-girl.webp" alt="Musician using Move outdoors" />
        </div>
      </section>

      <section className="move-section move-section--product">
        <div className="move-copy">
          <span className="move-number">02</span>
          <h2>Portable standalone instrument.</h2>
          <p>
            Move is a portable standalone instrument with its own processor, speaker,
            microphone, and battery - made for starting musical ideas anywhere.
          </p>
          <ul className="move-icon-row">
            {MOVE_FEATURES.map((feature) => (
              <li key={feature.label}>
                <Icon name={feature.icon} />
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="move-media move-media--controller">
          <img src="/move/controller-bw.webp" alt="Black Move controller on grey background" />
        </div>
      </section>

      <section className="move-section move-section--tracks">
        <div className="move-copy">
          <span className="move-number">03</span>
          <h2>Four tracks, fast decisions.</h2>
          <p>Everything happens across four tracks. Drums, bass, synths, samples - all in perfect sync.</p>
        </div>
        <div className="move-media move-media--tracks">
          <div className="move-screenshot-loop" aria-label="Move workflow animation">
            {MOVE_SCREENSHOTS.map((shot, index) => (
              <img
                key={shot}
                src={`/move/screenshots/${shot}`}
                alt={index === 0 ? "Move controller in use" : ""}
                aria-hidden={index === 0 ? undefined : "true"}
              />
            ))}
          </div>
          <div className="move-track-labels" aria-hidden="true">
            {TRACKS.map((track) => <span key={track}>{track}</span>)}
          </div>
        </div>
      </section>

      <section className="move-section move-section--sample">
        <div className="move-media move-media--ports">
            <img src="/move/ableton_move_clean_removed_top_bottom.webp" alt="Back panel of Move showing audio and USB connections" />
        </div>
        <div className="move-copy">
          <span className="move-number">04</span>
          <h2>Sample the world.</h2>
          <p>Built-in mic, line-in, and USB-C let you capture anything before you overthink it. Resample, chop, and make it yours.</p>
          <ul className="move-icon-row move-icon-row--compact">
            {SAMPLE_INPUTS.map((input) => (
              <li key={input.label}>
                <Icon name={input.icon} />
                <span>{input.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="move-section move-section--cloud">
        <span className="move-swipe-hint" aria-hidden="true">Swipe right</span>
        <div className="move-media move-media--cloud">
          <img src="/move/Cloud.webp" alt="Move sending a sketch to Ableton Cloud and Live" />
        </div>
        <div className="move-copy">
          <span className="move-number">05</span>
          <h2>From sketch to full track.</h2>
          <p>Move grows with your ideas. Send to Ableton Cloud, open in Live, and keep going.</p>
        </div>
      </section>

      <section className="move-section move-section--box" aria-labelledby="move-box-title">
        <span className="move-swipe-hint" aria-hidden="true">Swipe right</span>
        <img src="/move/Whats in the box.webp" alt="Ableton Move box contents" />
        <div className="move-box-copy">
          <h2 id="move-box-title">What's in the box</h2>
          <ul>
            <li>Ableton Move</li>
            <li>Power supply</li>
            <li>Regional power cable</li>
            <li>USB-C cable</li>
            <li>Printed onboarding guide</li>
            <li>Includes Live 12.1 Intro</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default MovePage;
