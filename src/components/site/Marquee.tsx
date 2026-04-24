export function Marquee() {
  const unit = "Skate dat way"
  const items = Array.from({ length: 12 }, () => unit)
  return (
    <div className="marquee-wrap overflow-hidden border-y border-bone/15 bg-bone py-4 text-ink">
      <div className="marquee whitespace-nowrap">
        {items.concat(items).map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-6 font-display text-lg uppercase tracking-wider"
          >
            {text}
            <span aria-hidden className="text-acid">
              ★
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
