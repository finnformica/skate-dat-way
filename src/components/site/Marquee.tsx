import { Asterisk } from "lucide-react";
import { Fragment } from "react";

type Props = {
  ready: boolean;
};

export function Marquee({ ready }: Props) {
  const unit = "Skate dat way";
  const items = Array.from({ length: 10 }, () => unit);
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-wrap overflow-hidden border-y border-bone/15 bg-bone py-4 text-ink"
      style={{
        clipPath: ready ? "inset(0 0 0 0)" : "inset(0 50% 0 50%)",
        transition: "clip-path 700ms cubic-bezier(0.77,0,0.175,1) 1300ms",
      }}
    >
      <div className="marquee flex items-center gap-10 whitespace-nowrap">
        {doubled.map((text, i) => (
          <Fragment key={i}>
            <span className="font-display text-lg uppercase tracking-wider">
              {text}
            </span>
            <Asterisk
              aria-hidden
              className="size-5 shrink-0 text-ink"
              strokeWidth={2.75}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
