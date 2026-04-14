"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text3D } from "@react-three/drei";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, ChevronRight, Play } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import * as THREE from "three";

// ─── Data ─────────────────────────────────────────────────────────────────

const webTypes = [
  {
    title: "Marketing Sites",
    description: "High-performance narrative pages designed to convert traffic into qualified pipeline.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "SaaS Platforms",
    description: "Complex dashboards, onboarding flows, and user management tools that don't feel like spreadsheets.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "E-Commerce",
    description: "Headless storefronts built for scale, speed, and seamless checkout conversion rates.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Microsites",
    description: "Immersive standalone experiences for product launches, reports, and brand campaigns.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Client Portals",
    description: "Secure, credentialed zones for B2B document sharing, account management, and deep metrics.",
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Web3 Interfaces",
    description: "DApps, wallet connectors, and minting suites boasting beautiful UX over complex smart contracts.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Corporate Governance",
    description: "Premium public relations and investor relations sites to convey authority and trust.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=600&fit=crop&q=80"
  },
  {
    title: "Interactive Storytelling",
    description: "Awards-worthy digital narratives powered by WebGL and advanced scroll-triggered animations.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&q=80"
  }
];

const stats = [
  { value: "400%", metric: "Conversion Lift", brand: "Fintech Leader" },
  { value: "0.8s", metric: "LCP Load Time", brand: "Global E-Com" },
  { value: "10x", metric: "Traffic Scaling", brand: "Enterprise SaaS" },
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

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 4]} />
        <MeshDistortMaterial
          color="#0044ff"
          emissive="#001144"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

// ─── Components ──────────────────────────────────────────────────────────

