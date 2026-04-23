function Footer() {
  return (
    <>
      <section className="sub">
        <div className="sub-inner">
          <div>
            <div className="kicker">Section D &middot; Stay in touch</div>
            <h3>Offers, tutorials, downloads &mdash; once a month, no more.</h3>
          </div>
          <form className="sub-form">
            <div className="sub-field">
              <input
                type="email"
                placeholder="your.email@example.com"
                aria-label="Email address"
                required
              />
              <button type="submit">Subscribe</button>
            </div>
            <p className="sub-fine">
              Unsubscribe any time. One newsletter a month. We never share your address.
            </p>
          </form>
        </div>
      </section>

      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <span className="mark">Ableton</span>
            <span className="note">
              Creative tools for music makers. Founded 1999, still independently owned.
            </span>
            <span className="foot-seal">Made in Berlin</span>
          </div>
          <div className="foot-col">
            <h4>Products</h4>
            <ul>
              <li>
                <a href="#">Live</a>
              </li>
              <li>
                <a href="#">Push</a>
              </li>
              <li>
                <a href="#">Move</a>
              </li>
              <li>
                <a href="#">Note</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Packs</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a href="#">Loop Summit</a>
              </li>
              <li>
                <a href="#">User Groups</a>
              </li>
              <li>
                <a href="#">Certified Training</a>
              </li>
              <li>
                <a href="#">Become a Trainer</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Education</h4>
            <ul>
              <li>
                <a href="#">For Students</a>
              </li>
              <li>
                <a href="#">For the Classroom</a>
              </li>
              <li>
                <a href="#">For Colleges</a>
              </li>
              <li>
                <a href="#">Apprenticeships</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Ableton AG &middot; Sch&ouml;nhauser Allee 6&ndash;7, 10119 Berlin</span>
          <nav>
            <a href="#">Legal</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Imprint</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default Footer;
