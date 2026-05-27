import { Link, NavLink, useLocation } from "react-router-dom";
import type { PackSummary } from "./PacksPage";

type NavProps = {
  activePack: PackSummary | null;
  cartCount: number;
};

function Nav({ activePack, cartCount }: NavProps) {
  const location = useLocation();
  const isPacksGrid = location.pathname === "/packs";

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
          <Link to="/" className="logo" aria-label="Ableton home">
            <img className="logo-mark" src="/ableton-logo.svg" alt="" aria-hidden="true" />
          </Link>
          <nav className="nav-main" aria-label="Primary">
            <NavLink to="/live">Live</NavLink>
            <NavLink to="/push">Push</NavLink>
            <NavLink to="/move">Move</NavLink>
            <a href="#note">Note</a>
            <NavLink to="/packs">Packs</NavLink>
            <a href="#learn">Learn</a>
            <NavLink to="/shop">Shop</NavLink>
          </nav>
          {isPacksGrid ? (
            <div className="nav-end nav-pack-end">
              <span className="nav-pack-title">{activePack?.title ?? "Packs / Max for Live"}</span>
              {activePack && (
                <Link to={`/packs/${activePack.slug}#buy`} className="btn nav-pack-buy">
                  Buy Now <span className="arr">&rarr;</span>
                </Link>
              )}
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
      </header>
    </>
  );
}

export default Nav;
