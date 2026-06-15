import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import type { PackSummary } from "@/data/packs";
import Nav from "@/components/layout/Nav";
import HomePage from "@/views/HomePage";
import Live12Page from "@/views/Live12Page";
import LiveExperimentPage from "@/views/LiveExperimentPage";
import MovePage from "@/views/MovePage";
import NotePage from "@/views/NotePage";
import PacksPage from "@/views/PacksPage";
import Push3Page from "@/views/Push3Page";
import RentToOwnPage from "@/views/RentToOwnPage";
import ShopPage from "@/views/ShopPage";

const scrollContainerSelectors = [
  ".home-page",
  ".lp",
  ".lexp-page",
  ".push-scroll",
  ".move-page",
  ".note-page",
  ".packs-grid",
  ".shop-product-grid",
];

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.slice(1));
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document
        .querySelectorAll<HTMLElement>(scrollContainerSelectors.join(","))
        .forEach((element) => {
          element.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
    });
  }, [location.pathname, location.hash, location.key]);

  return null;
}

function App() {
  const [activePack] = useState<PackSummary | null>(null);

  return (
    <>
      <ScrollManager />
      <Nav activePack={activePack} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live" element={<Live12Page />} />
        <Route path="/live-experiment" element={<LiveExperimentPage />} />
        <Route path="/push" element={<Push3Page />} />
        <Route path="/move" element={<MovePage />} />
        <Route path="/note" element={<NotePage />} />
        <Route path="/rent-to-own" element={<RentToOwnPage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="/packs/:packSlug" element={<PacksPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/product/:productSlug" element={<ShopPage />} />
        <Route path="/shop/cart" element={<ShopPage />} />
        <Route path="/shop/checkout" element={<ShopPage />} />
        <Route path="/shop/account" element={<ShopPage />} />
      </Routes>
    </>
  );
}

export default App;
