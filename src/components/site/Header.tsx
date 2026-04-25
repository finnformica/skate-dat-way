import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useActiveSection } from "@/hooks/useActiveSection"

const NAV = [
  { label: "Reels", href: "#reels", id: "reels" },
  { label: "Map", href: "#map", id: "map" },
  { label: "Diary", href: "#diary", id: "diary" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const

const NAV_IDS = NAV.map((n) => n.id)

function getLondonClock(): string {
  const now = new Date()
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).formatToParts(now)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""
  const tz = get("timeZoneName") || "GMT"
  return `LDN · ${get("hour")}:${get("minute")}:${get("second")} ${tz}`
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState(getLondonClock)
  const active = useActiveSection(NAV_IDS)

  useEffect(() => {
    const id = window.setInterval(() => setClock(getLondonClock()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-bone/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="press flex items-center gap-3">
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
              data-active={active === item.id ? "true" : undefined}
              className="link-underline font-display text-sm uppercase tracking-widest text-bone/70 transition-colors duration-150 hover:text-bone data-[active=true]:text-bone"
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
            aria-expanded={open}
            className="press flex h-10 w-10 items-center justify-center border-2 border-bone/40 text-bone md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — always mounted; visibility driven by data-mobile-open */}
      <div
        data-mobile-open={open}
        aria-hidden={!open}
        className="overflow-hidden border-t border-bone/15 bg-ink md:hidden"
        style={{
          maxHeight: open ? 380 : 0,
          transition: "max-height 360ms cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <nav className="flex flex-col px-5 py-5">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              data-active={active === item.id ? "true" : undefined}
              className="mobile-nav-item link-underline inline-flex w-fit items-center gap-3 py-2 font-display text-2xl uppercase text-bone/80 data-[active=true]:text-bone"
            >
              <span className="font-mono text-[10px] tracking-widest text-bone/30">
                {String(NAV.indexOf(item) + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Roundel() {
  return (
    <span
      aria-hidden
      className="relative grid h-10 w-10 place-items-center"
    >
      <span className="absolute inset-0 rounded-full border-[4px] border-rust" />
      <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-bone" />
      <span className="relative font-display text-[10px] uppercase tracking-widest text-ink">
        SDW
      </span>
    </span>
  )
}
