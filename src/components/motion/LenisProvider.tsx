import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

type Props = {
  children: ReactNode
}

// Header height offset so in-page anchors don't land under the sticky nav
const SCROLL_OFFSET = -80

export function LenisProvider({ children }: Props) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Intercept in-page anchor clicks and route them through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return // left-click only
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("#") || href.length < 2) return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.2 })
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
