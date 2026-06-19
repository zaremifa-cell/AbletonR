import type { KeyboardEvent } from "react";
import { useNavigate } from "@/lib/navigation";

function Quartet() {
  const navigate = useNavigate();
  const handleWindowKeyDown = (event: KeyboardEvent<HTMLElement>, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(path);
    }
  };

  return (
    <section className="quartet" aria-label="Products">
      <div
        className="window live"
        id="live"
        role="link"
        tabIndex={0}
        aria-label="View Live catalogue"
        onClick={() => navigate("/live")}
        onKeyDown={(event) => handleWindowKeyDown(event, "/live")}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">01</span>
            <span>Digital Audio Workstation</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/live.webp" alt="Live 12 Session View" loading="eager" />
        </div>
        <div className="window-foot">
          <div className="window-name">
            Live 12
            <span className="ver">Ver. 12.4 &middot; Intro / Standard / Suite</span>
          </div>
          <div>
            <p className="window-desc">
              The core instrument. Non-linear Session view and traditional Arrangement view &mdash; both
              in one document.
            </p>
            <span className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="window push"
        id="push"
        role="link"
        tabIndex={0}
        aria-label="View Push catalogue"
        onClick={() => navigate("/push")}
        onKeyDown={(event) => handleWindowKeyDown(event, "/push")}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">02</span>
            <span>Standalone Instrument</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/push image.png" alt="Push 3 standalone pad controller" loading="lazy" />
        </div>
        <div className="window-foot">
          <div className="window-name">
            Push
            <span className="ver">Gen. 3 &middot; Standalone or with Live</span>
          </div>
          <div>
            <p className="window-desc">
              Hands-on hardware for making music with or without a computer. Velocity- and
              pressure-sensitive pads.
            </p>
            <span className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="window move"
        id="move"
        role="link"
        tabIndex={0}
        aria-label="View Move catalogue"
        onClick={() => navigate("/move")}
        onKeyDown={(event) => handleWindowKeyDown(event, "/move")}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">03</span>
            <span>Portable Groovebox</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/move.webp" alt="Move portable groovebox" loading="lazy" />
        </div>
        <div className="window-foot">
          <div className="window-name">
            Move
            <span className="ver">640g &middot; 32 pads &middot; built-in battery</span>
          </div>
          <div>
            <p className="window-desc">
              A pocket-sized sketchpad. Capture a loop anywhere; finish it in Live when you&apos;re home.
            </p>
            <span className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="window note"
        id="note"
        role="link"
        tabIndex={0}
        aria-label="View Note catalogue"
        onClick={() => navigate("/note")}
        onKeyDown={(event) => handleWindowKeyDown(event, "/note")}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">04</span>
            <span>iOS Application</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/note image.png" alt="Note app on iPhone" loading="lazy" />
        </div>
        <div className="window-foot">
          <div className="window-name">
            Note
            <span className="ver">iOS 16+ &middot; free tier &middot; Plus $4.99/mo</span>
          </div>
          <div>
            <p className="window-desc">
              Drums, melodies and samples on iPhone and iPad. Sync to Live via Ableton Cloud.
            </p>
            <span className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quartet;
