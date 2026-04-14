"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Code, Database, LayoutTemplate, BoxSelect, Cpu } from "lucide-react";
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

// ─── Floating UI Elements ─────────────────────────────────────────────────

function GlassWidget({ delay, icon: Icon, title, x, y, rotate = 0 }: { delay: number, icon: any, title: string, x: number, y: number, rotate?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ x, y, rotate }}
      className="absolute p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex items-center gap-4 group hover:border-primary/40 transition-colors duration-300"
    >
      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <div className="h-1.5 w-12 bg-white/20 rounded-full mb-2" />
        <div className="h-1.5 w-8 bg-white/10 rounded-full" />
      </div>
    </motion.div>
  );
}

function Ticker() {
  const tickerItems = (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-8 pr-8">
          UX/UI DESIGN <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          RAPID PROTOTYPING <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          USER RESEARCH <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          DESIGN SYSTEMS <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#7c3aed] border-y border-white/10 py-4 flex text-white">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap text-xs font-black uppercase tracking-[0.3em] w-max"
      >
        <div className="flex items-center">{tickerItems}</div>
        <div className="flex items-center">{tickerItems}</div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export default function ProductDesignPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Diagram scroll hook
  const diagramRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: diagramScroll } = useScroll({ target: diagramRef, offset: ["start end", "end center"] });
  const block1Y = useTransform(diagramScroll, [0, 1], [150, 0]);
  const block2Y = useTransform(diagramScroll, [0, 1], [250, 0]);
  const block3Y = useTransform(diagramScroll, [0, 1], [350, 0]);

  return (
    <div className="bg-background text-foreground overflow-clip">

      {/* ── 01. HERO WITH FROSTED GLASS ─────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Abstract blurred background shapes */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-600/20 blur-[100px]" />

        {/* Dashboard Frame Element */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[-20vh] w-[80vw] max-w-[1200px] h-[60vh] rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.5)] z-0"
        >
          <div className="w-full h-16 border-b border-white/5 flex items-center px-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
          </div>
        </motion.div>

        {/* Floating Widgets */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
          <div className="relative w-full h-full max-w-[1400px] mx-auto">
            <GlassWidget delay={0.8} icon={BoxSelect} title="Components" x={100} y={200} rotate={-12} />
            <GlassWidget delay={1.0} icon={Cpu} title="Logic" x={950} y={180} rotate={8} />
            <GlassWidget delay={1.2} icon={Database} title="Data" x={150} y={500} rotate={15} />
            <GlassWidget delay={1.4} icon={LayoutTemplate} title="Interface" x={1100} y={450} rotate={-5} />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <RevealLine>
            <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-8 px-6 py-2 rounded-full border border-primary/20 bg-primary/10">
              Service // Product Design
            </span>
          </RevealLine>

          <div className="w-full">
            <RevealLine className="justify-center">
              <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Interfaces
              </h1>
            </RevealLine>
            <RevealLine delay={0.1} className="justify-center">
              <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-satoshi font-normal italic text-white/40 leading-[0.88]">
                That Perform.
              </h1>
            </RevealLine>
          </div>

          <FadeIn delay={0.3} className="mt-8 max-w-2xl px-4">
            <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed">
              We design complex dashboards, onboarding flows, and internal tools that align business logic with human behavior.
            </p>
          </FadeIn>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Ticker />
        </div>
      </section>

      {/* ── 02. SYSTEM ASSEMBLY DIAGRAM ───────────────────────────── */}
      <section ref={diagramRef} className="py-32 px-6 md:px-12 lg:px-20 bg-zinc-950/40 relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-20 items-center">

          <div className="space-y-12">
            <RevealLine>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Pixels, <br />
                <span className="font-satoshi font-normal italic text-primary">Compiled.</span>
              </h2>
            </RevealLine>

            <FadeIn delay={0.1}>
              <p className="text-xl text-foreground/60 font-medium leading-relaxed max-w-lg">
                We don't just draw screens. We construct systemic design libraries that map directly to React components.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                { title: "User Experience (UX)", desc: "Wireframes, flow charts, and usability tests focused on task completion rates." },
                { title: "Design Systems", desc: "Tokenized Figma files that your engineering team will actually enjoy using." },
                { title: "Interactive Prototypes", desc: "High-fidelity, clickable models to secure stakeholder buy-in before code." }
              ].map((item, i) => (
                <FadeIn key={item.title} delay={0.2 + (i * 0.1)}>
                  <div className="border-l-2 border-primary/30 pl-6 py-2 hover:border-primary transition-colors duration-300">
                    <h4 className="text-lg font-bold uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-foreground/50 font-medium mt-2">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Abstract Assembly Graphic */}
          <div className="relative aspect-square flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,68,255,0.05)_0%,transparent_70%)]" />

            <motion.div style={{ y: block1Y }} className="relative z-30 w-64 h-32 rounded-2xl border border-white/20 bg-zinc-900/50 backdrop-blur shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="h-2 w-16 bg-white/20 rounded-full" />
                <div className="h-6 w-6 rounded border border-white/10" />
              </div>
              <div className="h-10 w-full rounded bg-primary/20 border border-primary/30" />
            </motion.div>

            <motion.div style={{ y: block2Y }} className="relative z-20 -mt-8 w-72 h-40 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur p-6 flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-8 w-16 rounded bg-white/5" />
              ))}
            </motion.div>

            <motion.div style={{ y: block3Y }} className="relative z-10 -mt-12 w-80 h-48 rounded-2xl border border-white/[0.05] bg-zinc-900/30 backdrop-blur p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 h-12 rounded bg-white/5" />
              <div className="h-full rounded bg-white/5" />
              <div className="h-full rounded bg-white/5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 03. CTA FINALE ────────────────────────────────────────── */}
      <section className="relative px-6 py-48 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center text-center">
        <div className="relative z-10 max-w-4xl max-auto space-y-12">
          <div>
            <RevealLine>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Ship less
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-satoshi font-normal italic text-primary leading-[0.88]">
                Fiction.
              </h2>
            </RevealLine>
          </div>

          <FadeIn delay={0.3}>
            <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start the Brief
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
