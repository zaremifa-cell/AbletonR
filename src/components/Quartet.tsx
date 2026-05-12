import { useNavigate } from "react-router-dom";

function Quartet() {
  const navigate = useNavigate();

  return (
    <section className="quartet" aria-label="Products">
      <article
        className="window live"
        id="live"
        tabIndex={0}
        onClick={() => navigate("/live")}
        style={{ cursor: "pointer" }}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">01</span>
            <span>Digital Audio Workstation</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/live.jpg" alt="Live 12 Session View" loading="eager" />
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
      </article>

      <article
        className="window push"
        id="push"
        tabIndex={0}
        onClick={() => navigate("/push")}
        style={{ cursor: "pointer" }}
      >
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">02</span>
            <span>Standalone Instrument</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/push.jpg" alt="Push 3 standalone pad controller" loading="lazy" />
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
      </article>

      <article className="window move" id="move" tabIndex={0}>
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">03</span>
            <span>Portable Groovebox</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/move.jpg" alt="Move portable groovebox" loading="lazy" />
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
            <a href="#move-page" className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </a>
          </div>
        </div>
      </article>

      <article className="window note" id="note" tabIndex={0}>
        <div className="window-label">
          <span className="type-of">
            <span className="mono cat">04</span>
            <span>iOS Application</span>
          </span>
          <span className="status mono">Available</span>
        </div>
        <div className="window-image">
          <img src="/note.jpg" alt="Note app on iPhone" loading="lazy" />
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
            <a href="#note-page" className="window-go">
              View catalogue <span className="arr">&rarr;</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Quartet;
