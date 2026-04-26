import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useActiveCardIndex } from "@/hooks/useActiveCardIndex";
import { useIsTouch } from "@/hooks/useIsTouch";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const };

const posts = [
  {
    tag: "Spot",
    title: "Ethan locks his first soul at Stockwell, full stall, no foot down",
    date: "Apr 22, 2026",
    read: "3 min",
    image:
      "https://images.unsplash.com/photo-1531565637446-32307b194362?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Setup",
    title: "Built Ethan's first anti-rocker: frame swap, plate, the works",
    date: "Mar 14, 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Day one",
    title: "Ethan straps in for the first time: cul-de-sac, knee pads, grin",
    date: "Jan 28, 2026",
    read: "2 min",
    image:
      "https://images.unsplash.com/photo-1565108150403-c0f12d458bf6?w=1200&q=80&auto=format&fit=crop",
  },
];

export function Diary() {
  const touch = useIsTouch();
  const { activeIndex, setCardRef } = useActiveCardIndex(posts.length, touch);

  return (
    <section id="diary" className="border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionHeader
            index="03"
            label="Diary"
            tone="rust"
            note="ethan / progression"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Diary, <span className="text-rust italic">Ethan rolling.</span>
              </h2>
            </Reveal>
          </SectionHeader>
          <a
            href="#"
            className="link-underline hidden font-display text-sm uppercase tracking-widest text-bone md:inline-flex"
          >
            All posts ↗
          </a>
        </div>

        <div className="grid grid-cols-1 gap-px bg-bone/15 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              ref={setCardRef(i)}
              data-active={touch && activeIndex === i ? "true" : undefined}
              initial={CARD_INITIAL}
              whileInView={CARD_VISIBLE}
              viewport={CARD_VIEWPORT}
              transition={CARD_TRANSITION}
              className="group flex flex-col bg-ink transition-colors duration-200 hover:bg-ink-2 data-[active=true]:bg-ink-2"
            >
              <div className="aspect-16/10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-data-[active=true]:scale-[1.03] group-data-[active=true]:grayscale-0"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                  <span className="border border-rust px-2 py-1 text-rust">
                    {post.tag}
                  </span>
                  <span className="text-bone/50">{post.date}</span>
                  <span className="text-bone/50">· {post.read}</span>
                </div>
                <h3 className="font-display text-2xl uppercase leading-tight text-bone transition-colors duration-150 group-hover:text-rust group-data-[active=true]:text-rust">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 pt-4 font-display text-sm uppercase tracking-widest text-bone">
                  Read it
                  <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-data-[active=true]:-translate-y-1 group-data-[active=true]:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
