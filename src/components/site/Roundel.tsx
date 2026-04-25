import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Roundel({ className }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center border-2 border-bone px-2 py-1 font-display text-xl leading-none tracking-tight text-bone",
        className,
      )}
    >
      S<span className="italic text-rust">D</span>W
    </span>
  );
}
