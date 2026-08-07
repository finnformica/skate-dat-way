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

/**
 * Cross-fading hero that plays each clip once and moves to the next.
 *
 * All clips are mounted so the fade has something to fade to, but only the
 * current and the next one are given a `src` — the third clip in a rotation
 * costs nothing until the second is on screen. Advancing on `ended` rather
 * than a timer keeps the cut on the clip's own boundary regardless of how
 * long it buffered for.
 */
export function HeroCycle({
  clips,
  ready,
  onClipChange,
  className,
  style,
}: Props) {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const next = (index + 1) % clips.length;
  // With nothing to cut to, fall back to plain looping rather than advancing
  // to the clip we are already on.
  const single = clips.length < 2;

  useEffect(() => {
    onClipChange?.(index);
  }, [index, onClipChange]);

  useEffect(() => {
    if (!ready) return;
    const v = refs.current[index];
    if (!v) return;

    // Rewind before playing. On the wrap from the last clip back to the
    // first, this element is already sitting at its end — without the reset
    // it would fire `ended` immediately and the rotation would spin.
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

    // Rewind the clips that are not showing so each one starts from its
    // first frame — which is also its poster, so the fade has no jump.
    refs.current.forEach((el, i) => {
      if (!el || i === index) return;
      el.pause();
      if (el.readyState > 0) el.currentTime = 0;
    });

    return () => {
      cancelled = true;
    };
  }, [index, ready]);

  return (
    <>
      {clips.map((clip, i) => {
        const isCurrent = i === index;
        const loaded = i === index || i === next;
        return (
          <video
            key={clip.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={loaded ? clip.src : undefined}
            poster={clip.poster}
            muted
            loop={single}
            playsInline
            webkit-playsinline="true"
            preload={isCurrent ? "auto" : loaded ? "metadata" : "none"}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden={!isCurrent}
            onEnded={isCurrent && !single ? () => setIndex(next) : undefined}
            className={className}
            style={{
              ...style,
              position: "absolute",
              inset: 0,
              opacity: isCurrent ? 1 : 0,
              transition: "opacity 600ms ease-in-out",
            }}
          />
        );
      })}
    </>
  );
}
