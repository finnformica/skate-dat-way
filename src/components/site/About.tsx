import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/site/SectionHeader"
import { useIsTouch } from "@/hooks/useIsTouch"
import { useActiveCardIndex } from "@/hooks/useActiveCardIndex"

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
  const touch = useIsTouch()
  const { activeIndex, setCardRef } = useActiveCardIndex(
    glossary.length,
    touch,
  )

  return (
    <section id="manifesto" className="relative border-b border-bone/15 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 halftone opacity-30" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <SectionHeader
            index="01"
            label="Manifesto"
            tone="rust"
            note="entry"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Blading,
                <br />
                <span className="text-rust italic">not skating.</span>
              </h2>
            </Reveal>
          </SectionHeader>
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

          <div className="mt-8 inline-flex items-center gap-3 border-2 border-rust bg-ink px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-rust" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-bone">
              Open to filmers · sessions welcome
            </span>
          </div>
        </div>

        <div className="md:col-span-7">
          <Reveal
            stagger
            as="div"
            className="grid grid-cols-1 gap-px bg-bone/15 sm:grid-cols-2"
          >
            {glossary.map((g, i) => (
              <article
                key={g.term}
                ref={setCardRef(i)}
                data-active={touch && activeIndex === i ? "true" : undefined}
                className="group relative overflow-hidden bg-ink-2 p-6 transition-colors duration-200 hover:bg-ink data-[active=true]:bg-ink"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                    def · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-3xl leading-none tabular-nums text-bone/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase leading-none text-bone transition-colors duration-200 group-hover:text-rust group-data-[active=true]:text-rust">
                  {g.term}
                </h3>
                <p className="mt-3 text-sm text-bone/70">{g.def}</p>
                {/* Accent rule — slides in on hover OR when active on touch */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-rust transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
                />
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
