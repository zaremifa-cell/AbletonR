function Learn() {
  return (
    <section className="learn" id="learn-section">
      <div className="learn-head">
        <div>
          <div className="kicker">Section C &middot; Start here</div>
          <h2>Learn the fundamentals. In the browser.</h2>
        </div>
        <p>
          Three free, web-based companions &mdash; no download, no account. Use them in a lesson, a
          waiting room, a lunch break. They run on anything.
        </p>
      </div>
      <div className="learn-grid">
        <a href="https://learningmusic.ableton.com/" className="learn-item">
          <span className="n">C01</span>
          <h3>Learning Music</h3>
          <p>
            The fundamentals of making music, explained in the browser. Rhythm, melody, chords, song
            structure.
          </p>
          <span className="go">
            Open lesson <span className="arr">&rarr;</span>
          </span>
        </a>
        <a href="https://learningsynths.ableton.com/" className="learn-item">
          <span className="n">C02</span>
          <h3>Learning Synths</h3>
          <p>
            A web-based synthesiser with accompanying lessons. Oscillators, envelopes, filters
            &mdash; no plug-in required.
          </p>
          <span className="go">
            Open lesson <span className="arr">&rarr;</span>
          </span>
        </a>
        <a href="https://makingmusic.ableton.com/" className="learn-item">
          <span className="n">C03</span>
          <h3>Making Music</h3>
          <p>
            74 creative strategies for electronic producers, drawn from the book by Dennis DeSantis.
            Open one at random.
          </p>
          <span className="go">
            Open book <span className="arr">&rarr;</span>
          </span>
        </a>
      </div>
    </section>
  );
}

export default Learn;