function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        if (!sectionRef.current) return 0;
        return -(sectionRef.current.scrollWidth - window.innerWidth);
      };

      gsap.to(sectionRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative h-screen bg-background overflow-hidden flex items-center">
      <div className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-full flex justify-center">
        <RevealLine>
          <div className="flex flex-row items-center gap-3 md:gap-5">
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white">Browser</h2>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-satoshi italic text-primary tracking-tight">Ecosystems.</h2>
          </div>
        </RevealLine>
      </div>

      <div ref={sectionRef} className="flex gap-4 sm:gap-8 lg:gap-12 pl-6 pr-6 lg:pl-[10vw] lg:pr-[10vw] h-[80vh] items-center mt-40 w-max">
        {webTypes.map((item, index) => {
          const isMac = index % 2 === 0;

          return (
            <div key={index} className={`flex-shrink-0 group flex items-center justify-center ${isMac ? "w-[85vw] md:w-[70vw] lg:w-[55vw] max-w-[800px]" : "w-[60vw] sm:w-[32vw] lg:w-[22vw] max-w-[300px]"}`}>
              {isMac ? (
                /* FAKE MAC */
                <div className="w-full mt-8 rounded-[24px] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl relative">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/10" />
                    </div>
                    <div className="ml-4 flex-1 h-6 rounded-full bg-white/5 flex items-center px-4 text-[10px] font-mono text-white/30 hidden sm:flex">
                      vyce.agency/preview/{item.title.toLowerCase().replace(/\s+/g, '-')}
                    </div>
                  </div>

                  {/* Browser Content */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />

                    <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                      <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3">{`// ${String(index + 1).padStart(2, '0')}`}</span>
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                      <p className="max-w-md text-foreground/60 text-sm md:text-base font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* FAKE IPHONE */
                <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[270px] aspect-[9/19] rounded-[36px] md:rounded-[44px] overflow-hidden border-[6px] md:border-[8px] mt-8 border-[#1a1a1a] bg-black shadow-2xl relative mx-auto">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-6 bg-[#0a0a0a] rounded-full z-20 flex items-center justify-between px-1.5 md:px-2">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/5 hidden md:block" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#111] border border-white/5" />
                  </div>

                  {/* Phone Content */}
                  <div className="relative w-full h-full overflow-hidden rounded-[28px] md:rounded-[36px] bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />

                    <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-center items-center">
                      <span className="text-primary font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2">{`// ${String(index + 1).padStart(2, '0')}`}</span>
                      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-3">{item.title}</h3>
                      <p className="text-foreground/60 text-[10px] md:text-xs font-medium leading-relaxed max-w-[200px]">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Ticker() {
  const tickerItems = (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-8 pr-8">
          FULL-STACK ENGINEERING <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          INTERACTIVE WEBGL <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          GSAP ANIMATION <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          PERFORMANCE OPTIMIZATION <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#0044ff] border-y border-white/10 py-4 flex text-white">
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

export default function WebExperiencesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Real results counters animation setup
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-background text-foreground overflow-clip">

      {/* ── 01. HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ThreeJS Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <FloatingMesh />
          </Canvas>
        </div>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,10,30,0.4)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 lg:px-20 text-center flex flex-col items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Service // Web
            </span>
          </FadeIn>

          <div className="mt-8 space-y-2 lg:space-y-4">
            <RevealLine>
              <h1 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Native Digital
              </h1>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h1 className="text-[clamp(3rem,8vw,9rem)] font-satoshi font-normal italic text-white/40 leading-[0.88]">
                Experiences.
              </h1>
            </RevealLine>
          </div>

          <FadeIn delay={0.3} className="mt-8 max-w-2xl px-4">
            <p className="text-base md:text-xl text-foreground/50 font-medium leading-relaxed">
              We engineer scalable, high-performance web applications that blur the line between immersive marketing and functional software.
            </p>
          </FadeIn>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Ticker />
        </div>

      </section>

      {/* ── 02. HORIZONTAL SCROLL ─────────────────────────────────── */}
      <HorizontalScrollSection />

      {/* ── 03. PROOF & TECH STACK ────────────────────────────────── */}
      <section className="relative px-6 py-32 md:py-48 lg:px-20 bg-zinc-950/50">
        <div className="mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <RevealLine>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Engineered for <br />
                <span className="font-satoshi italic text-primary font-normal">Traction.</span>
              </h2>
            </RevealLine>
            <FadeIn delay={0.2} className="max-w-md">
              <p className="text-lg text-foreground/50 font-medium leading-relaxed">
                Design without execution is just theory. We use battle-tested, edge-deployed technology to ensure lightning fast load times, robust SEO, and flawless accessibility scores.
              </p>
            </FadeIn>

            {/* Tech Stack Pills */}
            <FadeIn delay={0.3} className="flex flex-wrap gap-3">
              {['Next.js', 'React', 'Three.js / WebGL', 'GSAP', 'Vercel Edge', 'Tailwind', 'Framer Motion', 'TypeScript'].map(tech => (
                <div key={tech} className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-mono text-foreground/40">
                  {tech}
                </div>
              ))}
            </FadeIn>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`p-10 rounded-3xl border border-white/[0.04] bg-zinc-950 ${i === stats.length - 1 ? 'sm:col-span-2 sm:aspect-[2.5/1] aspect-square' : 'aspect-square'} flex flex-col justify-between group hover:border-primary/20 transition-colors duration-500`}
              >
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/30">{stat.metric}</div>
                <div>
                  <div className="text-5xl md:text-7xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">{stat.value}</div>
                  <div className="mt-2 text-sm font-satoshi italic text-white/40">{stat.brand}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. CTA FINALE ────────────────────────────────────────── */}
      <section className="relative px-6 py-48 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center text-center">
        {/* Animated Blue Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30vw] w-[30vw] rounded-full bg-primary blur-[160px]"
        />

        <div className="relative z-10 max-w-4xl max-auto space-y-12">
          <div>
            <RevealLine>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Ready for the
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-satoshi font-normal italic text-primary leading-[0.88]">
                Deep End?
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
