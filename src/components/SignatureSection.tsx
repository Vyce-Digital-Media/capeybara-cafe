"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    num: "01",
    name: "CapeyBara Signature",
    desc: "House espresso · caramelised vanilla cold foam · whisper of cardamom. A deeply rich and balanced signature drink.",
    price: "₹220",
    tag: "Best Seller",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200", // Signature coffee
  },
  {
    num: "02",
    name: "Mango Cold Brew",
    desc: "Sun-ripened mango infused 24-hour slow-steeped cold brew · hand-chipped ice. Summer captured in a glass.",
    price: "₹280",
    tag: "Seasonal",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200", // Cold brew / iced drink
  },
  {
    num: "03",
    name: "Rose Gold Matcha",
    desc: "Ceremonial matcha · oat milk · rose water · edible gold dust. Earthy, floral, and undeniably luxurious.",
    price: "₹260",
    tag: "New",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200", // Matcha
  },
  {
    num: "04",
    name: "Dark Velvet Espresso",
    desc: "Double shot · Venezuelan cacao · smoked salt · orange zest. A complex dark chocolate experience with bright citrus notes.",
    price: "₹240",
    tag: "",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200", // Dark Espresso
  },
];

function SignatureCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  // 3D tilt on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(e.clientY / rect.height - rect.top / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <div
      className="w-full max-w-[1200px] mx-auto px-4 md:px-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[28px] border border-charcoal/5 bg-cream p-8 md:p-14 min-h-[250px] transition-all duration-700 hover:border-gold/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center"
      >
        <div className="absolute -inset-[20%] z-0 bg-gradient-to-br from-cream to-ivory pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />

        {/* Animated glow */}
        <div
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isEven ? "20% 50%" : "80% 50%"}, rgba(212,168,83,0.12) 0%, transparent 60%)`,
          }}
        />

        {/* Hover Reveal Image */}
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-[28px]">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out scale-110 group-hover:scale-100"
          />
          {/* Dark Overlay to make text readable on hover */}
          <div className="absolute inset-0 bg-charcoal/80 transition-colors duration-700" />
        </div>

        {/* Sweeping light */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-charcoal/[0.03] to-transparent skew-x-[-25deg] z-0 group-hover:opacity-0 transition-opacity duration-500"
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 w-full items-center justify-between">
          <div className="flex flex-col items-start gap-4 flex-1">
            <span className="font-display font-black text-[5rem] leading-none text-charcoal/[0.04] group-hover:text-white/[0.06] transition-colors duration-700 md:text-[7rem] absolute -top-4 -left-4 md:top-4 md:left-4 select-none">
              {item.num}
            </span>
            <div className="flex items-center gap-3 mt-12 md:mt-0 relative z-10">
              <h3 className="font-display text-4xl md:text-5xl text-charcoal tracking-tight group-hover:text-ivory transition-colors duration-700">
                {item.name}
              </h3>
              {item.tag && (
                <span className="text-[8px] tracking-[0.2em] uppercase font-body bg-gold/10 text-gold px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-md">
                  {item.tag}
                </span>
              )}
            </div>
            <p className="font-body text-stone text-sm md:text-base leading-relaxed max-w-md relative z-10 group-hover:text-ivory/80 transition-colors duration-700">
              {item.desc}
            </p>
          </div>

          <div className="w-full md:w-px md:h-24 bg-gradient-to-b from-transparent via-black/10 group-hover:via-white/20 to-transparent transition-colors duration-700 my-4 md:my-0 md:mx-6" />

          <div className="flex flex-col items-center justify-center min-w-[150px]">
            <span className="font-display text-4xl md:text-5xl text-gold group-hover:scale-110 transition-transform duration-500 origin-center drop-shadow-[0_0_15px_rgba(212,168,83,0)] group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.4)]">
              {item.price}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SignatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.deck-card');

      // Desktop pinning animation
      if (window.innerWidth > 768) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 12%",
            end: `+=${cards.length * 85}%`,
            pin: true,
            scrub: 1,
          }
        });

        cards.forEach((card, i) => {
          if (i > 0) {
            tl.addLabel(`card-${i}`);
            tl.from(card, {
              y: window.innerHeight,
              ease: "power2.out"
            }, `card-${i}`);

            for (let j = 0; j < i; j++) {
              tl.to(cards[j], {
                scale: "-=0.05",
                y: "-=25",
                opacity: "-=0.15",
                ease: "power2.out"
              }, `card-${i}`);
            }
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" className="bg-ivory pt-16 md:pt-24 overflow-hidden border-y border-charcoal/[0.05]">
      <div ref={containerRef} className="relative w-full">
        {/* Title Node */}
        <div className="mb-16 flex flex-col items-center justify-center w-full text-center relative px-6">
          <motion.p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4 mt-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Crafted for You
          </motion.p>
          <motion.h2 className="font-display text-5xl md:text-7xl text-charcoal tracking-tight leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}>
            Signature <em className="text-gold-light">Creations</em>
          </motion.h2>
        </div>

        {/* Pinned Stacking Cards Layer */}
        <div className="relative md:h-[65vh] w-full mt-8 md:mt-0 px-4 md:px-0 flex flex-col md:block gap-8 md:gap-0">
          {ITEMS.map((item, index) => (
            <div
              key={item.num}
              className="deck-card md:absolute w-full top-0 left-0"
              style={{ zIndex: index + 1 }}
            >
              <SignatureCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="pb-16 flex justify-center w-full relative">
        <Link href="/menu" id="sig-full-menu-cta"
          className="group relative overflow-hidden border border-charcoal/10 hover:border-gold bg-white text-charcoal text-[10px] tracking-[0.28em] uppercase px-12 py-5 rounded-full font-body transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-white shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
          <span className="relative z-10 font-bold">Explore Full Menu</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg]" />
        </Link>
      </div>
    </section>
  );
}
