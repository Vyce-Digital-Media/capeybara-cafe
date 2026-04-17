"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PARA =
  "Born from a love for great coffee and meaningful spaces, CapeyBara opened its doors in Surat with a single dream — to create a place where time slows down and every sip becomes a memory.";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  // Scroll-driven vertical line tracking
  const { scrollYProgress: processScroll } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 20%"],
  });
  const lineScaleY = useTransform(processScroll, [0, 1], [0, 1]);

  useGSAP(() => {
    // Subtle parallax
    gsap.fromTo(imageRef.current,
      { yPercent: -6 },
      { yPercent: 6, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 } }
    );
    // Gold line draw-in
    gsap.from(lineRef.current, {
      scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out",
      scrollTrigger: { trigger: lineRef.current, start: "top 88%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-ivory py-28 md:py-40 max-md:py-16 overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-0 right-0 text-[18vw] max-md:text-[28vw] max-md:translate-y-4 font-display text-black/[0.02] leading-none select-none pointer-events-none pr-6 -translate-y-8">
        Story
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Animated vertical line from Vyce */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 hidden w-px bg-black/5 lg:block -ml-8">
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-gold/80 via-gold/30 to-transparent"
          />
        </div>

        <motion.p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-6"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          Our Story
        </motion.p>

        <div ref={lineRef} className="h-px bg-gold mb-16 origin-left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div className="relative h-[460px] md:h-[580px] max-md:h-[300px] overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -55 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div ref={imageRef} className="absolute inset-0 scale-110">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85"
                alt="Crafting coffee at CapeyBara" fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-3 border border-gold/30 rounded-sm pointer-events-none z-10" />
          </motion.div>

          {/* Text */}
          <div className="relative">
            <motion.h2 className="font-display text-5xl md:text-6xl max-md:text-4xl text-charcoal leading-tight tracking-tight mb-8 max-md:mb-6"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85 }}>
              A Story Brewed
              <br /><em className="text-gold">with Passion</em>
            </motion.h2>

            <div className="flex flex-wrap gap-x-[5px] font-body text-stone text-[16px] leading-relaxed mb-12">
              {PARA.split(" ").map((w, i) => (
                <motion.span key={i} className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ delay: i * 0.025, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  {w}
                </motion.span>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Link
                href="/about"
                id="story-read-more"
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase text-gold border-b border-gold/40 pb-1 hover:border-gold-light hover:text-gold-light transition-all duration-300"
              >
                Read Our Full Story
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
