import { NotFound } from "@/components/site/NotFound";
import { ArrowLeft, Asterisk } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router";

/**
 * Catches anything thrown during route rendering / loaders.
 * Routes with a 404 status fall through to <NotFound />.
 * Everything else gets the "Something bailed." screen with the message.
 */
export function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  const message =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? error.statusText
        : "Unknown error";

  const status = isRouteErrorResponse(error) ? error.status : 500;

  return (
    <main className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-ink px-5 py-6 text-bone md:px-10 md:py-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 chainlink opacity-60" />
        <div className="absolute inset-0 halftone opacity-40" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 scanlines opacity-40"
      />

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-bone/55">
        <a href="/" className="press flex items-center gap-3">
          <Roundel />
          <span className="font-display text-lg tracking-tight text-bone">
            Skate Dat Way
          </span>
        </a>
        <span>{status} · OUT OF FRAME</span>
      </div>

      <section className="my-auto grid max-w-5xl gap-6">
        <div className="inline-flex w-fit items-stretch border-2 border-rust">
          <span className="flex items-center gap-1.5 bg-rust px-3 py-1.5 font-display text-xs uppercase tracking-widest text-on-accent">
            <Asterisk size={12} strokeWidth={3} aria-hidden />
            {status}
          </span>
          <span className="flex items-center gap-3 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-rust">
            Something bailed
            <span className="font-mono text-[10px] tracking-widest text-bone/40">
              / unhandled
            </span>
          </span>
        </div>

        <h1 className="font-display text-[clamp(5rem,18vw,16rem)] uppercase leading-[0.82] tracking-[-0.02em]">
          <span className="block">Board</span>
          <span className="block italic text-rust">snapped.</span>
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-bone/70 md:text-base">
          The app threw an error while rendering this page. Shouldn't happen
          often. Roll back home and try again.
        </p>

        {message && (
          <pre className="max-w-2xl overflow-x-auto border border-bone/15 bg-ink-2 p-4 font-mono text-xs text-bone/60">
            {message}
          </pre>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="/"
            className="press inline-flex items-center gap-3 border-2 border-ink-fixed bg-rust px-6 py-4 font-display text-sm uppercase tracking-widest text-on-accent shadow-[6px_6px_0_0_#0a0a0a]"
          >
            <ArrowLeft className="size-4" />
            Back to the spots
          </a>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-bone/40">
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
