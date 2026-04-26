import { LenisProvider } from "@/components/motion/LenisProvider";
import { BootLoader } from "@/components/site/BootLoader";
import { Contact } from "@/components/site/Contact";
import { Diary } from "@/components/site/Diary";
import { Reels } from "@/components/site/Reels";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Spots } from "@/components/site/Spots";
import { useCallback, useState } from "react";

const HERO_VIDEO = "/videos/video1.mp4";

const PRELOAD_ASSETS: Array<{ type: "image" | "video"; src: string }> = [
  { type: "video", src: HERO_VIDEO },
];

export function Site() {
  const [ready, setReady] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const handleDone = useCallback(() => {
    setReady(true);
    window.setTimeout(() => setLoaderMounted(false), 600);
  }, []);

  return (
    <LenisProvider>
      {loaderMounted && (
        <BootLoader assets={PRELOAD_ASSETS} onDone={handleDone} />
      )}

      <div
        className="relative z-10 bg-ink"
        style={{ marginBottom: "var(--footer-h)" }}
      >
        <Header />
        <main>
          <Hero ready={ready} videoSrc={HERO_VIDEO} />
          <Marquee ready={ready} />
          <Reels />
          <Spots />
          <Diary />
          <Contact />
        </main>
      </div>

      <Footer />
    </LenisProvider>
  );
}
