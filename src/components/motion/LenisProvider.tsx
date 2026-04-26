import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

type Props = { children: ReactNode };

declare global {
  interface Window {
    __lenisLocked?: boolean;
  }
}

const SCROLL_OFFSET = 0;

export function LenisProvider({ children }: Props) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // If a child effect (e.g. BootLoader) ran before us and set the lock flag,
    // honour it — its dispatched event would have fired before our listener
    // was attached.
    if (window.__lenisLocked) lenis.stop();

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Intercept in-page anchor clicks and route them through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return; // left-click only
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.2 });
    };
    document.addEventListener("click", onAnchorClick);

    // External pause/resume — used by BootLoader to lock scroll while it's up.
    const onStop = () => lenis.stop();
    const onStart = () => lenis.start();
    window.addEventListener("lenis:stop", onStop);
    window.addEventListener("lenis:start", onStart);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("lenis:stop", onStop);
      window.removeEventListener("lenis:start", onStart);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
