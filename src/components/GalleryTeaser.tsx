"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const GALLERY_ITEMS = [
  { src: "/1.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video1.mp4", alt: "Premium brewing", type: "video" },
  { src: "/2.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video2.mp4", alt: "Barista craft", type: "video" },
  { src: "/3.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video3.mp4", alt: "Coffee details", type: "video" },
  { src: "/4.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video4.mp4", alt: "Coffee details", type: "video" },
  { src: "/5.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video5.mp4", alt: "Coffee details", type: "video" },
  { src: "/6.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/video6.mp4", alt: "Coffee details", type: "video" },
  { src: "/7.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/8.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/9.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/10.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/11.jpg", alt: "Coffee flat-lay", type: "image" },
  { src: "/12.jpg", alt: "Coffee flat-lay", type: "image" },
];

export function GalleryTeaser() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const velRef = useRef(0);
  const lastX = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Card dimensions
  const CARD_W = 220;
  const CARD_MARGIN = 16;
  const STEP = CARD_W + CARD_MARGIN;
  const totalW = GALLERY_ITEMS.length * STEP;

  const setOffset = useCallback((v: number) => {
    // Infinite loop: wrap around
    let next = v;
    while (next > 0) next -= totalW;
    while (next < -totalW * 2) next += totalW;
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${next}px)`;
    }
  }, [totalW]);

  const [isHovered, setIsHovered] = useState(false);
  const speedRef = useRef(2.2); // Normal optimal speed

  // Unified loop for Auto-drift & Drag-momentum
  useEffect(() => {
    let raf: number;
    const loop = () => {
      if (!isDragging.current) {
        if (Math.abs(velRef.current) > 0.5) {
          // Apply inertia if there's velocity from dragging
          velRef.current *= 0.94;
          setOffset(offsetRef.current + velRef.current);
        } else {
          // Normal auto-drift
          velRef.current = 0;
          const targetSpeed = isHovered ? 0.8 : 2.2;
          speedRef.current += (targetSpeed - speedRef.current) * 0.1; // Smooth interpolate speed
          setOffset(offsetRef.current - speedRef.current);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, setOffset]);

  const onDown = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX - offsetRef.current;
    lastX.current = clientX;
    velRef.current = 0;
  };

  const onMove = (clientX: number) => {
    if (!isDragging.current) return;
    velRef.current = clientX - lastX.current;
    lastX.current = clientX;
    setOffset(clientX - startX.current);
  };

  const onUp = () => {
    isDragging.current = false;
  };

  return (
    <section className="relative bg-ivory py-20 md:py-28 overflow-hidden h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <motion.p className="text-gold text-[9px] tracking-[0.55em] uppercase font-body mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Visual Stories
          </motion.p>
          <motion.h2 className="font-display text-5xl md:text-6xl text-charcoal leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}>
            Life at<br /><em className="text-gold">CapeyBara</em>
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link href="/#" id="gallery-teaser-cta"
            className="group inline-flex items-center gap-2 font-body text-[10px] tracking-[0.22em] uppercase text-charcoal hover:text-gold border-b border-charcoal/20 hover:border-gold pb-1 transition-all duration-300">
            See All Photos
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Drag Film Strip */}
      <div
        className="relative cursor-grab active:cursor-grabbing select-none"
        style={{ height: "340px", overflow: "hidden" }}
        onMouseDown={e => onDown(e.clientX)}
        onMouseMove={e => onMove(e.clientX)}
        onMouseUp={onUp}
        onMouseLeave={() => { setIsHovered(false); onUp(); }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={e => onDown(e.touches[0].clientX)}
        onTouchMove={e => onMove(e.touches[0].clientX)}
        onTouchEnd={onUp}
      >
        {/* Left / Right vignette fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="absolute top-0 left-0 flex items-center"
          style={{
            gap: `${CARD_MARGIN}px`,
            height: "340px",
            // Triple the images for seamless looping
            willChange: "transform",
          }}
        >
          {[...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => {
            const isHov = hoveredIdx === i;
            return (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden rounded-lg"
                style={{
                  width: `${CARD_W}px`,
                  height: "300px",
                  transform: `skewY(${isHov ? 0 : 4}deg) scale(${isHov ? 1.06 : 1})`,
                  transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: isHov ? "0 20px 60px rgba(0,0,0,0.12)" : "0 8px 20px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                    style={{
                      transform: isHov ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.6s ease",
                    }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt}
                    draggable="false"
                    className="w-full h-full object-cover pointer-events-none"
                    style={{
                      transform: isHov ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.6s ease",
                    }}
                  />
                )}
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
                    opacity: isHov ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-14 px-6">
        <Link href="/#" id="gallery-full-cta"
          className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.22em] uppercase border border-charcoal/15 hover:border-navy text-charcoal hover:text-navy px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-navy/5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Explore the Full Gallery
        </Link>
      </div>
    </section>
  );
}
