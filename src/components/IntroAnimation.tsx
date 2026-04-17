"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(TextPlugin);

interface Props { onComplete: () => void; }

export function IntroAnimation({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Handle cached image already loaded
  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useGSAP(() => {
    // We start immediately to avoid a blank 'ivory' screen. 
    // Measurement functions for the flight sequence are handled lazily by GSAP.
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, taglineRef.current], { opacity: 0, y: 28 });
      gsap.set("#nav-logo", { opacity: 0 });

      const tl = gsap.timeline();

      // Ensure overlay is solid, then start
      tl.set(overlayRef.current, { opacity: 1 });

      // Logo — bigger now, fades up
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

      // Add cursor and type text
      tl.call(() => { textRef.current?.classList.add("typing-cursor"); });
      tl.to(textRef.current,
        { duration: 1.8, text: { value: "CapeyBara", delimiter: "" }, ease: "none" },
        "+=0.08"
      );

      // Tagline
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5");

      // Hold
      tl.to({}, { duration: 0.9 });

      // Remove cursor then fade text ONLY
      tl.call(() => { textRef.current?.classList.remove("typing-cursor"); });
      tl.to([textRef.current, taglineRef.current], { opacity: 0, y: -30, duration: 0.6, ease: "power2.in" });

      // Logo flies to Navbar exactly
      tl.to(logoRef.current, {
        duration: 1.2,
        ease: "power2.inOut",
        x: () => {
          const target = document.querySelector("#nav-logo div");
          const logoEl = logoRef.current;
          if (!target || !logoEl) return 0;
          const dest = target.getBoundingClientRect();
          const src = logoEl.getBoundingClientRect();
          return dest.left + dest.width / 2 - (src.left + src.width / 2);
        },
        y: () => {
          const target = document.querySelector("#nav-logo div");
          const logoEl = logoRef.current;
          if (!target || !logoEl) return -100;
          const dest = target.getBoundingClientRect();
          const src = logoEl.getBoundingClientRect();
          // Safety: avoid values that result in the logo being completely off-screen in weird ways
          const val = dest.top + dest.height / 2 - (src.top + src.height / 2);
          return isNaN(val) ? -100 : val;
        },
        scale: () => {
          const target = document.querySelector("#nav-logo div");
          const logoEl = logoRef.current;
          if (!target || !logoEl) return 0.2; // Fallback scale
          const dest = target.getBoundingClientRect();
          const src = logoEl.getBoundingClientRect();
          if (src.width === 0) return 0.2;
          return dest.width / src.width;
        }
      }, "-=0.6");

      // Overlay fades — site becomes visible
      tl.to(overlayRef.current, {
        opacity: 0, duration: 1.0, ease: "power2.inOut",
        onStart: () => {
          // Reveal the actual navbar logo halfway through the fade
          gsap.to("#nav-logo", { opacity: 1, duration: 0.5, delay: 0.2 });
        },
        onComplete: () => {
          onCompleteRef.current();
        },
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, { dependencies: [imageLoaded], scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-ivory" />

      {/* Centered text group */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
      >
        {/* Logo — large and glowing */}
        <div ref={logoRef} className="mb-10 relative opacity-0">
          {/* Back light glow orb */}
          <div className="hidden md:block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-64 h-64 bg-gold/20 blur-[60px] rounded-full pointer-events-none" />
          <Image
            ref={imgRef}
            src="/logo.jpg"
            alt="CapeyBara"
            width={176}
            height={176}
            priority
            onLoad={() => setImageLoaded(true)}
            className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full border border-gold/30 shadow-[0_0_80px_rgba(212,168,83,0.3)] object-cover"
          />
        </div>

        {/* Typed text */}
        <div
          ref={textRef}
          className="text-charcoal font-display text-[14vw] md:text-[9vw] lg:text-[7vw] leading-none tracking-tight"
        />

        {/* Tagline */}
        <p ref={taglineRef} className="mt-12 text-gold text-[10px] md:text-xs tracking-[0.42em] uppercase font-body opacity-0">
          Café · Coffee · More
        </p>
      </div>
    </div>
  );
}

