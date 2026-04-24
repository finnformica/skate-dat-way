import { ArrowUpRight } from "lucide-react"

const posts = [
  {
    tag: "Field Guide",
    title: "How to set up your first deck without blowing $300",
    date: "Apr 18, 2026",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Interview",
    title: "Juno Park on skating Seoul with a broken wrist",
    date: "Apr 11, 2026",
    read: "9 min",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    tag: "Essay",
    title: "Why we stopped selling rails (and why we brought them back)",
    date: "Apr 03, 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1565108150403-c0f12d458bf6?w=1200&q=80&auto=format&fit=crop",
  },
]

export function Journal() {
  return (
    <section id="journal" className="border-b border-bone/15 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-hot">
              04 · The word
            </p>
            <h2 className="text-5xl text-bone md:text-7xl">The journal.</h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-2 font-display text-sm uppercase tracking-widest text-bone hover:text-acid md:inline-flex"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col border-2 border-bone/15 bg-ink transition hover:border-acid"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-acid">
                  <span className="border border-acid px-2 py-1">{post.tag}</span>
                  <span className="text-bone/50">{post.date}</span>
                  <span className="text-bone/50">· {post.read}</span>
                </div>
                <h3 className="font-display text-2xl uppercase leading-tight text-bone group-hover:text-acid">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 pt-4 font-display text-sm uppercase tracking-widest text-bone">
                  Read it <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
