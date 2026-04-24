import { useRef } from "react"
import { MapPin } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { Tilt } from "@/components/motion/Tilt"

type Edit = {
  title: string
  year: string
  location: string
  video: string
  tag?: "new" | "vhs" | "featured"
}

// All 8 reels — thumbnails come from the video itself (first frame via #t=0.1)
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
  return (
    <section id="edits" className="relative border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-hot">
              02 · The reel
            </p>
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Edits, <span className="text-hot italic">filmed flat.</span>
              </h2>
            </Reveal>
          </div>
          <p className="max-w-md text-bone/60">
            All handheld, all London, all the sections that didn't get cut. No
            drone shots, no slow-mo abuse. Fisheye only.
          </p>
        </div>

        <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {edits.map((e, i) => (
            <EditCard edit={e} key={e.title} offset={i % 2 === 1} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function EditCard({ edit, offset }: { edit: Edit; offset: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {
      /* autoplay blocked, ignore */
    })
  }
  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <Tilt max={4}>
      <article
        onPointerEnter={play}
        onPointerLeave={stop}
        onFocus={play}
        onBlur={stop}
        tabIndex={0}
        className={`group relative overflow-hidden border-2 border-bone/15 bg-ink-2 transition-colors duration-200 hover:border-acid focus-visible:border-acid focus-visible:outline-none ${
          offset ? "md:translate-y-6" : ""
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Single video element — its first frame is the thumbnail
              (via #t=0.1 fragment), plays on hover, seeks back to 0 on leave. */}
          <video
            ref={videoRef}
            src={`${edit.video}#t=0.1`}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[500ms] ease-out group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:scale-[1.02] group-focus-visible:grayscale-0"
            aria-label={`${edit.title} preview`}
          />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-30 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* Top-left: location badge (replaces runtime) */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-acid/60 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid backdrop-blur-sm">
            <MapPin size={10} />
            {edit.location}
          </div>

          {/* Top-right: tag sticker */}
          {edit.tag && (
            <div className="absolute right-3 top-3 border-2 border-ink bg-hazard px-2 py-1 font-display text-[10px] uppercase tracking-widest text-ink">
              {edit.tag}
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
              Edit · {edit.year}
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
