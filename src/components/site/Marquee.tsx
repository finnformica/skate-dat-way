import { Fragment } from "react"
import { Asterisk } from "lucide-react"

export function Marquee() {
  const unit = "Skate dat way"
  const items = Array.from({ length: 10 }, () => unit)
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrap overflow-hidden border-y border-bone/15 bg-bone py-4 text-ink">
      <div className="marquee flex items-center gap-10 whitespace-nowrap">
        {doubled.map((text, i) => (
          <Fragment key={i}>
            <span className="font-display text-lg uppercase tracking-wider">
              {text}
            </span>
            <Asterisk
              aria-hidden
              className="size-5 shrink-0 text-acid"
              strokeWidth={2.5}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
