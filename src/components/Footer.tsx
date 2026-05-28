import { type FormEvent, type ReactNode, useState } from "react";

type NewsletterSignupProps = {
  kicker?: ReactNode;
};

type FooterProps = {
  newsletterKicker?: ReactNode;
};

export function NewsletterSignup({ kicker }: NewsletterSignupProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setIsSubscribed(true);
    window.setTimeout(() => setIsSubscribed(false), 1800);
  };

  return (
    <section className="sub">
      <div className="sub-inner">
        <div>
          <div className="kicker">{kicker ?? <>Section D &middot; Stay in touch</>}</div>
          <h3>Offers, tutorials, downloads &mdash; once a month, no more.</h3>
        </div>
        <form className="sub-form" onSubmit={handleSubmit}>
          <div className="sub-field">
            <input
              type="email"
              placeholder="your.email@example.com"
              aria-label="Email address"
              required
            />
            <button type="submit">
              {isSubscribed ? "Subscribed" : "Subscribe"} <span className="arr">&rarr;</span>
            </button>
          </div>
          <p className="sub-fine">
            Unsubscribe any time. One newsletter a month. We never share your address.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer({ newsletterKicker }: FooterProps = {}) {
  const socialLinks = [
    {
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="16.8" cy="7.2" r="1" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="6.5" width="17" height="11" rx="3" />
          <path d="m10.5 9.5 5 2.5-5 2.5z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 4.5h-2.2c-2.2 0-3.5 1.3-3.5 3.6v2.2H6.5v3.2h2.3v6h3.4v-6H15l.5-3.2h-3.3V8.4c0-.7.3-1.1 1.2-1.1h1.1z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 4v10.2a4.2 4.2 0 1 1-3.1-4" />
          <path d="M13 4c.7 3.2 2.5 5 5.5 5.5" />
        </svg>
      ),
    },
    {
      label: "Discord",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 8.2c3-1.1 6-1.1 9 0 1.6 2.1 2.3 4.5 2.1 7.1-1.9 1.4-3.7 2.1-5.4 2.3l-.8-1.3" />
          <path d="M11.6 16.3c-1.7-.2-3.5-.9-5.3-2.3-.2-2.6.5-5 2.1-7.1" />
          <circle cx="9.7" cy="12.5" r=".8" />
          <circle cx="14.3" cy="12.5" r=".8" />
        </svg>
      ),
    },
    {
      label: "X",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <NewsletterSignup kicker={newsletterKicker} />

      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <span className="mark">Ableton</span>
            <nav className="foot-social" aria-label="Social links">
              <span className="foot-social-title">Follow Ableton</span>
              {socialLinks.map((item) => (
                <a key={item.label} href="#">
                  <span className="foot-social-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
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
        <div className="foot-made-row">
          <div className="foot-made-in" aria-label="Made in Berlin">
            <span>Made in Berlin</span>
            <img src="/ableton-logo.svg" alt="Ableton" />
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
