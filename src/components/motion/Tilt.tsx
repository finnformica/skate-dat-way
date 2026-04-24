import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

type Props = {
  children: ReactNode
  max?: number
  className?: string
}

export function Tilt({ children, max = 8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const reduce = useReducedMotion()

  const srx = useSpring(rx, { stiffness: 180, damping: 16, mass: 0.5 })
  const sry = useSpring(ry, { stiffness: 180, damping: 16, mass: 0.5 })

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max)
    rx.set(-py * max)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
