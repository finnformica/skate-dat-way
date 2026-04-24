import type { ReactNode } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  as?: "div" | "section" | "article" | "figure"
  stagger?: boolean
  className?: string
}

export function Reveal({ children, as = "div", stagger = false, className }: Props) {
  const Tag = as
  const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      data-stagger={stagger ? "true" : undefined}
      className={cn(!stagger && "reveal-clip", className)}
    >
      {children}
    </Tag>
  )
}
