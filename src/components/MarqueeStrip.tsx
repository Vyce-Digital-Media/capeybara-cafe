"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    end: 50,
    label: "Cups Served Daily",
    suffix: "K+",
    description: "Freshly brewed moments, one cup at a time",
    icon: "☕",
    color: "from-amber-400/20 to-gold/5",
  },
  {
    end: 4,
    label: "Years of Craft",
    suffix: "+",
    description: "Perfecting our art since day one",
    icon: "🏆",
    color: "from-yellow-400/20 to-gold/5",
  },
  {
    end: 25,
    label: "Menu Creations",
    suffix: "+",
    description: "Unique flavours crafted for every palate",
    icon: "🍽️",
    color: "from-orange-400/20 to-gold/5",
  },
  {
    end: 5,
    label: "Customer Rating",
    suffix: ".0★",
    description: "Consistently five-star experiences",
    icon: "⭐",
    color: "from-gold/30 to-gold/5",
  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const span = spanRef.current;
    if (!span) return;

    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      span.textContent = String(Math.floor(eased * stat.end));
      if (progress < 1) requestAnimationFrame(tick);
      else span.textContent = String(stat.end);
    };

    requestAnimationFrame(tick);
  }, [inView, stat.end]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-default"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Card background */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-charcoal/[0.06] bg-cream/60 backdrop-blur-sm p-6 md:p-10 h-full transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-[0_30px_80px_rgba(212,168,83,0.12)]">

        {/* Radial gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl`} />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-all duration-[900ms] ease-in-out"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(212,168,83,0.12) 50%, transparent 70%)" }}
        />

        {/* Icon */}
        <motion.div
          className="absolute top-4 right-4 md:top-8 md:right-8 text-2xl md:text-3xl opacity-20 group-hover:opacity-80 group-hover:scale-110"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {stat.icon}
        </motion.div>

        {/* Counter */}
        <div className="relative z-10">
          <p className="font-display leading-none mb-1 md:mb-2 transition-colors duration-500 group-hover:text-gold"
            style={{ fontSize: "clamp(3rem, 5vw, 7rem)", color: "inherit" }}
          >
            <span ref={spanRef} className="tabular-nums text-charcoal group-hover:text-gold transition-colors duration-500">
              0
            </span>
            <span className="text-gold" style={{ fontSize: "clamp(1.5rem, 2.5vw, 4.5rem)" }}>
              {stat.suffix}
            </span>
          </p>

          {/* Animated underline */}
          <motion.div
            className="h-px md:h-0.5 bg-gradient-to-r from-gold to-gold/30 mb-3 md:mb-4"
            initial={{ width: 0 }}
            animate={inView ? { width: "40px" } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
          />

          <p className="font-body text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-stone mb-2 md:mb-3 group-hover:text-charcoal transition-colors duration-500 line-clamp-1">
            {stat.label}
          </p>

          <p className="font-body text-charcoal/40 text-[10px] md:text-xs leading-relaxed group-hover:text-charcoal/70 transition-colors duration-500 max-w-[200px] line-clamp-2 md:line-clamp-none hidden sm:block">
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="bg-ivory h-full flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background texture dots */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(212,168,83,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/4 rounded-full blur-[120px] pointer-events-none" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-gold text-[9px] tracking-[0.55em] uppercase font-body mb-4"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            By The Numbers
          </motion.p>
          <motion.h2
            className="font-display font-light text-charcoal tracking-tight leading-none"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Our Story <em className="text-gold">in Numbers</em>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
