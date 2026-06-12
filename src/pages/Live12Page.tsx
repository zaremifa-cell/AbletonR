import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

/* ── icons ── */
const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
    <polygon points="4,2 17,10 4,18" />
  </svg>
);
const IconLoop = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4.2 8.2a5.8 5.8 0 0 1 9.7-2.9l1.5 1.4" />
    <path d="M15.4 2.9v3.8h-3.8" />
    <path d="M15.8 11.8a5.8 5.8 0 0 1-9.7 2.9l-1.5-1.4" />
    <path d="M4.6 17.1v-3.8h3.8" />
  </svg>
);
const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="2" width="7" height="7" /><rect x="11" y="2" width="7" height="7" />
    <rect x="2" y="11" width="7" height="7" /><rect x="11" y="11" width="7" height="7" />
  </svg>
);
const IconScene = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="3" width="9" height="9" />
    <rect x="7" y="8" width="9" height="9" />
    <path d="M11.5 10.6h2l-1.5 2.2h2l-3 3.4.9-2.6h-1.8z" strokeLinejoin="round" />
  </svg>
);
const IconTool = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4 10v4" />
    <path d="M8 5v10" />
    <path d="M12 2v16" />
    <path d="M16 7v6" />
    <path d="M2 12h1.8" />
    <path d="M16.2 10H18" />
  </svg>
);
const IconDots = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
  </svg>
);
const IconWave = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12 L4 8 L6 16 L8 5 L10 19 L12 10 L14 14 L16 12 L22 12" />
  </svg>
);
const IconBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="13,2 6,13 11,13 11,22 18,11 13,11" />
  </svg>
);
const IconSession = () => (
  <img className="ableton-mark ableton-mark--vertical" src="/live/Asset 1.svg" alt="" aria-hidden="true" />
);
const IconArrangement = () => (
  <img className="ableton-mark ableton-mark--horizontal" src="/live/Asset 2.svg" alt="" aria-hidden="true" />
);

/* ── data ── */
type ClipType = "l" | "m" | "d";

const CLIPS: ClipType[][] = [
  ["l", "m", "m", "d"],
  ["m", "d", "m", "m"],
  ["l", "m", "l", "m"],
  ["m", "m", "d", "m"],
  ["m", "l", "m", "l"],
];

const TRACKS: { l: number; w: number }[][] = [
  [{ l: 0, w: 25 }, { l: 25, w: 25 }, { l: 50, w: 25 }, { l: 75, w: 25 }],
  [{ l: 50, w: 50 }],
  [{ l: 25, w: 50 }],
  [{ l: 25, w: 25 }, { l: 50, w: 25 }],
];

function arrangementBarSlot(l: number, w: number): string {
  if (l === 0 && w === 25) return "lp-bar-slot--1-3";
  if (l === 25 && w === 25) return "lp-bar-slot--3-5";
  if (l === 50 && w === 25) return "lp-bar-slot--5-7";
  if (l === 75 && w === 25) return "lp-bar-slot--7-9";
  if (l === 50 && w === 50) return "lp-bar-slot--5-9";
  if (l === 25 && w === 50) return "lp-bar-slot--3-7";
  return "lp-bar-slot--alt";
}

const MOBILE_BAR_SLOTS: Record<string, string> = {
  "lp-mobile-bar--1-3": "lp-bar-slot--1-3",
  "lp-mobile-bar--3-5": "lp-bar-slot--3-5",
  "lp-mobile-bar--5-7": "lp-bar-slot--5-7",
  "lp-mobile-bar--7-9": "lp-bar-slot--7-9",
  "lp-mobile-bar--5-7-low": "lp-bar-slot--5-7",
  "lp-mobile-bar--3-7-low": "lp-bar-slot--3-7",
  "lp-mobile-bar--5-7-bottom": "lp-bar-slot--5-7",
  "lp-mobile-bar--3-5-bottom": "lp-bar-slot--3-5",
};

const NEW_FEATURES = [
  { img: "/live/Bounce Groups.webp",      n: "01", title: "Bounce Groups",        desc: "Print an entire group to audio, including its processing and return-track signal path." },
  { img: "/live/Stem Separation.webp",    n: "02", title: "Stem Separation",      desc: "Split vocals, drums, bass and other sounds from any audio clip, ready to rework." },
  { img: "/live/Auto-Pan Tremolo.webp",   n: "03", title: "Auto-Pan Tremolo",     desc: "Shape rhythmic movement with updated pan and tremolo controls that react to your audio." },
  { img: "/live/A:B Feature.webp",        n: "04", title: "A/B Feature",          desc: "Compare two device states instantly while testing mix tweaks or sound design ideas." },
];

