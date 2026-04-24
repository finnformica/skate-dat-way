import { useEffect, useRef, useState } from "react"

export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      options,
    )
    io.observe(node)
    return () => io.disconnect()
  }, [options])

  return { ref, visible }
}
