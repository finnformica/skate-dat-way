import { useEffect, useState } from "react"

/**
 * Tracks which section is currently centred in the viewport.
 * Returns the `id` of the active section, or null if above/below the list.
 *
 * Uses a scroll-position probe (y + 1/3 viewport) rather than
 * IntersectionObserver because sections here are taller than the viewport
 * and the "most visible" answer flickers at section boundaries.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const compute = () => {
      const probe = window.scrollY + window.innerHeight / 3
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (probe >= top) current = id
      }
      setActive(current)
    }
    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [ids])

  return active
}
