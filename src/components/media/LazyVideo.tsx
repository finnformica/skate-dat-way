import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** Drives playback. Card hover on desktop, nearest-card on touch. */
  active: boolean;
  /** How early to attach the media, as an IntersectionObserver rootMargin.
   *  Roughly a viewport and a half of lead time: enough that a card has its
   *  still by the time it is scrolled to at any normal speed, tight enough
   *  that the tail of a twelve card grid stays unfetched for a visit that
   *  never leaves the hero. */
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  label: string;
};

/**
 * A <video> that costs nothing until it is nearly on screen.
 *
 * Three stages, so a grid of twelve clips doesn't cost twelve requests on load:
 *
 *   1. Well off screen — no `src`, and the still is not rendered at all, so
 *      the card makes zero network requests of any kind.
 *   2. Near the viewport — the source is attached at `preload="metadata"`.
 *      Every clip is encoded with `+faststart`, so the moov atom sits at the
 *      front and this costs a few KB rather than a progressive download.
 *   3. Play requested — the browser streams the frames.
 *
 * The still is a separate <img> rather than the video's own `poster`
 * attribute, because browsers fetch `poster` eagerly no matter what `preload`
 * says — that alone put all twelve stills on the critical path. Its `src` is
 * gated on the same observer rather than on `loading="lazy"`, whose distance
 * threshold is a browser heuristic that in practice fetched the whole grid
 * anyway. The video — transparent until it has data — simply paints over the
 * still. Both show frame 0 of the same encode, so the handover and the reset
 * back to `currentTime = 0` are invisible.
 */
export function LazyVideo({
  src,
  poster,
  active,
  rootMargin = "150% 0px",
  className,
  style,
  label,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // Seeded true where there is no observer to do the job, so those browsers
  // simply load everything rather than showing empty cards forever.
  const [near, setNear] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  // A fast scroll or an early hover can beat the observer, so `active` arms
  // the media too. Derived rather than synced through an effect — the only
  // thing that writes state here is the observer callback.
  const armed = near || active;

  // Stage 2: attach the media once the card is within reach of the viewport.
  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, rootMargin]);

  // Stage 3.
  useEffect(() => {
    const v = ref.current;
    if (!v || !armed) return;
    if (active) {
      // Seeking before any data has arrived is a no-op at best, so only
      // rewind once there is something to rewind to.
      if (v.readyState > 0) v.currentTime = 0;
      v.play().catch(() => {
        // Autoplay can be refused (Low Power Mode, Data Saver). The still
        // stays up, which is a perfectly good fallback.
      });
    } else {
      v.pause();
      if (v.readyState > 0) v.currentTime = 0;
    }
  }, [active, armed]);

  return (
    <>
      {armed && (
        <img
          src={poster}
          alt=""
          aria-hidden
          decoding="async"
          className={cn("absolute inset-0", className)}
          style={style}
        />
      )}
      <video
        ref={ref}
        src={armed ? src : undefined}
        preload={armed ? "metadata" : "none"}
        muted
        loop
        playsInline
        // iOS Safari still reads the legacy attribute in some versions.
        webkit-playsinline="true"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={label}
        className={cn("absolute inset-0", className)}
        style={style}
      />
    </>
  );
}
