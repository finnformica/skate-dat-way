import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Product = {
  name: string
  price: string
  category: string
  image: string
  tag?: "new" | "bestseller" | "sale"
  color: string
}

const products: Product[] = [
  {
    name: "Dead Pigeon Deck",
    price: "$68",
    category: "Deck · 8.25″",
    image:
      "https://images.unsplash.com/photo-1520099602830-6a3d9cea69f9?w=1000&q=80&auto=format&fit=crop",
    tag: "new",
    color: "bg-hot",
  },
  {
    name: "Concrete Cruiser Complete",
    price: "$149",
    category: "Complete · 7.75″",
    image:
      "https://images.unsplash.com/photo-1564415011168-9dfec188c89b?w=1000&q=80&auto=format&fit=crop",
    tag: "bestseller",
    color: "bg-acid",
  },
  {
    name: "Midnight Trucks — 149",
    price: "$55",
    category: "Trucks",
    image:
      "https://images.unsplash.com/photo-1531565637446-32307b194362?w=1000&q=80&auto=format&fit=crop",
    color: "bg-bone",
  },
  {
    name: "Gnarly 54mm Wheels",
    price: "$32",
    category: "Wheels · 99a",
    image:
      "https://images.unsplash.com/photo-1617906847282-36ca62a04a4e?w=1000&q=80&auto=format&fit=crop",
    tag: "sale",
    color: "bg-rust",
  },
  {
    name: "Grit City Hoodie",
    price: "$78",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1000&q=80&auto=format&fit=crop",
    color: "bg-acid",
  },
  {
    name: "Slick Grip Tape 2-pack",
    price: "$14",
    category: "Griptape",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635289c?w=1000&q=80&auto=format&fit=crop",
    color: "bg-hot",
  },
]

export function Shop() {
  return (
    <section id="shop" className="border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-acid">
              01 · The gear
            </p>
            <h2 className="text-5xl text-bone md:text-7xl">
              Built to take
              <br />
              <span className="text-acid">a beating</span>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Decks", "Trucks", "Wheels", "Apparel"].map(
              (filter, i) => (
                <button
                  key={filter}
                  className={`border-2 border-bone/40 px-4 py-2 font-display text-xs uppercase tracking-widest transition hover:border-acid hover:text-acid ${
                    i === 0 ? "border-acid bg-acid text-ink" : "text-bone"
                  }`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg">
            Browse the full catalog →
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative border-2 border-bone/15 bg-ink-2 transition hover:border-acid">
      <div className={`relative aspect-[4/5] overflow-hidden ${product.color}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover mix-blend-luminosity transition duration-500 group-hover:scale-[1.04] group-hover:mix-blend-normal"
          loading="lazy"
        />
        {product.tag && (
          <div className="absolute left-3 top-3">
            <Badge
              variant={
                product.tag === "new"
                  ? "hot"
                  : product.tag === "sale"
                    ? "rust"
                    : "bone"
              }
            >
              {product.tag}
            </Badge>
          </div>
        )}
        <button className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-14 items-center justify-center border-2 border-ink bg-acid text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          +
        </button>
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-xl uppercase text-bone">
            {product.name}
          </h3>
        </div>
        <div className="whitespace-nowrap font-display text-xl text-acid">
          {product.price}
        </div>
      </div>
    </article>
  )
}
