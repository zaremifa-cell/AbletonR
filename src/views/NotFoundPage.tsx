"use client";

import { Link } from "@/lib/navigation";
import { usePageMeta } from "@/hooks/usePageMeta";
import "./NotFoundPage.css";

const SUGGESTED_LINKS = [
  { to: "/", label: "Home" },
  { to: "/live", label: "Live" },
  { to: "/push", label: "Push" },
  { to: "/move", label: "Move" },
  { to: "/packs", label: "Packs" },
  { to: "/shop", label: "Shop" },
];

function NotFoundPage() {
  usePageMeta({
    title: "404 — Page not found · Ableton Programme",
    description: "The requested page does not exist in the Ableton Programme portfolio archive.",
    canonicalPath: "/404",
  });

  return (
    <main className="not-found">
      <section className="not-found-inner">
        <p className="not-found-kicker">Error · 404</p>
        <h1 className="not-found-title">
          <span className="not-found-stop">This page</span>
          <span className="not-found-stop">is not in the archive.</span>
        </h1>
        <p className="not-found-copy">
          The URL you requested does not match any entry in this portfolio. Return to
          the home archive or jump directly to one of the product sections below.
        </p>
        <nav className="not-found-links" aria-label="Suggested pages">
          {SUGGESTED_LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="not-found-link">
              <span className="not-found-link-arrow" aria-hidden="true">&rarr;</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default NotFoundPage;
