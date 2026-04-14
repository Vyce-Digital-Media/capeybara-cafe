"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface Props { onComplete: () => void; }

export function IntroAnimation({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, taglineRef.current], { opacity: 0, y: 28 });

      const tl = gsap.timeline();

      tl.from(overlayRef.current, { opacity: 0, duration: 0.5 });

      // Logo — bigger now, fades up
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

      // Type text
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
          if (!target) return 0;
          const dest = target.getBoundingClientRect();
          const src = logoRef.current!.getBoundingClientRect();
          return dest.left + dest.width / 2 - (src.left + src.width / 2);
        },
        y: () => {
          const target = document.querySelector("#nav-logo div");
          if (!target) return -100;
          const dest = target.getBoundingClientRect();
          const src = logoRef.current!.getBoundingClientRect();
          return dest.top + dest.height / 2 - (src.top + src.height / 2);
        },
        scale: () => {
          const target = document.querySelector("#nav-logo div");
          if (!target) return 0;
          const dest = target.getBoundingClientRect();
          const src = logoRef.current!.getBoundingClientRect();
          return dest.width / src.width;
        }
      }, "-=0.6");

      // Overlay fades — site becomes visible
      tl.to(overlayRef.current, {
        opacity: 0, duration: 1.0, ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        },
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-ivory" />

      {/* Centered text group */}
      <div
        ref={textGroupRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
      >
        {/* Logo — large and glowing */}
        <div ref={logoRef} className="mb-10 relative">
          {/* Back light glow orb */}
          <div className="hidden md:block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-64 h-64 bg-gold/20 blur-[60px] rounded-full pointer-events-none" />
          <img
            src="/logo.jpg"
            alt="CapeyBara"
            className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full border border-gold/30 shadow-[0_0_80px_rgba(212,168,83,0.3)]"
          />
        </div>

        {/* Typed text */}
        <div
          ref={textRef}
          className="text-charcoal font-display text-[14vw] md:text-[9vw] lg:text-[7vw] leading-none tracking-tight typing-cursor"
        />

        {/* Tagline */}
        <p ref={taglineRef} className="mt-5 text-gold text-[10px] md:text-xs tracking-[0.42em] uppercase font-body">
          Café · Coffee · More
        </p>
      </div>
    </div>
  );
}

