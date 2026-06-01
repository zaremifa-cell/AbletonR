import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mobileNavItems } from "@/data/nav";
import type { PackSummary } from "@/data/packs";
import { useCart } from "@/contexts/CartContext";

type NavProps = {
  activePack: PackSummary | null;
};

function Nav({ activePack }: NavProps) {
  const { count: cartCount } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPacksGrid = location.pathname === "/packs";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
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
          <button
            className="logo mobile-logo-toggle"
            type="button"
            aria-label={isMobileMenuOpen ? "Close Ableton menu" : "Open Ableton menu"}
            aria-controls="mobile-product-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <img className="logo-mark" src="/ableton-logo.svg" alt="" aria-hidden="true" />
          </button>
          <nav className="nav-main" aria-label="Primary">
            <NavLink to="/live">Live</NavLink>
            <NavLink to="/push">Push</NavLink>
            <NavLink to="/move">Move</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/packs">Packs</NavLink>
            <a href="#learn">Learn</a>
            <NavLink to="/shop">Shop</NavLink>
          </nav>
          {isPacksGrid ? (
            <div className="nav-end nav-pack-end">
              <span className={`nav-pack-title${activePack ? " is-active" : ""}`}>
                {activePack?.title ?? "Packs / Max for Live"}
              </span>
              <a href="#trial" className="btn">
                Try Live Free <span className="arr">&rarr;</span>
              </a>
            </div>
          ) : (
            <div className="nav-end">
              <Link to="/shop/account" className="login mono">
                Log&nbsp;in
              </Link>
              <Link to="/shop/cart" className="nav-cart">
                Cart <span>{cartCount}</span>
              </Link>
              <a href="#trial" className="btn">
                Try Live Free <span className="arr">&rarr;</span>
              </a>
            </div>
          )}
        </div>
        <div
          className={`mobile-product-menu${isMobileMenuOpen ? " is-open" : ""}`}
          id="mobile-product-menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="mobile-product-menu-panel" aria-label="Mobile product navigation">
            {mobileNavItems.map((item, index) => (
              <Link key={item.label} to={item.to} className="mobile-product-link">
                <span className="mobile-product-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Nav;
