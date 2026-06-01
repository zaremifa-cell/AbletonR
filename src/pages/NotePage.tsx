import { useCallback, useEffect, useRef } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

/** iPhone 16e: 1170×2532 px display, 390×844 pt */
const IPHONE_16E_SCREEN_RATIO = "1170 / 2532";

function NotePage() {
  const phoneMediaRef = useRef<HTMLDivElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);

  const syncPhoneScreen = useCallback((video: HTMLVideoElement) => {
    const screen = phoneScreenRef.current;
    const media = phoneMediaRef.current;
    if (!screen || !video.videoWidth || !video.videoHeight) return;

    let videoWidth = video.videoWidth;
    let videoHeight = video.videoHeight;
    if (videoWidth > videoHeight) {
      [videoWidth, videoHeight] = [videoHeight, videoWidth];
    }

    const aspect = videoWidth / videoHeight;
    screen.style.setProperty("--note-video-ratio", `${videoWidth} / ${videoHeight}`);

    if (!media) return;

    const bezel = 20;
    const verticalMargin = 40;
    const maxWidthCap = Math.min(288, window.innerWidth * 0.264);
    const maxHeight = media.clientHeight - verticalMargin;
    const maxWidthFromHeight = Math.max(0, (maxHeight - bezel) * aspect);
    const screenWidth = Math.min(maxWidthCap, maxWidthFromHeight);

    screen.style.setProperty("--note-screen-width", `${screenWidth}px`);
    const phone = screen.closest(".note-phone");
    if (phone instanceof HTMLElement) {
      phone.style.setProperty("--note-screen-width", `${screenWidth}px`);
    }
  }, []);

  const handleVideoMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      syncPhoneScreen(event.currentTarget);
    },
    [syncPhoneScreen],
  );

  useEffect(() => {
    const media = phoneMediaRef.current;
    if (!media) return;

    const observer = new ResizeObserver(() => {
      const video = media.querySelector("video");
      if (video) syncPhoneScreen(video);
    });

    observer.observe(media);
    return () => observer.disconnect();
  }, [syncPhoneScreen]);

  usePageMeta({
    title: "Note — Ableton Programme",
    description:
      "Note product page in the Ableton Programme portfolio: capture beats, melodies and sounds on iPhone and iPad, then continue them in Ableton Live.",
    canonicalPath: "/note",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Ableton Note",
      applicationCategory: "MusicApplication",
      operatingSystem: "iOS, iPadOS",
      description:
        "Mobile music-making app for capturing beats, melodies and sounds before continuing them in Ableton Live.",
      brand: { "@type": "Brand", name: "Ableton" },
    },
  });

  return (
    <main className="note-page">
      <section className="note-hero" aria-labelledby="note-title">
        <div className="note-hero-copy">
          <div className="note-brand">
            <img src="/note/note-app-icon.png" alt="" aria-hidden="true" />
            <span>Note</span>
          </div>

          <h1 id="note-title">
            Start before
            <span>the studio.</span>
          </h1>

          <p>
            Capture beats, melodies and sounds wherever they appear &mdash; then continue them in
            Ableton Live.
          </p>

          <div className="note-actions">
            <a
              href="https://apps.apple.com/app/ableton-note/id1633243177"
              className="note-app-store"
              aria-label="Download Ableton Note on the App Store"
            >
              <img src="/note/app-store-badge.png" alt="Download on the App Store" />
            </a>
            <a href="#note-details" className="note-learn-more">
              Learn more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="note-availability">
            <span>iPhone and iPad</span>
            <span aria-hidden="true">&bull;</span>
            <span>iOS / iPadOS 15+</span>
          </div>
        </div>

        <div className="note-hero-visual">
          <img src="/note/Note in iPhone with hand.png" alt="Ableton Note running on an iPhone held in hand" />
        </div>
      </section>

      <section
        className="note-section note-section--details"
        id="note-details"
        aria-labelledby="note-details-title"
      >
        <div className="note-copy">
          <div className="note-copy-block">
            <h2 id="note-details-title">Ideas don&rsquo;t wait for your setup.</h2>
            <p>
              A rhythm, a texture, a chord shape, a voice memo, a street sound &mdash; Note turns
              these first impulses into playable material.
            </p>
          </div>

          <div className="note-copy-block">
            <h2>Three ways to begin.</h2>
            <p>
              Start from rhythm, melody or the world around you. Everything is built for speed and
              creativity.
            </p>
          </div>
        </div>

        <div
          ref={phoneMediaRef}
          className="note-media note-media--phone"
          aria-label="Ableton Note screen recording in iPhone frame"
        >
          <div className="note-phone" aria-hidden="true">
            <div
              ref={phoneScreenRef}
              className="note-motion-screen"
              style={{ ["--note-video-ratio" as string]: IPHONE_16E_SCREEN_RATIO }}
            >
              <video
                src="/note/ScreenRecording_06-01-2026 09-02-21_1.MP4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedMetadata={handleVideoMetadata}
              />
              <div className="note-status-cover" aria-hidden="true" />
              <div className="note-dynamic-island" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="note-section note-section--live" aria-labelledby="note-live-title">
        <div className="note-live-bg" aria-hidden="true">
          <img src="/note/ableton live note.jpeg" alt="" />
        </div>

        <div className="note-live-pixel-field" aria-hidden="true">
          <svg className="note-live-reveal-mask" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="note-live-blackout-mask">
                <rect width="100" height="100" fill="white" />
                <rect className="note-mask-hole note-mask-hole--1" x="47" y="8" width="11" height="13" fill="black" />
                <rect className="note-mask-hole note-mask-hole--2" x="61" y="8" width="11" height="13" fill="black" />
                <rect className="note-mask-hole note-mask-hole--3" x="75" y="12" width="12" height="14" fill="black" />
                <rect className="note-mask-hole note-mask-hole--4" x="55" y="26" width="10" height="12" fill="black" />
                <rect className="note-mask-hole note-mask-hole--5" x="68" y="30" width="15" height="16" fill="black" />
                <rect className="note-mask-hole note-mask-hole--6" x="87" y="32" width="9" height="11" fill="black" />
                <rect className="note-mask-hole note-mask-hole--7" x="42" y="43" width="15" height="16" fill="black" />
                <rect className="note-mask-hole note-mask-hole--8" x="61" y="50" width="12" height="13" fill="black" />
                <rect className="note-mask-hole note-mask-hole--9" x="78" y="51" width="16" height="17" fill="black" />
                <rect className="note-mask-hole note-mask-hole--10" x="51" y="70" width="14" height="16" fill="black" />
                <rect className="note-mask-hole note-mask-hole--11" x="70" y="73" width="11" height="13" fill="black" />
                <rect className="note-mask-hole note-mask-hole--12" x="84" y="76" width="12" height="14" fill="black" />
              </mask>
            </defs>
            <rect width="100" height="100" fill="black" mask="url(#note-live-blackout-mask)" />
          </svg>
          <div className="note-live-pixel-map">
            <span className="note-pixel-note-mark note-pixel-note-mark--n">n</span>
            <span className="note-pixel-note-mark note-pixel-note-mark--o">o</span>
            <span className="note-pixel-note-mark note-pixel-note-mark--t">t</span>
            <span className="note-pixel-note-mark note-pixel-note-mark--e">e</span>
            <span className="note-pixel-block note-pixel-block--one" />
            <span className="note-pixel-block note-pixel-block--two" />
            <span className="note-pixel-block note-pixel-block--three" />
            <span className="note-pixel-block note-pixel-block--four" />
            <span className="note-pixel-block note-pixel-block--five" />
            <span className="note-pixel-scan" />
            {Array.from({ length: 24 }, (_, index) => (
              <span
                key={`note-pixel-cell-${index}`}
                className={`note-pixel-spark note-pixel-spark--${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="note-live-stage" aria-hidden="true">
          <div className="note-live-blur" />
          <img src="/note/bring it into live.jpeg" alt="" className="note-live-sheet" />
        </div>

        <div className="note-copy note-live-copy">
          <span className="note-number">03</span>
          <div className="note-copy-block">
            <h2 id="note-live-title">Bring it into Live.</h2>
            <p>
              Send your Note Set through Ableton Cloud and continue in Live with the same sounds,
              samples and effects in place.
            </p>
          </div>
          <ul className="note-live-checklist">
            <li>Works with Live 11.2.5+ (Intro, Lite, Standard, Suite &amp; Education)</li>
            <li>Live Sets cannot be sent back to Note.</li>
            <li>Everything stays in sync: sounds, samples, tempo, key and effects.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default NotePage;
