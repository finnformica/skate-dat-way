import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

type Props = {
  children: ReactNode
}

export function LenisProvider({ children }: Props) {
  useEffect(() => {
    // Respect OS-level reduced-motion preference — don't smooth if user opted out
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const lenis = new Lenis({
      // Custom curve — Apple-ish deceleration (Emil's recommended direction)
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      duration: 1.1,
      // Let native wheel/touch still control, just smooth the delta
      smoothWheel: true,
      // Expose progress to CSS via a data attribute — handy for debugging
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // In-page anchor links should use Lenis's smooth scroll
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const a = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null
      if (!a) return
      const hash = a.getAttribute("href")
      if (!hash || hash === "#" || hash.length < 2) return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -64 })
    }
    document.addEventListener("click", onAnchorClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
