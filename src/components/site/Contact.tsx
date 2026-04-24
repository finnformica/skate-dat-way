import { useState } from "react"
import { Check, Copy } from "lucide-react"
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
          {/* Section is already acid-coloured — use an ink-on-acid pill
              rather than SectionHeader's bone-on-ink palette */}
          <div className="mb-6 inline-flex items-stretch border-2 border-ink">
            <span className="flex items-center gap-1.5 bg-ink px-3 py-1.5 font-display text-xs uppercase tracking-widest text-acid">
              <span aria-hidden>✱</span>
              05
            </span>
            <span className="flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-ink">
              Contact
              <span className="font-mono text-[10px] tracking-widest text-ink/50">
                / say hello
              </span>
            </span>
          </div>
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
            <CopyEmail value="hello@skatedatway.co.uk" />
          </div>
        </div>

        <div className="md:col-span-6">
          <Reveal stagger className="grid grid-cols-1 gap-px bg-ink sm:grid-cols-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative flex items-center justify-between gap-4 bg-acid p-6 transition-colors duration-200 hover:bg-ink"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors duration-200 group-hover:text-bone/60">
                    {l.label}
                  </p>
                  <p className="break-words font-display text-lg uppercase leading-tight text-ink transition-colors duration-200 group-hover:text-bone md:text-xl">
                    {l.handle}
                  </p>
                </div>
                <span className="shrink-0 font-display text-2xl text-ink transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid">
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

function CopyEmail({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* ignore — still show confirmation */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy email ${value}`}
      data-state={copied ? "copied" : "idle"}
      className="press group relative overflow-hidden border-2 border-ink bg-ink px-5 py-4 font-display text-sm uppercase tracking-widest text-bone shadow-[6px_6px_0_0_#0a0a0a] transition-colors duration-150 data-[state=copied]:bg-acid data-[state=copied]:text-ink"
    >
      {/* Crossfade label: Emil's blur-mask for imperfect crossfades */}
      <span className="relative grid">
        {/* Idle label */}
        <span
          aria-hidden={copied}
          className="col-start-1 row-start-1 flex items-center gap-3 transition-[opacity,filter,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[state=copied]:-translate-y-1 group-data-[state=copied]:opacity-0 group-data-[state=copied]:blur-[2px]"
        >
          <Copy className="size-4" />
          {value}
        </span>
        {/* Copied label */}
        <span
          aria-hidden={!copied}
          className="col-start-1 row-start-1 flex items-center gap-3 translate-y-1 opacity-0 blur-[2px] transition-[opacity,filter,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[state=copied]:translate-y-0 group-data-[state=copied]:opacity-100 group-data-[state=copied]:blur-none"
        >
          <Check className="size-4" strokeWidth={3} />
          Copied to clipboard
        </span>
      </span>
    </button>
  )
}
