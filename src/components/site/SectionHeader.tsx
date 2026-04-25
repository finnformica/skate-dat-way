import type { ReactNode } from "react"
import { Asterisk } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "rust" | "hot" | "hazard"

type Props = {
  index: string
  label: string
  tone: Tone
  note?: string
  className?: string
  children: ReactNode
}

/** Static class lookups (Tailwind needs literal strings to compile).
 *  `onBg` is the foreground on the pill's filled cell — uses
 *  `text-on-accent` so the colour tracks the active theme
 *  (dark text on bright accents in dark mode, cream text on deep
 *  accents in light mode). */
const tones: Record<
  Tone,
  { border: string; bg: string; text: string; onBg: string; tape: string }
> = {
  rust: {
    border: "border-rust",
    bg: "bg-rust",
    text: "text-rust",
    onBg: "text-on-accent",
    tape: "bg-rust",
  },
  hot: {
    border: "border-hot",
    bg: "bg-hot",
    text: "text-hot",
    onBg: "text-on-accent",
    tape: "bg-hot",
  },
  hazard: {
    border: "border-hazard",
    bg: "bg-hazard",
    text: "text-hazard",
    onBg: "text-on-accent",
    tape: "bg-hazard",
  },
}

export function SectionHeader({
  index,
  label,
  tone,
  note,
  className,
  children,
}: Props) {
  const t = tones[tone]
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center gap-3">
        {/* Label pill — colour-blocked index + label name */}
        <div
          className={cn(
            "inline-flex items-stretch border-2",
            t.border,
          )}
        >
          <span
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 font-display text-xs uppercase tracking-widest",
              t.bg,
              t.onBg,
            )}
          >
            <Asterisk size={12} strokeWidth={3} aria-hidden />
            {index}
          </span>
          <span
            className={cn(
              "flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest",
              t.text,
            )}
          >
            {label}
            {note && (
              <span className="font-mono text-[10px] tracking-widest text-bone/40">
                / {note}
              </span>
            )}
          </span>
        </div>

        {/* Trailing colour tape — thin line that extends out */}
        <span
          aria-hidden
          className={cn(
            "hidden h-[2px] flex-1 max-w-16 opacity-60 md:block",
            t.tape,
          )}
        />
      </div>

      {children}
    </div>
  )
}
