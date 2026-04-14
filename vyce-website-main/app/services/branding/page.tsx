"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import * as THREE from "three";

// ─── Data ─────────────────────────────────────────────────────────────────

const processSteps = [
  {
    phase: "01 // Immersion",
    title: "Understanding the Core",
    description: "We don't start with moodboards. We start with stakeholder interviews, landscape analysis, and uncovering the actual narrative you're trying to tell versus the one you're currently projecting.",
  },
  {
    phase: "02 // Strategy",
    title: "Positioning & Voice",
    description: "Defining the unshakeable foundation: verbal identity, core archetype, and strategic positioning. If the words don't work, the visuals won't matter.",
  },
  {
    phase: "03 // Expression",
    title: "Visual Systems",
    description: "Crafting the visual language. Logo suites, typography stacks, color logic, and compositional systems that scale from a tiny favicon to a Times Square billboard.",
  },
  {
    phase: "04 // Rollout",
    title: "Guidelines & Governance",
    description: "Creating the rulebook. In-depth brand guidelines (PDF or living web portals) ensuring your internal teams never dilute the craft we've built together.",
  }
];

const expressions = [
  {
    title: "The Mark",
    description: "The atomic core of your visual identity. Designed to perform flawlessly in a 16px favicon and on a 60-foot billboard.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Typography",
    description: "The silent voice of your brand. We curate type stacks that balance editorial elegance with maximum digital legibility.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80"
  },
  {
    title: "Color Logic",
    description: "A mathematical approach to palette creation. Accessibility-tested tokens that evoke exact psychological responses.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Art Direction",
    description: "Strict guidelines for photography, 3D, and layout to ensure every asset feels undeniably yours.",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop&q=80"
  }
];

// ─── Animation Primitives ─────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "100%", opacity: 0 }} animate={isInView ? { y: "0%", opacity: 1 } : {}}
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

// ─── 3D Hero Scene ────────────────────────────────────────────────────────

function FloatingShapes() {
  const icoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.2;
      icoRef.current.rotation.y = t * 0.25;
      // Animate position across the screen
      icoRef.current.position.x = Math.sin(t * 0.5) * 4;
      icoRef.current.position.y = Math.cos(t * 0.3) * 1;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={icoRef} position={[0, 0, -2]}>
          <icosahedronGeometry args={[2.5, 0]} />
          <MeshDistortMaterial color="#ffffff" wireframe={true} transparent opacity={0.30} distort={0.25} speed={2} />
        </mesh>
      </Float>
    </>
  );
}

// ─── Horizontal Scroll Section ────────────────────────────────────────────

