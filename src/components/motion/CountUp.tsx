import { useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/useInView"

type Props = {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ to, suffix = "", duration = 1200, className }: Props) {
  const { ref, visible } = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      // strong ease-out (Emil)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.round(to * eased))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [visible, to, duration])

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  )
}
