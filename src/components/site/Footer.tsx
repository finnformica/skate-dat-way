import { Roundel } from "@/components/site/Roundel";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { useScrollFrame } from "@/hooks/useScrollFrame";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const INSTAGRAM_URL = "https://www.instagram.com/skatedatway";
const STUDIO_URL = "https://smfstudio.io";

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

        <div className="grid grid-cols-2 gap-8 border-b border-bone/15 pb-8 md:grid-cols-3 md:gap-10 md:pb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <Roundel />
            </div>
            <p className="mt-3 max-w-sm text-sm text-bone/60">
              A personal archive of London wizard skating: edits, spots, notes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="press flex h-10 w-10 items-center justify-center border-2 border-bone/40 text-bone transition-colors duration-150 hover:border-rust hover:text-rust"
                aria-label="Skate Dat Way on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-bone">
              Site
            </h4>
            <ul className="space-y-2 text-sm text-bone/60">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="link-underline hover:text-rust">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
