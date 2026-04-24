import { MapPin, Waves } from "lucide-react"

type Spot = {
  name: string
  city: string
  type: string
  difficulty: string
  image: string
}

const spots: Spot[] = [
  {
    name: "Domino Park Ledges",
    city: "Brooklyn, NY",
    type: "Street",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Venice Bowl",
    city: "Venice, CA",
    type: "Bowl",
    difficulty: "Gnarly",
    image:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Southbank Undercroft",
    city: "London, UK",
    type: "DIY",
    difficulty: "All levels",
    image:
      "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "Burnside",
    city: "Portland, OR",
    type: "DIY Park",
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1520975867597-0af37a22e31a?w=1200&q=80&auto=format&fit=crop",
  },
]

export function Spots() {
  return (
    <section id="spots" className="relative border-b border-bone/15 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-hot">
            02 · The map
          </p>
          <h2 className="text-5xl text-bone md:text-7xl">
            Spots worth
            <br />
            the <span className="text-hot">bruises</span>.
          </h2>
          <p className="mt-5 text-bone/70">
            Community-sourced, team-approved. From forgotten DIY bowls to kinked
            hubbas in half-abandoned lots — the real stuff, not the sanitized
            plaza your city built for Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {spots.map((spot) => (
            <article
              key={spot.name}
              className="group relative aspect-[3/4] overflow-hidden border-2 border-bone/15"
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid">
                  <MapPin className="h-3 w-3" />
                  {spot.city}
                </div>
                <h3 className="font-display text-2xl uppercase text-bone">
                  {spot.name}
                </h3>
                <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-bone/70">
                  <span className="flex items-center gap-1">
                    <Waves className="h-3 w-3" />
                    {spot.type}
                  </span>
                  <span>{spot.difficulty}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
