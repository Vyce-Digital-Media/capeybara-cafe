"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`overflow-hidden rounded-3xl border border-border bg-muted/25 p-8 shadow-xl backdrop-blur-sm md:p-14 ${className}`}
    >
      {children}
    </div>
  );
}
