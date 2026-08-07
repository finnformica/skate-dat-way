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

  // With no tilt to apply, skip the motion wrapper entirely. A rotateX/rotateY
  // pair of zero still emits a 3D transform, which promotes every card to its
  // own composited layer — fifteen of them on the reels grid, for no visible
  // effect. Touch passes max={0}, so this covers the whole mobile grid.
  // Declared after the hooks: `reduce` and `max` both change at runtime, so an
  // early return above them would change the hook count between renders.
  const inert = reduce || max === 0

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

  if (inert) {
    return <div className={className}>{children}</div>
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
