import { useEffect, useRef, useState } from "react";

export type HeroClip = {
  src: string;
  poster: string;
  /** Small mono line under the video. */
  place: string;
  /** Large display line under the video. */
  title: string;
};

type Props = {
  clips: HeroClip[];
  /** Held false until the boot loader is done, so nothing plays behind it. */
  ready: boolean;
  onClipChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

const FADE_MS = 600;

/**
 * Cross-fading hero that plays each clip once and moves to the next.
 *
 * Two layers. The stills are permanent and carry the cross-fade on their own:
 * one <img> per clip, stacked, opacity driven by the current index. The videos
 * sit above them and are only mounted while the hero is actually on screen.
 * Scroll it out of view and every hero decoder and compositing layer goes with
 * it, leaving the still of whichever clip was playing.
 *
 * Because each still is frame 0 of its own clip, a video fading in over its own
 * still is invisible, and unmounting drops back to a matching frame. The two
 * layers stay in sync without needing to coordinate.
 *
 * Of the mounted videos only the current and next carry a `src`, so the third
 * clip in a rotation costs nothing until the second is on screen. Advancing on
 * `ended` rather than a timer keeps the cut on the clip's own boundary no
 * matter how long it buffered.
 */
export function HeroCycle({
  clips,
  ready,
  onClipChange,
  className,
  style,
}: Props) {
  const [index, setIndex] = useState(0);
  // Seeded true where there is no observer to do the job, so those browsers
  // play the hero rather than sitting on a still forever. Where there is one,
  // it reports on the first frame after mount and the still covers the gap.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const next = (index + 1) % clips.length;
  // With nothing to cut to, fall back to plain looping rather than advancing
  // to the clip we are already on.
  const single = clips.length < 2;
  const playing = ready && inView;

  useEffect(() => {
    onClipChange?.(index);
  }, [index, onClipChange]);

  // Mount videos only while the hero is visible. No rootMargin: the hero is
  // the top of the page, so there is nothing to gain from arming it early, and
  // everything to gain from dropping it the moment it is gone.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const v = refs.current[index];
    if (!v) return;

    // Rewind before playing. On the wrap from the last clip back to the first,
    // and on every remount after scrolling back up, this element may already
    // be sitting at its end. Without the reset it would fire `ended`
    // immediately and the rotation would spin.
    if (v.readyState > 0) v.currentTime = 0;

    let cancelled = false;
    const tryPlay = () => {
      if (cancelled || !v.paused) return;
      v.play().catch(() => {
        // iOS Safari can refuse autoplay even when muted (Low Power Mode,
        // Data Saver). Fall back to the first user gesture, then unbind.
        const onGesture = () => {
          v.play().catch(() => {});
          document.removeEventListener("touchstart", onGesture);
          document.removeEventListener("pointerdown", onGesture);
        };
        document.addEventListener("touchstart", onGesture, {
          once: true,
          passive: true,
        });
        document.addEventListener("pointerdown", onGesture, { once: true });
      });
    };
    tryPlay();

    // Park the clips that are not showing at their first frame, so whichever
    // one comes next starts where its still already is.
    refs.current.forEach((el, i) => {
      if (!el || i === index) return;
      el.pause();
      if (el.readyState > 0) el.currentTime = 0;
    });

    return () => {
      cancelled = true;
    };
  }, [index, playing]);

  const layer = (isCurrent: boolean): React.CSSProperties => ({
    ...style,
    position: "absolute",
    inset: 0,
    opacity: isCurrent ? 1 : 0,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
  });

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {clips.map((clip, i) => (
        <img
          key={clip.poster}
          src={clip.poster}
          alt=""
          aria-hidden
          // The first still is the LCP element and is preloaded in the
          // document head; the rest can wait their turn.
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          className={className}
          style={layer(i === index)}
        />
      ))}

      {playing &&
        clips.map((clip, i) => {
          const isCurrent = i === index;
          // Only the clip on screen and the one after it exist as elements.
          // A third, src-less <video> was still a media element and a layer
          // for no benefit, and the rotation only ever needs one clip of
          // lookahead to make the next cut seamless.
          if (!isCurrent && i !== next) return null;
          return (
            <video
              key={clip.src}
              ref={(el) => {
                refs.current[i] = el;
              }}
              src={clip.src}
              muted
              loop={single}
              playsInline
              webkit-playsinline="true"
              preload={isCurrent ? "auto" : "metadata"}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden={!isCurrent}
              onEnded={isCurrent && !single ? () => setIndex(next) : undefined}
              className={className}
              style={layer(isCurrent)}
            />
          );
        })}
    </div>
  );
}
