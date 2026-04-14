"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 10:00 PM" },
  { day: "Saturday",        time: "9:00 AM – 11:00 PM" },
  { day: "Sunday",          time: "9:00 AM – 11:00 PM" },
];

export function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power2.out",
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="visit" className="bg-cream py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: info ───────────────────────────────── */}
          <div>
            <motion.p
              className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Find Us
            </motion.p>

            <motion.h2
              className="font-display text-5xl md:text-6xl text-charcoal tracking-tight leading-tight mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              Come Visit
              <br />
              <em className="text-charcoal">Us Today</em>
            </motion.h2>

            {/* Address */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase font-body text-gold mb-3">Address</p>
              <p className="font-display text-2xl text-charcoal leading-snug">
                Near Vesu Main Road,
                <br />Surat, Gujarat 395007
              </p>
            </motion.div>

            <div ref={(el) => { lineRefs.current[0] = el; }} className="h-px bg-cream-dark mb-10 origin-left" />

            {/* Hours */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase font-body text-gold mb-6">Hours</p>
              <div className="flex flex-col gap-0">
                {HOURS.map((h, i) => (
                  <div key={h.day}>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-body text-charcoal/65 text-sm">{h.day}</span>
                      <span className="font-display text-charcoal text-lg">{h.time}</span>
                    </div>
                    <div ref={(el) => { lineRefs.current[i + 1] = el; }} className="h-px bg-cream-dark origin-left" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase font-body text-gold mb-4">Get in Touch</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/capeybara.srt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-body text-sm text-charcoal hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  @capeybara.srt on Instagram
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold">↗</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="font-body text-sm text-charcoal hover:text-gold transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right: branded card ───────────────────────── */}
          <div className="flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-[420px] aspect-square bg-cream rounded-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Dot-grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, #C9A96E 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center">
                <img src="/logo.jpg" alt="CapeyBara" className="w-24 h-24 rounded-full mb-8 border-2 border-gold/40 shadow-xl" />
                <p className="font-display text-charcoal text-3xl mb-1">CapeyBara</p>
                <p className="font-body text-gold text-[9px] tracking-[0.35em] uppercase mb-10">
                  Café · Sorbet · More
                </p>
                <div className="border-t border-charcoal/ pt-6 w-full">
                  <p className="font-body text-charcoal/ text-xs leading-relaxed">
                    Near Vesu Main Road<br />Surat, Gujarat 395007
                  </p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-gold/50" />
              <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-gold/50" />
              <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-gold/50" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-gold/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
