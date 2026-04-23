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
      <svg class="session-diagram" viewBox="0 0 620 380" xmlns="http://www.w3.org/2000/svg" aria-label="Timeline versus grid diagram">
        <text x="0" y="18">Other DAWs / Timeline</text>
        <g class="timeline-track" transform="translate(0,40)">
          <rect x="0" y="0" width="620" height="28" fill="#62675F" stroke="#F3F2EA" stroke-width="1"/>
          <rect class="clip" x="14" y="4" width="60" height="20"/>
          <rect class="clip" x="80" y="4" width="110" height="20"/>
          <rect class="clip" x="200" y="4" width="78" height="20"/>
          <rect class="clip" x="290" y="4" width="140" height="20"/>
          <rect class="clip" x="440" y="4" width="86" height="20"/>
          <rect class="clip" x="534" y="4" width="72" height="20"/>
        </g>
        <text x="0" y="94">Left &rarr; right. One path.</text>
        <line class="divider" x1="0" y1="118" x2="620" y2="118"/>
        <text x="0" y="146">Live / Session view</text>
        <g transform="translate(0,166)">
          <g>
            <rect class="grid-cell active" x="0" y="0" width="96" height="30"/>
            <rect class="grid-cell" x="100" y="0" width="96" height="30"/>
            <rect class="grid-cell active green" x="200" y="0" width="96" height="30"/>
            <rect class="grid-cell" x="300" y="0" width="96" height="30"/>
            <rect class="grid-cell" x="400" y="0" width="96" height="30"/>
            <rect class="grid-cell active magenta" x="500" y="0" width="96" height="30"/>
            <rect class="grid-cell" x="0" y="34" width="96" height="30"/>
            <rect class="grid-cell active" x="100" y="34" width="96" height="30"/>
            <rect class="grid-cell" x="200" y="34" width="96" height="30"/>
            <rect class="grid-cell active teal" x="300" y="34" width="96" height="30"/>
            <rect class="grid-cell" x="400" y="34" width="96" height="30"/>
            <rect class="grid-cell" x="500" y="34" width="96" height="30"/>
            <rect class="grid-cell active green" x="0" y="68" width="96" height="30"/>
            <rect class="grid-cell" x="100" y="68" width="96" height="30"/>
            <rect class="grid-cell" x="200" y="68" width="96" height="30"/>
            <rect class="grid-cell" x="300" y="68" width="96" height="30"/>
            <rect class="grid-cell active" x="400" y="68" width="96" height="30"/>
            <rect class="grid-cell" x="500" y="68" width="96" height="30"/>
            <rect class="grid-cell" x="0" y="102" width="96" height="30"/>
            <rect class="grid-cell active magenta" x="100" y="102" width="96" height="30"/>
            <rect class="grid-cell" x="200" y="102" width="96" height="30"/>
            <rect class="grid-cell" x="300" y="102" width="96" height="30"/>
            <rect class="grid-cell" x="400" y="102" width="96" height="30"/>
            <rect class="grid-cell active teal" x="500" y="102" width="96" height="30"/>
          </g>
        </g>
        <text x="0" y="334">Any clip. Any order. Any moment.</text>
      </svg>
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
