import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useActiveCardIndex } from "@/hooks/useActiveCardIndex";
import { useIsTouch } from "@/hooks/useIsTouch";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const };

type Spot = {
  name: string;
  zone: string;
  tube: string;
  type: string;
  image: string;
  note: string;
};

const spots: Spot[] = [
  {
    name: "Southbank Undercroft",
    zone: "Zone 1 · SE1",
    tube: "Waterloo",
    type: "DIY / covered",
    note: "The oldest spot in the country. Slick when it rains, but it never does underneath.",
    image:
      "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Stockwell Skatepark",
    zone: "Zone 2 · SW9",
    tube: "Stockwell",
    type: "Concrete park",
    note: "The Brixton Beach. Moon-crater bowls and a death box that's tried to kill me.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Peckham Rye",
    zone: "Zone 2 · SE15",
    tube: "Peckham Rye",
    type: "Street / ledges",
    note: "Long marble ledges behind the station. Sunday mornings only; the rest is too busy to ride.",
    image:
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1600&q=80&auto=format&fit=crop",
  },
  {
    name: "Barbican Highwalk",
    zone: "Zone 1 · EC2Y",
    tube: "Barbican",
    type: "Street / banks",
    note: "Brutalist dream. Tide goes out after 9pm. Stay polite, security will find you anyway.",
    image:
      "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=1600&q=80&auto=format&fit=crop",
  },
];

export function Maps() {
  const touch = useIsTouch();
  const { activeIndex, setCardRef } = useActiveCardIndex(spots.length, touch);

  return (
    <section id="map" className="relative border-b border-bone/15 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 chainlink opacity-40" />
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <SectionHeader
            index="02"
            label="Map"
            tone="hot"
            note="spots / london"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                London, as{" "}
                <span className="text-hot italic">a grind line.</span>
              </h2>
            </Reveal>
          </SectionHeader>
        </div>

        <div className="grid grid-cols-1 gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {spots.map((spot, i) => (
            <motion.article
              key={spot.name}
              ref={setCardRef(i)}
              data-active={touch && activeIndex === i ? "true" : undefined}
              initial={CARD_INITIAL}
              whileInView={CARD_VISIBLE}
              viewport={CARD_VIEWPORT}
              transition={CARD_TRANSITION}
              className="group relative aspect-3/4 overflow-hidden bg-ink-2"
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 group-data-[active=true]:scale-[1.04] group-data-[active=true]:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-hot">
                  <MapPin size={10} />
                  {spot.zone} · {spot.tube}
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-bone transition-colors duration-150 group-hover:text-hot group-data-[active=true]:text-hot">
                  {spot.name}
                </h3>
                <div className="grid grid-rows-[0fr] overflow-hidden opacity-0 transition-[grid-template-rows,opacity] duration-420 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-data-[active=true]:grid-rows-[1fr] group-data-[active=true]:opacity-100">
                  <p className="mt-3 min-h-0 font-mono text-xs text-bone/80">
                    {spot.note}
                  </p>
                </div>
              </div>

              <div className="absolute right-4 top-4 border border-hot/60 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-hot">
                {spot.type}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
