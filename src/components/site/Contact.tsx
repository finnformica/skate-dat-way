import { Reveal } from "@/components/motion/Reveal"

const links = [
  { label: "Instagram", handle: "@skatedatway", href: "#" },
  { label: "YouTube", handle: "/@skatedatway", href: "#" },
  { label: "Vimeo", handle: "/skatedatway", href: "#" },
  { label: "Email", handle: "hello@skatedatway.co.uk", href: "#" },
]

export function Contact() {
  return (
    <section id="contact" className="relative border-b border-bone/15 bg-acid text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)",
          backgroundSize: "7px 7px",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
            05 · Say hello
          </p>
          <Reveal>
            <h2 className="text-5xl text-ink md:text-7xl">
              Filming, spots,
              <br />
              sessions.
            </h2>
          </Reveal>
          <p className="mt-5 max-w-lg text-ink/80">
            Drop a line if you're a filmer in London, want to share a spot, or
            just want to roll. Not interested in sponsorships, affiliate deals,
            or your AI side project — thanks in advance.
          </p>

          <div className="mt-8 inline-block">
            <HoldToCopy value="hello@skatedatway.co.uk" />
          </div>
        </div>

        <div className="md:col-span-6">
          <Reveal stagger className="grid grid-cols-1 gap-px bg-ink sm:grid-cols-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor="hover"
                className="group relative flex items-center justify-between gap-4 bg-acid p-6 transition-colors duration-200 hover:bg-ink"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors duration-200 group-hover:text-bone/60">
                    {l.label}
                  </p>
                  <p className="font-display text-2xl uppercase text-ink transition-colors duration-200 group-hover:text-bone">
                    {l.handle}
                  </p>
                </div>
                <span className="font-display text-2xl text-ink transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-acid">
                  ↗
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HoldToCopy({ value }: { value: string }) {
  // Emil's hold-to-delete pattern: slow press (1.6s linear), snappy release.
  // Releases trigger clipboard copy if held to completion.
  return (
    <button
      type="button"
      data-cursor="hover"
      onPointerUp={async (e) => {
        const btn = e.currentTarget
        const held = btn.dataset.held === "true"
        btn.dataset.held = "false"
        if (held) {
          try {
            await navigator.clipboard.writeText(value)
            btn.dataset.copied = "true"
            setTimeout(() => (btn.dataset.copied = "false"), 1400)
          } catch {
            /* noop */
          }
        }
      }}
      onPointerDown={(e) => {
        const btn = e.currentTarget
        setTimeout(() => (btn.dataset.held = "true"), 1550)
      }}
      className="hold-btn press relative overflow-hidden border-2 border-ink bg-ink px-5 py-4 font-display text-sm uppercase tracking-widest text-bone shadow-[6px_6px_0_0_#0a0a0a]"
    >
      <span className="relative z-10 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-acid opacity-60" />
          <span className="relative rounded-full bg-acid" />
        </span>
        Hold to copy email
      </span>
      <span
        aria-hidden
        className="hold-overlay bg-acid mix-blend-difference"
      />
    </button>
  )
}
