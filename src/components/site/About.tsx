import { Reveal } from "@/components/motion/Reveal"

const glossary = [
  {
    term: "Wizard skating",
    def: "A stream of aggressive rollerblading focused on natural-line street skating — using existing architecture, no purpose-built obstacles, no helmet cam. Emphasis on creativity, flow, and the spot, not the trick count.",
  },
  {
    term: "Anti-rocker",
    def: "Inner wheels replaced with hard plastic spacers so the frame bites onto rails and ledges. The sound alone is a genre.",
  },
  {
    term: "Grind plate",
    def: "Metal sole plate bolted under the frame. Protects the boot, finds the rail, and writes the slide.",
  },
  {
    term: "Soul",
    def: "The defining grind of the scene — outside foot on the rail, inside foot along the side. The one you learn last and keep forever.",
  },
]

export function About() {
  return (
    <section id="about" className="relative border-b border-bone/15 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 halftone opacity-30" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acid">
            01 · Manifesto
          </p>
          <Reveal>
            <h2 className="text-5xl text-bone md:text-7xl">
              Blading,
              <br />
              <span className="text-acid italic">not skating.</span>
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-bone/70">
            <p>
              I'm a rollerblader. Eight wheels, two boots, zero interest in the
              skateboard/rollerblade distinction war. Somewhere around 2020 I
              fell into <strong className="text-bone">wizard skating</strong> —
              the London-via-Minnesota slow-burn corner of the scene where the
              spot matters more than the trick, and the curb you've skated
              forty times hasn't finished teaching you anything.
            </p>
            <p>
              This site is an archive: edits I've filmed, spots I ride, and
              notes from the parts of the city most people step around.
            </p>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 border-2 border-acid bg-ink px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-acid" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-bone">
              Open to filmers · sessions welcome
            </span>
          </div>
        </div>

        <div className="md:col-span-7">
          <Reveal stagger as="div" className="grid grid-cols-1 gap-px bg-bone/15 sm:grid-cols-2">
            {glossary.map((g) => (
              <article
                key={g.term}
                data-cursor="hover"
                className="group relative overflow-hidden bg-ink-2 p-6 transition-colors duration-200 hover:bg-ink"
              >
                <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-bone/40">
                  /def
                </span>
                <h3 className="font-display text-2xl uppercase leading-none text-bone transition-colors duration-200 group-hover:text-acid">
                  {g.term}
                </h3>
                <p className="mt-3 text-sm text-bone/70">{g.def}</p>
                <span
                  aria-hidden
                  className="absolute -bottom-10 -right-10 font-display text-[120px] leading-none text-bone/[0.04]"
                >
                  {g.term.charAt(0)}
                </span>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
