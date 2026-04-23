function Artists() {
  return (
    <section className="artists" id="artists">
      <div className="artists-head">
        <div>
          <div className="kicker">Section B &middot; In practice</div>
          <h2>How musicians use Live.</h2>
        </div>
        <a href="#blog" className="all">
          All stories &rarr;
        </a>
      </div>

      <div className="artist-grid">
        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--live)" }}>
            <span className="tag">Interview / 12 min</span>
            <span className="initials">FL</span>
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
          <a href="#" className="read">
            Read <span className="arr">&rarr;</span>
          </a>
        </article>

        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--push)" }}>
            <span className="tag">Studio tour / Video</span>
            <span className="initials">MS</span>
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
          <a href="#" className="read">
            Watch <span className="arr">&rarr;</span>
          </a>
        </article>

        <article className="artist">
          <div className="artist-frame" style={{ ["--tag-color" as string]: "var(--note)" }}>
            <span className="tag">Input / Output</span>
            <span className="initials">ST</span>
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
          <a href="#" className="read">
            Read + Download <span className="arr">&rarr;</span>
          </a>
        </article>
      </div>
    </section>
  );
}

export default Artists;
