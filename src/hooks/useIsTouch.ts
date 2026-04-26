import { useEffect, useState } from "react"

/**
 * `true` on devices without a hover-capable pointer (phones, tablets).
 * Used to switch the Reels behaviour: hover-to-play on desktop,
 * play-when-in-view on touch.
 */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)")
    const update = () => setTouch(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])
  return touch
}
