"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const REVIEWS = [
  {
    quote: "A cafe that feels like a warm hug. The CapeyBara latte is absolutely divine — I dream about it every morning.",
    name: "Priya Mehta",
    role: "Regular Customer",
  },
  {
    quote: "The atmosphere is stunning and the cold brew is the best I've had in Surat. I'll be back every week without question.",
    name: "Arjun Kapoor",
    role: "Coffee Enthusiast",
  },
  {
    quote: "From the decor to the last sip — everything feels crafted with genuine love. CapeyBara is truly something special.",
    name: "Meera Shah",
    role: "Food Blogger",
  },
  {
    quote: "I've been to cafés across India and CapeyBara stands apart. The sorbet selection alone is worth the trip to Surat.",
    name: "Rohan Desai",
    role: "Travel Writer",
  },
  {
    quote: "The perfect blend of aesthetics and taste. Every corner of this place begs to be photographed and every sip to be savoured.",
    name: "Ananya Patel",
    role: "Lifestyle Creator",
  },
  {
    quote: "CapeyBara is my go-to spot for client meetings. The ambience says everything about quality without a word spoken.",
    name: "Vikram Nair",
    role: "Entrepreneur",
  },
];

// Duplicate for seamless loop
const ROW_A = [...REVIEWS, ...REVIEWS];
const ROW_B = [...REVIEWS.slice(3), ...REVIEWS.slice(0, 3), ...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)];

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 mx-3 p-7 bg-cream border border-charcoal/[0.06] rounded-2xl group hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
      <p className="font-display text-charcoal/[0.06] text-6xl leading-none mb-2 select-none">&ldquo;</p>
      <p className="font-body text-charcoal text-sm leading-relaxed mb-6 -mt-3">
        {review.quote}
      </p>
      <div className="h-px w-10 bg-gold mb-5" />
      <p className="font-body text-charcoal text-xs font-semibold">{review.name}</p>
      <p className="font-body text-stone text-[10px] tracking-[0.18em] uppercase mt-0.5">{review.role}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Row A — scroll left
    gsap.to(rowARef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    // Row B — scroll right
    gsap.fromTo(rowBRef.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 28,
        repeat: -1,
      }
    );
  });

  return (
    <section className="bg-ivory py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 text-center">
        <p className="text-gold text-[9px] tracking-[0.55em] uppercase font-body mb-4">Kind Words</p>
        <h2 className="font-display font-light text-charcoal text-4xl md:text-5xl leading-none tracking-tight">
          What Our Guests Say
        </h2>
      </div>

      {/* Row A — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div ref={rowARef} className="flex" style={{ width: "max-content" }}>
          {ROW_A.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      {/* Row B — scrolls right */}
      <div className="overflow-hidden">
        <div ref={rowBRef} className="flex" style={{ width: "max-content" }}>
          {ROW_B.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>
    </section>
  );
}
