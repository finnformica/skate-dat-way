import { BootLoader } from "@/components/site/BootLoader";
import { Contact } from "@/components/site/Contact";
import { Reels } from "@/components/site/Reels";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Maps } from "@/components/site/Maps";
import { useCallback, useState } from "react";

// The hero plays these in order, cross-fading and looping back round. Only
// the first two are ever fetched up front — HeroCycle attaches the third
// once the second is on screen.
const HERO_CLIPS = [
  {
    src: "/videos/hero-1.mp4",
    poster: "/posters/hero-1.webp",
    place: "Home park",
    title: "First run of the day",
  },
  {
    src: "/videos/hero-2.mp4",
    poster: "/posters/hero-2.webp",
    place: "Home park",
    title: "Working the bank",
  },
  {
    src: "/videos/hero-3.mp4",
    poster: "/posters/hero-3.webp",
    place: "The long path",
    title: "Room to open up",
  },
];

// The loader waits on the first clip's *poster*, not its video. The poster is
// a ~45KB WebP of frame 0, so the reveal is gated on something that lands
// fast, while the video streams in behind it. BootLoader still watches the
// video, but only for `loadeddata` — first frame decoded, not the whole clip
// buffered — so a slow connection delays the reveal by a beat instead of
// holding the entire site hostage.
const PRELOAD_ASSETS: Array<{ type: "image" | "video"; src: string }> = [
  { type: "image", src: HERO_CLIPS[0].poster },
  { type: "video", src: HERO_CLIPS[0].src },
];

export function Site() {
  const [ready, setReady] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const handleDone = useCallback(() => {
    setReady(true);
    window.setTimeout(() => setLoaderMounted(false), 600);
  }, []);

  return (
    <>
      {loaderMounted && (
        <BootLoader assets={PRELOAD_ASSETS} onDone={handleDone} />
      )}

      <div
        className="relative z-10 bg-ink"
        style={{ marginBottom: "var(--footer-h)" }}
      >
        <Header />
        <main>
          <Hero ready={ready} clips={HERO_CLIPS} />
          <Marquee ready={ready} />
          <Reels />
          <Maps />
          <Contact />
        </main>
      </div>

      <Footer />
    </>
  );
}
