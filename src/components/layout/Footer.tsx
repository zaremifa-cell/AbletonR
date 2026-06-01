import { type FormEvent, type ReactNode, useState } from "react";
import { socialLinks } from "@/data/footerLinks";

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
  return (
    <div className="home-end">
      <NewsletterSignup kicker={newsletterKicker} />

      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <span className="mark">Ableton</span>
            <nav className="foot-social" aria-label="Social links">
              <span className="foot-social-title">Follow Ableton</span>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href}>
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
                <a href="/live">Live</a>
              </li>
              <li>
                <a href="/push">Push</a>
              </li>
              <li>
                <a href="/move">Move</a>
              </li>
              <li>
                <a href="/note">Note</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/link/">Link</a>
              </li>
              <li>
                <a href="/packs">Packs</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a href="https://loop.ableton.com/">Loop Summit</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/community/user-groups/">User Groups</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/certified-training/">Certified Training</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/certified-training/become-a-trainer/">Become a Trainer</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Education</h4>
            <ul>
              <li>
                <a href="https://www.ableton.com/en/shop/education/">For Students</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/classroom/">For the Classroom</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/colleges-universities/">For Colleges</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/jobs/">Apprenticeships</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="https://www.ableton.com/en/about/">About</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/jobs/">Jobs</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/press/">Press</a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/contact-us/">Contact</a>
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
            <a href="https://www.ableton.com/en/legal/">Legal</a>
            <a href="https://www.ableton.com/en/privacy-policy/">Privacy</a>
            <a href="https://www.ableton.com/en/cookie-settings/">Cookies</a>
            <a href="https://www.ableton.com/en/imprint/">Imprint</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
