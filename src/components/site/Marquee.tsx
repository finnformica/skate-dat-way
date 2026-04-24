export function Marquee() {
  const items = [
    "Free US shipping over $75",
    "Hand-pressed in Brooklyn",
    "Ride or don't — either way we won't judge",
    "Spring '26 drop — live",
    "Team rider applications open",
    "Decks from $55",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y-2 border-bone bg-acid py-3 text-ink">
      <div className="marquee whitespace-nowrap">
        {doubled.map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-6 font-display text-xl uppercase tracking-wider"
          >
            {text}
            <span className="text-2xl">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
