import { LazyVideo } from "@/components/media/LazyVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useActiveCardIndex } from "@/hooks/useActiveCardIndex";
import { useIsTouch } from "@/hooks/useIsTouch";
import { cn } from "@/lib/utils";
import { MapPin, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MOBILE_INITIAL_COUNT = 4;
const DESKTOP_INITIAL_COUNT = 6;
const REVEAL_INCREMENT = 3;

const CARD_EASE = [0.23, 1, 0.32, 1] as const;
const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: CARD_EASE };

type Reel = {
  title: string;
  location: string;
  slug: string;
  /** Only set where the source file actually carried a capture date. */
  date?: string;
  tag?: "new" | "vhs" | "featured";
};

const reels: Reel[] = [
  {
    title: "Outside the Woodville",
    location: "Gravesend",
    slug: "woodville",
    date: "Jun 2026",
    tag: "new",
  },
  {
    title: "Second lap, same bank",
    location: "Home park",
    slug: "park-lines",
  },
  {
    title: "All sky, no ground",
    location: "Slalom comp",
    slug: "slalom-sky",
    date: "Jun 2026",
    tag: "featured",
  },
  {
    title: "Empty skate park",
    location: "Home park",
    slug: "ledge-grind",
    tag: "featured",
  },
  {
    title: "Threading the cones",
    location: "Slalom comp",
    slug: "slalom-cones",
    date: "Jun 2026",
  },
  {
    title: "Last light on the tiles",
    location: "Plaza, dusk",
    slug: "dusk-plaza",
  },
  {
    title: "Straight down the middle",
    location: "Marrakech",
    slug: "medina-lanes",
  },
  {
    title: "Dropping off the bank",
    location: "Home park",
    slug: "bank-drop",
    tag: "vhs",
  },
  {
    title: "Big empty plaza",
    location: "New-build plaza",
    slug: "brick-plaza",
  },
  {
    title: "Ate it, got back up",
    location: "Barceloneta",
    slug: "w-hotel",
    tag: "vhs",
  },
  {
    title: "Boardwalk, full sun",
    location: "Rambla de Mar",
    slug: "port-vell",
  },
  {
    title: "Down past the Arc",
    location: "Passeig Lluís Companys",
    slug: "arc-de-triomf",
  },
  {
    title: "Empty path, big trees",
    location: "City park",
    slug: "park-spin",
  },
  {
    title: "Last of the sun",
    location: "Plaza, at dusk",
    slug: "last-light",
    date: "Apr 2026",
  },
  {
    title: "Nothing but back roads",
    location: "Rural France",
    slug: "village-road",
    tag: "vhs",
  },
];

