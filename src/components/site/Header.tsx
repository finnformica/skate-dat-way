import { ShoppingBag, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-bone/15 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-bone bg-acid text-ink">
            <span className="font-display text-lg">S</span>
          </span>
          <span className="font-display text-2xl tracking-tight">
            Skate Dat Way
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Shop", "Spots", "Team", "Journal"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-display text-sm uppercase tracking-widest text-bone/80 transition hover:text-acid"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
            <ShoppingBag />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center border-2 border-ink bg-acid text-[10px] font-bold text-ink">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  )
}
