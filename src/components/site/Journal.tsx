import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"

const posts = [
  {
    tag: "Setup",
    title: "Why I switched to anti-rocker and stopped apologising for it",
    date: "Apr 19, 2026",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1531565637446-32307b194362?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Field notes",
    title: "Three sessions at Southbank before security learns your face",
    date: "Apr 08, 2026",
    read: "4 min",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Essay",
    title: "Wizard isn't a style, it's a willingness to get bored at a curb",
    date: "Mar 27, 2026",
    read: "9 min",
    image:
      "https://images.unsplash.com/photo-1565108150403-c0f12d458bf6?w=1200&q=80&auto=format&fit=crop",
  },
]

export function Journal() {
  return (
    <section id="journal" className="border-b border-bone/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-hot">
              04 · Words
            </p>
            <Reveal>
              <h2 className="text-5xl text-bone md:text-7xl">The journal.</h2>
            </Reveal>
          </div>
          <a
            href="#"
            data-cursor="hover"
            className="link-underline hidden font-display text-sm uppercase tracking-widest text-bone md:inline-flex"
          >
            All posts ↗
          </a>
        </div>

        <Reveal stagger className="grid grid-cols-1 gap-px bg-bone/15 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              data-cursor="hover"
              className="group flex flex-col bg-ink transition-colors duration-200 hover:bg-ink-2"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover grayscale transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                  <span className="border border-acid px-2 py-1 text-acid">
                    {post.tag}
                  </span>
                  <span className="text-bone/50">{post.date}</span>
                  <span className="text-bone/50">· {post.read}</span>
                </div>
                <h3 className="font-display text-2xl uppercase leading-tight text-bone transition-colors duration-150 group-hover:text-acid">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 pt-4 font-display text-sm uppercase tracking-widest text-bone">
                  Read it
                  <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
