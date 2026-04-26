import { cn } from "@/lib/utils";
import { Asterisk } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "rust" | "hot" | "hazard";

type Props = {
  index: string;
  label: string;
  tone: Tone;
  note?: string;
  /** Use on accent-coloured section backgrounds (e.g. bg-rust). Inverts the
   *  pill so the filled cell becomes the always-dark surface and the open
   *  cell text drops to the on-accent dark tone. */
  invert?: boolean;
  className?: string;
  children: ReactNode;
};

const tones: Record<Tone, { border: string; bg: string; text: string }> = {
  rust: { border: "border-rust", bg: "bg-rust", text: "text-rust" },
  hot: { border: "border-hot", bg: "bg-hot", text: "text-hot" },
  hazard: { border: "border-hazard", bg: "bg-hazard", text: "text-hazard" },
};

export function SectionHeader({
  index,
  label,
  tone,
  note,
  invert,
  className,
  children,
}: Props) {
  const t = tones[tone];

  const pillBorder = invert ? "border-ink-fixed" : t.border;
  const filledBg = invert ? "bg-ink-fixed" : t.bg;
  const filledText = invert ? t.text : "text-on-accent";
  const labelText = invert ? "text-on-accent" : t.text;
  const noteText = invert ? "text-on-accent/50" : "text-bone/40";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className={cn("inline-flex w-fit items-stretch border-2", pillBorder)}>
        <span
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 font-display text-xs uppercase tracking-widest",
            filledBg,
            filledText,
          )}
        >
          <Asterisk size={12} strokeWidth={3} aria-hidden />
          {index}
        </span>
        <span
          className={cn(
            "flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest",
            labelText,
          )}
        >
          {label}
          {note && (
            <span className={cn("font-mono text-[10px] tracking-widest", noteText)}>
              / {note}
            </span>
          )}
        </span>
      </div>

      {children}
    </div>
  );
}
