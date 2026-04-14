"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 50, suffix: "K+",  label: "Cups Served",     display: (n: number) => `${n}K+`  },
  { end: 4,  suffix: "+",   label: "Years of Craft",  display: (n: number) => `${n}+`   },
  { end: 25, suffix: "+",   label: "Menu Creations",  display: (n: number) => `${n}+`   },
  { end: 5,  suffix: ".0★", label: "Customer Rating", display: (n: number) => `${n}.0★` },
];

export function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    STATS.forEach((stat, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.end,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
        onUpdate() { el.textContent = stat.display(Math.floor(obj.val)); },
        onComplete() { el.textContent = stat.display(stat.end); },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-ivory border-y border-charcoal/[0.05] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group relative p-4 transition-colors duration-500 hover:bg-black/[0.02] rounded-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <p className="font-display text-5xl md:text-6xl text-charcoal leading-none mb-3 transition-colors duration-500 group-hover:text-gold drop-shadow-[0_0_0px_rgba(212,168,83,0)] group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.5)]">
                <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
              </p>
              <div className="h-px w-0 group-hover:w-16 bg-gold mx-auto transition-all duration-700 ease-out mb-3" />
              <p className="font-body text-[10px] tracking-[0.32em] uppercase text-stone transition-colors duration-500 group-hover:text-charcoal">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
