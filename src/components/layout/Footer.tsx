import { type FormEvent, type ReactNode, useState } from "react";
import { socialLinks } from "@/data/footerLinks";

type NewsletterSignupProps = {
  kicker?: ReactNode;
};

type FooterProps = {
  newsletterKicker?: ReactNode;
  variant?: "default" | "note";
};

const newTabLinkProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;

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

function Footer({ newsletterKicker, variant = "default" }: FooterProps = {}) {
  return (
    <div className={`home-end${variant === "note" ? " home-end--note" : ""}`}>
      {variant === "note" ? (
        <section className="note-footer-plate" aria-label="Ableton Note closing mark">
          <img src="/note/note-app-icon.png" alt="Ableton Note" />
        </section>
      ) : (
        <NewsletterSignup kicker={newsletterKicker} />
      )}

      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <span className="mark">Ableton</span>
            <nav className="foot-social" aria-label="Social links">
              <span className="foot-social-title">Follow Ableton</span>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} {...newTabLinkProps}>
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
                <a href="/live" {...newTabLinkProps}>
                  Live
                </a>
              </li>
              <li>
                <a href="/push" {...newTabLinkProps}>
                  Push
                </a>
              </li>
              <li>
                <a href="/move" {...newTabLinkProps}>
                  Move
                </a>
              </li>
              <li>
                <a href="/note" {...newTabLinkProps}>
                  Note
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/link/" {...newTabLinkProps}>
                  Link
                </a>
              </li>
              <li>
                <a href="/packs" {...newTabLinkProps}>
                  Packs
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a href="https://loop.ableton.com/" {...newTabLinkProps}>
                  Loop Summit
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/community/user-groups/" {...newTabLinkProps}>
                  User Groups
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/certified-training/" {...newTabLinkProps}>
                  Certified Training
                </a>
              </li>
              <li>
                <a
                  href="https://www.ableton.com/en/certified-training/become-a-trainer/"
                  {...newTabLinkProps}
                >
                  Become a Trainer
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Education</h4>
            <ul>
              <li>
                <a href="https://www.ableton.com/en/shop/education/" {...newTabLinkProps}>
                  For Students
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/classroom/" {...newTabLinkProps}>
                  For the Classroom
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/colleges-universities/" {...newTabLinkProps}>
                  For Colleges
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/jobs/" {...newTabLinkProps}>
                  Apprenticeships
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="https://www.ableton.com/en/about/" {...newTabLinkProps}>
                  About
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/jobs/" {...newTabLinkProps}>
                  Jobs
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/press/" {...newTabLinkProps}>
                  Press
                </a>
              </li>
              <li>
                <a href="https://www.ableton.com/en/contact-us/" {...newTabLinkProps}>
                  Contact
                </a>
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
          <span>
            &copy; 2026 Ableton AG &middot; Sch&ouml;nhauser Allee 6&ndash;7, 10119 Berlin
          </span>
          <nav>
            <a href="https://www.ableton.com/en/legal/" {...newTabLinkProps}>
              Legal
            </a>
            <a href="https://www.ableton.com/en/privacy-policy/" {...newTabLinkProps}>
              Privacy
            </a>
            <a href="https://www.ableton.com/en/cookie-settings/" {...newTabLinkProps}>
              Cookies
            </a>
            <a href="https://www.ableton.com/en/imprint/" {...newTabLinkProps}>
              Imprint
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
