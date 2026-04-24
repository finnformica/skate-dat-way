import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

type Props = {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const reduce = useReducedMotion()

  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 })

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
