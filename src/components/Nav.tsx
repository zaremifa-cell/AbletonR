function Nav() {
  return (
    <>
      <div className="promo">
        <div className="promo-inner">
          <span className="promo-dot"></span>
          <span>Rent-to-Own Live Suite &mdash; own it after 36 months from $25/month.</span>
          <a href="#rto">
            Learn more <span className="arr">&rarr;</span>
          </a>
        </div>
      </div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="logo" aria-label="Ableton home">
            <img className="logo-mark" src="/ableton-logo.svg" alt="" aria-hidden="true" />
          </a>
          <nav className="nav-main" aria-label="Primary">
            <a href="#live">Live</a>
            <a href="#push">Push</a>
            <a href="#move">Move</a>
            <a href="#note">Note</a>
            <a href="#packs">Packs</a>
            <a href="#learn">Learn</a>
            <a href="#shop">Shop</a>
          </nav>
          <div className="nav-end">
            <a href="#login" className="login mono">
              Log&nbsp;in
            </a>
            <a href="#trial" className="btn">
              Try Live Free <span className="arr">&rarr;</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
