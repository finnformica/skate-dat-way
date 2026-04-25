import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 font-display text-xs uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "border-ink bg-rust text-ink",
        outline: "border-bone/40 text-bone",
        hot: "border-ink bg-hot text-bone",
        rust: "border-ink bg-rust text-bone",
        bone: "border-ink bg-bone text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
