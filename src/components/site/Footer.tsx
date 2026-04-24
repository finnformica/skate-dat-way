import { useEffect } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react"

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)
const Vimeo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.875 6.637c-.096 2.1-1.566 4.973-4.41 8.617-2.94 3.806-5.426 5.71-7.46 5.71-1.259 0-2.323-1.162-3.193-3.486L6.07 11.11c-.647-2.324-1.34-3.487-2.08-3.487-.162 0-.727.338-1.697 1.014L1.277 7.33c1.068-.94 2.122-1.88 3.16-2.821 1.426-1.233 2.495-1.88 3.208-1.946 1.68-.161 2.714.99 3.102 3.456.418 2.66.708 4.314.87 4.96.485 2.207.99 3.31 1.519 3.31.408 0 1.02-.645 1.833-1.936.812-1.292 1.247-2.274 1.305-2.947.113-1.078-.319-1.617-1.305-1.617-.464 0-.943.106-1.439.32.96-3.14 2.797-4.668 5.509-4.58 2.012.06 2.96 1.364 2.836 3.908z" />
  </svg>
)

const columns = [
  {
    title: "Site",
    links: [
      { label: "Manifesto", href: "#about" },
      { label: "Reels", href: "#edits" },
      { label: "Map", href: "#spots" },
      { label: "Journal", href: "#journal" },
      { label: "Signal", href: "#contact" },
    ],
  },
  {
    title: "Colophon",
    links: [
      { label: "Anton / Inter", href: "#" },
      { label: "Filmed on VX1000", href: "#" },
      { label: "Edited in Resolve", href: "#" },
    ],
  },
  {
    title: "Signal",
    links: [
      { label: "hello@skatedatway.co.uk", href: "#contact" },
      { label: "London, UK", href: "#" },
      { label: "Open to filmers", href: "#contact" },
    ],
  },
]

function getFooterHeight() {
  if (typeof window === "undefined") return 720
  return window.innerWidth >= 768 ? 640 : 720
}

export function Footer() {
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement.scrollHeight - window.innerHeight
      const footerH = getFooterHeight()
      if (doc <= 0 || footerH <= 0) {
        progress.set(0)
        return
      }
      const y = window.scrollY
      const start = doc - footerH
      const p = Math.max(0, Math.min(1, (y - start) / footerH))
      progress.set(p)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [progress])

  const wordmarkY = useTransform(progress, [0, 1], [50, 0])
  const wordmarkOpacity = useTransform(progress, [0, 0.4], [0, 1])
  const contentY = useTransform(progress, [0, 1], [60, 0])
  const contentOpacity = useTransform(progress, [0, 0.55], [0, 1])

  return (
    <footer
      aria-label="Footer"
      className="fixed inset-x-0 bottom-0 z-0 h-[var(--footer-h)] overflow-hidden bg-ink-2"
    >
      <div className="pointer-events-none absolute inset-0 halftone opacity-25" />
      <div className="pointer-events-none absolute inset-0 chainlink opacity-30" />

      {/* Bottom wordmark — single line, clamped so it never exceeds viewport.
          Positioned just below the visible area so its descenders tuck under
          the fold, anchoring the composition without getting cut off. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: wordmarkY, opacity: wordmarkOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none justify-center"
      >
        <span className="inline-block translate-y-[0.12em] whitespace-nowrap font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.85] text-bone/[0.06]">
          SKATE DAT WAY
        </span>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pb-10 pt-14 md:px-8"
      >
        <div className="grid grid-cols-2 gap-8 border-b border-bone/15 pb-8 md:grid-cols-5 md:gap-10 md:pb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span aria-hidden className="relative grid h-10 w-10 place-items-center">
                <span className="absolute inset-0 rounded-full border-[4px] border-acid" />
                <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-bone" />
                <span className="relative font-display text-[10px] uppercase tracking-widest text-ink">
                  SDW
                </span>
              </span>
              <span className="font-display text-2xl text-bone">
                Skate Dat Way
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-bone/60">
              A personal archive of London wizard skating — edits, spots,
              notes. No shop, no team, no sponsors.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Instagram, Youtube, Vimeo].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="press flex h-10 w-10 items-center justify-center border-2 border-bone/40 text-bone transition-colors duration-150 hover:border-acid hover:text-acid"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-bone">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-bone/60">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="link-underline hover:text-acid">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col items-center justify-between gap-3 pt-6 font-mono text-xs uppercase tracking-widest text-bone/50 md:flex-row">
          <p>© 2026 Skate Dat Way · London · All edits self-filmed</p>
          <div className="flex items-center gap-5">
            <a href="#" className="link-underline hover:text-acid">
              Privacy
            </a>
            <a href="#" className="link-underline hover:text-acid">
              Terms
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
