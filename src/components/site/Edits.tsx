import { useRef } from "react"
import { Play, Clock } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { Tilt } from "@/components/motion/Tilt"

type Edit = {
  title: string
  runtime: string
  year: string
  location: string
  video: string
  poster: string
  tag?: "new" | "vhs" | "featured"
}

const edits: Edit[] = [
  {
    title: "South of the river",
    runtime: "4:12",
    year: "2026",
    location: "Peckham → Elephant",
    video: "/videos/video2.mp4",
    poster:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1600&q=80&auto=format&fit=crop",
    tag: "new",
  },
  {
    title: "Night shift",
    runtime: "3:44",
    year: "2025",
    location: "Barbican · after hours",
    video: "/videos/video3.mp4",
    poster:
      "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=1600&q=80&auto=format&fit=crop",
    tag: "featured",
  },
  {
    title: "Wet concrete",
    runtime: "2:58",
    year: "2025",
    location: "Southbank undercroft",
    video: "/videos/video4.mp4",
    poster:
      "https://images.unsplash.com/photo-1583252997434-7a7dca85eba7?w=1600&q=80&auto=format&fit=crop",
  },
  {
    title: "Mind the gap",
    runtime: "5:30",
    year: "2024",
    location: "Canada Water → Rotherhithe",
    video: "/videos/video5.mp4",
    poster:
      "https://images.unsplash.com/photo-1565108150403-c0f12d458bf6?w=1600&q=80&auto=format&fit=crop",
    tag: "vhs",
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {edits.map((e, i) => (
            <EditCard edit={e} key={e.title} featured={i === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EditCard({ edit, featured }: { edit: Edit; featured: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const play = () => {
    const v = videoRef.current
    if (!v) return
    // Lazy-hydrate the video source on first hover
    if (!v.src) v.src = edit.video
    v.play().catch(() => {
      /* ignore — autoplay policy */
    })
  }
  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <Tilt max={5}>
      <article
        onPointerEnter={play}
        onPointerLeave={stop}
        onFocus={play}
        onBlur={stop}
        className={`group relative overflow-hidden border-2 border-bone/15 bg-ink-2 transition-colors duration-200 hover:border-acid ${
          featured ? "md:translate-y-6" : ""
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Poster — cross-fades out when video is ready */}
          <img
            src={edit.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale transition-[opacity,filter,transform] duration-[500ms] ease-out group-hover:opacity-0 group-hover:grayscale-0"
            loading="lazy"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover opacity-0 transition-opacity duration-[500ms] ease-out group-hover:opacity-100"
            aria-label={`${edit.title} preview`}
          />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-30 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <div className="absolute left-3 top-3 flex items-center gap-2 border border-acid/60 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid">
            <Clock size={10} />
            {edit.runtime} · {edit.year}
          </div>

          {edit.tag && (
            <div className="absolute right-3 top-3 border-2 border-ink bg-hazard px-2 py-1 font-display text-[10px] uppercase tracking-widest text-ink">
              {edit.tag}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="press flex h-20 w-20 scale-[0.92] items-center justify-center rounded-full border-2 border-bone bg-acid text-ink opacity-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:opacity-100">
              <Play className="ml-1 size-7 fill-ink" />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
              {edit.location}
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase text-bone">
              {edit.title}
            </h3>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-acid">
            watch ↗
          </span>
        </div>
      </article>
    </Tilt>
  )
}
