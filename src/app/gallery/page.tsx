import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | CapeyBara Café",
  description:
    "A visual journey through CapeyBara — our coffees, our space, our craft. Follow us on Instagram @capeybara.srt.",
};

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85",  alt: "Coffee flat-lay",     tall: true  },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=85",  alt: "Cafe interior",       tall: false },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",  alt: "Artisan desserts",    tall: false },
  { src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=85",     alt: "Barista at work",     tall: true  },
  { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85",     alt: "Fresh pastries",      tall: false },
  { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=85",  alt: "Coffee beans",        tall: false },
  { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=85",  alt: "Espresso shot",       tall: false },
  { src: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=900&q=85",  alt: "Latte art",           tall: false },
  { src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=900&q=85",  alt: "Matcha",              tall: true  },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4">Visual Stories</p>
            <h1 className="font-display font-light text-charcoal text-6xl md:text-8xl leading-none tracking-tight mb-4">
              Life at <em className="text-charcoal">CapeyBara</em>
            </h1>
            <p className="font-body text-charcoal/50 text-sm max-w-md leading-relaxed mt-6">
              Moments, textures, and aromas — captured to bring you a little closer to our world,
              even when you are not here.
            </p>
          </div>

          {/* Masonry grid — CSS columns */}
          <div
            className="columns-2 md:columns-3 gap-4 space-y-4"
          >
            {PHOTOS.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-sm break-inside-avoid bg-cream-dark"
                style={{ height: p.tall ? "500px" : "320px" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/40 transition-all duration-500" />
                <div className="absolute inset-2 border border-gold/0 group-hover:border-gold/45 transition-all duration-500 rounded-sm pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-charcoal font-display text-lg">{p.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-24">
            <p className="font-display text-2xl text-charcoal italic mb-6">
              &ldquo;And there is always more on Instagram&rdquo;
            </p>
            <a
              href="https://www.instagram.com/capeybara.srt"
              target="_blank" rel="noopener noreferrer"
              id="gallery-ig-cta"
              className="inline-flex items-center gap-3 font-body text-[10px] tracking-[0.22em] uppercase border border-charcoal/25 hover:border-gold text-charcoal hover:text-gold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @capeybara.srt
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
