import { ArrowDown, MapPin } from "lucide-react"
import { Magnetic } from "@/components/motion/Magnetic"
import { Tilt } from "@/components/motion/Tilt"
import { CountUp } from "@/components/motion/CountUp"
import { Reveal } from "@/components/motion/Reveal"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-bone/15"
    >
      {/* Ambient urban background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 chainlink opacity-60" />
        <div className="absolute inset-0 halftone opacity-40" />
        <div className="absolute inset-x-0 top-0 h-px bg-bone/10" />
        <div className="absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-acid/10 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-hot/10 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-7">
          <Reveal stagger className="space-y-5">
            <div className="inline-flex items-center gap-3 border-2 border-bone bg-ink px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-acid opacity-75" />
                <span className="relative rounded-full bg-acid" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-bone">
                Live from London · wizard skating
              </span>
            </div>
            <h1 className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
              <span className="block text-bone">Skate</span>
              <span className="block">
                <span className="text-bone">dat </span>
                <span className="text-acid italic">way</span>
                <span className="text-bone">.</span>
              </span>
            </h1>
            <p className="max-w-xl text-lg text-bone/70">
              Rollerblading out of London. Deep in the wizard scene — soul slides
              down tube ramps, natural-line spots, anti-rocker trucks and no
              helmet cam cinema. This is the personal archive.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic>
                <a
                  href="#edits"
                  data-cursor="hover"
                  className="press inline-flex items-center gap-3 border-2 border-ink bg-acid px-6 py-4 font-display text-sm uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#0a0a0a]"
                >
                  Watch the edits
                  <ArrowDown className="size-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#about"
                  data-cursor="hover"
                  className="press inline-flex items-center gap-3 border-2 border-bone/40 px-6 py-4 font-display text-sm uppercase tracking-widest text-bone hover:border-acid hover:text-acid transition-colors duration-150"
                >
                  What is wizard?
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal stagger className="mt-14 grid grid-cols-3 gap-8 border-t border-bone/15 pt-8">
            <Stat value={7} suffix="y" label="Bladed" />
            <Stat value={43} label="Spots logged" />
            <Stat value={12} label="Edits dropped" />
          </Reveal>
        </div>

        <div className="relative md:col-span-5">
          <Tilt max={6} className="relative">
            <figure className="relative aspect-[4/5] w-full overflow-hidden border-2 border-bone shadow-[14px_14px_0_0_#d6ff3e]">
              <img
                src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1200&q=80&auto=format&fit=crop"
                alt="Rollerblader mid-grind, London concrete"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 scanlines opacity-30 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

              {/* CCTV timestamp */}
              <div className="absolute left-3 top-3 flex items-center gap-2 border border-acid/60 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-acid" />
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
                <span
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center border-2 border-bone bg-ink text-bone"
                >
                  ↗
                </span>
              </figcaption>
            </figure>
          </Tilt>

          {/* Sticker slap */}
          <div className="absolute -left-6 top-1/3 hidden h-24 w-24 rotate-[-12deg] items-center justify-center border-2 border-ink bg-hot text-center font-display text-xs uppercase leading-tight text-bone shadow-[4px_4px_0_0_#0a0a0a] md:flex">
            new
            <br />
            edit
            <br />
            <span className="text-lg">↓</span>
          </div>

          {/* Tape label */}
          <div className="absolute -bottom-3 -right-3 hidden border-2 border-ink bg-hazard px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink md:block">
            <MapPin className="mr-1 inline size-3 -translate-y-px" />
            51.4816° N · 0.1226° W
          </div>
        </div>
      </div>

      {/* Outline wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-16 -z-10 hidden select-none font-display text-[200px] leading-none text-bone/[0.035] md:block"
      >
        WIZARD
      </div>
    </section>
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
      <div className="font-display text-5xl leading-none text-acid">
        <CountUp to={value} suffix={suffix} />
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-bone/60">
        {label}
      </div>
    </div>
  )
}
