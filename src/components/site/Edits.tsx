import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { Tilt } from "@/components/motion/Tilt"
import { SectionHeader } from "@/components/site/SectionHeader"
import { useIsTouch } from "@/hooks/useIsTouch"

type Edit = {
  title: string
  year: string
  location: string
  video: string
  tag?: "new" | "vhs" | "featured"
  /** Per-video framing — override when the action is off-centre.
   *  Use any valid `object-position` value, e.g. "50% 30%" or "center top". */
  objectPosition?: string
}

const edits: Edit[] = [
  {
    title: "South of the river",
    year: "2026",
    location: "Peckham → Elephant",
    video: "/videos/video1.mp4",
    tag: "new",
  },
  {
    title: "Night shift",
    year: "2025",
    location: "Barbican · after hours",
    video: "/videos/video2.mp4",
    tag: "featured",
  },
  {
    title: "Wet concrete",
    year: "2025",
    location: "Southbank undercroft",
    video: "/videos/video3.mp4",
  },
  {
    title: "Mind the gap",
    year: "2024",
    location: "Canada Water → Rotherhithe",
    video: "/videos/video4.mp4",
    tag: "vhs",
  },
  {
    title: "Crystal lines",
    year: "2024",
    location: "Crystal Palace · SE19",
    video: "/videos/video5.mp4",
  },
  {
    title: "Hackney rails",
    year: "2023",
    location: "Broadway Market · E8",
    video: "/videos/video6.mp4",
    tag: "vhs",
  },
  {
    title: "Thames path blues",
    year: "2023",
    location: "Bermondsey → Deptford",
    video: "/videos/video7.mp4",
  },
  {
    title: "Green Park after dark",
    year: "2022",
    location: "Mayfair · W1J",
    video: "/videos/video8.mp4",
  },
]

export function Edits() {
  const touch = useIsTouch()
  return (
    <section id="edits" className="relative border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            index="02"
            label="Reels"
            tone="hot"
            note="filmed / edited"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Reels,{" "}
                <span className="text-hot italic">filmed flat.</span>
              </h2>
            </Reveal>
          </SectionHeader>
          <p className="max-w-md text-bone/60 md:pb-2">
            All handheld, all London, all the sections that didn't get cut. No
            drone shots, no slow-mo abuse. Fisheye only.
          </p>
        </div>

        <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {edits.map((e, i) => (
            <EditCard edit={e} key={e.title} offset={i % 2 === 1} touch={touch} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function EditCard({
  edit,
  offset,
  touch,
}: {
  edit: Edit
  offset: boolean
  touch: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const articleRef = useRef<HTMLElement>(null)

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }
  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  // On touch: autoplay when card is mostly in view; pause when not.
  useEffect(() => {
    if (!touch) return
    const el = articleRef.current
    const v = videoRef.current
    if (!el || !v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.6) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: [0, 0.3, 0.6, 0.9] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [touch])

  // Desktop pointer handlers only — no-op on touch
  const hoverProps = touch
    ? {}
    : {
        onPointerEnter: play,
        onPointerLeave: stop,
        onFocus: play,
        onBlur: stop,
      }

  return (
    <Tilt max={touch ? 0 : 4}>
      <article
        ref={articleRef}
        {...hoverProps}
        tabIndex={0}
        className={`group relative overflow-hidden border-2 border-bone/15 bg-ink-2 transition-colors duration-200 hover:border-acid focus-visible:border-acid focus-visible:outline-none ${
          offset ? "md:translate-y-6" : ""
        }`}
      >
        <div className="relative aspect-video overflow-hidden">
          <video
            ref={videoRef}
            src={`${edit.video}#t=0.1`}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ objectPosition: edit.objectPosition ?? "center" }}
            className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[500ms] ease-out group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:scale-[1.02] group-focus-visible:grayscale-0"
            aria-label={`${edit.title} preview`}
          />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-25 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* Top-left: location */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-acid/60 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid backdrop-blur-sm">
            <MapPin size={10} />
            {edit.location}
          </div>

          {edit.tag && (
            <div className="absolute right-3 top-3 border-2 border-ink bg-hazard px-2 py-1 font-display text-[10px] uppercase tracking-widest text-ink">
              {edit.tag}
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
              Reel · {edit.year}
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase text-bone transition-colors duration-150 group-hover:text-acid">
              {edit.title}
            </h3>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-acid transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            watch ↗
          </span>
        </div>
      </article>
    </Tilt>
  )
}
