import { useEffect, useRef } from "react";
import Artists from "./components/Artists";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Learn from "./components/Learn";
import Nav from "./components/Nav";
import Session from "./components/Session";

function App() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const els = root.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const parent = entry.target.parentElement;
              const delay = parent ? Array.from(parent.children).indexOf(entry.target) * 90 : 0;
              window.setTimeout(() => entry.target.classList.add("in"), delay);
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );
      els.forEach((el) => io.observe(el));

      return () => io.disconnect();
    }
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const media = window.matchMedia("(max-width: 720px)");
    const windows = Array.from(root.querySelectorAll<HTMLElement>(".quartet .window"));
    let ticking = false;

    const clearActive = () => windows.forEach((win) => win.classList.remove("is-active"));

    const updateActive = () => {
      ticking = false;
      if (!media.matches) {
        clearActive();
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let active: HTMLElement | null = null;
      let activeDistance = Infinity;

      windows.forEach((win) => {
        const rect = win.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < activeDistance) {
          activeDistance = distance;
          active = win;
        }
      });

      windows.forEach((win) => win.classList.toggle("is-active", win === active));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    if (windows.length) {
      updateActive();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      if (media.addEventListener) {
        media.addEventListener("change", updateActive);
      } else {
        media.addListener(updateActive);
      }
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (media.removeEventListener) {
        media.removeEventListener("change", updateActive);
      } else {
        media.removeListener(updateActive);
      }
    };
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const form = root.querySelector<HTMLFormElement>(".sub-form");
    const input = form?.querySelector<HTMLInputElement>("input");
    const button = form?.querySelector<HTMLButtonElement>("button");
    let timeoutId: number | null = null;

    if (!form || !input || !button) return;

    const handleSubmit = (event: Event) => {
      event.preventDefault();
      input.value = "";
      button.textContent = "Subscribed";

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        button.textContent = "Subscribe";
      }, 1800);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div ref={contentRef}>
      <Nav />
      <Hero />
      <Session />
      <Artists />
      <Learn />
      <Footer />
    </div>
  );
}

export default App;
