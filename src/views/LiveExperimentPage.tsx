"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import "./LiveExperimentPage.css";

type Clip = {
  id: string;
  name: string;
  track: string;
  color: string;
};

const clips: Clip[] = [
  { id: "drums", name: "Drums", track: "Pulse", color: "#f6c052" },
  { id: "bass", name: "Bass", track: "Weight", color: "#f5ef2f" },
  { id: "keys", name: "Keys", track: "Chords", color: "#15ed54" },
  { id: "vox", name: "Vox", track: "Texture", color: "#13b9b1" },
  { id: "lead", name: "Lead", track: "Hook", color: "#c2c0bc" },
];

const scenes = ["Start", "Lift", "Break", "Drop"];
const timelineBars = ["1", "9", "17", "25", "33", "41"];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function LiveExperimentPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeClips, setActiveClips] = useState<Set<string>>(() => new Set(["drums", "bass"]));
  const [activeScene, setActiveScene] = useState(1);
  const [quantize, setQuantize] = useState("1 Bar");

  usePageMeta({
    title: "Live Story Experiment - Ableton Programme",
    description:
      "An isolated interactive storytelling experiment that teaches Ableton Live through spatial navigation, Session View and Arrangement View.",
    canonicalPath: "/live-experiment",
  });

  useEffect(() => {
    const updateProgress = () => {
      const root = pageRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const launchedCount = activeClips.size;
  const sessionZoom = clamp((progress - 0.1) / 0.28, 0, 1);
  const performZoom = clamp((progress - 0.34) / 0.2, 0, 1);
  const arrangementBlend = clamp((progress - 0.58) / 0.25, 0, 1);
  const finale = clamp((progress - 0.82) / 0.16, 0, 1);

  const worldStyle = {
    "--session-zoom": sessionZoom,
    "--perform-zoom": performZoom,
    "--arrangement-blend": arrangementBlend,
    "--finale": finale,
  } as React.CSSProperties;

  const launchClip = (clipId: string) => {
    setActiveClips((current) => {
      const next = new Set(current);
      if (next.has(clipId)) next.delete(clipId);
      else next.add(clipId);
      return next;
    });
  };

  const triggerScene = (sceneIndex: number) => {
    setActiveScene(sceneIndex);
    setActiveClips(new Set(clips.slice(0, Math.min(clips.length, sceneIndex + 2)).map((clip) => clip.id)));
  };

  const activeClipList = useMemo(() => clips.filter((clip) => activeClips.has(clip.id)), [activeClips]);

  return (
    <main className="lexp-page" ref={pageRef}>
      <section className="lexp-stage" style={worldStyle}>
        <div className="lexp-copy lexp-copy--intro">
          <p>Enter the set</p>
          <h1>Live is not a page. It is a place.</h1>
        </div>

        <div className="lexp-copy lexp-copy--session">
          <p>Session View</p>
          <h2>Launch ideas before they become a song.</h2>
        </div>

        <div className="lexp-copy lexp-copy--perform">
          <p>Performance</p>
          <h2>Scenes move the whole room at once.</h2>
        </div>

        <div className="lexp-copy lexp-copy--arrangement">
          <p>Arrangement View</p>
          <h2>The same ideas unfold into time.</h2>
        </div>

        <div className="lexp-live-world" aria-label="Interactive Ableton Live project world">
          <div className="lexp-topbar">
            <span className="lexp-ableton-mark" />
            <button type="button">Link</button>
            <button type="button">Tap</button>
            <span>95.00</span>
            <span>4 / 4</span>
            <button type="button" className="is-playing">Play</button>
            <span>3 . 1 . 1</span>
            <button type="button" onClick={() => setQuantize(quantize === "1 Bar" ? "1/4" : "1 Bar")}>
              Quantize {quantize}
            </button>
          </div>

          <div className="lexp-project-space">
            <aside className="lexp-browser-rail">
              <span>Sounds</span>
              <span>Drums</span>
              <span>Instruments</span>
              <span>Audio Effects</span>
              <span className="is-current">Clips</span>
              <span>Samples</span>
            </aside>

            <section className="lexp-session-world" aria-label="Session View">
              <div className="lexp-session-grid">
                {clips.map((clip, trackIndex) => (
                  <div className="lexp-track-column" key={clip.id}>
                    <header style={{ backgroundColor: clip.color }}>
                      <span>{trackIndex + 1}</span>
                      {clip.track}
                    </header>
                    {scenes.map((scene, sceneIndex) => {
                      const isActive = activeClips.has(clip.id) && sceneIndex <= activeScene;
                      return (
                        <button
                          key={`${clip.id}-${scene}`}
                          type="button"
                          className={`lexp-clip-cell${isActive ? " is-active" : ""}`}
                          style={{ "--clip-color": clip.color } as React.CSSProperties}
                          onClick={() => launchClip(clip.id)}
                        >
                          <span>{sceneIndex === 0 ? clip.name : ""}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}

                <div className="lexp-scene-column" aria-label="Scene triggers">
                  <header>Scenes</header>
                  {scenes.map((scene, index) => (
                    <button
                      key={scene}
                      type="button"
                      className={activeScene === index ? "is-active" : ""}
                      onClick={() => triggerScene(index)}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lexp-quantize-orbit" aria-label="Launch quantization">
                <span />
                <strong>{quantize}</strong>
              </div>
            </section>

            <section className="lexp-arrangement-world" aria-label="Arrangement View">
              <div className="lexp-arrangement-ruler">
                {timelineBars.map((bar) => (
                  <span key={bar}>{bar}</span>
                ))}
              </div>
              <div className="lexp-arrangement-lanes">
                {clips.map((clip, index) => (
                  <div className="lexp-arr-lane" key={clip.id}>
                    <span>{clip.track}</span>
                    {activeClipList.map((activeClip, activeIndex) => {
                      if (activeClip.id !== clip.id) return null;
                      return (
                        <i
                          key={activeClip.id}
                          style={
                            {
                              "--clip-color": activeClip.color,
                              "--clip-left": `${8 + index * 7 + activeIndex * 4}%`,
                              "--clip-width": `${18 + activeIndex * 5}%`,
                            } as React.CSSProperties
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="lexp-arr-playhead" />
            </section>
          </div>

          <div className="lexp-performance-panel">
            <strong>{launchedCount} clips running</strong>
            <span>Scene {activeScene + 1}</span>
            <span>{arrangementBlend > 0.45 ? "Timeline armed" : "Session armed"}</span>
          </div>
        </div>

        <nav className="lexp-scroll-map" aria-label="Story progress">
          {["Project", "Session", "Launch", "Arrange", "Track"].map((label, index) => (
            <span key={label} className={progress * 5 >= index ? "is-lit" : ""}>
              {label}
            </span>
          ))}
        </nav>
      </section>

      <section className="lexp-scroll-block" aria-hidden="true" />
      <section className="lexp-scroll-block" aria-hidden="true" />
      <section className="lexp-scroll-block" aria-hidden="true" />
      <section className="lexp-scroll-block" aria-hidden="true" />
      <section className="lexp-scroll-block lexp-scroll-block--last" aria-hidden="true" />
    </main>
  );
}

export default LiveExperimentPage;
