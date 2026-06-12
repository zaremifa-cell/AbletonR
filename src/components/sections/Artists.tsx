const ARTISTS_URL = "https://www.ableton.com/en/blog/categories/artists/";

function Artists() {
  return (
    <section className="artists" id="artists">
      <div className="artists-head">
        <div>
          <div className="kicker">Section B &middot; In practice</div>
          <h2>How musicians use Live.</h2>
        </div>
        <a href={ARTISTS_URL} className="all" target="_blank" rel="noreferrer">
          All stories &rarr;
        </a>
      </div>

      <div className="artist-grid">
        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--live)" }}>
            <img src="/artist-fl.webp" alt="Flying Lotus" className="artist-photo" />
            <span className="tag">Interview / 12 min</span>
          </div>
          <div className="artist-meta">
            <span>Flying Lotus</span>
            <span>Los Angeles</span>
          </div>
          <h3>From the sketchbook to the stage.</h3>
          <p>
            Walking through his Live 12 workflow &mdash; and why an unfinished loop is often more
            useful than a finished track.
          </p>
          <a href={ARTISTS_URL} className="read" target="_blank" rel="noreferrer">
            Read <span className="arr">&rarr;</span>
          </a>
        </article>

        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--push)" }}>
            <img src="/studiotour.webp" alt="Modeselektor studio tour" className="artist-photo" />
            <span className="tag">Studio tour / Video</span>
          </div>
          <div className="artist-meta">
            <span>Modeselektor</span>
            <span>Berlin</span>
          </div>
          <h3>Break down a track, one channel at a time.</h3>
          <p>
            The Berlin duo opens a finished project and rebuilds it from the kick up, in Session
            view, on Push.
          </p>
          <a href={ARTISTS_URL} className="read" target="_blank" rel="noreferrer">
            Watch <span className="arr">&rarr;</span>
          </a>
        </article>

        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--note)" }}>
            <img
              src="/artist-sakura.jpg"
              alt="Sakura Tsuruta in the studio"
              className="artist-photo"
            />
            <span className="tag">Input / Output</span>
          </div>
          <div className="artist-meta">
            <span>Sakura Tsuruta</span>
            <span>Tokyo</span>
          </div>
          <h3>A studio chain, from field recording to finish.</h3>
          <p>
            Field recordings on Note, arrangement in Live, mastering in-the-box. A pack of her
            source material is included.
          </p>
          <a href={ARTISTS_URL} className="read" target="_blank" rel="noreferrer">
            Read + Download <span className="arr">&rarr;</span>
          </a>
        </article>
      </div>
    </section>
  );
}

export default Artists;
