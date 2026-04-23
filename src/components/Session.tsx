function Session() {
  return (
    <section
      className="session"
      id="session-view"
      dangerouslySetInnerHTML={{
        __html: `
  <div class="session-head">
    <div>
      <div class="kicker">Section A &middot; The idea</div>
      <h2>Why Session View changes how you work.</h2>
    </div>
    <p>
      Every other DAW asks you to compose from left to right &mdash;
      a timeline. Live lets you work in a grid, where each clip is an
      idea you can trigger in any order, at any time. This is not a
      feature. It is how Live thinks about music.
    </p>
  </div>
  <div class="session-body">
    <div class="session-visual">
      <img
        src="/session.jpg"
        alt="Ableton Session View interface"
        loading="lazy"
      />
    </div>
    <div class="session-text">
      <div>
        <p>
          Rehearse inside a clip. Layer loops until <em>something clicks</em>.
          Jump between sections live, on stage. Compose the structure last &mdash;
          or leave it open forever.
        </p>
        <ul class="session-list">
          <li><span class="n">A1</span><span>Trigger clips freely, in any order</span></li>
          <li><span class="n">A2</span><span>Layer loops until a song emerges</span></li>
          <li><span class="n">A3</span><span>Perform live without stopping the flow</span></li>
          <li><span class="n">A4</span><span>Arrangement view captures the performance, automatically</span></li>
        </ul>
      </div>
      <a href="#session" class="session-link">Discover Session View <span class="arr">&rarr;</span></a>
    </div>
  </div>
`
      }}
    />
  );
}

export default Session;
