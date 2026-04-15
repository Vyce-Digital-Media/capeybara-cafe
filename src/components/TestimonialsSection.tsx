"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const REVIEWS = [
  {
    quote: "A cafe that feels like a warm hug. The CapeyBara latte is absolutely divine — I dream about it every morning.",
    name: "Priya Mehta",
    role: "Regular Customer",
    emoji: "☕",
    rating: 5,
  },
  {
    quote: "The atmosphere is stunning and the cold brew is the best I've had in Surat. I'll be back every week without question.",
    name: "Arjun Kapoor",
    role: "Coffee Enthusiast",
    emoji: "🌟",
    rating: 5,
  },
  {
    quote: "From the decor to the last sip — everything feels crafted with genuine love.",
    name: "Meera Shah",
    role: "Food Blogger",
    emoji: "✨",
    rating: 5,
  },
  {
    quote: "I've been to cafés across India and CapeyBara stands apart. The sorbet selection alone is worth the trip to Surat.",
    name: "Rohan Desai",
    role: "Travel Writer",
    emoji: "🗺️",
    rating: 5,
  },
  {
    quote: "The perfect blend of aesthetics and taste. Every corner of this place begs to be photographed.",
    name: "Ananya Patel",
    role: "Lifestyle Creator",
    emoji: "📸",
    rating: 5,
  },
  {
    quote: "CapeyBara is my go-to spot for client meetings. The ambience says everything about quality without a word spoken.",
    name: "Vikram Nair",
    role: "Entrepreneur",
    emoji: "💼",
    rating: 5,
  },
];

// Triple so translateX(-33.333%) = exactly one full revolution
const ROW_A = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const ROW_B = [...REVIEWS, ...REVIEWS, ...REVIEWS];

function TiltCard({ review }: { review: typeof REVIEWS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-80 mx-3 relative cursor-pointer group"
    >
      {/* Glowing border on hover */}
      <motion.div
        className="absolute -inset-px rounded-3xl"
        animate={{
          background: hovered
            ? "linear-gradient(135deg, rgba(212,168,83,0.6), rgba(212,168,83,0.1), rgba(212,168,83,0.4))"
            : "linear-gradient(135deg, rgba(212,168,83,0), rgba(212,168,83,0), rgba(212,168,83,0))",
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative bg-cream/80 backdrop-blur-sm border border-charcoal/[0.08] rounded-3xl p-6 overflow-hidden">
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={hovered ? { translateX: "200%" } : { translateX: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(212,168,83,0.15) 50%, transparent 70%)",
          }}
        />

        {/* Emoji badge */}
        <motion.div
          className="absolute top-5 right-5 w-10 h-10 bg-gold/10 rounded-2xl flex items-center justify-center text-lg border border-gold/20"
          animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {review.emoji}
        </motion.div>

        {/* Giant quote mark */}
        <p className="font-display text-[80px] text-gold/10 leading-none select-none absolute -top-3 -left-2">
          &ldquo;
        </p>

        {/* Stars */}
        <div className="flex gap-1 mb-3 relative z-10 pt-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-gold text-sm">★</span>
          ))}
        </div>

        <p className="font-body text-charcoal text-sm leading-relaxed mb-5 relative z-10">
          {review.quote}
        </p>

        <motion.div
          className="flex items-center gap-3 relative z-10"
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-charcoal text-sm">{review.name[0]}</span>
          </div>
          <div>
            <p className="font-body text-charcoal text-xs font-semibold">{review.name}</p>
            <p className="font-body text-stone text-[10px] tracking-[0.2em] uppercase mt-0.5">{review.role}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: scroll-left  38s linear infinite; }
        .marquee-right { animation: scroll-right 34s linear infinite; }
        .marquee-row:hover .marquee-left,
        .marquee-row:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <section className="bg-ivory h-full flex flex-col justify-center overflow-hidden relative">
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/8 rounded-full blur-[120px]" />
        </div>

        {/* ── Watermark (Behind Title) ─────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <p className="font-display text-[22vw] text-charcoal/[0.03] leading-none whitespace-nowrap">
            CapeyBara
          </p>
        </div>

        {/* Section header */}
        <div ref={titleRef} className="text-center mb-6 px-6 relative z-10 pt-12 md:pt-30">
          <motion.h2
            className="font-display font-light text-charcoal leading-none tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What Our Guests
            <em className="text-gold"> Say About Us</em>
          </motion.h2>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3"
            initial={{ width: 0 }}
            animate={inView ? { width: "160px" } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </div>

        {/* Row A — scrolls left (right → left) */}
        <div className="marquee-row overflow-hidden mb-3 py-2">
          <div className="marquee-left flex" style={{ width: "max-content" }}>
            {ROW_A.map((r, i) => (
              <TiltCard key={`a-${i}`} review={r} />
            ))}
          </div>
        </div>

        {/* Row B — scrolls right (left → right) */}
        <div className="marquee-row overflow-hidden py-2 pb-6 md:pb-10">
          <div className="marquee-right flex" style={{ width: "max-content" }}>
            {ROW_B.map((r, i) => (
              <TiltCard key={`b-${i}`} review={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
