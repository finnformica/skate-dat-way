import { useRef, useState } from "react"
import { useScrollFrame } from "@/hooks/useScrollFrame"

/**
 * Picks the single card closest to the viewport centre — used on touch
 * devices where there's no hover, so we need exactly one "active" card
 * at a time instead of every in-view card playing/highlighting at once.
 *
 * Returns `{ activeIndex, setCardRef }`; spread `setCardRef(i)` as a ref
 * on each card. When `enabled` is false no scroll listener is attached and
 * the hook reports null.
 *
 * Unlike the section offsets, these rects genuinely do have to be re-read —
 * cards animate in and the grid reflows when "show more" is pressed — so the
 * saving here is the RAF coalescing rather than caching.
 */
export function useActiveCardIndex(count: number, enabled = true) {
  const [activeIndex, setActive] = useState<number | null>(null)
  const refs = useRef<(HTMLElement | null)[]>([])

  useScrollFrame(() => {
    const viewportH = window.innerHeight
    const centerY = viewportH / 2
    let best: number | null = null
    let bestDist = Infinity
    for (let i = 0; i < count; i++) {
      const el = refs.current[i]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > viewportH) continue
      const d = Math.abs(rect.top + rect.height / 2 - centerY)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    setActive(best)
  }, enabled && count > 0)

  const setCardRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el
  }

  // Derived rather than reset through an effect, so switching `enabled` off
  // cannot leave a stale card marked active for a render.
  return { activeIndex: enabled ? activeIndex : null, setCardRef }
}
