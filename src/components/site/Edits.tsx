import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useActiveCardIndex } from "@/hooks/useActiveCardIndex";
import { useIsTouch } from "@/hooks/useIsTouch";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const CARD_EASE = [0.23, 1, 0.32, 1] as const;
const CARD_INITIAL = { opacity: 0, y: 24 };
const CARD_VISIBLE = { opacity: 1, y: 0 };
const CARD_VIEWPORT = { once: true, amount: 0.5 } as const;
const CARD_TRANSITION = { duration: 0.55, ease: CARD_EASE };

type Edit = {
  title: string;
  year: string;
  location: string;
  video: string;
  tag?: "new" | "vhs" | "featured";
  /** Per-video framing — override when the action is off-centre.
   *  Use any valid `object-position` value, e.g. "50% 30%" or "center top". */
  objectPosition?: string;
};

const edits: Edit[] = [
  {
    title: "South of the river",
    year: "2026",
    location: "Peckham → Elephant",
    video: "/videos/video1.mp4",
    tag: "new",
  },
  {
    title: "Night shift",
    year: "2025",
    location: "Barbican · after hours",
    video: "/videos/video2.mp4",
    tag: "featured",
  },
  {
    title: "Wet concrete",
    year: "2025",
    location: "Southbank undercroft",
    video: "/videos/video3.mp4",
  },
  {
    title: "Mind the gap",
    year: "2024",
    location: "Canada Water → Rotherhithe",
    video: "/videos/video4.mp4",
    tag: "vhs",
  },
  {
    title: "Crystal lines",
    year: "2024",
    location: "Crystal Palace · SE19",
    video: "/videos/video5.mp4",
  },
  {
    title: "Hackney rails",
    year: "2023",
    location: "Broadway Market · E8",
    video: "/videos/video6.mp4",
    tag: "vhs",
  },
  {
    title: "Thames path blues",
    year: "2023",
    location: "Bermondsey → Deptford",
    video: "/videos/video7.mp4",
  },
  {
    title: "Green Park after dark",
    year: "2022",
    location: "Mayfair · W1J",
    video: "/videos/video8.mp4",
  },
];

export function Edits() {
  const touch = useIsTouch();
  const { activeIndex, setCardRef } = useActiveCardIndex(edits.length, touch);

  return (
    <section id="reels" className="relative border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            index="01"
            label="Reels"
            tone="hot"
            note="filmed / edited"
          >
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">
                Reels, <span className="text-hot italic">filmed flat.</span>
              </h2>
            </Reveal>
          </SectionHeader>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {edits.map((e, i) => (
            <EditCard
              edit={e}
              key={e.title}
              offset={i % 2 === 1}
              touch={touch}
              isActive={touch && activeIndex === i}
              articleRef={setCardRef(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditCard({
  edit,
  offset,
  touch,
  isActive,
  articleRef,
}: {
  edit: Edit;
  offset: boolean;
  touch: boolean;
  isActive: boolean;
  articleRef: (el: HTMLElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  // Touch: drive playback from the single "active" flag — only one at a time
  useEffect(() => {
    if (!touch) return;
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive, touch]);

  const hoverProps = touch
    ? {}
    : {
        onPointerEnter: play,
        onPointerLeave: stop,
        onFocus: play,
        onBlur: stop,
      };

  return (
    <Tilt max={touch ? 0 : 4}>
      <motion.article
        ref={articleRef}
        {...hoverProps}
        tabIndex={0}
        data-active={isActive ? "true" : undefined}
        initial={CARD_INITIAL}
        whileInView={CARD_VISIBLE}
        viewport={CARD_VIEWPORT}
        transition={CARD_TRANSITION}
        className={`group relative overflow-hidden border-2 border-bone/15 bg-ink-2 transition-colors duration-200 hover:border-hot focus-visible:border-hot focus-visible:outline-none data-[active=true]:border-hot ${
          offset ? "md:translate-y-6" : ""
        }`}
      >
        <div className="relative aspect-video overflow-hidden">
          <video
            ref={videoRef}
            src={`${edit.video}#t=0.1`}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ objectPosition: edit.objectPosition ?? "center" }}
            className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:scale-[1.02] group-focus-visible:grayscale-0 group-data-[active=true]:scale-[1.02] group-data-[active=true]:grayscale-0"
            aria-label={`${edit.title} preview`}
          />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-25 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" />

          <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-rust/60 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-rust backdrop-blur-sm">
            <MapPin size={10} />
            {edit.location}
          </div>

          {edit.tag && (
            <div className="absolute right-3 top-3 border-2 border-ink-fixed bg-hazard px-2 py-1 font-display text-[10px] uppercase tracking-widest text-on-accent">
              {edit.tag}
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-bone/50">
              Reel · {edit.year}
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase text-bone transition-colors duration-150 group-hover:text-hot group-data-[active=true]:text-hot">
              {edit.title}
            </h3>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-hot transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5">
            watch ↗
          </span>
        </div>
      </motion.article>
    </Tilt>
  );
}
