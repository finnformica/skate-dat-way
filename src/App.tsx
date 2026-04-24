import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { Marquee } from "@/components/site/Marquee"
import { About } from "@/components/site/About"
import { Edits } from "@/components/site/Edits"
import { Spots } from "@/components/site/Spots"
import { Journal } from "@/components/site/Journal"
import { Contact } from "@/components/site/Contact"
import { Footer } from "@/components/site/Footer"
import { Cursor } from "@/components/motion/Cursor"

function App() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Edits />
        <Spots />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
