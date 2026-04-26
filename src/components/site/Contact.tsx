import { Reveal } from "@/components/motion/Reveal";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const };

const links = [
  { label: "Instagram", handle: "@skatedatway", href: "#" },
  { label: "YouTube", handle: "/@skatedatway", href: "#" },
  { label: "Vimeo", handle: "/skatedatway", href: "#" },
  { label: "Email", handle: "hello@skatedatway.com", href: "#" },
];

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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6">
          {/* Eyebrow pill — intentionally inverted: always-dark pill on
              the rust section. Uses -fixed tokens so it stays dark in
              both themes. Text on the dark pill uses text-bone-fixed
              (always cream). */}
          <div className="mb-6 inline-flex items-stretch border-2 border-ink-fixed">
            <span className="flex items-center gap-1.5 bg-ink-fixed px-3 py-1.5 font-display text-xs uppercase tracking-widest text-rust">
              <span aria-hidden>✱</span>
              05
            </span>
            <span className="flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-on-accent">
              Contact
              <span className="font-mono text-[10px] tracking-widest text-on-accent/50">
                / say hello
              </span>
            </span>
          </div>
          <Reveal>
            <h2 className="text-5xl text-on-accent md:text-7xl">
              Filming, spots,
              <br />
              sessions.
            </h2>
          </Reveal>
          <p className="mt-5 max-w-lg text-on-accent/80">
            Down to meet at a spot, go for a roll, or film a session? Drop a
            message.
          </p>

          <div className="mt-8 inline-block">
            <CopyEmail value="hello@skatedatway.com" />
          </div>
        </div>

        <div className="md:col-span-6">
          {/* Gutter bg uses the fixed dark so the 1px grid lines stay dark
              in both themes. Cards default to rust bg with on-accent text,
              flip on hover to the always-dark surface with always-cream
              text (the hover inversion is intentional). */}
          <div className="grid grid-cols-1 gap-px bg-ink-fixed sm:grid-cols-2">
            {links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={CARD_INITIAL}
                whileInView={CARD_VISIBLE}
                viewport={CARD_VIEWPORT}
                transition={CARD_TRANSITION}
                className="group relative flex items-center justify-between gap-4 bg-rust p-6 transition-colors duration-200 hover:bg-ink-fixed"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-accent/60 transition-colors duration-200 group-hover:text-bone-fixed/60">
                    {l.label}
                  </p>
                  <p className="wrap-break-word font-display text-lg uppercase leading-tight text-on-accent transition-colors duration-200 group-hover:text-bone-fixed md:text-xl">
                    {l.handle}
                  </p>
                </div>
                <span className="shrink-0 font-display text-2xl text-on-accent transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rust">
                  ↗
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyEmail({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* ignore — still show confirmation */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  // Button sits on the rust section. Default state is an always-dark button
  // with always-cream text. Copied state flips to bg-rust with on-accent text
  // (tracks theme). Border stays always-dark for the brutalist outline.
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy email ${value}`}
      data-state={copied ? "copied" : "idle"}
      className="press group relative cursor-pointer overflow-hidden border-2 border-ink-fixed bg-ink-fixed px-5 py-4 font-display text-sm uppercase tracking-widest text-bone-fixed shadow-[6px_6px_0_0_#0a0a0a] transition-colors duration-300 ease-out hover:bg-concrete data-[state=copied]:bg-rust data-[state=copied]:text-on-accent"
    >
      <span className="relative grid">
        <span
          aria-hidden={copied}
          className="col-start-1 row-start-1 flex items-center gap-3 transition-[opacity,filter,transform] duration-200 ease-out group-data-[state=copied]:-translate-y-1 group-data-[state=copied]:opacity-0 group-data-[state=copied]:blur-[2px]"
        >
          <Copy className="size-4" />
          {value}
        </span>
        <span
          aria-hidden={!copied}
          className="col-start-1 row-start-1 flex items-center gap-3 translate-y-1 opacity-0 blur-[2px] transition-[opacity,filter,transform] duration-200 ease-out group-data-[state=copied]:translate-y-0 group-data-[state=copied]:opacity-100 group-data-[state=copied]:blur-none"
        >
          <Check className="size-4" strokeWidth={3} />
          Copied to clipboard
        </span>
      </span>
    </button>
  );
}
