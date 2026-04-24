const items = [
  "Wizard skating",
  "Soul grinds",
  "Natural line",
  "Anti-rocker",
  "London ↔ concrete",
  "No helmet cam",
  "Rolled, not jumped",
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="marquee-wrap overflow-hidden border-y-2 border-ink hazard-tape">
      <div className="bg-ink/0">
        <div className="marquee whitespace-nowrap py-3">
          {row.map((text, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8 font-display text-lg uppercase tracking-widest text-ink"
            >
              <span className="inline-block h-5 w-5 -translate-y-px border-2 border-ink bg-bone" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
