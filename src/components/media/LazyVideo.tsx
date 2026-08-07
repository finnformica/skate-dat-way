import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** Drives playback. Card hover on desktop, nearest-card on touch. */
  active: boolean;
  /** How early to fetch the still, as an IntersectionObserver rootMargin. */
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  label: string;
};

const FADE_MS = 450;

/**
 * A still that becomes a video only while it is being watched.
 *
 * The <video> element is *mounted on demand* rather than mounted-and-idle. A
 * paused video is not free: each one holds a media decoder and gets its own
 * composited layer, so a grid of them costs frames while scrolling even though
 * nothing is playing. The resting state of a card is a single <img> and no
 * video element at all, which means the grid costs the same whether it holds
 * twelve cards or a hundred.
 *
 * Neither layer carries a CSS filter. The stills are encoded desaturated and
 * the video is only ever shown on hover, where it is meant to be in colour, so
 * the grayscale/colour transition is done by cross-fading one over the other
 * instead of animating `filter`. Fifteen filter passes and the layers they
 * forced were the bulk of the cost of revealing the rest of the grid.
 *
 * The fade waits for the video's first frame. Both layers show frame 0 of the
 * same encode, so what cross-fades is purely the colour coming back, and there
 * is never a flash of an empty video element.
 *
 * The still's `src` is withheld until the card is within `rootMargin` of the
 * viewport. It is gated on the observer rather than `loading="lazy"`, whose
 * distance threshold is a browser heuristic that in practice fetched the whole
 * grid up front.
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
  // The <img> is the permanent element, so it is what we observe — the video
  // comes and goes and cannot be relied on as an observation target.
  const imgRef = useRef<HTMLImageElement>(null);
  const [near, setNear] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (near) return;
    const el = imgRef.current;
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

  return (
    <>
      <img
        ref={imgRef}
        // No `src` until near: an <img> without the attribute makes no request
        // but still lays out, which is exactly what the observer needs.
        src={near ? poster : undefined}
        alt=""
        aria-hidden
        decoding="async"
        className={cn("absolute inset-0", className)}
        style={style}
      />
      {active && (
        <HoverVideo
          src={src}
          label={label}
          className={className}
          style={style}
        />
      )}
    </>
  );
}

/**
 * Split out so the fade state lives and dies with the element. Unmounting
 * resets it for free, which is both simpler than clearing it from an effect
 * and avoids a synchronous setState during one.
 */
function HoverVideo({
  src,
  label,
  className,
  style,
}: {
  src: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(false);

  // `autoPlay` covers most cases, but iOS Safari can refuse it even when muted
  // (Low Power Mode, Data Saver). Nudge it once on mount; if that is refused
  // too the still stays up, which is a perfectly good fallback.
  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      // iOS Safari still reads the legacy attribute in some versions.
      webkit-playsinline="true"
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      onLoadedData={() => setShown(true)}
      className={cn("absolute inset-0", className)}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease-out`,
      }}
    />
  );
}
