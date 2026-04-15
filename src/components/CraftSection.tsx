"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Sourced\nwith Love",
    body: "Every bean travels from high-altitude farms where careful hands pick only the ripest cherries. We partner directly with growers who share our obsession for quality.",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=90",
    alt: "Coffee beans being sourced",
    tag: "Farm to Roaster",
  },
  {
    num: "02",
    title: "Brewed to\nPerfection",
    body: "Our baristas are artisans, not order-takers. Each cup is calibrated to the gram, the degree, and the second — the difference between good and extraordinary.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90",
    alt: "Barista crafting coffee",
    tag: "Artisan Technique",
  },
  {
    num: "03",
    title: "Served\nwith Soul",
    body: "CapeyBara isn't just about coffee. It's the warm light, the worn-wood tables, the music chosen just for you. It's the feeling of being somewhere worth being.",
    img: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=90",
    alt: "Inside CapeyBara Café",
    tag: "Community & Care",
  },
];
/* ────────────────────────────────────────────────────────────────── */

interface CraftSectionProps {
  /** Injected by FullPageScroll — current internal slide index (0-based) */
  subStep?: number;
}

export function CraftSection({ subStep = 0 }: CraftSectionProps) {
  const active = Math.max(0, Math.min(subStep, STEPS.length - 1));
  const progress = active / (STEPS.length - 1); // 0 → 1

  return (
    <div
      id="craft"
      className="relative h-full min-h-[700px] w-full bg-charcoal overflow-hidden flex flex-col md:flex-row shadow-2xl"
    >
      {/* ── BACKGROUND IMAGES (right side) ──────────────────────── */}
      <div className="absolute inset-0 md:left-1/2 overflow-hidden z-0 bg-charcoal">
        {STEPS.map((step, i) => {
          const isActive = i === active;
          return (
            <div
              key={`wrap-${i}`}
              className="absolute inset-0 overflow-hidden"
              style={{
                zIndex: i,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.75s cubic-bezier(0.76,0,0.24,1)",
              }}
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: isActive ? "scale(1)" : "scale(1.08)",
                  transition: "transform 0.85s cubic-bezier(0.76,0,0.24,1)",
                }}
              >
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/40 md:bg-transparent transition-colors" />
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 md:hidden bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FOREGROUND CONTENT (left side) ──────────────────────── */}
      <div className="absolute inset-0 md:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 z-10 pointer-events-none">

        {/* Header */}
        <div className="absolute top-10 left-8 sm:left-12 md:top-16 md:left-16 lg:left-24">
          <p className="font-body text-[9px] text-gold tracking-[0.45em] uppercase mb-4 drop-shadow-md">
            How We Do It
          </p>
          <h2 className="font-display text-4xl text-ivory/90 tracking-tight drop-shadow-lg">
            Our Craft
          </h2>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
        </div>

        {/* Stepped Text Crossfader */}
        <div className="relative w-full h-[280px] sm:h-[260px] md:h-[300px]">
          {STEPS.map((step, i) => {
            const isActive = i === active;
            const offset = (i - active) * 40; // px — outgoing slides up, incoming from below
            return (
              <div
                key={`text-${i}`}
                className="absolute inset-0 flex flex-col justify-center pointer-events-auto select-none"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${isActive ? 0 : offset}px)`,
                  transition: "opacity 0.7s cubic-bezier(0.76,0,0.24,1), transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="flex items-center gap-3 border border-gold/40 rounded-full px-4 py-1.5 w-max mb-6 md:mb-8 backdrop-blur-sm bg-charcoal/20">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,168,83,0.8)]" />
                  <span className="font-body text-[10px] sm:text-[11px] text-ivory tracking-[0.3em] uppercase drop-shadow">
                    {step.tag}
                  </span>
                </div>

                <h3 className="font-display text-[2.75rem] sm:text-5xl lg:text-[4rem] text-white mb-6 leading-[1.1] tracking-tight whitespace-pre-line drop-shadow-xl h-fit">
                  {step.title}
                </h3>

                <p className="font-body text-ivory/80 text-sm sm:text-base leading-relaxed max-w-sm drop-shadow">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Large background step number */}
        <div
          className="absolute bottom-6 right-6 md:bottom-12 md:right-12 overflow-hidden select-none z-0"
          style={{ width: 220, height: 220 }}
        >
          {STEPS.map((step, i) => {
            const isActive = i === active;
            return (
              <span
                key={`num-${i}`}
                className="absolute bottom-0 right-0 font-display text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none text-ivory drop-shadow-lg"
                style={{
                  opacity: isActive ? 0.05 : 0,
                  transform: `translateY(${isActive ? 0 : 40}px)`,
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                {step.num}
              </span>
            );
          })}
        </div>

        {/* Gold Progress Track */}
        <div className="absolute bottom-10 left-8 sm:left-12 md:bottom-16 md:left-16 lg:left-24 pointer-events-auto z-20">
          <div className="flex items-center gap-5">
            <span className="font-body text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
              01
            </span>
            <div className="w-24 sm:w-32 md:w-48 h-[2px] bg-ivory/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/50 to-gold origin-left rounded-full"
                style={{
                  width: "100%",
                  transform: `scaleX(${progress})`,
                  transition: "transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                }}
              />
            </div>
            <span className="font-body text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
              {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-4 font-body text-[8px] tracking-[0.4em] text-ivory/30 uppercase">
            Scroll downward to explore
          </p>
        </div>

      </div>
    </div>
  );
}
