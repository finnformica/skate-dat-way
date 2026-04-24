import { ArrowRight, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-bone/15">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-7">
          <Badge variant="hot" className="mb-6">
            <Zap className="mr-1 h-3 w-3" /> Spring '26 drop — live now
          </Badge>
          <h1 className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.85] text-bone">
            Concrete
            <br />
            <span className="text-acid">therapy</span>
            <br />
            delivered.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-bone/70">
            Built by skaters who still bleed. Hand-pressed decks, bulletproof
            trucks, and grip tape that doesn't quit when your ollies do. Shipped
            from a warehouse in Brooklyn with a half-pipe inside.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg">
              Shop the drop <ArrowRight className="ml-1" />
            </Button>
            <Button variant="outline" size="lg">
              Find your setup
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-bone/15 pt-8">
            <Stat value="12yr" label="Skater owned" />
            <Stat value="48" label="Team riders" />
            <Stat value="1-3d" label="Free US shipping" />
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-bone shadow-[12px_12px_0_0_#d6ff3e]">
            <img
              src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1200&q=80&auto=format&fit=crop"
              alt="Skater mid-trick against urban backdrop"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-bone/70">
                  Lookbook / vol. 07
                </p>
                <p className="font-display text-2xl uppercase text-bone">
                  Streets don't sleep
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center border-2 border-bone bg-ink text-bone">
                →
              </span>
            </div>
          </div>

          <div className="absolute -left-6 top-1/3 hidden h-24 w-24 rotate-12 items-center justify-center border-2 border-ink bg-hot font-display text-sm uppercase text-bone md:flex">
            <div className="text-center leading-tight">
              New
              <br />
              drop
              <br />
              ↓
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 hidden border-2 border-ink bg-bone px-3 py-2 font-display text-xs uppercase text-ink md:block">
            Free shipping over $75
          </div>
        </div>
      </div>

      <div className="absolute -right-20 top-10 -z-10 hidden select-none font-display text-[200px] leading-none text-bone/[0.03] md:block">
        SKATE
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-acid">{value}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-bone/60">
        {label}
      </div>
    </div>
  )
}
