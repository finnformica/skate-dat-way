import { useEffect, useRef, useState } from "react"
import { useScrollFrame } from "@/hooks/useScrollFrame"

/**
 * Tracks which section is currently centred in the viewport.
 * Returns the `id` of the active section, or null if above/below the list.
 *
 * Uses a scroll-position probe (y + 1/3 viewport) rather than
 * IntersectionObserver because sections here are taller than the viewport
 * and the "most visible" answer flickers at section boundaries.
 *
 * Section offsets are measured once and re-measured on layout changes, never
 * on scroll — a section's position in the document does not change as you
 * scroll past it, so reading it per frame was forcing layout for nothing.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const offsets = useRef<{ id: string; top: number }[]>([])

  useEffect(() => {
    const measure = () => {
      offsets.current = ids.flatMap((id) => {
        const el = document.getElementById(id)
        return el ? [{ id, top: el.getBoundingClientRect().top + window.scrollY }] : []
      })
    }
    measure()
    window.addEventListener("resize", measure)
    // Sections grow as media loads and as "show more" reveals extra cards,
    // so a plain resize listener is not enough to keep the offsets honest.
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => {
      window.removeEventListener("resize", measure)
      ro.disconnect()
    }
  }, [ids])

  useScrollFrame(() => {
    const probe = window.scrollY + window.innerHeight / 3
    let current: string | null = null
    for (const s of offsets.current) {
      if (probe >= s.top) current = s.id
    }
    setActive(current)
  })

  return active
}
