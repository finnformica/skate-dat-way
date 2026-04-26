import { ArrowLeft, Asterisk } from "lucide-react";

/**
 * 404 page — mirrors the main site's visual language without any of its
 * runtime (no Lenis, no BootLoader, no sticky footer). Rendered by the
 * router's catch-all route and by RouteError when the thrown response is 404.
 */
export function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-bone">
      {/* Background texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 chainlink opacity-60" />
        <div className="absolute inset-0 halftone opacity-40" />

        {/* Giant outline 404 on the right — balances the left-aligned content */}
        <div className="absolute right-[-3vw] top-1/2 hidden -translate-y-1/2 select-none font-display text-[clamp(12rem,34vw,36rem)] leading-none text-bone/4 md:block">
          404
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 scanlines opacity-40"
      />

      {/* Top strip */}
      <div className="relative z-10 flex items-center justify-between px-5 py-6 font-mono text-[10px] uppercase tracking-widest text-bone/55 md:px-10 md:py-8">
        <a href="/" className="press flex items-center gap-3">
          <Roundel />
          <span className="font-display text-lg tracking-tight text-bone">
            Skate Dat Way
          </span>
        </a>
        <span>404 · OUT OF FRAME</span>
      </div>

      {/* Centre — vertically centred within remaining space */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 md:px-10">
        <div className="grid max-w-3xl gap-6">
          {/* Eyebrow pill — matches SectionHeader pattern */}
          <div className="inline-flex w-fit items-stretch border-2 border-hot">
            <span className="flex items-center gap-1.5 bg-hot px-3 py-1.5 font-display text-xs uppercase tracking-widest text-on-accent">
              <Asterisk size={12} strokeWidth={3} aria-hidden />
              404
            </span>
            <span className="flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-hot">
              Missing spot
              <span className="font-mono text-[10px] tracking-widest text-bone/40">
                / not archived
              </span>
            </span>
          </div>

          {/* Headline — scaled to match the hero's clamp (11vw max 10rem),
              tighter leading so the italic line doesn't collide with the roman */}
          <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] uppercase leading-[0.88] tracking-[-0.01em]">
            <span className="block">Bailed.</span>
            <span className="block italic text-hot">Wrong line.</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-bone/70 md:text-base">
            This URL isn't in the archive. You've either followed a busted link,
            mistyped a path, or skated somewhere I haven't filmed yet. Either
            way — <strong className="text-bone">roll back to the top</strong>{" "}
            and start over.
          </p>

          <div className="pt-2">
            <a
              href="/"
              className="press inline-flex items-center gap-3 border-2 border-ink-fixed bg-rust px-6 py-4 font-display text-sm uppercase tracking-widest text-on-accent shadow-[6px_6px_0_0_#0a0a0a]"
            >
              <ArrowLeft className="size-4" />
              Back to the spots
            </a>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pb-6 font-mono text-[10px] uppercase tracking-widest text-bone/40 md:px-10 md:pb-8">
        <span>Skate Dat Way · London · Est. 2020</span>
        <a href="/#contact" className="text-bone/55 hover:text-rust">
          hello@skatedatway.com
        </a>
      </div>
    </main>
  );
}

function Roundel() {
  return (
    <span aria-hidden className="relative grid h-9 w-9 place-items-center">
      <span className="absolute inset-0 rounded-full border-4 border-rust" />
      <span className="absolute left-0 right-0 top-1/2 h-0.75 -translate-y-1/2 bg-bone" />
      <span className="relative font-display text-[9px] uppercase tracking-widest text-ink">
        SDW
      </span>
    </span>
  );
}
