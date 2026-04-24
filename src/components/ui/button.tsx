import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display uppercase tracking-wider transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-acid text-ink hover:bg-acid/90 border-2 border-ink shadow-[4px_4px_0_0_#0a0a0a]",
        destructive: "bg-rust text-bone hover:bg-rust/90 border-2 border-ink",
        outline:
          "border-2 border-bone/40 bg-transparent text-bone hover:bg-bone hover:text-ink",
        secondary:
          "bg-bone text-ink hover:bg-bone/90 border-2 border-ink shadow-[4px_4px_0_0_#0a0a0a]",
        ghost: "text-bone hover:bg-bone/10",
        link: "text-acid underline-offset-4 hover:underline",
        hot: "bg-hot text-bone hover:bg-hot/90 border-2 border-ink shadow-[4px_4px_0_0_#0a0a0a]",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
