const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)
const Twitch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V5m5 6V5" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 border-b border-bone/15 pb-12 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center border-2 border-bone bg-acid text-ink">
                <span className="font-display text-lg">S</span>
              </span>
              <span className="font-display text-2xl text-bone">
                Skate Dat Way
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-bone/60">
              Independent skate shop, Brooklyn → worldwide. Est. 2014. Still
              skater-owned. Always will be.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Youtube, Twitch].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border-2 border-bone/40 text-bone transition hover:border-acid hover:text-acid"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Shop",
              links: ["Decks", "Completes", "Trucks", "Wheels", "Apparel"],
            },
            {
              title: "About",
              links: ["Our story", "Team", "Journal", "Shipping", "Returns"],
            },
            {
              title: "Hotline",
              links: ["hello@skatedatway.com", "(917) 555-3210", "Mon–Sat, 10–6"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm uppercase tracking-widest text-bone">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-bone/60">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-acid">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs uppercase tracking-widest text-bone/50 md:flex-row">
          <p>© 2026 Skate Dat Way · Made on a board, shipped from Brooklyn</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-acid">
              Privacy
            </a>
            <a href="#" className="hover:text-acid">
              Terms
            </a>
            <a href="#" className="hover:text-acid">
              Accessibility
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none text-center font-display text-[16vw] leading-none text-bone/[0.04]"
        >
          SKATE DAT WAY
        </div>
      </div>
    </footer>
  )
}
