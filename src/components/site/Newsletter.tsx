import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <section className="border-b border-bone/15 bg-acid text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink/70">
            Newsletter · No spam, only grip
          </p>
          <h2 className="text-5xl text-ink md:text-6xl">
            Drops, spots, and
            <br />
            the occasional bail.
          </h2>
          <p className="mt-4 max-w-xl text-ink/80">
            One email a week. New gear first, spot guides before they leak, and
            20% off your first order. Unsubscribe with one click.
          </p>
        </div>

        <form
          className="md:col-span-5"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter signup"
        >
          <div className="flex flex-col border-2 border-ink bg-bone p-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <Button type="submit" size="lg" variant="default">
              Sign me up →
            </Button>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/60">
            By signing up you agree to eat concrete occasionally.
          </p>
        </form>
      </div>
    </section>
  )
}
