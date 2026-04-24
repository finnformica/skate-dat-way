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

const HERO_VIDEO = "/videos/video1.mp4"

const HERO_POSTER =
  "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=1200&q=80&auto=format&fit=crop"

// Critical path: hero video (plays on arrival) + hero poster (fallback).
// Edit-card videos preload on hover via <video preload="none">, so the loader
// doesn't block on 5 MB of reel it might never play.
const PRELOAD_ASSETS: Array<{ type: "image" | "video"; src: string }> = [
  { type: "video", src: HERO_VIDEO },
  { type: "image", src: HERO_POSTER },
]

function App() {
  const [ready, setReady] = useState(false)
  const [loaderMounted, setLoaderMounted] = useState(true)

  const handleDone = useCallback(() => {
    setReady(true)
    // Unmount loader shortly after — leaves DOM clean without the fixed layer
    window.setTimeout(() => setLoaderMounted(false), 600)
  }, [])

  return (
    <>
      {loaderMounted && (
        <BootLoader assets={PRELOAD_ASSETS} onDone={handleDone} />
      )}

      {/* Site content — relative z-10 covers the sticky footer until user scrolls past */}
      <div className="relative z-10 bg-ink">
        <Header />
        <main>
          <Hero ready={ready} videoSrc={HERO_VIDEO} />
          <Marquee />
          <About />
          <Edits />
          <Spots />
          <Journal />
          <Contact />
        </main>
      </div>

      {/* Sticky parallax footer — sits behind content until scroll reveals it */}
      <Footer />
    </>
  )
}

export default App
