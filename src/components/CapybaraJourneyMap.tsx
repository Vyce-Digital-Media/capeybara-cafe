"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CapybaraJourneyMapProps {
  subStep?: number;
}

/* ─────────────────────────────────────────
   WAYPOINTS & COORDINATES
   We use a massive 400vw x 400vh canvas.
───────────────────────────────────────── */
const WAYPOINTS = [
  {
    id: 0,
    cx: "50vw",
    cy: "50vh",
    label: "The Beginning",
    sub: "Where our journey starts",
    desc: "Every great story begins with a single step. Here at the edge of the world, our Capybara takes the first stride towards the perfect coffee experience.",
    image: "/1.jpg",
    cam: { x: "0vw", y: "0vh" },
    rotation: 0,
    cardAlign: "left",
    cardWidth: "w-[320px] md:w-[480px]",
    mobileM: "max-md:-ml-[160px]",
  },
  {
    id: 1,
    cx: "150vw",
    cy: "100vh",
    label: "Matcha Meadows",
    sub: "A calming green pasture",
    desc: "Breathe in the fresh air of the Matcha Meadows. We source only the finest, shade-grown matcha leaves to craft our signature calming brews.",
    image: "/7.jpg",
    cam: { x: "-100vw", y: "-50vh" },
    rotation: 20,
    cardAlign: "right",
    cardWidth: "w-[300px] md:w-[420px]",
    mobileM: "max-md:-ml-[150px]",
  },
  {
    id: 2,
    cx: "260vw",
    cy: "200vh",
    label: "The Roast River",
    sub: "Flowing with rich espresso",
    desc: "A river of pure, rich espresso awaits. The Roast River represents our dedication to small-batch roasting and perfect extraction profiles.",
    image: "/10.jpg",
    cam: { x: "-210vw", y: "-150vh" },
    rotation: 45,
    cardAlign: "left",
    cardWidth: "w-[300px] md:w-[420px]",
    mobileM: "max-md:-ml-[150px]",
  },
  {
    id: 3,
    cx: "320vw",
    cy: "300vh",
    label: "CapeyBara Café",
    sub: "You have arrived.",
    desc: "Welcome to your new favorite spot. Pull up a chair, grab a pastry, and let the warm aroma of fresh coffee envelop you.",
    image: "/11.jpg",
    cam: { x: "-270vw", y: "-250vh" },
    rotation: 15,
    cardAlign: "right",
    cardWidth: "w-[300px] md:w-[420px]",
    mobileM: "max-md:-ml-[150px]",
  },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export function CapybaraJourneyMap({ subStep = 0 }: CapybaraJourneyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const capyRef = useRef<HTMLDivElement>(null);
  const realWorldContentRef = useRef<HTMLDivElement>(null);

  // The step safely bound between 0 and 5
  const safeStep = Math.max(0, Math.min(5, subStep));

  useGSAP(() => {
    if (!canvasRef.current || !capyRef.current || !flipWrapperRef.current) return;

    // --- PHASE 1: MAP JOURNEY (Steps 0 to 3) ---
    if (safeStep <= 3) {
      // Ensure we are facing front
      gsap.to(flipWrapperRef.current, {
        rotateY: 0,
        duration: 0.95,
        ease: "power2.inOut",
      });

      const target = WAYPOINTS[safeStep];

      // Pan the giant canvas camera
      gsap.to(canvasRef.current, {
        x: target.cam.x,
        y: target.cam.y,
        duration: 0.95,
        ease: "power2.inOut",
      });

      // Move the Capybara character
      gsap.to(capyRef.current, {
        left: target.cx,
        top: target.cy,
        rotation: target.rotation,
        duration: 0.95,
        ease: "power2.inOut",
      });
    }

    // --- PHASE 2 & 3: FLIP TO REALITY AND REVEAL TEXT (Step 4) ---
    if (safeStep >= 4) {
      // Perform the 3D flip!
      gsap.to(flipWrapperRef.current, {
        rotateY: -180,
        duration: 0.95,
        ease: "power2.inOut",
      });

      // Reveal text
      if (realWorldContentRef.current) {
        gsap.to(realWorldContentRef.current.children, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.4, // Short delay to wait for flip to be mostly complete
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      }
    } else {
      // Hide them if we scroll back up
      if (realWorldContentRef.current) {
        gsap.to(realWorldContentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          overwrite: "auto",
        });
      }
    }
  }, [safeStep]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#EAE1D3]"
      // Establish 3D perspective for the flip
      style={{ perspective: "2000px" }}
    >




      {/* 
        FLIP WRAPPER
        This layer rotates 180deg. It MUST have transform-style: preserve-3d. 
      */}
      <div
        ref={flipWrapperRef}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* =========================================================
            FRONT FACE: THE ILLUSTRATED JOURNEY MAP
        ========================================================= */}
        <div
          className="absolute inset-0 w-full h-full bg-[#FAF7F2] overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* THE GIANT CANVAS (400vw x 400vh) */}
          <div
            ref={canvasRef}
            className="absolute top-0 left-0 w-[400vw] h-[400vh]"
            style={{ willChange: "transform" }}
          >
            {/* Background Texture grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #8B5E3C 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* The Trail Line (SVG connecting waypoints via pure CSS curves) */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
            >
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C9A96E" />
                </marker>
              </defs>
              <path
                d="M 50 50 C 100 50, 100 100, 150 100"
                fill="none"
                stroke="#C9A96E"
                vectorEffect="non-scaling-stroke"
                strokeWidth="4"
                strokeDasharray="20 20"
                strokeLinecap="round"
                className="opacity-70 animate-dash-flow"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 150 100 C 205 100, 205 200, 260 200"
                fill="none"
                stroke="#C9A96E"
                vectorEffect="non-scaling-stroke"
                strokeWidth="4"
                strokeDasharray="20 20"
                strokeLinecap="round"
                className="opacity-70 animate-dash-flow"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 260 200 C 290 200, 290 300, 320 300"
                fill="none"
                stroke="#C9A96E"
                vectorEffect="non-scaling-stroke"
                strokeWidth="4"
                strokeDasharray="20 20"
                strokeLinecap="round"
                className="opacity-70 animate-dash-flow"
                markerEnd="url(#arrow)"
              />
            </svg>

            {/* Waypoints */}
            {WAYPOINTS.map((wp, i) => (
              <div
                key={wp.id}
                className="absolute w-64 -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: wp.cx, top: wp.cy }}
              >
                {/* Glowing ring */}
                <div
                  className={`absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[${safeStep >= i ? "#C9A96E" : "rgba(139,94,60,0.2)"
                    }] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 bg-[#C9A96E]/5 blur-lg`}
                />

                {/* Marker Dot */}
                <div className="mx-auto w-4 h-4 rounded-full bg-[#8B5E3C] border-2 border-white shadow-lg relative z-10" />

                {/* Label glassmorphic card - Animated Floating Billboard */}
                <AnimatePresence>
                  {safeStep === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: wp.cardAlign === "left" ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: [0, -8, 0] }}
                      exit={{ opacity: 0, scale: 0.9, x: wp.cardAlign === "left" ? 20 : -20 }}
                      transition={{
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4, type: "spring" },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className={`absolute top-1/2 -translate-y-1/2 max-md:top-[calc(50%+50px)] max-md:translate-y-0 max-md:left-[50%] ${wp.mobileM} max-md:right-auto max-md:origin-top ${wp.cardAlign === "left"
                        ? "right-[calc(50%+60px)] origin-right"
                        : "left-[calc(50%+60px)] origin-left"
                        } ${wp.cardWidth} bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto z-50`}
                    >
                      {/* Image block */}
                      <div className="w-full h-32 md:h-40 relative">
                        <Image src={wp.image} alt={wp.label} fill sizes="420px" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                      </div>
                      {/* Text block */}
                      <div className="p-5 md:p-6 bg-white flex flex-col justify-center">
                        <h3 className="font-display text-2xl text-[#1a1a1a] leading-tight">{wp.label}</h3>
                        <p className="font-body text-[10px] tracking-widest text-[#C9A96E] uppercase mt-1 mb-3">{wp.sub}</p>
                        <p className="font-body text-xs text-[#8B5E3C]/80 leading-relaxed">{wp.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* THE CAPYBARA (Our Character) */}
            <div
              ref={capyRef}
              className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center filter drop-shadow-2xl"
              style={{ left: WAYPOINTS[0].cx, top: WAYPOINTS[0].cy }}
            >
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#8B5E3C]">
                <span className="text-2xl" role="img" aria-label="capybara">
                  🦫
                </span>
                {/* Floating "You" bubble */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest pointer-events-none">
                  You
                </div>
              </div>
            </div>

            {/* Decorative Landscape elements */}
            <div className="absolute left-[120vw] top-[30vh] w-[40vw] h-[40vh] bg-gradient-to-br from-[#8B5E3C]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute left-[220vw] top-[150vh] w-[60vw] h-[60vh] bg-gradient-to-tr from-[#14233D]/5 to-transparent rounded-[100px] blur-3xl transform rotate-45" />

            {/* Massive Watermarks */}
            <div className="absolute left-[80vw] top-[70vh] -translate-x-1/2 pointer-events-none select-none origin-center rotate-12">
              <p className="font-display text-[22vw] max-md:text-[45vw] text-[#8B5E3C]/[0.03] leading-none">
                CAPEYBARA
              </p>
            </div>

            <div className="absolute left-[290vw] top-[260vh] -translate-x-1/2 pointer-events-none select-none origin-bottom-left -rotate-6">
              <p className="font-display text-[25vw] max-md:text-[50vw] text-[#C9A96E]/5 leading-none">
                CAFE
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK FACE: REALITY (GOOGLE MAP & CONTACT)
        ========================================================= */}
        <div
          className="absolute inset-0 w-full h-full bg-[#1a1a1a] flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            // The back face is rotated 180deg initially so it points away
            transform: "rotateY(180deg)",
          }}
        >
          {/* We only render the heavy iframe if we are close to or at step 4/5 */}
          {safeStep >= 3 && (
            <iframe
              title="CapeyBara Café Real Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14889.276696408685!2d72.78940737597654!3d21.141831699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e5947f68e1f%3A0x68c6f380c4fbf45e!2sVesu%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14233D] via-[#14233D]/80 to-transparent" />

          {/* Real world info that fades/translates in on step 5 */}
          <div
            ref={realWorldContentRef}
            className="relative w-full h-full max-w-5xl mx-auto px-6 py-24 flex flex-col justify-end pb-32"
          >
            <div className="opacity-0 translate-y-8">
              <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4">
                — Reality Check
              </p>
              <h2 className="font-display font-light text-white text-6xl max-md:text-5xl md:text-8xl leading-none">
                Here we <em className="text-[#C9A96E]">are.</em>
              </h2>
              <p className="text-white/60 font-body text-base mt-6 max-w-sm">
                Near Vesu Main Road, Surat, Gujarat 395007.
                <br />
                Open 7 days a week, 8:00 AM – 11:00 PM.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap max-md:flex-col gap-4 opacity-0 translate-y-8">
              <a
                href="https://maps.google.com/?q=Vesu+Main+Road+Surat+Gujarat"
                target="_blank"
                rel="noreferrer"
                className="max-md:w-full max-md:text-center font-body text-[11px] tracking-[0.25em] uppercase px-8 py-4 rounded-full bg-[#C9A96E] text-white hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300 shadow-[0_0_40px_rgba(201,169,110,0.3)]"
              >
                Open Google Maps
              </a>
              <a
                href="tel:+919876543210"
                className="max-md:w-full max-md:text-center font-body text-[11px] tracking-[0.25em] uppercase px-8 py-4 rounded-full border border-white/20 text-white hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-colors duration-300"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
