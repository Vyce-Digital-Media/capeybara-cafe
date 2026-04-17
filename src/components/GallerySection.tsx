"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function GalleryItemVideo({ src }: { src: string }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={vidRef}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      onMouseEnter={() => vidRef.current?.play().catch(() => {})}
      onMouseLeave={() => vidRef.current?.pause()}
      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-108"
      style={{ transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
    />
  );
}

const IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
    alt: "Coffee flat-lay at CapeyBara",
    caption: "Every Detail, Deliberate",
    type: "image",
  },
  {
    id: 7,
    src: "/video1.mp4",
    alt: "Premium brewing",
    caption: "The Perfect Pour",
    type: "video",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=85",
    alt: "Warm cafe interior",
    caption: "A Space to Breathe",
    type: "image",
  },
  {
    id: 8,
    src: "/video2.mp4",
    alt: "Barista craft",
    caption: "Slow Bar Rituals",
    type: "video",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    alt: "Artisan desserts",
    caption: "Sweet Indulgences",
    type: "image",
  },
  {
    id: 9,
    src: "/video3.mp4",
    alt: "Coffee details",
    caption: "Freshly Roasted",
    type: "video",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=85",
    alt: "Barista crafting coffee",
    caption: "The Art of the Brew",
    type: "image",
  },
  {
    id: 10,
    src: "/video4.mp4",
    alt: "Coffee details",
    caption: "Freshly Roasted",
    type: "video",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=85",
    alt: "Fresh pastries",
    caption: "Baked with Heart",
    type: "image",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=85",
    alt: "Coffee beans close-up",
    caption: "From Source to Cup",
    type: "image",
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const fromLeft = i % 2 === 0;
      gsap.fromTo(
        el,
        { opacity: 0, x: fromLeft ? -70 : 70 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="gallery" className="bg-ivory py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Visual Stories
          </motion.p>
          <motion.h2
            className="font-display text-5xl md:text-6xl text-charcoal tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            Life at <em className="text-charcoal">CapeyBara</em>
          </motion.h2>
        </div>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: "280px" }}>
          {IMAGES.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`group relative overflow-hidden rounded-sm bg-cream-dark ${i === 0 ? "row-span-2" : ""}`}
            >
              {img.type === "video" ? (
                <GalleryItemVideo src={img.src} />
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/55 transition-all duration-500" />

              {/* Gold border */}
              <div className="absolute inset-2 border border-gold/0 group-hover:border-gold/55 transition-all duration-500 rounded-sm pointer-events-none" />

              {/* Caption slide up */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-charcoal font-display text-xl md:text-2xl tracking-wide">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a
            id="gallery-instagram-cta"
            href="https://www.instagram.com/capeybara.srt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-body border border-charcoal/30 hover:border-gold hover:text-gold text-charcoal px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @capeybara.srt on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
