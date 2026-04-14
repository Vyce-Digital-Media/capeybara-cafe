"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Sourced\nwith Love",
    body: "Every bean travels from high-altitude farms where careful hands pick only the ripest cherries. We partner directly with growers who share our obsession for quality.",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=90",
    alt: "Coffee beans being sourced",
    label: "Origin",
    tag: "Farm to Roaster",
  },
  {
    num: "02",
    title: "Brewed to\nPerfection",
    body: "Our baristas are artisans, not order-takers. Each cup is calibrated to the gram, the degree, and the second — the difference between good and extraordinary.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=90",
    alt: "Barista crafting coffee",
    label: "Craft",
    tag: "Artisan Technique",
  },
  {
    num: "03",
    title: "Served\nwith Soul",
    body: "CapeyBara isn't just about coffee. It's the warm light, the worn-wood tables, the music chosen just for you. It's the feeling of being somewhere worth being.",
    img: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=90",
    alt: "Inside CapeyBara Café",
    label: "Experience",
    tag: "Community & Care",
  },
];
/* ────────────────────────────────────────────────────────────────── */

export function CraftSection() {
  const outerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!outerRef.current) return;

    // We use GSAP's native selector pattern instead of React Refs arrays
    // This entirely prevents the GSAP loop from crashing during React strict-mode re-renders
    const q = gsap.utils.selector(outerRef.current);

    // Select all our elements securely from the DOM
    const wraps = q(".craft-wrap");
    const imgs = q(".craft-img");
    const texts = q(".craft-text");
    const nums = q(".craft-num");
    const line = q(".craft-line");

    const n = STEPS.length;

    // Safety abort if DOM isn't fully ready
    if (wraps.length === 0) return;

    /* ── Single master timeline scrubbed exactly along the parent container ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        pin: true, // Forces GSAP to cleanly pin the section despite global overflow bugs
        start: "top top",
        end: `+=${(n - 1) * 100}%`, // Scroll distance exactly covers the steps
        scrub: 1.2,
      },
    });

    /* ── Step-by-step crossfade timeline ── */
    for (let i = 0; i < n - 1; i++) {
        // Outgoing text
        tl.to(texts[i],  { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" }, i);
        // Incoming text
        tl.to(texts[i + 1], { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, i + 0.5);

        // Outgoing large background number
        tl.to(nums[i],   { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" }, i);
        // Incoming large background number
        tl.to(nums[i + 1], { y: 0, opacity: 0.05, duration: 0.5, ease: "power2.out" }, i + 0.5);

        // NOTE TO USER: This was intentionally changed to OPACITY instead of TRANSLATE 
        // to fix the image breaking. Do not revert this to yPercent!
        tl.fromTo(wraps[i + 1], 
            { opacity: 0 }, 
            { opacity: 1, duration: 1, ease: "power2.inOut" }, 
            i);

        // Smooth Ken-Burns scale-down parallax
        tl.fromTo(imgs[i + 1], 
            { scale: 1.15 }, 
            { scale: 1, duration: 1, ease: "power2.out" }, 
            i);
        
        // Outgoing image subtly scales in while fading out
        tl.to(imgs[i], 
            { scale: 1.05, duration: 1, ease: "power2.inOut" }, 
            i);
    }


    // Connect timeline to the progress track directly spanning entire length
    tl.to(line, { scaleX: 1, duration: n - 1, ease: "none" }, 0);

  }, { scope: outerRef });

  return (
    <div
      ref={outerRef}
      id="craft"
      // Remove height style math, GSAP creates the pin-spacer dynamically
      className="relative h-screen min-h-[700px] w-full bg-charcoal overflow-hidden flex flex-col md:flex-row shadow-2xl"
    >
      {/* ── BACKGROUND IMAGES (Right Side Desktop, Full-bleed Mobile) ── */}
      <div className="absolute inset-0 md:left-1/2 overflow-hidden z-0 bg-charcoal">
        {STEPS.map((step, i) => (
          <div
            key={`wrap-${i}`}
            className="craft-wrap absolute inset-0 overflow-hidden will-change-transform"
            style={{
              zIndex: i,
              // Fixed: We MUST use opacity directly for crossfading to prevent coordinate clashing.
              opacity: i === 0 ? 1 : 0 
            }}
          >
            <div
              className="craft-img absolute inset-0 w-full h-full will-change-transform"
              style={{
                // Fixed: Hardcoded initial scale matching GSAP expectations
                transform: i === 0 ? "scale(1)" : "scale(1.15)"
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

              {/* Fixed darken overlays to anchor text elegantly on all layouts */}
              <div className="absolute inset-0 bg-charcoal/40 md:bg-transparent transition-colors" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-t md:bg-gradient-to-r from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute inset-0 md:hidden bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
            </div>
          </div>
        ))}
      </div>

      {/* ── FOREGROUND CONTENT (Left Side Desktop, Overhead Mobile) ── */}
      <div className="absolute inset-0 md:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 z-10 pointer-events-none">

        {/* Header - Fixed top left */}
        <div className="absolute top-10 left-8 sm:left-12 md:top-16 md:left-16 lg:left-24">
          <p className="font-body text-[9px] text-gold tracking-[0.45em] uppercase mb-4 drop-shadow-md">
            How We Do It
          </p>
          <h2 className="font-display text-4xl text-ivory/90 tracking-tight drop-shadow-lg">
            Our Craft
          </h2>
        </div>

        {/* Stepped Text Crossfader */}
        <div className="relative w-full h-[280px] sm:h-[260px] md:h-[300px]">
          {STEPS.map((step, i) => (
            <div
              key={`text-${i}`}
              className="craft-text absolute inset-0 flex flex-col justify-center pointer-events-auto"
              style={{
                // Hardcoded initial style fallback prevents text-flashing overlap
                opacity: i === 0 ? 1 : 0,
                transform: `translateY(${i === 0 ? 0 : 40}px)`
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
          ))}
        </div>

        {/* Dynamic Floating Numbers */}
        <div
          className="absolute bottom-6 right-6 md:bottom-12 md:right-12 overflow-hidden select-none z-0"
          style={{ width: 220, height: 220 }}
        >
          {STEPS.map((step, i) => (
            <span
              key={`num-${i}`}
              className="craft-num absolute bottom-0 right-0 font-display text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none text-ivory drop-shadow-lg"
              style={{
                opacity: i === 0 ? 0.05 : 0,
                transform: `translateY(${i === 0 ? 0 : 40}px)`
              }}
            >
              {step.num}
            </span>
          ))}
        </div>

        {/* Gold Progress Track - Bottom anchored */}
        <div className="absolute bottom-10 left-8 sm:left-12 md:bottom-16 md:left-16 lg:left-24 pointer-events-auto z-20">
          <div className="flex items-center gap-5">
            <span className="font-body text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
              01
            </span>
            <div className="w-24 sm:w-32 md:w-48 h-[2px] bg-ivory/10 relative overflow-hidden rounded-full">
              <div
                className="craft-line absolute inset-y-0 left-0 bg-gradient-to-r from-gold/50 to-gold w-full origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="font-body text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
              {String(STEPS.length).padStart(2, '0')}
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
