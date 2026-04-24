import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

export function Cursor() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.45 })
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.45 })
  const [variant, setVariant] = useState<"idle" | "hover">("idle")
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    // Only on fine pointers (Emil's touch rule)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setEnabled(mq.matches)
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener?.("change", handler)
    return () => mq.removeEventListener?.("change", handler)
  }, [])

  useEffect(() => {
    if (!enabled || reduce) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      const hit = el?.closest?.("[data-cursor='hover']")
      setVariant(hit ? "hover" : "idle")
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y, enabled, reduce])

  if (!enabled || reduce) return null

  const size = variant === "hover" ? 64 : 14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="flex items-center justify-center rounded-full bg-bone"
      >
        {variant === "hover" && (
          <span className="font-display text-[10px] uppercase tracking-widest text-ink">
            roll
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
