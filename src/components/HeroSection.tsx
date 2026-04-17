"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = "/hero_image.png";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} id="home" className="relative h-screen bg-ivory overflow-hidden">

      {/* ── Full-screen image ─────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="CapeyBara Café — handcrafted coffee"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={50}
        />
        {/* Left-to-right cream fade so text on the left stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/20 to-transparent" />
        {/* White highlight gradient from the left (20% screen width) */}
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>

      {/* ── Decorative thin vertical lines ────────────────── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] z-[2]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-charcoal"
            style={{ left: `${i * 16.66}%` }}
          />
        ))}
      </div>

      {/* ── Subtle gold glow on the left ──────────────────── */}
      <div className="pointer-events-none absolute -left-[5%] top-1/3 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] z-[2]" />

      {/* ── Left text block ───────────────────────────────── */}
      <div className="absolute top-0 left-0 mt-12 h-full flex flex-col justify-center px-10 md:px-16 lg:px-24 z-10 w-full md:w-[60%] lg:w-[52%] max-md:mt-0 max-md:px-6">


        {/* Main headline — big editorial serif */}
        <motion.h1
          className="font-display font-light text-charcoal leading-[0.92] tracking-tight mb-8 max-md:text-5xl md:text-[clamp(3.5rem,7vw,6.5rem)] text-[3.5rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Some places<br />
          serve coffee.<br />
          <em className="text-gold">We give you</em><br />
          <em className="text-gold">a reason to stay.</em>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="font-body text-stone text-sm md:text-base leading-relaxed max-w-[340px] mb-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
        >
          Handcrafted coffees, artisan sorbets, and warm spaces designed for you
          to slow down and truly savour.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 max-md:flex-col max-md:items-start"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          <a
            href="/#"
            id="hero-view-menu"
            className="group relative overflow-hidden bg-gold text-white text-[10px] tracking-[0.22em] uppercase px-9 py-4 rounded-full font-body transition-all duration-300 hover:bg-charcoal hover:shadow-lg hover:shadow-charcoal/20 hover:scale-105 active:scale-100"
          >
            <span className="relative z-10 font-semibold">View Menu</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]" />
          </a>
          <a
            href="/#"
            id="hero-our-story"
            className="border border-charcoal/15 hover:border-gold text-charcoal hover:text-gold text-[10px] tracking-[0.22em] uppercase px-9 py-4 rounded-full font-body transition-all duration-300"
          >
            Our Story →
          </a>
        </motion.div>
      </div>

    </div>
  );
}
