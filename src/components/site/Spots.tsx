import { MapPin } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"

type Spot = {
  name: string
  zone: string
  tube: string
  type: string
  image: string
  note: string
}

const spots: Spot[] = [
  {
    name: "Southbank Undercroft",
    zone: "Zone 1 · SE1",
    tube: "Waterloo",
    type: "DIY / covered",
    note: "The oldest spot in the country. Slick when it rains, but it never does underneath.",
    image:
      "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Stockwell Skatepark",
    zone: "Zone 2 · SW9",
    tube: "Stockwell",
    type: "Concrete park",
    note: "The Brixton Beach. Moon-crater bowls and a death box that's tried to kill me.",
    image:
      "https://images.unsplash.com/photo-1520975867597-0af37a22e31a?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Peckham Rye",
    zone: "Zone 2 · SE15",
    tube: "Peckham Rye",
    type: "Street / ledges",
    note: "Long marble ledges behind the station. Sunday mornings only — the rest is too busy to ride.",
    image:
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Barbican Highwalk",
    zone: "Zone 1 · EC2Y",
    tube: "Barbican",
    type: "Street / banks",
    note: "Brutalist dream. Tide goes out after 9pm. Stay polite, security will find you anyway.",
    image:
      "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=1600&q=80&auto=format&fit=crop",
  },
]

export function Spots() {
  return (
    <section id="spots" className="relative border-b border-bone/15 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 chainlink opacity-40" />
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acid">
              03 · The map
            </p>
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                London, as
                <br />
                <span className="text-acid italic">a grind line.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <p className="text-bone/70">
              A personal list — not a guidebook. If you skate these, skate
              respectful, skate quiet, and take your bottles with you.
            </p>
          </div>
        </div>

        <Reveal stagger className="grid grid-cols-1 gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {spots.map((spot, i) => (
            <article
              key={spot.name}
              data-cursor="hover"
              className="group relative aspect-[3/4] overflow-hidden bg-ink-2"
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

              {/* Index badge */}
              <div className="absolute left-4 top-4 font-display text-5xl leading-none text-bone/80 mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Hover note overlay — clip-path reveal from bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid">
                  <MapPin size={10} />
                  {spot.zone} · {spot.tube}
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-bone">
                  {spot.name}
                </h3>
                <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <p className="min-h-0 mt-3 font-mono text-xs text-bone/80">
                    {spot.note}
                  </p>
                </div>
              </div>

              <div className="absolute right-4 top-4 border border-acid/60 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid">
                {spot.type}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