function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const scrollAmount = -(sectionRef.current!.scrollWidth - window.innerWidth + 100);

      gsap.to(sectionRef.current, {
        x: scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: `+=${Math.abs(scrollAmount)}`,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative h-screen bg-zinc-950 overflow-hidden flex items-center border-y border-white/[0.05]">
      {/* Background typographic noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden flex flex-col justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tighter">
            BRAND GUIDELINES ESTABLISHED
          </div>
        ))}
      </div>

      <div className="absolute top-20 left-0 w-full z-10 pointer-events-none flex justify-center">
        <RevealLine>
          <h2 className="text-3xl md:text-5xl uppercase tracking-tighter text-white">
            <span className="font-black">Visual</span>{" "}
            <span className="font-satoshi italic text-white/50">Vocabulary.</span>
          </h2>
        </RevealLine>
      </div>

      <div ref={sectionRef} className="flex gap-12 lg:gap-20 px-12 lg:px-20 h-auto items-center mt-24 w-max relative z-20">
        {expressions.map((item, index) => (
          <div key={index} className="w-[80vw] lg:w-[45vw] max-w-[700px] flex-shrink-0 group">
            <div className="rounded-sm overflow-hidden bg-background relative aspect-[4/3] border border-white/5 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3">{`// Vol. ${String(index + 1).padStart(2, '0')}`}</span>
                <h3 className="text-4xl md:text-6xl font-satoshi transition-colors duration-500 group-hover:italic mb-4">{item.title}</h3>
                <p className="max-w-md text-foreground/50 text-sm md:text-base font-medium leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Accordion Component ──────────────────────────────────────────────────

function ProcessAccordion({ step, isOpen, onToggle }: { step: typeof processSteps[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-white/[0.06] transition-colors duration-500 ${isOpen ? 'border-primary/30' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left cursor-pointer group"
      >
        <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] w-32 shrink-0">{step.phase}</span>

        <div className="flex-1 flex items-center justify-between">
          <span className={`text-2xl md:text-4xl font-satoshi transition-all duration-500 ${isOpen ? 'text-white italic translate-x-4' : 'text-foreground/40 group-hover:text-foreground/80'}`}>
            {step.title}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-primary/50">
            <ChevronDown strokeWidth={1.5} size={20} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 md:pl-[144px]">
              <p className="max-w-2xl text-lg text-foreground/50 font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Ticker() {
  const tickerItems = (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-8 pr-8">
          BRAND STRATEGY <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          VISUAL IDENTITY <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          VERBAL IDENTITY <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          DESIGN SYSTEMS <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-hidden bg-white border-y border-white/10 py-4 flex text-black">
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

export default function BrandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [openProcessIndex, setOpenProcessIndex] = useState<number | null>(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="bg-background text-foreground overflow-clip">

      {/* ── 01. EDITORIAL HERO WITH 3D ────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ThreeJS Background Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Environment preset="city" />
            <FloatingShapes />
          </Canvas>
        </div>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 lg:px-20 text-center flex flex-col items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              Service // Branding
            </span>
          </FadeIn>

          <div className="mt-8 space-y-2 lg:space-y-4">
            <RevealLine>
              <h1 className="text-[clamp(3.5rem,8vw,10rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Identity &
              </h1>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h1 className="text-[clamp(3.5rem,8vw,10rem)] font-satoshi font-normal italic text-white/40 leading-[0.88]">
                Positioning.
              </h1>
            </RevealLine>
          </div>

          <FadeIn delay={0.3} className="mt-8 max-w-2xl px-4">
            <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed">
              We design visual systems and verbal unshakeability that command attention and sustain trust across every medium.
            </p>
          </FadeIn>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Ticker />
        </div>

      </section>

      {/* ── 02. HORIZONTAL SCROLL (MID-PAGE ENERGY) ───────────────── */}
      <HorizontalScrollSection />

      {/* ── 03. PROOF SECTION (STAT COUNTERS) ─────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <RevealLine>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">Built To <br /><span className="italic font-satoshi font-normal text-primary">Last.</span></h2>
            </RevealLine>
            <FadeIn delay={0.1}>
              <p className="text-lg text-foreground/50 leading-relaxed font-medium max-w-md">
                A brand is not a logo. It’s an operating system for your company's perception. We engineer brands that act as moats, driving measurable equity and customer loyalty.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FadeIn delay={0.2} className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between aspect-square group hover:border-white/20 transition-colors">
              <div className="text-xs font-mono uppercase text-foreground/30">Average Rev Lift</div>
              <div className="text-5xl md:text-7xl font-black group-hover:text-primary transition-colors duration-500">2.4x</div>
            </FadeIn>
            <FadeIn delay={0.3} className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between aspect-[1/1.5] lg:aspect-square mt-12 group hover:border-white/20 transition-colors">
              <div className="text-xs font-mono uppercase text-foreground/30">Client Retention</div>
              <div className="text-5xl md:text-7xl font-black group-hover:text-primary transition-colors duration-500">96%</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04. PROCESS ───────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-zinc-950/50">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground/30">The Methodology</h2>
          </FadeIn>
          <div className="max-w-4xl border-t border-white/[0.06]">
            {processSteps.map((step, i) => (
              <ProcessAccordion
                key={step.phase}
                step={step}
                isOpen={openProcessIndex === i}
                onToggle={() => setOpenProcessIndex(openProcessIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. CTA FINALE ────────────────────────────────────────── */}
      <section className="relative px-6 py-48 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center text-center">
        {/* Animated Blue Orb */}


        <div className="relative z-10 max-w-4xl max-auto space-y-12">
          <div>
            <RevealLine>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Define Your
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] pb-4 font-satoshi font-normal italic text-primary leading-[0.88]">
                Legacy.
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
