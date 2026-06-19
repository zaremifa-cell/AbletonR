"use client";

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "@/lib/navigation";
import { mobileNavItems } from "@/data/nav";
import type { PackSummary } from "@/data/packs";
import { useCart } from "@/contexts/CartContext";

type NavProps = {
  activePack: PackSummary | null;
};

function Nav({ activePack }: NavProps) {
  const { count: cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const isPacksGrid = location.pathname === "/packs";
  const isMobileItemActive = (to: string) => {
    const [path, hash] = to.split("#");
    if (hash) return location.pathname === path && location.hash === `#${hash}`;
    if (path === "/") return location.pathname === "/" && !location.hash;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const scrollToLearn = () => {
    window.requestAnimationFrame(() => {
      const target = document.getElementById("learn-section");
      const container = document.querySelector<HTMLElement>(".home-page");
      if (!target || !container) return;

      container.scrollTo({
        top: target.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  const handleLearnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToLearn, 80);
      return;
    }

    scrollToLearn();
  };

  useEffect(() => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileMenuRef.current) mobileMenuRef.current.open = false;
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="promo">
        <div className="promo-inner">
          <span className="promo-dot"></span>
          <span>Rent-to-Own Live Suite &mdash; own it after monthly payments.</span>
          <Link to="/rent-to-own">
            Learn more <span className="arr">&rarr;</span>
          </Link>
        </div>
      </div>

      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo logo-home" aria-label="Ableton home">
            <img className="logo-mark" src="/ableton-logo.svg" alt="" aria-hidden="true" />
          </Link>
          <details
            ref={mobileMenuRef}
            className="mobile-nav-disclosure"
            onToggle={(event) => setIsMobileMenuOpen(event.currentTarget.open)}
          >
            <summary
              className="logo mobile-logo-toggle"
              role="button"
              aria-label={isMobileMenuOpen ? "Close Ableton menu" : "Open Ableton menu"}
              aria-controls="mobile-product-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <img className="logo-mark" src="/ableton-logo.svg" alt="" aria-hidden="true" />
            </summary>
            <div
              className={`mobile-product-menu${isMobileMenuOpen ? " is-open" : ""}`}
              id="mobile-product-menu"
              aria-hidden={!isMobileMenuOpen}
            >
              <nav className="mobile-product-menu-panel" aria-label="Mobile product navigation">
                {mobileNavItems.map((item, index) => {
                  const isActive = isMobileItemActive(item.to);

                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`mobile-product-link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="mobile-product-index">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </details>
          <nav className="nav-main" aria-label="Primary">
            <NavLink to="/live">Live</NavLink>
            <NavLink to="/push">Push</NavLink>
            <NavLink to="/move">Move</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/packs">Packs</NavLink>
            <a href="#learn-section" onClick={handleLearnClick}>Learn</a>
            <NavLink to="/shop">Shop</NavLink>
          </nav>
          {isPacksGrid ? (
            <div className="nav-end nav-pack-end">
              <span className={`nav-pack-title${activePack ? " is-active" : ""}`}>
                {activePack?.title ?? "Packs / Max for Live"}
              </span>
              <Link to="/shop/cart" className="nav-cart nav-cart--packs-mobile">
                Cart <span>{cartCount}</span>
              </Link>
              <Link to="/live#trial" className="btn">
                Try Live Free <span className="arr">&rarr;</span>
              </Link>
            </div>
          ) : (
            <div className="nav-end">
              <Link to="/shop/account" className="login mono">
                Log&nbsp;in
              </Link>
              <Link to="/shop/cart" className="nav-cart">
                Cart <span>{cartCount}</span>
              </Link>
              <Link to="/live#trial" className="btn">
                Try Live Free <span className="arr">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Nav;
