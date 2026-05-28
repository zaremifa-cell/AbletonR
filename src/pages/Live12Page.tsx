import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

/* ── component ── */
function Live12Page() {
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
          const sessionGrid = root.querySelector<HTMLElement>(".lp-session .lp-clip-grid");
          const arrangementTimeline = arrangement.querySelector<HTMLElement>(".lp-timeline");
          if (sessionCaption) {
            const sessionCaptionRect = sessionCaption.getBoundingClientRect();
            dual.style.setProperty("--arrangement-caption-top", `${sessionCaptionRect.top - arrangementRect.top}px`);
          }
          if (sessionGrid && arrangementTimeline) {
            const sessionGridRect = sessionGrid.getBoundingClientRect();
            const arrangementTimelineRect = arrangementTimeline.getBoundingClientRect();
            dual.style.setProperty("--timeline-line-top", `${sessionGridRect.top - arrangementTimelineRect.top}px`);
            dual.style.setProperty("--timeline-line-height", `${sessionGridRect.bottom - sessionGridRect.top}px`);
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

  useEffect(() => {
    const root = pageRef.current;
    const releaseSection = root?.querySelector<HTMLElement>(".lp-new");
    if (!root || !releaseSection) return;

    const media = window.matchMedia("(max-width: 600px)");

    const updateSnapMode = () => {
      if (!media.matches) {
        root.classList.remove("is-free-scroll");
        return;
      }

      const releaseStart = releaseSection.offsetTop;
      const freeScrollStart = releaseStart - 2;
      const snapResumePoint = releaseStart - (root.clientHeight * 0.35);
      root.classList.toggle("is-free-scroll", root.scrollTop >= freeScrollStart);
      if (root.scrollTop < snapResumePoint) root.classList.remove("is-free-scroll");
    };

    updateSnapMode();
    root.addEventListener("scroll", updateSnapMode, { passive: true });
    window.addEventListener("resize", updateSnapMode);
    if (media.addEventListener) media.addEventListener("change", updateSnapMode);
    else media.addListener(updateSnapMode);

    return () => {
      root.removeEventListener("scroll", updateSnapMode);
      window.removeEventListener("resize", updateSnapMode);
      if (media.removeEventListener) media.removeEventListener("change", updateSnapMode);
      else media.removeListener(updateSnapMode);
      root.classList.remove("is-free-scroll");
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
              <button className="btn">Watch in action <span className="arr">▷</span></button>
              <a href="#lp-dual" className="lp-text-link">
                Explore Session View <span className="arr">→</span>
              </a>
            </div>
            <ul className="lp-feat-list">
              {[
                { icon: <IconPlay />, title: "Launch clips",       desc: "Trigger sounds, melodies and loops." },
                { icon: <IconLoop />, title: "Loop instantly",      desc: "Everything stays in time." },
                { icon: <IconGrid />, title: "Improvise structure", desc: "Change your set on the fly." },
              ].map(f => (
                <li key={f.title} className="lp-feat-item">
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
            <img src="/live.webp" alt="Live 12 interface" loading="eager" />
          </div>
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
            ].map(item => (
              <div key={item.title} className="lp-perf-item">
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
                  <div key={`${ri}-${ci}`} className={`lp-clip lp-clip--${type}`} />
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
                <span className="lp-mobile-bar lp-mobile-bar--7-9" />
                <span className="lp-mobile-bar lp-mobile-bar--1-3" />
                <span className="lp-mobile-bar lp-mobile-bar--3-5" />
                <span className="lp-mobile-bar lp-mobile-bar--5-7" />
                <span className="lp-mobile-bar lp-mobile-bar--5-7-low" />
                <span className="lp-mobile-bar lp-mobile-bar--3-7-low" />
                <span className="lp-mobile-bar lp-mobile-bar--5-7-bottom" />
                <span className="lp-mobile-bar lp-mobile-bar--3-5-bottom" />
              </div>
              {TRACKS.map((bars, ti) => (
                <div key={ti} className="lp-track">
                  {bars.map((bar, bi) => (
                    <div key={bi} className="lp-bar" style={{ left: `${bar.l}%`, width: `${bar.w}%` }} />
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
        </div>
      </section>

      {/* ══ WHY LIVE ══ */}
      <section className="lp-why">
        <div className="lp-section-inner">
          <p className="lp-kicker">Why Live</p>
          <div className="lp-why-grid">
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

      {/* ══ CTA STRIP ══ */}
      <section className="lp-cta">
        <h2 className="lp-cta-text">Start in Session View.</h2>
        <div className="lp-cta-actions">
          <button className="btn lp-cta-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <polygon points="1,0.5 11.5,6 1,11.5" />
            </svg>
            Watch in action
          </button>
          <Link to="/" className="lp-text-link lp-text-link--dark">
            See all editions <span className="arr">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Live12Page;
