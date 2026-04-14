"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowUpRight, TrendingUp, Filter, BarChart2, Activity } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Animation Primitives ─────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden flex flex-wrap ${className}`}>
      <motion.div initial={{ y: "100%" }} animate={isInView ? { y: "0%" } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated Number Counter ──────────────────────────────────────────────

function Counter({ from, to, duration, prefix = "", suffix = "" }: { from: number, to: number, duration: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
        }
      });
    }
  }, [isInView, from, to, duration, prefix, suffix]);

  return <span ref={ref}>{prefix}{from}{suffix}</span>;
}

// ─── Ticker Tape ──────────────────────────────────────────────────────────

function Ticker() {
  const tickerItems = (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-6 pr-6">
          LTV/CAC OPTIMIZATION <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
          FUNNEL VELOCITY <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
          MQL TO SQL <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#ff6a00] border-y border-[#ff6a00]/20 py-4 flex text-black">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap text-xs font-black uppercase tracking-[0.3em] w-max"
      >
        <div className="flex items-center">{tickerItems}</div>
        <div className="flex items-center">{tickerItems}</div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export default function DigitalGrowthPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Diagram scroll hook
  const diagramRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: diagramScroll } = useScroll({ 
    target: diagramRef, 
    offset: ["start center", "end 20%"] 
  });
  const chartProgress = useTransform(diagramScroll, [0.3, 0.65], [0, 1]);

  return (
    <div className="bg-background text-foreground overflow-clip">
      {/* Intense Hero Section remains same... */}

      {/* ── 01. INTENSE HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen w-full flex flex-col justify-center px-6 pt-32 pb-12 md:px-12 lg:px-20 overflow-hidden">
        {/* Dynamic aggressive background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.1)_0%,transparent_60%)] pointer-events-none" />

        {/* Fast moving vertical grids */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-[#ff6a00]" style={{ left: `${(i + 1) * (100 / 12)}%` }} />
          ))}
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_400px] gap-20 items-center">
          <div>
            <RevealLine>
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff6a00] mb-8">
                Service // Digital Growth
              </span>
            </RevealLine>

            <div className="w-full">
              <RevealLine>
                <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-black uppercase tracking-tighter leading-[0.88]">
                  Metrics That
                </h1>
              </RevealLine>
              <RevealLine delay={0.1}>
                <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-satoshi font-normal italic text-white/40 leading-[0.88]">
                  Matter.
                </h1>
              </RevealLine>
            </div>

            <FadeIn delay={0.3} className="mt-8 max-w-xl">
              <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed">
                We design and engineer launch narratives, high-converting landing systems, and sophisticated instrumentation so you can tie every creative drop to revenue.
              </p>
            </FadeIn>
          </div>

          {/* Aggressive Data Column */}
          <FadeIn delay={0.4}>
            <div className="hidden lg:flex flex-col gap-8 border-l border-white/10 pl-12 h-full justify-center">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6a00]/70 mb-2">Target ROAS</div>
                <div className="text-7xl font-black font-mono tracking-tighter text-white">
                  <Counter from={100} to={450} duration={2} suffix="%" />
                </div>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6a00]/70 mb-2">Funnel Conversion</div>
                <div className="text-7xl font-black font-mono tracking-tighter text-white">
                  <Counter from={0} to={8.4} duration={2.5} suffix="%" />
                </div>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6a00]/70 mb-2">Pipeline Velocity</div>
                <div className="text-7xl font-black font-mono tracking-tighter text-white">
                  <Counter from={0} to={3.2} duration={3} suffix="x" />
                </div>
              </div>
            </div>
          </FadeIn>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Ticker />
        </div>
      </section>

      {/* ── 02. DASHBOARD / EXPERIMENTATION ───────────────────────── */}
      <section ref={diagramRef} className="py-32 px-6 md:px-12 lg:px-20 bg-zinc-950">
        <div className="mx-auto max-w-[1600px]">

          <div className="mb-24">
            <RevealLine>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                The Experimentation <br />
                <span className="font-satoshi font-normal italic text-[#ff6a00]">Backlog.</span>
              </h2>
            </RevealLine>
            <FadeIn delay={0.1}>
              <p className="mt-8 text-xl text-foreground/60 font-medium leading-relaxed max-w-2xl">
                Creative without instrumentation is blind. We hook up robust analytics, heatmaps, and A/B testing infrastructure from day one. Every hypothesis is tested. Every win is scaled.
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual ROI Graph */}
            <div className="order-2 lg:order-1 border border-white/10 rounded-3xl bg-zinc-900/30 p-8 md:p-12 h-[500px] flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3 text-lg font-bold">
                  <Activity size={24} className="text-[#ff6a00]" /> Current Trajectory
                </div>
                <div className="text-[#ff6a00] font-mono text-xl font-black bg-[#ff6a00]/10 px-4 py-1 rounded-full">+248%</div>
              </div>

              <div className="flex-1 relative flex items-end">
                {/* Y-Axis lines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="absolute left-0 w-full border-t border-white/5" style={{ bottom: `${(i / 4) * 100}%` }} />
                ))}

                {/* Expanding Graph Bar */}
                <div className="absolute bottom-0 left-0 h-full w-full flex items-end">
                  <svg className="w-full h-[80%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="chartClip">
                        <motion.rect 
                          width="100" 
                          height="100" 
                          style={{ scaleX: chartProgress, transformOrigin: "left" }} 
                        />
                      </clipPath>
                    </defs>
                    
                    {/* The Fill Layer */}
                    <path 
                      d="M0,100 L20,80 L40,85 L60,40 L80,45 L100,10 V100 H0 Z" 
                      fill="url(#chartGradient)" 
                      clipPath="url(#chartClip)"
                    />
                    
                    {/* The Drawing Line */}
                    <motion.path
                      d="M0,100 L20,80 L40,85 L60,40 L80,45 L100,10"
                      fill="none"
                      stroke="#ff6a00"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity={0.8}
                      style={{ pathLength: chartProgress }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Backlog List */}
            <div className="order-1 lg:order-2 space-y-4">
              {[
                { status: "Live", title: "Landing Page Architecture v2", metric: "Bounce rate delta" },
                { status: "Analysis", title: "Pricing Tier Re-alignment", metric: "ARR per user" },
                { status: "Queued", title: "Checkout Flow Optimization", metric: "Cart abandonment" },
                { status: "Queued", title: "Lead Form Gamification", metric: "Lead volume" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#ff6a00]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`h-2 w-2 rounded-full ${item.status === 'Live' ? 'bg-[#ff6a00] animate-pulse' : item.status === 'Analysis' ? 'bg-yellow-500' : 'bg-white/20'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">{item.status}</span>
                      </div>
                      <h4 className="text-lg font-black">{item.title}</h4>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff6a00]/50 mb-1">Tracking</div>
                      <div className="text-sm font-mono text-foreground/70">{item.metric}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. CTA FINALE ────────────────────────────────────────── */}
      <section className="relative px-6 py-48 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center text-center">
        <div className="relative z-10 max-w-4xl max-auto space-y-12">
          <div>
            <RevealLine>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Scale Your
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-satoshi font-normal italic text-[#ff6a00] leading-[0.88]">
                Acquisition.
              </h2>
            </RevealLine>
          </div>

          <FadeIn delay={0.3}>
            <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,106,0,0.3)]">
              Start the Brief
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
