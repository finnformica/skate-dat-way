import { useEffect, useRef } from "react"

/**
 * Runs `fn` at most once per animation frame while the page scrolls.
 *
 * Scrolling is native now, so scroll events already arrive at a sane cadence —
 * but a handler that reads layout (`getBoundingClientRect`, `scrollHeight`)
 * still forces a synchronous layout every time it runs, and events can fire
 * more than once per frame. Coalescing to a single RAF callback caps that at
 * one pass per frame and keeps the reads out of the event handler itself,
 * where they would block the scroll.
 *
 * Pass `enabled: false` to detach entirely — cheaper than a handler that
 * returns early, since no listener is registered at all.
 */
export function useScrollFrame(fn: () => void, enabled = true) {
  const fnRef = useRef(fn)
  useEffect(() => {
    fnRef.current = fn
  })

  useEffect(() => {
    if (!enabled) return

    let raf = 0
    let queued = false
    const run = () => {
      queued = false
      fnRef.current()
    }
    const schedule = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(run)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [enabled])
}
