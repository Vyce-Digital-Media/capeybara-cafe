import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Visit Us | CapeyBara Café",
  description:
    "Plan your visit to CapeyBara Café. Find us near Vesu Main Road, Surat, open 7 days a week.",
};

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 10:00 PM" },
  { day: "Saturday",        time: "9:00 AM – 11:00 PM" },
  { day: "Sunday",          time: "9:00 AM – 11:00 PM" },
];

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Page hero ─────────────────────────────────────── */}
        <section className="relative h-[65vh] min-h-[460px] flex items-end pb-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=90"
            alt="CapeyBara interior" fill sizes="100vw" className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4">Find Us</p>
            <h1 className="font-display font-light text-charcoal text-6xl md:text-8xl leading-none tracking-tight">
              Visit Us
              <br /><em className="text-gold-light">Today</em>
            </h1>
          </div>
        </section>

        {/* ── Info grid ─────────────────────────────────────── */}
        <section className="bg-ivory py-28 md:py-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

              {/* Left */}
              <div>
                {/* Address */}
                <div className="mb-14">
                  <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-5">Address</p>
                  <p className="font-display text-3xl md:text-4xl text-charcoal leading-snug">
                    Near Vesu Main Road,
                    <br />Surat, Gujarat 395007
                  </p>
                </div>

                <div className="h-px bg-cream-dark mb-14" />

                {/* Hours */}
                <div className="mb-14">
                  <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-8">Opening Hours</p>
                  <div className="space-y-0">
                    {HOURS.map((h, i) => (
                      <div key={h.day}>
                        <div className="flex justify-between items-center py-5">
                          <span className="font-body text-charcoal/60 text-sm">{h.day}</span>
                          <span className="font-display text-charcoal text-xl">{h.time}</span>
                        </div>
                        {i < HOURS.length - 1 && <div className="h-px bg-cream-dark" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-cream-dark mb-14" />

                {/* Contact */}
                <div>
                  <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-6">Get in Touch</p>
                  <div className="space-y-4">
                    <a href="https://www.instagram.com/capeybara.srt" target="_blank" rel="noopener noreferrer"
                      id="visit-ig-link"
                      className="group flex items-center gap-3 font-body text-sm text-charcoal hover:text-gold transition-colors duration-300">
                      @capeybara.srt on Instagram
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">↗</span>
                    </a>
                    <a href="tel:+919876543210"
                      className="font-body text-sm text-charcoal hover:text-gold transition-colors duration-300 block">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              {/* Right — branded card */}
              <div className="flex flex-col gap-8">
                {/* Map placeholder card */}
                <div className="relative bg-cream rounded-sm overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, #C9A96E 1px, transparent 0)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-10">
                    <div className="w-16 h-16 bg-gold/20 border border-gold/40 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="font-display text-charcoal text-xl mb-2">CapeyBara Café</p>
                    <p className="font-body text-charcoal/ text-xs leading-relaxed">Near Vesu Main Road<br />Surat, Gujarat 395007</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank" rel="noopener noreferrer"
                      id="visit-maps-link"
                      className="mt-8 font-body text-[9px] tracking-[0.28em] uppercase text-gold border border-gold/40 hover:bg-gold hover:text-ivory px-6 py-2.5 rounded-full transition-all duration-300"
                    >
                      Open in Maps
                    </a>
                    {/* Corner accents */}
                    <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-gold/40" />
                    <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-gold/40" />
                    <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-gold/40" />
                    <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-gold/40" />
                  </div>
                </div>

                {/* Interior photos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-52 rounded-sm overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=85"
                      alt="Cafe interior" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-52 rounded-sm overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=85"
                      alt="Coffee craft" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
