"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
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

const NOTE_BOOK_MOBILE_COPY = NOTE_BOOK_COPY.replace(/\n{2,}/g, "\n");

function NotePage() {
  const labFeatureVideoRef = useRef<HTMLVideoElement>(null);
  const labPhoneVideoRef = useRef<HTMLVideoElement>(null);
  const [bookPixelCount, setBookPixelCount] = useState(0);
  const [isLabVideoPlaying, setIsLabVideoPlaying] = useState(false);
  const [hasLabVideoStarted, setHasLabVideoStarted] = useState(false);

  const handleBookCopyPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const scale = 3.2;
    const lensWidth = 340;
    const lensHeight = 132;

    target.style.setProperty("--note-lens-x", `${x}px`);
    target.style.setProperty("--note-lens-y", `${y}px`);
    target.style.setProperty("--note-lens-left", `${x}px`);
    target.style.setProperty("--note-lens-top", `${y}px`);
    target.style.setProperty("--note-lens-copy-x", `${lensWidth / 2 - x * scale}px`);
    target.style.setProperty("--note-lens-copy-y", `${lensHeight / 2 - y * scale}px`);
  }, []);

  const handleLabVideoToggle = useCallback(() => {
    const videos = [labFeatureVideoRef.current, labPhoneVideoRef.current].filter(
      (video): video is HTMLVideoElement => Boolean(video),
    );

    if (isLabVideoPlaying) {
      videos.forEach((video) => video.pause());
      setIsLabVideoPlaying(false);
      return;
    }

    videos.forEach((video) => {
      video.currentTime = 0;
      void video.play();
    });
    setHasLabVideoStarted(true);
    setIsLabVideoPlaying(true);
  }, [isLabVideoPlaying]);

  const handleLabVideoReady = useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (isLabVideoPlaying) return;
    video.currentTime = 0;
    video.pause();
  }, [isLabVideoPlaying]);

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
          <pre className="note-book-pre note-book-pre--desktop">{NOTE_BOOK_COPY}</pre>
          <pre className="note-book-pre note-book-pre--mobile">{NOTE_BOOK_MOBILE_COPY}</pre>
          <div className="note-book-magnifier" aria-hidden="true">
            <pre className="note-book-pre note-book-pre--desktop">{NOTE_BOOK_COPY}</pre>
            <pre className="note-book-pre note-book-pre--mobile">{NOTE_BOOK_MOBILE_COPY}</pre>
          </div>
        </div>
        <a
          className="note-book-app-store"
          href="https://apps.apple.com/us/app/ableton-note/id1633243177"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Ableton Note on the App Store"
        >
          <img
            src="/note/app-store-badge.png"
            alt="Download on the App Store"
          />
        </a>
      </section>

      <section className="note-lab-section" aria-label="Ableton Note video study">
        {/* Reversible sketch layer: remove this block and the note-lab-annotation CSS to restore the clean video study. */}
        <div className="note-lab-annotations" aria-hidden="true">
          <div className="note-lab-draft note-lab-draft--top-left">
            <span>NOTE STUDY 02</span>
            <div className="note-lab-draft-box">
              <strong>TOUCH FIRST</strong>
              <strong>CAPTURE MIDI</strong>
              <strong>PLAY IDEAS</strong>
            </div>
          </div>

          <div className="note-lab-draft note-lab-draft--top-right">
            <span>INTERFACE DETAILS</span>
            <div className="note-lab-draft-box">
              <strong>DELAY / EFFECTS</strong>
              <strong>MIDI EDITOR</strong>
              <strong>SESSION VIEW</strong>
            </div>
          </div>

          <div className="note-lab-axis note-lab-axis--left">
            <span>INPUT</span>
            <span>TOUCH</span>
            <span>LOOP</span>
          </div>

          <div className="note-lab-axis note-lab-axis--right">
            <span>EFFECT</span>
            <span>EDIT</span>
            <span>SEND</span>
          </div>

          <div className="note-lab-sequence">
            <span>01 / tap in MIDI notes</span>
            <span>02 / shape sound with devices</span>
            <span>03 / save loops and versions</span>
            <span>04 / continue through Cloud</span>
          </div>
        </div>

        <div
          className={`note-lab-grid${hasLabVideoStarted ? " has-started" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (isLabVideoPlaying) handleLabVideoToggle();
          }}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && isLabVideoPlaying) {
              event.preventDefault();
              handleLabVideoToggle();
            }
          }}
        >
          <div className="note-lab-panel note-lab-panel--mockups">
            <video
              ref={labFeatureVideoRef}
              className="note-lab-feature-video"
              src="/note/New in Ableton Note MIDI Editor - Ableton (1080p, h264).mp4"
              poster="/note/video-posters/note-midi-editor-poster.png"
              muted
              loop
              playsInline
              preload="auto"
              onLoadedMetadata={handleLabVideoReady}
              onLoadedData={handleLabVideoReady}
              aria-label="Ableton Note MIDI Editor video"
            />
          </div>

          <div className="note-lab-panel note-lab-panel--video">
            <div className="note-lab-phone" aria-hidden="true">
              <div
                className="note-motion-screen"
                style={{ ["--note-video-ratio" as string]: IPHONE_16E_SCREEN_RATIO }}
              >
                <video
                  ref={labPhoneVideoRef}
                  src="/note/ScreenRecording_06-01-2026 09-02-21_1.MP4"
                  poster="/note/video-posters/note-screen-recording-poster.png"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={handleLabVideoReady}
                  onLoadedData={handleLabVideoReady}
                />
                <div className="note-status-cover" aria-hidden="true" />
                <div className="note-dynamic-island" aria-hidden="true" />
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`note-lab-play${isLabVideoPlaying ? " is-playing" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              handleLabVideoToggle();
            }}
            aria-pressed={isLabVideoPlaying}
          >
            <span aria-hidden="true" />
            {isLabVideoPlaying ? "Pause video" : "Play video"}
          </button>
        </div>
      </section>

      <Footer variant="note" />
    </main>
  );
}

export default NotePage;