const WHY = [
  { icon: <IconDots />, title: "Non-linear first",      desc: "Start anywhere. No rules, no timeline, no limits." },
  { icon: <IconWave />, title: "Performance native",    desc: "Designed to keep you in the flow — on stage or in the studio." },
  { icon: <IconBolt />, title: "Idea to track",         desc: "From the first spark of an idea to a finished song." },
];

const LIVE_HERO_IMAGES = {
  session: "/live/New Session View.jpg",
  laptop: "/live.webp",
};
const HERO_SWEEP_DURATION_SECONDS = 12.2;
const PERF_ITEM_COUNT = 4;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ── component ── */
function Live12Page() {
  const [trialOs, setTrialOs] = useState("mac");
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [activePerfIndex, setActivePerfIndex] = useState<number | null>(null);

  usePageMeta({
    title: "Live 12 — Ableton Programme",
    description:
      "Live 12 product page in the Ableton Programme portfolio archive: Session and Arrangement views, instruments, effects and the workflow that defines Live.",
    canonicalPath: "/live",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Ableton Live 12",
      description:
        "Music production environment that combines Session and Arrangement views with instruments, effects and a tactile workflow.",
      brand: { "@type": "Brand", name: "Ableton" },
      category: "Music production software",
    },
  });

  const pageRef = useRef<HTMLDivElement>(null);
  const handleHeroSweepIteration = (event: React.AnimationEvent<HTMLSpanElement>) => {
    const completedSweeps = Math.round(event.elapsedTime / HERO_SWEEP_DURATION_SECONDS);
    if (completedSweeps % 2 === 1) {
      setHeroImageIndex((current) => (current === 0 ? 1 : 0));
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeoutId: number | null = null;
    let previousIndex = -1;
    let isDisposed = false;

    const chooseNextIndex = () => {
      const options = Array.from({ length: PERF_ITEM_COUNT }, (_, index) => index).filter(
        (index) => index !== previousIndex
      );
      return options[randomInt(0, options.length - 1)];
    };

    const runSequence = () => {
      if (isDisposed) return;

      const nextIndex = chooseNextIndex();
      const blinkCount = randomInt(1, 4);
      previousIndex = nextIndex;

      let step = 0;
      const tick = () => {
        if (isDisposed) return;

        const isOnStep = step % 2 === 0;
        setActivePerfIndex(isOnStep ? nextIndex : null);
        step += 1;

        if (step < blinkCount * 2) {
          timeoutId = window.setTimeout(tick, 210);
          return;
        }

        setActivePerfIndex(null);
        timeoutId = window.setTimeout(runSequence, randomInt(1000, 4000));
      };

      tick();
    };

    timeoutId = window.setTimeout(runSequence, randomInt(600, 1400));

    return () => {
      isDisposed = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const media = window.matchMedia("(max-width: 960px)");
    const perform = root.querySelector<HTMLElement>(".lp-perform");
    const grid = root.querySelector<HTMLElement>(".lp-perf-grid");
    if (!perform || !grid) return;

    let timeoutId: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !media.matches) return;
        grid.classList.add("is-cued");
        timeoutId = window.setTimeout(() => grid.classList.remove("is-cued"), 2200);
        observer.unobserve(perform);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.18 }
    );

    observer.observe(perform);
    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const dual = root.querySelector<HTMLElement>(".lp-dual");
    const inner = root.querySelector<HTMLElement>(".lp-dual-inner");
    const stacks = Array.from(root.querySelectorAll<HTMLElement>(".lp-view-labels"));
    const verticalMark = root.querySelector<HTMLImageElement>(".lp-view-switch .ableton-mark");
    const horizontalMark = root.querySelector<HTMLImageElement>(".lp-arrangement-menu .ableton-mark");
    if (!dual || !inner || !stacks.length) return;

    const measure = () => {
      const innerRect = inner.getBoundingClientRect();
      let top = Infinity;
      let bottom = -Infinity;

      stacks.forEach((stack) => {
        const first = stack.querySelector<HTMLElement>(".lp-view-head-text");
        const second = stack.querySelector<HTMLElement>(".lp-view-sub-text");
        if (!first || !second) return;

        const firstRect = first.getBoundingClientRect();
        const secondRect = second.getBoundingClientRect();
        top = Math.min(top, firstRect.top);
        bottom = Math.max(bottom, secondRect.bottom);
      });

      if (!Number.isFinite(top) || !Number.isFinite(bottom)) return;
      dual.style.setProperty("--view-label-stack", `${bottom - top}px`);
      dual.style.setProperty("--view-label-top", `${top - innerRect.top}px`);

      if (verticalMark && horizontalMark) {
        const horizontalRect = horizontalMark.getBoundingClientRect();
        const verticalRect = verticalMark.getBoundingClientRect();
        const rightGap = innerRect.right - horizontalRect.right;
        const targetLeft = (innerRect.width / 2) - rightGap - verticalRect.width;
        dual.style.setProperty("--view-switch-left", `${targetLeft}px`);

        const arrangement = root.querySelector<HTMLElement>(".lp-arrangement");
        const timelineText = arrangement?.querySelector<HTMLElement>(".lp-view-sub-text");
        if (arrangement && timelineText) {
          const arrangementRect = arrangement.getBoundingClientRect();
          const timelineTextRect = timelineText.getBoundingClientRect();
          dual.style.setProperty("--timeline-ruler-left", `${timelineTextRect.left - arrangementRect.left}px`);
          dual.style.setProperty("--timeline-ruler-right", `${arrangementRect.right - horizontalRect.right}px`);

          const sessionCaption = root.querySelector<HTMLElement>(".lp-session .lp-view-caption");
          const arrangementCaption = root.querySelector<HTMLElement>(".lp-arrangement .lp-view-caption");
          const sessionGrid = root.querySelector<HTMLElement>(".lp-session .lp-clip-grid");
          const arrangementTimeline = arrangement.querySelector<HTMLElement>(".lp-timeline");
          if (sessionGrid && arrangementTimeline) {
            const dualRect = dual.getBoundingClientRect();
            const sessionRect = sessionGrid.closest<HTMLElement>(".lp-session")?.getBoundingClientRect();
            const sessionGridRect = sessionGrid.getBoundingClientRect();
            const arrangementTimelineRect = arrangementTimeline.getBoundingClientRect();
            const arrangementFrame =
              arrangement.querySelector<HTMLElement>(".lp-mobile-timeline-frame")?.getBoundingClientRect();
            const arrangementGraphicBottom = arrangementFrame?.bottom ?? arrangementTimelineRect.bottom;
            dual.style.setProperty("--timeline-line-top", `${sessionGridRect.top - arrangementTimelineRect.top}px`);
            dual.style.setProperty("--timeline-line-height", `${sessionGridRect.bottom - sessionGridRect.top}px`);

            if (sessionCaption && sessionRect) {
              const sessionCaptionRect = sessionCaption.getBoundingClientRect();
              const sessionCaptionTop =
                sessionGridRect.bottom +
                ((dualRect.bottom - sessionGridRect.bottom - sessionCaptionRect.height) / 2) -
                sessionRect.top;
              dual.style.setProperty("--session-caption-top", `${Math.max(0, sessionCaptionTop)}px`);
            }

            if (arrangementCaption) {
              const arrangementCaptionRect = arrangementCaption.getBoundingClientRect();
              const arrangementCaptionTop =
                arrangementGraphicBottom +
                ((dualRect.bottom - arrangementGraphicBottom - arrangementCaptionRect.height) / 2) -
                arrangementRect.top;
              dual.style.setProperty("--arrangement-caption-top", `${Math.max(0, arrangementCaptionTop)}px`);
            }
          }
        }
      }
    };

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    stacks.forEach((stack) => resizeObserver?.observe(stack));
    if (verticalMark) {
      if (verticalMark.complete) measure();
      else verticalMark.addEventListener("load", measure);
    }
    if (horizontalMark) {
      if (horizontalMark.complete) measure();
      else horizontalMark.addEventListener("load", measure);
    }

    return () => {
      window.removeEventListener("resize", measure);
      verticalMark?.removeEventListener("load", measure);
      horizontalMark?.removeEventListener("load", measure);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="lp" ref={pageRef}>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-copy">
            <p className="lp-kicker">The Music Creation Platform</p>
            <h1 className="lp-h1">
              Music doesn't
              <span className="lp-h1-block">start on a</span>
              <span className="lp-h1-block">timeline.</span>
              <span className="lp-h1-live">It starts in<br />Session View.</span>
            </h1>
            <p className="lp-body">
              The original loop-based workflow that lets you play, experiment and perform without limits.
            </p>
            <div className="lp-hero-actions">
              <a
                className="btn"
                href="https://www.youtube.com/watch?v=G64-yM0Bs78"
                target="_blank"
                rel="noreferrer"
              >
                Watch in action <span className="arr">▷</span>
              </a>
              <a href="#lp-dual" className="lp-text-link">
                Explore Session View <span className="arr">→</span>
              </a>
            </div>
            <ul className="lp-feat-list">
              {[
                { icon: <IconPlay />, kind: "play", title: "Launch clips",       desc: "Trigger sounds, melodies and loops." },
                { icon: <IconLoop />, kind: "loop", title: "Loop instantly",      desc: "Everything stays in time." },
                { icon: <IconGrid />, kind: "grid", title: "Improvise structure", desc: "Change your set on the fly." },
              ].map(f => (
                <li key={f.title} className={`lp-feat-item lp-feat-item--${f.kind}`}>
                  <span className="lp-feat-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <span className="lp-feat-desc">{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lp-hero-visual">
            <img
              className={`lp-hero-frame${heroImageIndex === 0 ? " is-active" : ""}`}
              src={LIVE_HERO_IMAGES.session}
              alt="Live 12 Session View interface"
              loading="eager"
            />
            <img
              className={`lp-hero-frame${heroImageIndex === 1 ? " is-active" : ""}`}
              src={LIVE_HERO_IMAGES.laptop}
              alt=""
              aria-hidden="true"
              loading="eager"
            />
          </div>
          <span className="lp-hero-sweep-wipe" aria-hidden="true" />
          <span
            className="lp-hero-sweep-line"
            aria-hidden="true"
            onAnimationIteration={handleHeroSweepIteration}
          />
        </div>
      </section>

      {/* ══ SECTION 2 — PERFORM ══ */}
      <section className="lp-perform">
        <div className="lp-perform-photo">
          <img src="/push.webp" alt="Studio setup with Push 3 and Live 12" loading="lazy" />
        </div>
        <div className="lp-perform-copy">
          <p className="lp-kicker">Perform in the moment</p>
          <h2 className="lp-h2">
            Play your project<br />like an instrument.
          </h2>
          <p className="lp-body">
            Use Push 3 and Live's instruments, effects, and creative tools to shape your sound and build your ideas. Move, Note, Draw, and more — total freedom to make your project your way.
          </p>
          <div className="lp-perf-grid">
            {[
              { icon: <IconPlay />,  title: "Launch clips",   desc: "Trigger sounds, melodies and loops." },
              { icon: <IconScene />, title: "Trigger scenes", desc: "Move your song forward." },
              { icon: <IconLoop />,  title: "Loop instantly", desc: "Everything stays in time." },
              { icon: <IconTool />,  title: "Use any tool",   desc: "Move, Note, Draw and all Live tools at your fingertips." },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`lp-perf-item${activePerfIndex === index ? " is-random-active" : ""}`}
              >
                <span className="lp-perf-icon">{item.icon}</span>
                <div>
                  <strong className="lp-perf-title">{item.title}</strong>
                  <p className="lp-perf-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — DUAL VIEW ══ */}
      <section className="lp-dual" id="lp-dual">
        <h2 className="lp-h2 lp-dual-headline">Turn ideas into complete tracks.</h2>
        <div className="lp-dual-inner">

          {/* Session View */}
          <div className="lp-session">
            <div className="lp-view-labels">
              <div className="lp-view-head"><span className="lp-view-head-text">Session View</span></div>
              <p className="lp-view-sub"><span className="lp-view-sub-text">Trigger. Loop. Play.</span></p>
            </div>
            <div className="lp-clip-grid">
              {CLIPS.map((row, ri) =>
                row.map((type, ci) => (
                  <div
                    key={`${ri}-${ci}`}
                    className={`lp-clip lp-clip--${type}`}
                    style={
                      type === "d"
                        ? undefined
                        : { animationDelay: `${(ri * 4 + ci) * 0.16}s` }
                    }
                  />
                ))
              )}
            </div>
            <p className="lp-view-caption">
              Capture ideas as clips.<br />Launch, loop and experiment.
            </p>
          </div>

          <div className="lp-view-switch" aria-hidden="true">
            <IconSession />
          </div>

          {/* Arrangement View */}
          <div className="lp-arrangement">
            <div className="lp-view-labels">
              <div className="lp-view-head"><span className="lp-view-head-text">Arrangement View</span></div>
              <p className="lp-view-sub"><span className="lp-view-sub-text">Timeline. Flow. Build.</span></p>
            </div>
            <div className="lp-arrangement-menu" aria-hidden="true">
              <IconArrangement />
            </div>
            <div className="lp-timeline">
              <div className="lp-timeline-ruler">
                {[1, 3, 5, 7, 9].map(n => <span key={n}>{n}</span>)}
              </div>
              <div className="lp-mobile-timeline-frame" aria-hidden="true" />
              <div className="lp-mobile-bars" aria-hidden="true">
                {(
                  [
                    "lp-mobile-bar--7-9",
                    "lp-mobile-bar--1-3",
                    "lp-mobile-bar--3-5",
                    "lp-mobile-bar--5-7",
                    "lp-mobile-bar--5-7-low",
                    "lp-mobile-bar--3-7-low",
                    "lp-mobile-bar--5-7-bottom",
                    "lp-mobile-bar--3-5-bottom",
                  ] as const
                ).map((barClass) => (
                  <span
                    key={barClass}
                    className={`lp-mobile-bar ${barClass} ${MOBILE_BAR_SLOTS[barClass] ?? "lp-bar-slot--alt"}`}
                  />
                ))}
              </div>
              {TRACKS.map((bars, ti) => (
                <div key={ti} className="lp-track">
                  {bars.map((bar, bi) => (
                    <div
                      key={bi}
                      className={`lp-bar ${arrangementBarSlot(bar.l, bar.w)}`}
                      style={{ left: `${bar.l}%`, width: `${bar.w}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="lp-view-caption">
              Organize and refine your ideas<br />in a linear timeline to build your track.
            </p>
            <div className="lp-arrangement-next" aria-hidden="true" />
          </div>

        </div>
      </section>

      {/* ══ SECTION 4 — WHAT'S NEW ══ */}
      <section className="lp-new">
        <div className="lp-section-inner">
          <p className="lp-kicker">What's new in Live 12</p>
          <div className="lp-new-grid">
            {NEW_FEATURES.map(f => (
              <div key={f.title} className="lp-new-card">
                <div className="lp-new-thumb">
                  <img src={f.img} alt={f.title} loading="lazy" />
                  <span className="lp-new-n">{f.n}</span>
                </div>
                <h3 className="lp-new-title">{f.title}</h3>
                <p className="lp-new-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="lp-why-grid lp-why-grid--in-new">
            {WHY.map(w => (
              <div key={w.title} className="lp-why-item">
                <span className="lp-why-icon">{w.icon}</span>
                <strong className="lp-why-title">{w.title}</strong>
                <p className="lp-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lp-tail">
        {/* ══ TRIAL SCREEN ══ */}
        <section className="lp-cta" id="trial">
          <div className="lp-trial-media">
            <img src="/live/live 12 product image.png" alt="Ableton Live 12 Suite product box" loading="lazy" />
          </div>

          <div className="lp-trial-copy">
            <p className="lp-kicker">Start in Session View</p>
            <h2 className="lp-cta-text">Start your free trial of Ableton Live.</h2>
            <p className="lp-trial-body">
              Explore Live 12 Suite's full features &mdash; free for 30 days.
            </p>

            <form className="lp-trial-form" action="https://www.ableton.com/en/trial/" method="get">
              <label htmlFor="live-trial-os">Operating System</label>
              <div className="lp-trial-controls">
                <select
                  id="live-trial-os"
                  value={trialOs}
                  onChange={(event) => setTrialOs(event.currentTarget.value)}
                >
                  <option value="mac">macOS Universal (5.4 GB)</option>
                  <option value="windows">Windows 10 / 11 (64-bit)</option>
                </select>
                <button type="submit">Download</button>
              </div>
            </form>

            <ul className="lp-trial-notes" aria-label="Trial details">
              <li>No credit card required</li>
              <li>Get started in minutes</li>
              <li>Save and export your music</li>
            </ul>
          </div>
        </section>
      </div>

    </div>
  );
}

export default Live12Page;
