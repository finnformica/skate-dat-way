import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Roundel({ className }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center border-2 border-bone bg-ink-fixed px-2 py-1 font-display text-xl leading-none tracking-tight text-bone",
        className,
      )}
    >
      S<span className="relative mr-1 italic text-rust">D</span>W
    </span>
  );
}
