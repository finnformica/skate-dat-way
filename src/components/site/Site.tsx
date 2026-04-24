import { useCallback, useState } from "react"
import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { Marquee } from "@/components/site/Marquee"
import { About } from "@/components/site/About"
import { Edits } from "@/components/site/Edits"
import { Spots } from "@/components/site/Spots"
import { Journal } from "@/components/site/Journal"
import { Contact } from "@/components/site/Contact"
import { Footer } from "@/components/site/Footer"
import { BootLoader } from "@/components/site/BootLoader"
import { LenisProvider } from "@/components/motion/LenisProvider"

const HERO_VIDEO = "/videos/video1.mp4"
const HERO_POSTER =
  "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1200&q=80&auto=format&fit=crop"

const PRELOAD_ASSETS: Array<{ type: "image" | "video"; src: string }> = [
  { type: "video", src: HERO_VIDEO },
  { type: "image", src: HERO_POSTER },
]

export function Site() {
  const [ready, setReady] = useState(false)
  const [loaderMounted, setLoaderMounted] = useState(true)

  const handleDone = useCallback(() => {
    setReady(true)
    window.setTimeout(() => setLoaderMounted(false), 600)
  }, [])

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
          <About />
          <Edits />
          <Spots />
          <Journal />
          <Contact />
        </main>
      </div>

      <Footer />
    </LenisProvider>
  )
}
