import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Story | CapeyBara Café",
  description:
    "Learn the story behind CapeyBara — born from a love for great coffee and warm spaces in Surat, Gujarat.",
};

const VALUES = [
  {
    num: "01",
    title: "Ethically Sourced",
    body: "We partner only with farms that treat their land and workers with genuine care. Every bean is chosen with intention.",
  },
  {
    num: "02",
    title: "Handcrafted Daily",
    body: "Our bar opens fresh each morning. No shortcuts, no syrups from a bottle — everything is made from scratch, every day.",
  },
  {
    num: "03",
    title: "Served with Love",
    body: "Hospitality isn't a policy for us. It's how we were raised. We genuinely care that you leave happier than you arrived.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative h-[75vh] min-h-[520px] flex items-end pb-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=90"
            alt="Behind the counter at CapeyBara"
            fill sizes="100vw" className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4">
              Our Story
            </p>
            <h1 className="font-display font-light text-charcoal text-6xl md:text-8xl leading-none tracking-tight">
              Born from Love
            </h1>
          </div>
        </section>

        {/* ── Main story ───────────────────────────────────────── */}
        <section className="bg-ivory py-28 md:py-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

              {/* Left — editorial body copy */}
              <div className="lg:sticky lg:top-32">
                <div className="h-px bg-gold mb-12 w-24" />
                <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-10">
                  A Sanctuary for
                  <br /><em className="text-charcoal">Coffee Lovers</em>
                </h2>
                <div className="space-y-6 font-body text-charcoal/62 text-[15px] leading-relaxed">
                  <p>
                    It started with a simple question: why can't a coffee shop feel as good as coming home?
                    That question — and a great deal of obsessive research into coffee origins —
                    led to the founding of CapeyBara in 2020.
                  </p>
                  <p>
                    We set up shop near Vesu, a neighbourhood we fell in love with instantly.
                    The sunlight, the energy, the community — it all felt right. We opened our
                    doors on a rainy Tuesday and served 18 cups on day one. Today we serve over
                    50,000 cups a year, but every single one still feels personal to us.
                  </p>
                  <p>
                    Our sorbets are made in-house with seasonal Indian fruits. Our beans are
                    sourced from small-batch farms in Coorg, Chikmagalur, and select international
                    estates. Everything on our menu earns its place.
                  </p>
                </div>
              </div>

              {/* Right — stacked images */}
              <div className="flex flex-col gap-6">
                <div className="relative h-80 md:h-96 overflow-hidden rounded-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85"
                    alt="Coffee overhead" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-2 border border-gold/25 rounded-sm pointer-events-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative h-64 overflow-hidden rounded-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=85"
                      alt="Cafe interior" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85"
                      alt="Desserts" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="bg-cream py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-6">What We Stand For</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal mb-20 leading-tight">
              Our <em className="text-gold-light">Values</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {VALUES.map((v) => (
                <div key={v.num} className="group border-t border-charcoal/ pt-8 hover:border-gold transition-colors duration-500">
                  <p className="font-body text-gold/50 text-[10px] tracking-[0.2em] uppercase mb-6 group-hover:text-gold transition-colors duration-300">
                    {v.num}
                  </p>
                  <h3 className="font-display text-2xl text-charcoal mb-5 group-hover:text-gold-light transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="font-body text-charcoal/ text-sm leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: "50K+", l: "Cups Served" },
                { v: "4+",   l: "Years Open"  },
                { v: "25+",  l: "Menu Items"  },
                { v: "5.0★", l: "Rating"      },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-5xl text-charcoal mb-2">{s.v}</p>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/45">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
