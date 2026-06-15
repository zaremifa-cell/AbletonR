"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/navigation";
import { usePageMeta } from "@/hooks/usePageMeta";

const DEFAULT_PUSH_IMAGE = "/push/Push3 product.webp";

const PUSH_ROLES = [
  {
    label: "01",
    title: "Expressive instrument",
    text: "Play melodies, beats and textures through 64 MPE pads that respond to pressure, position and movement.",
    image: "/push/Expressive Instrument.webp",
  },
  {
    label: "02",
    title: "Sampler",
    text: "Record, slice and reshape audio until a sound becomes playable material under your hands.",
    image: "/push/Sampling_new.webp",
  },
  {
    label: "03",
    title: "Live controller",
    text: "Use the screen, pads and encoders as a physical surface for clips, devices, mixer decisions and arrangement work.",
    image: "/push/Live Controller_new.webp",
  },
  {
    label: "04",
    title: "Recording studio",
    text: "Capture microphones, guitars and synthesizers through the built-in audio interface directly into clips.",
    image: "/push/Recording Studio_new.webp",
  },
  {
    label: "05",
    title: "Synthesizer",
    text: "Shape native Live instruments and effects without losing the tactile focus of a dedicated hardware instrument.",
    image: "/push/Synthesizer_new.webp",
  },
  {
    label: "06",
    title: "Live show",
    text: "Launch clips, sequence parts and perform ideas when the studio sketch needs to become a real-time set.",
    image: "/push/Live Show_new.webp",
  },
];

const PUSH_CONFIGS = [
  {
    title: "Push 3 Standalone",
    meta: "Processor / battery / SSD",
    image: "/push/Push3 product.webp",
    text: "The same Push, with internal components for making music away from the computer. Start a Set, record audio and keep ideas moving outside the studio.",
  },
  {
    title: "Push 3 Tethered",
    meta: "USB-C / Mac or PC / Live",
    image: "/push/Push Tethered.webp",
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
  usePageMeta({
    title: "Push 3 — Ableton Programme",
    description:
      "Push 3 product page in the Ableton Programme portfolio: expressive 64-pad instrument, sampler, live controller and standalone studio.",
    canonicalPath: "/push",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Ableton Push 3",
      description:
        "Standalone and controller-mode hardware instrument with 64 MPE pads, an audio interface and a tactile workflow.",
      brand: { "@type": "Brand", name: "Ableton" },
      category: "Music hardware",
    },
  });

  const [productImage, setProductImage] = useState(DEFAULT_PUSH_IMAGE);
  const [previousProductImage, setPreviousProductImage] = useState<string | null>(null);
  const [isWorkSectionActive, setIsWorkSectionActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!previousProductImage) return;

    const timeoutId = window.setTimeout(() => {
      setPreviousProductImage(null);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [previousProductImage]);

  const changeProductImage = (nextImage: string) => {
    if (nextImage === productImage) return;

    setPreviousProductImage(productImage);
    setProductImage(nextImage);
  };

  const isRoleImageLocked = productImage !== DEFAULT_PUSH_IMAGE;
  const tetheredConfig = PUSH_CONFIGS[1];

  const updateWorkSectionActive = () => {
    const scrollEl = scrollRef.current;
    const workSection = workSectionRef.current;
    if (!scrollEl || !workSection) return;

    const sectionTop = workSection.offsetTop - scrollEl.scrollTop;
    const sectionBottom = sectionTop + workSection.offsetHeight;
    const activationLine = scrollEl.clientHeight * 0.48;

    setIsWorkSectionActive(sectionTop <= activationLine && sectionBottom >= activationLine);
  };

  useEffect(() => {
    updateWorkSectionActive();
    window.addEventListener("resize", updateWorkSectionActive);
    return () => window.removeEventListener("resize", updateWorkSectionActive);
  }, []);

  return (
    <main className="push-page">
      <section
        className={`push-split${isWorkSectionActive ? " is-work-section-active" : ""}`}
        aria-labelledby="push-title"
      >
        <h2 className="push-work-title push-work-title--split" aria-hidden={!isWorkSectionActive}>
          <span>Two ways</span>
          <span>to work.</span>
        </h2>
        <aside className="push-product" aria-label="Push 3 product image">
          <Link className="push-buy-button" to="/shop/product/push" aria-label="Buy Push">
            Buy now
          </Link>
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
            <span className="mono">PUSH 3 STANDALONE</span>
            <span>Hardware surface for Ableton Live</span>
          </div>
          <p className="push-product-config-copy">{PUSH_CONFIGS[0].text}</p>
        </aside>

        <div className="push-scroll" ref={scrollRef} onScroll={updateWorkSectionActive}>
          <header className="push-intro">
            <div className="push-scroll-cue" aria-hidden="true" />
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
                const isRoleImageDisabled = Boolean(
                  roleImage && isRoleImageLocked && !isRoleImageActive
                );

                return (
                  <article
                    key={role.title}
                    className={[
                      "push-role",
                      roleImage ? "push-role--has-control" : "",
                      isRoleImageActive ? "is-active" : "",
                      isRoleImageDisabled ? "is-disabled" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {roleImage && (
                      <button
                        className={[
                          "push-role-toggle",
                          isRoleImageActive ? "is-active" : "",
                          isRoleImageDisabled ? "is-disabled" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        aria-label={
                          isRoleImageActive ? "Reset Push image" : `Show ${role.title} image`
                        }
                        disabled={isRoleImageDisabled}
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

          <section className="push-section push-work-section" ref={workSectionRef}>
            <h2 className="push-work-mobile-title">Two ways to work.</h2>
            <div className="push-work-media-grid push-work-media-grid--single">
              <article className="push-work-card push-work-card--mobile-standalone">
                <div
                  className="push-work-mobile-label push-work-mobile-label--standalone"
                  aria-hidden="true"
                >
                  <span className="mono">{PUSH_CONFIGS[0].title}</span>
                  <div className="push-work-mobile-cue">→</div>
                </div>
                <div className="push-work-image-wrap">
                  <img src={PUSH_CONFIGS[0].image} alt={`${PUSH_CONFIGS[0].title} hardware`} />
                </div>
                <p className="push-work-config-copy">{PUSH_CONFIGS[0].text}</p>
                <div className="push-work-note">
                  <span className="mono">{PUSH_CONFIGS[0].title}</span>
                  <span>Standalone music making</span>
                </div>
              </article>
              <article className="push-work-card">
                <div
                  className="push-work-mobile-label push-work-mobile-label--tethered"
                  aria-hidden="true"
                >
                  <div className="push-work-mobile-cue push-work-mobile-cue--back">←</div>
                  <span className="mono">{tetheredConfig.title}</span>
                </div>
                <div className="push-work-image-wrap">
                  <img src={tetheredConfig.image} alt={`${tetheredConfig.title} hardware`} />
                </div>
                <p className="push-work-config-copy">{tetheredConfig.text}</p>
                <div className="push-work-note">
                  <span className="mono">{tetheredConfig.title}</span>
                  <span>Hardware surface for Ableton Live</span>
                </div>
              </article>
            </div>
          </section>

          <section className="push-section push-connections-section">
            <p className="push-kicker">Connections</p>
            <h2 className="push-section-title">A compact studio hub.</h2>
            <div className="push-ports" aria-hidden="true">
              <img
                className="push-connections-image"
                src="/push/push3-connections-panel.webp"
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
            <div className="push-made-in" aria-label="Made in Berlin">
              <span>Made in Berlin</span>
              <img src="/ableton-logo.svg" alt="Ableton" />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Push3Page;
