"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const INFO = [
  { label: "Address", value: "Near Vesu Main Road, Surat, Gujarat", icon: "📍" },
  { label: "Hours", value: "Mon – Sun  ·  8 AM – 11 PM", icon: "🕗" },
  { label: "Phone", value: "+91 98765 43210", icon: "📞" },
  { label: "Email", value: "hello@capeybara.in", icon: "✉️" },
];

export function VisitCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream h-full flex flex-col justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(212,168,83,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,168,83,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Dot grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(212,168,83,0.07) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      {/* ── Watermark (Behind Titles) ────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <p className="font-display text-[22vw] text-charcoal/[0.03] leading-none whitespace-nowrap">
          CapeyBara
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-10 md:mt-0">
        <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center">

          {/* Left — editorial text */}
          <div>

            <motion.h2
              className="font-display font-light text-charcoal leading-[0.9] tracking-tight mb-4 md:mb-8 md:mt-24"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              initial={{ opacity: 0, y: 44 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.9 }}
            >
              A place worth<br />
              <em className="text-gold">visiting.</em>
            </motion.h2>

            {/* Info items */}
            <motion.dl
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 md:gap-4 mb-6 md:mb-12"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {INFO.map((row, i) => (
                <motion.div
                  key={row.label}
                  className="flex items-start gap-3 md:gap-4 group p-2 md:p-3 rounded-2xl hover:bg-charcoal/[0.03] transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.6 }}
                >
                  <span className="text-base md:text-lg mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {row.icon}
                  </span>
                  <div>
                    <dt className="font-body text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.35em] uppercase text-stone mb-0.5 mt-[2px] md:mt-0">
                      {row.label}
                    </dt>
                    <dd className="font-body text-charcoal text-xs md:text-sm line-clamp-1 md:line-clamp-none">{row.value}</dd>
                  </div>
                </motion.div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/#"
                id="visit-cta-btn"
                className="group relative overflow-hidden mb-6 md:mb-8 inline-flex items-center gap-2 md:gap-3 bg-charcoal text-ivory text-[9px] md:text-[10px] tracking-[0.28em] uppercase px-8 md:px-12 py-3 md:py-4 rounded-full font-body shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105"
              >
                {/* Ripple fill */}
                <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
                <span className="relative z-10 font-semibold">Plan Your Visit</span>
                <motion.span
                  className="relative z-10 text-sm md:text-base"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Map card */}
          <motion.div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-charcoal/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.08)] group h-[220px] md:h-[420px]"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 1 }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl md:rounded-tl-3xl z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-gold/40 rounded-br-2xl md:rounded-br-3xl z-20 pointer-events-none" />

            <iframe
              title="CapeyBara Café Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.9!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEzLjAiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(30%) contrast(1.05) sepia(10%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-ivory/95 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-t border-charcoal/[0.05]">
              <div>
                <p className="font-body text-charcoal text-[10px] md:text-xs font-semibold">CapeyBara Café</p>
                <p className="font-body text-stone text-[8px] md:text-[10px] tracking-wide">Vesu, Surat · Gujarat</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link font-body text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-gold hover:text-charcoal transition-colors flex items-center gap-1"
              >
                Open Maps
                <motion.span
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↗
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
