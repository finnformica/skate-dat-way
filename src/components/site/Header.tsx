import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const NAV = [
  { label: "About", href: "#about" },
  { label: "Edits", href: "#edits" },
  { label: "Spots", href: "#spots" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState("")

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hh = String(d.getUTCHours()).padStart(2, "0")
      const mm = String(d.getUTCMinutes()).padStart(2, "0")
      const ss = String(d.getUTCSeconds()).padStart(2, "0")
      setClock(`LDN · ${hh}:${mm}:${ss} UTC`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-bone/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
         
          className="press flex items-center gap-3"
        >
          <Roundel />
          <span className="font-display text-2xl leading-none tracking-tight">
            Skate Dat Way
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
             
              className="link-underline font-display text-sm uppercase tracking-widest text-bone/80 transition-colors duration-150 hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-bone/50 tabular-nums md:inline">
            {clock}
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="press flex h-10 w-10 items-center justify-center border-2 border-bone/40 text-bone md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className="overflow-hidden border-t border-bone/15 bg-ink md:hidden"
        style={{
          maxHeight: open ? 320 : 0,
          transition: "max-height 320ms cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <nav className="flex flex-col gap-4 px-5 py-6">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl uppercase text-bone"
            >
              {item.label} <span className="text-acid">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Roundel() {
  // London-underground-roundel inspired mark
  return (
    <span
      aria-hidden
      className="relative grid h-10 w-10 place-items-center"
    >
      <span className="absolute inset-0 rounded-full border-[4px] border-acid" />
      <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-bone" />
      <span className="relative font-display text-[10px] uppercase tracking-widest text-ink">
        SDW
      </span>
    </span>
  )
}
