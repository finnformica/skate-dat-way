import { Button } from "@/components/ui/button"

const riders = [
  {
    name: "Luca Moreno",
    style: "Street",
    image:
      "https://images.unsplash.com/photo-1583252997434-7a7dca85eba7?w=900&q=80&auto=format&fit=crop",
    quote: "The board owes me nothing. The curb owes me everything.",
  },
  {
    name: "Kai Obi",
    style: "Vert",
    image:
      "https://images.unsplash.com/photo-1522844505260-95c6b40c1c99?w=900&q=80&auto=format&fit=crop",
    quote: "If you're not falling, you're not trying. If you fall flat, try again.",
  },
  {
    name: "Juno Park",
    style: "Park",
    image:
      "https://images.unsplash.com/photo-1560963689-02e82017f4c2?w=900&q=80&auto=format&fit=crop",
    quote: "Concrete doesn't care about your bad day. That's the point.",
  },
]

export function Team() {
  return (
    <section id="team" className="relative border-b border-bone/15 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-4">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-acid">
            03 · The fam
          </p>
          <h2 className="text-5xl text-bone md:text-6xl">
            Riders, not
            <br />
            <span className="text-acid">ambassadors</span>.
          </h2>
          <p className="mt-5 text-bone/70">
            No sponsored hashtags, no brand-safe edits. Our team gets paid to
            skate, not to smile. Meet the four punks we send the hardest boards
            to.
          </p>
          <Button variant="hot" size="lg" className="mt-8">
            Apply to ride
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:col-span-8">
          {riders.map((rider, i) => (
            <figure
              key={rider.name}
              className={`group relative aspect-[3/4] overflow-hidden border-2 border-bone/15 ${
                i === 1 ? "sm:translate-y-8" : ""
              }`}
            >
              <img
                src={rider.image}
                alt={rider.name}
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/50 to-transparent p-5 opacity-100 transition">
                <p className="font-mono text-[10px] uppercase tracking-widest text-acid">
                  {rider.style}
                </p>
                <h3 className="mt-1 font-display text-2xl uppercase text-bone">
                  {rider.name}
                </h3>
                <blockquote className="mt-2 font-mono text-xs italic text-bone/70">
                  "{rider.quote}"
                </blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
