"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SCROLL_CONTAINER_SELECTOR = [
  ".home-page",
  ".move-page",
  ".push-scroll",
  ".note-page",
  ".lp",
].join(",");

function getScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollableContainers() {
  return Array.from(document.querySelectorAll<HTMLElement>(SCROLL_CONTAINER_SELECTOR));
}

function getMaxScrollTop() {
  return Math.max(getScrollTop(), ...getScrollableContainers().map((container) => container.scrollTop));
}

function BackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let visible = false;

    const updateVisibility = () => {
      const scrollTop = getMaxScrollTop();
      const nextVisible = visible ? scrollTop > 240 : scrollTop > 640;

      if (nextVisible !== visible) {
        visible = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    const requestVisibilityUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    document.addEventListener("scroll", requestVisibilityUpdate, { passive: true, capture: true });
    window.addEventListener("resize", requestVisibilityUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestVisibilityUpdate);
      document.removeEventListener("scroll", requestVisibilityUpdate, { capture: true });
      window.removeEventListener("resize", requestVisibilityUpdate);
    };
  }, [pathname]);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getScrollableContainers().forEach((container) => {
      container.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <span aria-hidden="true"></span>
    </button>
  );
}

export default BackToTop;
