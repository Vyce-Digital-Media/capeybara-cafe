"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "4+",   label: "Years of Excellence" },
  { value: "50K+", label: "Cups Served"          },
  { value: "25+",  label: "Menu Creations"       },
  { value: "10K+", label: "Happy Visitors"       },
];

const wordVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const PARA1 = "Born from a love for great coffee and meaningful spaces, CapeyBara opened its doors in Surat with a single dream — to create a place where time slows down and every sip becomes a memory.";
const PARA2 = "We source our beans from ethical farms across the world, pair them with artisan-crafted sorbets and seasonal treats, and serve everything with genuine warmth and care.";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax depth on the about image
    gsap.fromTo(
      imageRef.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      }
    );

    // Gold divider line draw-in
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: lineRef.current, start: "top 88%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative bg-ivory py-28 md:py-40 overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute top-0 right-0 text-[18vw] font-display text-charcoal-dark/50 leading-none select-none pointer-events-none pr-6 -translate-y-8">
        Story
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.p
          className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.p>

        {/* Gold line */}
        <div ref={lineRef} className="h-px bg-gold mb-16 origin-left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: image ─────────────────────────────── */}
          <motion.div
            className="relative h-[480px] md:h-[620px] overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div ref={imageRef} className="absolute inset-0 scale-110">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=85"
                alt="Coffee being crafted at CapeyBara"
                fill
                className="object-cover"
              />
            </div>
            {/* Inner gold border */}
            <div className="absolute inset-3 border border-gold/30 rounded-sm pointer-events-none z-10" />
          </motion.div>

          {/* ── Right: text ──────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <motion.h2
              className="font-display text-5xl md:text-6xl text-charcoal leading-tight tracking-tight mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              A Story Brewed
              <br />
              <em className="text-charcoal">with Passion</em>
            </motion.h2>

            {/* Word-by-word paragraph 1 */}
            <div className="font-body text-charcoal/65 text-[15px] leading-relaxed mb-7 flex flex-wrap gap-x-[5px]">
              {PARA1.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </div>

            {/* Word-by-word paragraph 2 */}
            <div className="font-body text-charcoal/65 text-[15px] leading-relaxed mb-14 flex flex-wrap gap-x-[5px]">
              {PARA2.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 border-t border-charcoal-dark pt-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <p className="font-display text-4xl text-charcoal">{s.value}</p>
                  <p className="font-body text-[10px] text-charcoal/45 tracking-[0.18em] uppercase mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
