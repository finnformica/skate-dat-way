import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { Marquee } from "@/components/site/Marquee"
import { Shop } from "@/components/site/Shop"
import { Spots } from "@/components/site/Spots"
import { Team } from "@/components/site/Team"
import { Journal } from "@/components/site/Journal"
import { Newsletter } from "@/components/site/Newsletter"
import { Footer } from "@/components/site/Footer"

function App() {
  return (
    <div className="grain min-h-screen bg-ink text-bone">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Shop />
        <Spots />
        <Team />
        <Journal />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
