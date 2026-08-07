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

/**
 * A still that becomes a video only while it is being watched.
 *
 * The <video> element is *mounted on demand* rather than mounted-and-idle. A
 * paused video is not free: each one holds a media decoder and gets its own
 * composited layer, and with a grayscale filter over the top, fifteen of them
 * on one grid is enough to cost frames while scrolling. So the resting state
 * of a card is a single <img> and no video element at all — which means the
 * grid costs the same whether it holds twelve cards or a hundred.
 *
 * The swap is seamless because of how the assets were encoded: each still is
 * frame 0 of its own clip. A freshly mounted video has no data yet and is
 * therefore transparent, so the still shows through underneath; the moment the
 * first frame decodes, the video paints the same image the still was already
 * showing. Nothing needs to fade, and there is no flash of black. On the way
 * out the video unmounts and the still is simply revealed again.
 *
 * The still itself is still lazy — its `src` is withheld until the card is
 * within `rootMargin` of the viewport. It is gated on the observer rather than
 * `loading="lazy"`, whose distance threshold is a browser heuristic that in
 * practice fetched the whole grid up front.
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
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // `autoPlay` covers most cases, but iOS Safari can refuse it even when muted
  // (Low Power Mode, Data Saver). Nudge it once on mount; if that is refused
  // too, the still stays up, which is a perfectly good fallback.
  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [active]);

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
        <video
          ref={videoRef}
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
          className={cn("absolute inset-0", className)}
          style={style}
        />
      )}
    </>
  );
}