export function Reels() {
  const touch = useIsTouch();
  const [extraShown, setExtraShown] = useState(0);
  const { activeIndex, setCardRef } = useActiveCardIndex(reels.length, touch);

  const mobileVisible = MOBILE_INITIAL_COUNT + extraShown;
  const desktopVisible = DESKTOP_INITIAL_COUNT + extraShown;
  const showMobileButton = mobileVisible < reels.length;
  const showDesktopButton = desktopVisible < reels.length;

  return (
    <section id="reels" className="relative border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            index="01"
            label="Reels"
            tone="rust"
            note="fifteen clips"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Clips,{" "}
                <span className="text-rust italic">
                  straight off the phone.
                </span>
              </h2>
            </Reveal>
          </SectionHeader>
        </div>

        {/* Three columns on wide screens rather than two. The cards are now as
            tall as the footage is, so two columns of 9:16 made the page
            enormous; three keeps each card a sane height. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel, i) => {
            const hiddenOnMobile = i >= mobileVisible;
            const hiddenOnDesktop = i >= desktopVisible;
            return (
              <div
                key={reel.slug}
                className={cn(
                  hiddenOnMobile && hiddenOnDesktop && "hidden",
                  hiddenOnMobile && !hiddenOnDesktop && "hidden md:block",
                )}
              >
                <ReelCard
                  reel={reel}
                  // Offset the middle column so the three-up grid keeps the
                  // staggered look the two-up one had.
                  offset={i % 3 === 1}
                  touch={touch}
                  isActive={touch && activeIndex === i}
                  articleRef={setCardRef(i)}
                />
              </div>
            );
          })}
        </div>

        {showMobileButton && (
          <div
            className={cn(
              "mt-10 flex justify-center",
              !showDesktopButton && "md:hidden",
            )}
          >
            <button
              type="button"
              onClick={() => setExtraShown((x) => x + REVEAL_INCREMENT)}
              className="press inline-flex cursor-pointer items-center gap-3 border-2 border-bone/40 bg-transparent px-6 py-4 font-display text-sm uppercase tracking-widest text-bone transition-colors duration-200 ease-out hover:border-rust hover:text-rust"
            >
              <Plus className="size-4" />
              {/* No count: mobile and desktop reveal from different starting
                  points, so one shared label cannot name a number that is
                  true for both. */}
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ReelCard({
  reel,
  offset,
  touch,
  isActive,
  articleRef,
}: {
  reel: Reel;
  offset: boolean;
  touch: boolean;
  isActive: boolean;
  articleRef: (el: HTMLElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Touch has no hover, so the nearest-card-to-centre flag drives playback
  // and only one clip is ever decoding at a time.
  const playing = touch ? isActive : hovered;

  const hoverProps = touch
    ? {}
    : {
        onPointerEnter: () => setHovered(true),
        onPointerLeave: () => setHovered(false),
        onFocus: () => setHovered(true),
        onBlur: () => setHovered(false),
      };

  return (
    <Tilt max={touch ? 0 : 4}>
      <motion.article
        ref={articleRef}
        {...hoverProps}
        tabIndex={0}
        data-active={playing ? "true" : undefined}
        initial={CARD_INITIAL}
        whileInView={CARD_VISIBLE}
        viewport={CARD_VIEWPORT}
        transition={CARD_TRANSITION}
        className={`group relative overflow-hidden border-2 border-bone/15 bg-ink-2 transition-colors duration-200 hover:border-rust focus-visible:border-rust focus-visible:outline-none data-[active=true]:border-rust ${
          offset ? "md:translate-y-6" : ""
        }`}
      >
        {/* Matches the footage: every clip is vertical 9:16, so the card
            shows the whole frame instead of cropping to a square. */}
        <div className="relative aspect-9/16 overflow-hidden">
          <LazyVideo
            src={`/videos/${reel.slug}.mp4`}
            poster={`/posters/${reel.slug}.webp`}
            active={playing}
            // No `grayscale` filter. The stills are encoded desaturated, and
            // the video only ever appears on hover, where it is meant to be in
            // colour, so neither layer needs a filter. That removes fifteen
            // filter passes and the compositing layers they forced, which is
            // what made revealing the rest of the grid stutter.
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02] group-data-[active=true]:scale-[1.02]"
            label={`${reel.title} preview`}
          />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* Deliberately no backdrop-blur: one blur layer per card meant
              twelve backdrop reads per frame while scrolling. A more opaque
              background reads near-identically over grayscale footage. */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-rust/60 bg-ink/85 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-rust">
            <MapPin size={10} />
            {reel.location}
          </div>

          {reel.tag && (
            <div className="absolute right-3 top-3 border-2 border-ink-fixed bg-hazard px-2 py-1 font-display text-[10px] uppercase tracking-widest text-on-accent">
              {reel.tag}
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
              {reel.date ? `Reel · ${reel.date}` : "Reel"}
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase text-bone transition-colors duration-150 group-hover:text-rust group-data-[active=true]:text-rust">
              {reel.title}
            </h3>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-rust transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5">
            watch ↗
          </span>
        </div>
      </motion.article>
    </Tilt>
  );
}
