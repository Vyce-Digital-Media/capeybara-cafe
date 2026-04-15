"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    num: "01",
    name: "CapeyBara Signature",
    desc: "House espresso · caramelised vanilla cold foam · whisper of cardamom. A deeply rich and balanced signature drink.",
    price: "₹220",
    tag: "Best Seller",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200",
  },
  {
    num: "02",
    name: "Mango Cold Brew",
    desc: "Sun-ripened mango infused 24-hour slow-steeped cold brew · hand-chipped ice. Summer captured in a glass.",
    price: "₹280",
    tag: "Seasonal",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200",
  },
  {
    num: "03",
    name: "Rose Gold Matcha",
    desc: "Ceremonial matcha · oat milk · rose water · edible gold dust. Earthy, floral, and undeniably luxurious.",
    price: "₹260",
    tag: "New",
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200",
  },
  {
    num: "04",
    name: "Dark Velvet Espresso",
    desc: "Double shot · Venezuelan cacao · smoked salt · orange zest. A complex dark chocolate experience with bright citrus notes.",
    price: "₹240",
    tag: "",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200",
  },
];
/* ────────────────────────────────────────────────────────────────── */

function SignatureCard({
  item,
  index,
  isActive,
}: {
  item: (typeof ITEMS)[0];
  index: number;
  isActive: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 150, damping: 20 });
  const my = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const isEven = index % 2 === 0;

  return (
    <div
      className="w-full max-w-[1200px] mx-auto px-4 md:px-0"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[28px] border border-charcoal/5 bg-cream p-10 md:p-16 min-h-[240px] md:min-h-[280px] transition-all duration-700 hover:border-gold/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center"
      >
        <div className="absolute -inset-[20%] z-0 bg-gradient-to-br from-cream to-ivory pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />

        {/* Animated glow */}
        <div
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isEven ? "20% 50%" : "80% 50%"}, rgba(212,168,83,0.12) 0%, transparent 60%)`,
          }}
        />

        {/* Hover reveal image */}
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-[28px]">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out scale-110 group-hover:scale-100"
            sizes="900px"
          />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>

        {/* Sweeping light */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-charcoal/[0.03] to-transparent skew-x-[-25deg] z-0 group-hover:opacity-0 transition-opacity duration-500"
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 w-full items-center justify-between">
          <div className="flex flex-col items-start gap-3 flex-1">
            <span className="font-display font-black text-[5rem] leading-none text-charcoal/[0.04] group-hover:text-white/[0.06] transition-colors duration-700 md:text-[6rem] absolute -top-4 -left-4 md:top-2 md:left-2 select-none">
              {item.num}
            </span>
            <div className="flex items-center gap-3 mt-10 md:mt-0 relative z-10">
              <h3 className="font-display text-3xl md:text-4xl text-charcoal tracking-tight group-hover:text-ivory transition-colors duration-700">
                {item.name}
              </h3>
              {item.tag && (
                <span className="text-[8px] tracking-[0.2em] uppercase font-body bg-gold/10 text-gold px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-md">
                  {item.tag}
                </span>
              )}
            </div>
            <p className="font-body text-stone text-sm leading-relaxed max-w-md relative z-10 group-hover:text-ivory/80 transition-colors duration-700">
              {item.desc}
            </p>
          </div>

          <div className="w-full md:w-px md:h-20 bg-gradient-to-b from-transparent via-black/10 group-hover:via-white/20 to-transparent transition-colors duration-700 my-3 md:my-0 md:mx-6" />

          <div className="flex flex-col items-center justify-center min-w-[130px]">
            <span className="font-display text-4xl md:text-5xl text-gold group-hover:scale-110 transition-transform duration-500 origin-center drop-shadow-[0_0_15px_rgba(212,168,83,0)] group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.4)]">
              {item.price}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface SignatureSectionProps {
  /** Injected by FullPageScroll — which card is currently in focus (0-based) */
  subStep?: number;
}

export function SignatureSection({ subStep = 0 }: SignatureSectionProps) {
  const active = Math.max(0, Math.min(subStep, ITEMS.length - 1));

  return (
    <section
      id="menu"
      className="h-full w-full bg-ivory flex flex-col overflow-hidden border-y border-charcoal/[0.05]"
    >
      {/* ── Title ─────────────────────────────────────────────── */}
      <div className="flex-shrink-0 pt-14 pb-6 flex flex-col items-center text-center px-6">
        <motion.p
          className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-3 mt-22"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Crafted for You
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-6xl text-charcoal tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          Signature <em className="text-gold-light">Creations</em>
        </motion.h2>

        {/* Step indicator dots under title */}
        <div className="flex items-center gap-2 mt-5">
          {ITEMS.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === active ? 24 : 8,
                height: 6,
                backgroundColor:
                  i === active
                    ? "rgba(212,168,83,1)"
                    : i < active
                      ? "rgba(212,168,83,0.45)"
                      : "rgba(212,168,83,0.18)",
                transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Stacking card deck ────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {ITEMS.map((item, i) => {
          // Distance from the active card
          const dist = i - active;

          // Cards above active (already scrolled past): stack up, shrink, fade
          // Active card: centered, full size
          // Cards below active (not yet reached): hidden below viewport
          let translateY: number;
          let scale: number;
          let opacity: number;
          let zIndex: number;

          if (dist < 0) {
            // Past cards — stack up behind the active card
            translateY = dist * 18;         // each card 18px higher than the one below
            scale = 1 + dist * 0.04;        // slightly smaller as you go back
            opacity = 1 + dist * 0.25;      // fade as stacked further back (min ~0.25)
            zIndex = ITEMS.length + dist;
          } else if (dist === 0) {
            // Active card
            translateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = ITEMS.length;
          } else {
            // Future cards — below the fold
            translateY = 120 + dist * 40;   // below visible area
            scale = 1;
            opacity = 0;
            zIndex = ITEMS.length - dist;
          }

          return (
            <div
              key={item.num}
              className="absolute w-full"
              style={{
                transform: `translateY(${translateY}%) scale(${scale})`,
                opacity: Math.max(0, opacity),
                zIndex,
                transition: "transform 0.75s cubic-bezier(0.76,0,0.24,1), opacity 0.75s cubic-bezier(0.76,0,0.24,1), scale 0.75s cubic-bezier(0.76,0,0.24,1)",
              }}
            >
              <SignatureCard item={item} index={i} isActive={i === active} />
            </div>
          );
        })}
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <div className="flex-shrink-0 pb-10 flex justify-center">
        <Link
          href="/menu"
          id="sig-full-menu-cta"
          className="group relative overflow-hidden border border-charcoal/10 hover:border-gold bg-white text-charcoal text-[10px] tracking-[0.28em] uppercase px-10 py-4 rounded-full font-body transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-white shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
        >
          <span className="relative z-10 font-bold">Explore Full Menu</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg]" />
        </Link>
      </div>
    </section>
  );
}
