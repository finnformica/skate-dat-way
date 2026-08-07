import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { InstagramIcon } from "@/components/site/icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/links";
import { motion } from "motion/react";

const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const };

export function Contact() {
  // Section is entirely bg-rust — any text sitting directly on it uses
  // text-on-accent so the colour tracks the active theme (dark text on
  // bright rust in dark mode, cream text on deep rust in light mode).
  return (
    <section
      id="contact"
      className="relative border-b border-bone/15 bg-rust text-on-accent"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)",
          backgroundSize: "7px 7px",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6">
          <SectionHeader
            index="04"
            label="Contact"
            tone="rust"
            note="dms open"
            invert
          >
            <Reveal>
              <h2 className="text-5xl text-on-accent md:text-7xl">
                Filming, spots,
                <br />
                sessions.
              </h2>
            </Reveal>
          </SectionHeader>
          <p className="mt-5 max-w-lg text-on-accent/80">
            Everything goes up on Instagram first. DMs are open — come film,
            share a spot, or just say hello.
          </p>
        </div>

        {/* One card, one place to go. The old 2x2 grid listed a YouTube, a
            Vimeo and an email that all pointed at "#", so the section offered
            four routes and none of them worked. Card sits on rust with
            on-accent text and inverts to the always-dark surface on hover,
            which is the same treatment the grid used. */}
        <div className="md:col-span-6">
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            initial={CARD_INITIAL}
            whileInView={CARD_VISIBLE}
            viewport={CARD_VIEWPORT}
            transition={CARD_TRANSITION}
            className="group relative flex flex-col justify-between gap-16 border-2 border-ink-fixed bg-rust p-8 shadow-[8px_8px_0_0_#0a0a0a] transition-colors duration-200 hover:bg-ink-fixed md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <InstagramIcon
                aria-hidden
                className="size-9 text-on-accent transition-colors duration-200 group-hover:text-bone-fixed md:size-11"
              />
              <span className="shrink-0 font-display text-3xl leading-none text-on-accent transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone-fixed">
                ↗
              </span>
            </div>

            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-on-accent/60 transition-colors duration-200 group-hover:text-bone-fixed/60">
                Follow along
              </p>
              <p className="wrap-break-word mt-1 font-display text-4xl uppercase leading-none text-on-accent transition-colors duration-200 group-hover:text-bone-fixed md:text-5xl">
                {INSTAGRAM_HANDLE}
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
