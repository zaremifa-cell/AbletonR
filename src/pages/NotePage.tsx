import { useCallback, useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

/** iPhone 16e: 1170×2532 px display, 390×844 pt */
const IPHONE_16E_SCREEN_RATIO = "1170 / 2532";

const NOTE_BOOK_PIXEL_ROWS = [
  "1001  01110",
  "1101  10001",
  "1011  10001",
  "1001  10001",
  "1001  10001",
  "1001  10001",
  "1001  01110",
  "0000  00000",
  "111  111",
  "010  100",
  "010  100",
  "010  111",
  "010  100",
  "010  100",
  "010  111",
];

const noteBookPixels = NOTE_BOOK_PIXEL_ROWS.flatMap((row, rowIndex) =>
  [...row].flatMap((cell, columnIndex) =>
    cell === "1" ? [{ row: rowIndex + 1, column: columnIndex + 1 }] : [],
  ),
);

const NOTE_BOOK_COPY = `Ableton

Download Note

---

Note

Start before the studio.

Capture beats, melodies and sounds wherever they appear - then continue them in Ableton Live.

Download on the App Store

Learn more ->

iPhone and iPod * iOS / iPadOS 15+

---

Ideas don't wait for your setup.

A rhythm, a texture, a chord shape, a voice memo, a street sound - Note turns these first impulses into playable material.

1. Capture anywhere

Sample the world around you with your microphone.

2. Create anytime

Build beats, melodies and harmonies on the go.

3. Never lose an idea

Save it as a loop and come back to it later.

---

Three ways to begin.

Start from rhythm, melody or the world around you. Everything is built for speed and creativity.

Tap a rhythm

Build beats with 16-pad drums, quantize, swing and velocity.

Shape a melody

Create melodies and chords with scales, instruments and easy editing.

Sample the world

Record, slice and shape sounds with powerful built-in tools and effects.

---

Play first. Decide later.

Use Capture MIDI to keep what you just played. Note detects the tempo and loop length, then lets you quantize, overdub, edit or reshape the idea.

Make versions, not decisions.

Duplicate loops, change small details, build scenes, test combinations. Note gives you a mini Session View for developing fragments without committing too early.

Sound design you expect from Ableton.

Drum kits, instruments and effects from Live - including Drum Sampler, Melodic Sampler, Synths, Reverb, Delay, Saturator and more.

Sketch fast. Edit precisely.

The new MIDI Editor lets you refine every detail - pitch, length, timing, velocity and variation.

---

Bring it into Live.

Send your Note Set through Ableton Cloud and continue in Live with the same sounds, samples and effects in place.

Works with Live 11.2.5+

(Trail, Lite, Intro, Standard, Suite & Education)

Live Sets cannot be sent back to Note.

Everything stays in sync:

sounds, samples, tempo, key and effects.

---

iPhone and iPad

Native app for iOS and iPadOS.

Ableton Link

Jams in time with your favorite apps and gear.

Ableton Cloud

Seamless transfer between Note and Live.

Live 12 Lite Included

Start making more in Live, on us.

iOS / iPadOS 15+ Optimized

Built for performance and low latency.

---

Your ideas.

Anytime, anywhere.

Download Ableton Note and start today.

Download on the App Store.`;

function NotePage() {
  const phoneMediaRef = useRef<HTMLDivElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);
  const [bookPixelCount, setBookPixelCount] = useState(0);

  const handleBookCopyPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const scale = 3.2;
    const radius = 92;

    target.style.setProperty("--note-lens-x", `${x}px`);
    target.style.setProperty("--note-lens-y", `${y}px`);
    target.style.setProperty("--note-lens-left", `${x}px`);
    target.style.setProperty("--note-lens-top", `${y}px`);
    target.style.setProperty("--note-lens-copy-x", `${radius - x * scale}px`);
    target.style.setProperty("--note-lens-copy-y", `${radius - y * scale}px`);
  }, []);

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

  useEffect(() => {
    let timeoutId: number;
    const totalPixels = noteBookPixels.length;

    const writePixel = (count: number) => {
      if (count < totalPixels) {
        timeoutId = window.setTimeout(() => {
          const nextCount = count + 1;
          setBookPixelCount(nextCount);
          writePixel(nextCount);
        }, 70);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setBookPixelCount(0);
        writePixel(0);
      }, 1200);
    };

    setBookPixelCount(0);
    writePixel(0);

    return () => window.clearTimeout(timeoutId);
  }, []);

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
        <div className="note-live-panel">
          <div className="note-live-copy">
            <h2 id="note-live-title">Bring it into Live.</h2>
            <p>
              Send your Note Set through Ableton Cloud and continue in Live with the same sounds,
              samples and effects in place.
            </p>

            <div className="note-live-flow" aria-label="Note to Ableton Cloud to Live">
              <span className="note-flow-tile note-flow-tile--note">
                <img src="/note/note-app-icon.png" alt="" aria-hidden="true" />
              </span>
              <span className="note-flow-arrow" aria-hidden="true" />
              <span className="note-flow-tile note-flow-tile--cloud" aria-hidden="true">
                <svg viewBox="0 0 58 36" role="img">
                  <path
                    d="M18.5 31.5h23.2c6 0 10.8-4.5 10.8-10.2 0-5.4-4.3-9.8-9.8-10.2C40.6 6 35.4 2.5 29.5 2.5c-7 0-12.8 4.9-14.2 11.3C9.5 14.1 5 18.7 5 24.5c0 4.2 3.1 7 7.2 7h6.3Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="note-flow-arrow" aria-hidden="true" />
              <span className="note-flow-tile note-flow-tile--live">Live</span>
            </div>
          </div>

          <ul className="note-live-checklist" aria-label="Live transfer details">
            <li>Works with Live 11.2.5+ (Trial, Lite, Intro, Standard, Suite &amp; Education)</li>
            <li>Live Sets cannot be sent back to Note.</li>
            <li>Everything stays in sync: sounds, samples, tempo, key and effects.</li>
          </ul>
        </div>

        <ul className="note-live-feature-strip" aria-label="Note compatibility and transfer features">
          <li>
            <span className="note-feature-icon note-feature-icon--device" aria-hidden="true" />
            <h3>iPhone and iPad</h3>
            <p>Native app for iOS and iPadOS.</p>
          </li>
          <li>
            <span className="note-feature-icon note-feature-icon--link" aria-hidden="true" />
            <h3>Ableton Link</h3>
            <p>Jams in time with your favorite apps and gear.</p>
          </li>
          <li>
            <span className="note-feature-icon note-feature-icon--cloud" aria-hidden="true" />
            <h3>Ableton Cloud</h3>
            <p>Seamless transfer between Note and Live.</p>
          </li>
          <li>
            <span className="note-feature-icon note-feature-icon--live" aria-hidden="true">Live</span>
            <h3>Live 12 Lite Included</h3>
            <p>Start making more in Live, on us.</p>
          </li>
          <li>
            <span className="note-feature-icon note-feature-icon--optimized" aria-hidden="true" />
            <h3>iOS / iPadOS 15+ Optimized</h3>
            <p>Built for performance and low latency.</p>
          </li>
        </ul>

        <div className="note-live-download">
          <div>
            <h2>Your ideas. Anytime, anywhere.</h2>
            <p>Download Ableton Note and start today.</p>
          </div>

          <div className="note-live-download-actions">
            <a
              href="https://apps.apple.com/app/ableton-note/id1633243177"
              className="note-store-button"
              aria-label="Download Ableton Note on the App Store"
            >
              <img src="/note/app-store-badge.png" alt="Download on the App Store" />
            </a>

            <a
              href="https://apps.apple.com/app/ableton-note/id1633243177"
              className="note-qr"
              aria-label="Open Ableton Note App Store page"
            >
              {Array.from({ length: 49 }, (_, index) => (
                <span key={`note-qr-${index}`} />
              ))}
            </a>
          </div>
        </div>
      </section>

      <section className="note-book-section" aria-label="Ableton Note as a book">
        <img
          className="note-book-image"
          src="/note/Note as Book.png"
          alt="Ableton Note presented as a book"
        />
        <div className="note-book-pixel-title" aria-hidden="true">
          {noteBookPixels.map((pixel, index) => (
            <span
              key={`note-book-pixel-${pixel.row}-${pixel.column}`}
              className={index < bookPixelCount ? "is-visible" : undefined}
              style={{
                gridColumn: pixel.column,
                gridRow: pixel.row,
              }}
            />
          ))}
        </div>
        <div
          className="note-book-copy"
          aria-label="Ableton Note page copy"
          onPointerMove={handleBookCopyPointerMove}
        >
          <pre>{NOTE_BOOK_COPY}</pre>
          <div className="note-book-magnifier" aria-hidden="true">
            <pre>{NOTE_BOOK_COPY}</pre>
          </div>
        </div>
        <img
          className="note-book-app-store"
          src="/note/app-store-badge.png"
          alt="Download on the App Store"
        />
      </section>
    </main>
  );
}

export default NotePage;
