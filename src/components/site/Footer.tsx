import { Roundel } from "@/components/site/Roundel";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { InstagramIcon } from "@/components/site/icons";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  STUDIO_URL,
} from "@/lib/links";

// One column. The Colophon and Signal columns went with the placeholder links
// they were made of — every entry in them pointed at "#".
const siteLinks = [
  { label: "Reels", href: "#reels" },
  { label: "Map", href: "#map" },
  { label: "Contact", href: "#contact" },
];

function getFooterHeight() {
  if (typeof window === "undefined") return 720;
  return window.innerWidth >= 768 ? 640 : 720;
}

export function Footer() {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);

  // `scrollHeight` forces a full-document layout, and the old handler read it
  // on every single scroll event. The value only changes when the document
  // does, so measure it on layout changes instead of while scrolling.
  const metrics = useRef({ scrollable: 0, footerH: 0 });

  useEffect(() => {
    const measure = () => {
      metrics.current = {
        scrollable: document.documentElement.scrollHeight - window.innerHeight,
        footerH: getFooterHeight(),
      };
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  useScrollFrame(() => {
    const { scrollable, footerH } = metrics.current;
    if (scrollable <= 0 || footerH <= 0) {
      progress.set(0);
      return;
    }
    const start = scrollable - footerH;
    progress.set(Math.max(0, Math.min(1, (window.scrollY - start) / footerH)));
  });

  const wordmarkOpacity = useTransform(progress, [0, 0.4], [0, 1]);
  const contentY = useTransform(progress, [0, 1], [60, 0]);
  const contentOpacity = useTransform(progress, [0, 0.55], [0, 1]);

  return (
    <footer
      aria-label="Footer"
      className="fixed inset-x-0 bottom-0 z-0 h-(--footer-h) overflow-hidden bg-ink-2"
    >
      <div className="pointer-events-none absolute inset-0 halftone opacity-25" />
      <div className="pointer-events-none absolute inset-0 chainlink opacity-30" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pb-10 pt-14 md:px-8"
      >
        <motion.div
          aria-hidden
          style={reduce ? undefined : { opacity: wordmarkOpacity }}
          className="pointer-events-none absolute inset-x-2 bottom-2 select-none"
        >
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMinYMax meet"
            className="block w-full"
          >
            <text
              x="0"
              y="200"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontSize="200"
              className="font-display fill-bone/6"
            >
              SKATE DAT WAY
            </text>
          </svg>
        </motion.div>

        {/* Two blocks of similar weight rather than a column grid. With the
            Colophon and Signal columns gone, a three-column grid left one
            narrow list stranded beside a double-width brand block. The nav
            is set in display type instead of a small stacked list, which
            gives the tall fixed footer something to hold. */}
        <div className="flex flex-col gap-10 border-b border-bone/15 pb-8 md:flex-row md:items-start md:justify-between md:gap-16 md:pb-10">
          <div>
            <div className="flex items-center gap-3">
              <Roundel />
            </div>
            <p className="mt-3 max-w-sm text-sm text-bone/60">
              A personal archive of London wizard skating: edits, spots, notes.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="press mt-5 inline-flex items-center gap-3 border-2 border-bone/40 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-bone transition-colors duration-150 hover:border-rust hover:text-rust"
            >
              <InstagramIcon aria-hidden className="h-4 w-4" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>

          <nav aria-label="Footer" className="md:text-right">
            <ul className="flex flex-col gap-1">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    // inline-block so the underline pseudo-element hugs the
                    // text box rather than the full-width list item.
                    className="link-underline inline-block font-display text-3xl uppercase leading-tight text-bone/80 transition-colors duration-150 hover:text-rust md:text-4xl"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-auto flex flex-col items-center justify-between gap-3 pt-6 font-mono text-xs uppercase tracking-widest text-bone/50 md:flex-row">
          <p>© {new Date().getFullYear()} Skate Dat Way · London</p>
          <p>
            Made by{" "}
            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-bone/70 hover:text-rust"
            >
              SMF Studio
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
