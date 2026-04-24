import { useEffect, useRef, useState } from "react"

type Asset =
  | { type: "image"; src: string }
  | { type: "video"; src: string }

type Props = {
  assets: Asset[]
  onDone: () => void
  /** Minimum time the loader is visible — keeps the animation intentional */
  minMs?: number
}

const STATUS_LINES = [
  "Scanning curb geometry",
  "Preloading edits",
  "Syncing grind plates",
  "Tuning anti-rocker",
  "Rolling",
]

export function BootLoader({ assets, onDone, minMs = 1400 }: Props) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(0)
  const [phase, setPhase] = useState<"loading" | "out">("loading")
  const startedAt = useRef(performance.now())

  useEffect(() => {
    if (!assets.length) {
      setProgress(100)
      return
    }
    let loaded = 0
    const advance = () => {
      loaded += 1
      setProgress(Math.round((loaded / assets.length) * 100))
    }
    const cleanups: Array<() => void> = []

    assets.forEach((a) => {
      if (a.type === "image") {
        const img = new Image()
        const done = () => advance()
        img.addEventListener("load", done, { once: true })
        img.addEventListener("error", done, { once: true })
        img.src = a.src
        cleanups.push(() => {
          img.removeEventListener("load", done)
          img.removeEventListener("error", done)
        })
      } else {
        const v = document.createElement("video")
        v.preload = "auto"
        v.muted = true
        v.playsInline = true
        const done = () => advance()
        v.addEventListener("canplaythrough", done, { once: true })
        v.addEventListener("error", done, { once: true })
        // Safari sometimes stalls on canplaythrough — fall back
        const fallback = window.setTimeout(done, 6000)
        v.src = a.src
        v.load()
        cleanups.push(() => {
          v.removeEventListener("canplaythrough", done)
          v.removeEventListener("error", done)
          window.clearTimeout(fallback)
          v.src = ""
        })
      }
    })

    return () => cleanups.forEach((fn) => fn())
  }, [assets])

  // Cycle the status line while loading
  useEffect(() => {
    const id = window.setInterval(() => {
      setStatus((s) => (s + 1) % STATUS_LINES.length)
    }, 520)
    return () => window.clearInterval(id)
  }, [])

  // Trigger exit when progress hits 100 AND min-time has elapsed
  useEffect(() => {
    if (progress < 100) return
    const elapsed = performance.now() - startedAt.current
    const wait = Math.max(0, minMs - elapsed)
    const t1 = window.setTimeout(() => setPhase("out"), wait)
    const t2 = window.setTimeout(onDone, wait + 720) // match CSS exit duration
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [progress, minMs, onDone])

  const pct = String(progress).padStart(3, "0")

  return (
    <div
      data-phase={phase}
      aria-hidden={phase === "out"}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-ink text-bone data-[phase=out]:[clip-path:inset(0_0_100%_0)] [clip-path:inset(0_0_0_0)] transition-[clip-path] duration-[720ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
    >
      <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
      <div className="pointer-events-none absolute inset-0 halftone opacity-20" />

      {/* Top bar: tape + filename */}
      <div className="flex items-center justify-between border-b border-bone/15 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-bone/60 md:px-8">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-acid opacity-80" />
            <span className="relative block h-2 w-2 rounded-full bg-acid" />
          </span>
          Reel · SDW_2026.mp4
        </span>
        <span className="tabular-nums">TC 00:00:{String(Math.floor(progress / 4)).padStart(2, "0")}:{pct.slice(-2)}</span>
      </div>

      {/* Middle: giant wordmark */}
      <div className="relative flex flex-1 items-center justify-center px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[clamp(5rem,19vw,18rem)] leading-[0.85] text-bone/[0.05]"
        >
          WIZARD
        </div>
        <div className="relative text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-bone/60">
            Now loading — Skate Dat Way
          </p>
          <h1 className="mt-3 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9]">
            <span className="text-bone">Skate</span>{" "}
            <span className="text-acid italic">dat</span>{" "}
            <span className="text-bone">way.</span>
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-bone/50">
            {STATUS_LINES[status]}
            <span className="ml-0.5 inline-block w-2 animate-pulse text-acid">
              _
            </span>
          </p>
        </div>
      </div>

      {/* Bottom: progress bar + counter */}
      <div className="border-t border-bone/15 px-5 pb-6 pt-4 md:px-8">
        <div className="flex items-end justify-between gap-6 font-display uppercase">
          <span className="text-[11px] tracking-widest text-bone/50">
            Preload
          </span>
          <span className="font-mono text-[10px] tracking-widest text-bone/40">
            {progress === 100 ? "Ready" : "Caching to local storage"}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div
            className="flex-1 overflow-hidden border border-bone/20 bg-bone/[0.04]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-2 bg-acid transition-[width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-[5.5ch] text-right font-display text-3xl leading-none tabular-nums text-bone">
            {pct}
          </div>
        </div>
      </div>
    </div>
  )
}
