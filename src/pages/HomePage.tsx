import { useEffect } from "react";
import Artists from "@/components/sections/Artists";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import { useReveal } from "@/hooks/useReveal";
import { SITE_BASE_URL, usePageMeta } from "@/hooks/usePageMeta";

function HomePage() {
  usePageMeta({
    title: "Ableton Programme — Portfolio Product Archive",
    description:
      "Portfolio redesign concept for Ableton presenting Live, Push, Move, Note and Packs as a disciplined product archive built with React and TypeScript.",
    canonicalPath: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ableton Programme",
      url: SITE_BASE_URL,
      description:
        "Portfolio redesign concept for Ableton's music-making ecosystem, built with React, TypeScript and Vite.",
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: "Zlatko Anastasov",
      },
    },
  });

  const contentRef = useReveal("home");

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const media = window.matchMedia("(max-width: 720px)");
    const windows = Array.from(root.querySelectorAll<HTMLElement>(".quartet .window"));
    let ticking = false;

    const clearActive = () => windows.forEach((win) => win.classList.remove("is-active"));

    const updateActive = () => {
      ticking = false;
      if (!media.matches) { clearActive(); return; }

      const rootRect = root.getBoundingClientRect();
      const viewportCenter = rootRect.top + root.clientHeight / 2;
      const threshold = root.clientHeight * 0.18;
      let active: HTMLElement | null = null;
      let activeDistance = Infinity;

      windows.forEach((win) => {
        const rect = win.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < activeDistance) { activeDistance = distance; active = win; }
      });

      if (activeDistance > threshold) active = null;
      windows.forEach((win) => win.classList.toggle("is-active", win === active));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    if (windows.length) {
      root.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      if (media.addEventListener) media.addEventListener("change", updateActive);
      else media.addListener(updateActive);
    }

    return () => {
      root.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (media.removeEventListener) media.removeEventListener("change", updateActive);
      else media.removeListener(updateActive);
    };
  }, [contentRef]);

  return (
    <div className="home-page" ref={contentRef}>
      <Hero />
      <Features />
      <Artists />
      <Footer />
    </div>
  );
}

export default HomePage;
