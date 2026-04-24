import { useEffect, useRef } from "react"
import { ArrowDown, MapPin } from "lucide-react"
import { Magnetic } from "@/components/motion/Magnetic"
import { Tilt } from "@/components/motion/Tilt"
import { CountUp } from "@/components/motion/CountUp"
import { Reveal } from "@/components/motion/Reveal"

type Props = {
  ready: boolean
  videoSrc: string
}

export function Hero({ ready, videoSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!ready) return
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      /* autoplay blocked — leave poster visible */
    })
  }, [ready])

  return (
    <section
      id="top"
      data-ready={ready}
      className="relative overflow-hidden border-b border-bone/15"
    >
      {/* Ambient urban background — stencil, technical markings, outline type */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 chainlink opacity-60" />
        <div className="absolute inset-0 halftone opacity-40" />
        <div className="absolute inset-x-0 top-0 h-px bg-bone/10" />

        {/* Right-edge WIZARD wordmark */}
        <div
          aria-hidden
          className="absolute -right-6 top-16 hidden select-none font-display text-[clamp(7rem,16vw,14rem)] leading-none text-bone/[0.04] md:block"
        >
          WIZARD
        </div>

        {/* Left-edge LONDON wordmark — rotated vertical */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden items-center md:flex"
        >
          <span className="block -translate-x-[40%] -rotate-90 whitespace-nowrap font-display text-[clamp(6rem,13vw,11rem)] leading-none text-bone/[0.04]">
            LONDON
          </span>
        </div>

        {/* Faint baseline grid line */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-20 hidden h-px bg-gradient-to-r from-transparent via-bone/10 to-transparent md:block"
        />
      </div>

      {/*
        Mobile flow (DOM order): headline → video → para+CTAs → stats.
        Desktop (md+): explicit grid positions — left column stacks heading,
        para+CTAs, and stats on rows 1/2/3; video spans rows 1–3 on the right.
      */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 md:grid-cols-12 md:items-end md:gap-10 md:px-8 md:py-24">
        {/* [1] Headline */}
        <div className="md:col-span-7 md:col-start-1 md:row-start-1">
          <Reveal show={ready}>
            <h1 className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
              <LineWipe show={ready} delay={80}>
                Skate
              </LineWipe>
              <LineWipe show={ready} delay={220}>
                <span className="text-acid italic">dat</span>
                <span className="text-bone"> way.</span>
              </LineWipe>
            </h1>
          </Reveal>
        </div>

        {/* [2] Video — 2nd in DOM (mobile), spans right column on desktop */}
        <div className="relative md:col-span-5 md:col-start-8 md:row-start-1 md:row-span-3">
          <Tilt max={6} className="relative">
            <figure
              className="relative aspect-video w-full overflow-hidden border-2 border-bone shadow-[8px_8px_0_0_#d6ff3e] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)] md:aspect-[4/5] md:shadow-[14px_14px_0_0_#d6ff3e]"
              style={{
                clipPath: ready ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1200&q=80&auto=format&fit=crop"
              />
              <div className="absolute inset-0 scanlines opacity-25 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

              {/* CCTV timestamp */}
              <div className="absolute left-3 top-3 flex items-center gap-2 border border-acid/60 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={`absolute inset-0 rounded-full bg-acid ${ready ? "animate-ping" : ""}`}
                  />
                  <span className="relative block h-1.5 w-1.5 rounded-full bg-acid" />
                </span>
                REC · 01:04:27
              </div>

              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-bone/80">
                    Stockwell skatepark · SW9
                  </p>
                  <p className="font-display text-2xl uppercase leading-none text-bone">
                    Soul on the deathbox
                  </p>
                </div>
                <span className="hidden h-11 w-11 items-center justify-center border-2 border-bone bg-ink text-bone sm:flex">
                  ↗
                </span>
              </figcaption>
            </figure>
          </Tilt>

          {/* "new edit" sticker — mobile: inside top-right of video;
              desktop: outside the video's left edge. */}
          <div
            className="absolute right-3 top-3 z-10 flex h-16 w-16 items-center justify-center border-2 border-ink bg-hot text-center font-display text-[10px] uppercase leading-tight text-bone shadow-[4px_4px_0_0_#0a0a0a] transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] md:-left-6 md:right-auto md:top-1/3 md:h-24 md:w-24 md:text-xs"
            style={{
              transitionDelay: ready ? "900ms" : "0ms",
              transform: ready
                ? "rotate(-12deg) scale(1)"
                : "rotate(-12deg) scale(0.6)",
              opacity: ready ? 1 : 0,
            }}
          >
            new
            <br />
            edit
            <br />
            <span className="text-sm md:text-lg">↓</span>
          </div>

          {/* Hazard tape — London, UK label */}
          <div
            className="absolute -bottom-2 -right-2 border-2 border-ink bg-hazard px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink transition-[transform,opacity] duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] md:-bottom-3 md:-right-3 md:px-3 md:py-2"
            style={{
              transitionDelay: ready ? "1100ms" : "0ms",
              transform: ready ? "translateY(0)" : "translateY(10px)",
              opacity: ready ? 1 : 0,
            }}
          >
            <MapPin className="mr-1 inline size-3 -translate-y-px" />
            London, UK
          </div>
        </div>

        {/* [3] Paragraph + CTAs */}
        <div className="md:col-span-7 md:col-start-1 md:row-start-2">
          <Reveal stagger show={ready} className="space-y-5">
            <p className="max-w-xl text-sm text-bone/70 md:text-base">
              Rollerblading out of London. Deep in the wizard scene — soul slides
              down tube ramps, natural-line spots, anti-rocker trucks and no
              helmet cam cinema. This is the personal archive.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Magnetic>
                <a
                  href="#edits"
                  className="press inline-flex items-center gap-3 border-2 border-ink bg-acid px-6 py-4 font-display text-sm uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#0a0a0a]"
                >
                  Watch the edits
                  <ArrowDown className="size-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#about"
                  className="press inline-flex items-center gap-3 border-2 border-bone/40 px-6 py-4 font-display text-sm uppercase tracking-widest text-bone transition-colors duration-150 hover:border-acid hover:text-acid"
                >
                  What is wizard?
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* [4] Stats */}
        <div className="md:col-span-7 md:col-start-1 md:row-start-3">
          <Reveal
            stagger
            show={ready}
            className="mt-2 grid grid-cols-3 gap-6 border-t border-bone/15 pt-6 md:mt-6 md:gap-8 md:pt-8"
          >
            <Stat value={ready ? 7 : 0} suffix="y" label="Bladed" />
            <Stat value={ready ? 43 : 0} label="Spots logged" />
            <Stat value={ready ? 12 : 0} label="Edits dropped" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function LineWipe({
  children,
  show,
  delay = 0,
}: {
  children: React.ReactNode
  show: boolean
  delay?: number
}) {
  // Anton's ascent+descent exceeds 1em, so a 0.85em mask clips the cap top.
  // Give the mask 1.05em to fit the glyph, then pull the next line up with
  // a -0.2em bottom margin so the visual line-to-line spacing stays at 0.85em.
  return (
    <span
      className="block overflow-hidden"
      style={{ height: "1.05em", marginBottom: "-0.2em" }}
    >
      <span
        className="block will-change-transform"
        style={{
          lineHeight: 1,
          transform: show ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
          transition: `transform 900ms cubic-bezier(0.77,0,0.175,1) ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  )
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  return (
    <div>
      <div className="font-display text-4xl leading-none text-acid tabular-nums md:text-5xl">
        <CountUp to={value} suffix={suffix} />
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-bone/60">
        {label}
      </div>
    </div>
  )
}
