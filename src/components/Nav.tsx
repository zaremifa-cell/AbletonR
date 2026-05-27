import { Link, NavLink, useLocation } from "react-router-dom";
import type { PackSummary } from "./PacksPage";

type NavProps = {
  activePack: PackSummary | null;
};

function Nav({ activePack }: NavProps) {
  const location = useLocation();
  const isPacksGrid = location.pathname === "/packs";

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
            <a href="#shop">Shop</a>
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
              <a href="#login" className="login mono">
                Log&nbsp;in
              </a>
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
