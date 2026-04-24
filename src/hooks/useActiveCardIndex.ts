import { useEffect, useRef, useState } from "react"

/**
 * Picks the single card closest to the viewport centre — used on touch
 * devices where there's no hover, so we need exactly one "active" card
 * at a time instead of every in-view card playing/highlighting at once.
 *
 * Returns `{ activeIndex, setCardRef }`; spread `setCardRef(i)` as a ref
 * on each card. When `enabled` is false the hook is inert and returns null.
 */
export function useActiveCardIndex(count: number, enabled = true) {
  const [activeIndex, setActive] = useState<number | null>(null)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!enabled || count === 0) {
      setActive(null)
      return
    }
    // Keep refs array sized to count
    if (refs.current.length !== count) {
      refs.current = Array.from(
        { length: count },
        (_, i) => refs.current[i] ?? null,
      )
    }

    const compute = () => {
      const centerY = window.innerHeight / 2
      let best: number | null = null
      let bestDist = Infinity
      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue
        const d = Math.abs(rect.top + rect.height / 2 - centerY)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      }
      setActive(best)
    }
    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [count, enabled])

  const setCardRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el
  }

  return { activeIndex, setCardRef }
}
