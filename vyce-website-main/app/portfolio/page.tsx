"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  MotionValue,
  useSpring,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Web", "Branding", "Product", "Motion"];

const projects = [
  {
    id: 1, title: "Aura Luxury Watches", category: "Web",
    tags: ["Web Design", "WebGL", "Commerce"], year: "2025",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&h=900&fit=crop&q=80",
    summary: "A cinematic product world built around tactile materials and real-time lighting. Modular storytelling blocks so the marketing team can launch capsules without engineering support.",
    scope: ["Creative direction", "3D art direction", "Next.js front-end"],
    accent: "rgba(255,180,80,0.15)", // Warm Gold
  },
  {
    id: 2, title: "Elysian Interiors", category: "Branding",
    tags: ["Brand System", "Spatial Design"], year: "2024",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=900&fit=crop&q=80",
    summary: "Editorial typography, restrained motion, and a flexible grid for case studies. The identity scales from signage to digital — one voice, many surfaces.",
    scope: ["Identity refresh", "Design system", "Site architecture"],
    accent: "rgba(180,120,100,0.15)", // Terracotta
  },
  {
    id: 3, title: "Venture Mobile Suite", category: "Product",
    tags: ["Product Design", "Design Ops"], year: "2024",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&h=900&fit=crop&q=80",
    summary: "End-to-end UI for a fintech workflow: dense data, calm hierarchy, and motion that clarifies state changes instead of decorating them.",
    scope: ["UX audit", "UI kit", "Prototyping"],
    accent: "rgba(100,150,255,0.15)", // Soft Blue
  },
  {
    id: 4, title: "Project Zero", category: "Motion",
    tags: ["Launch Campaign", "Motion"], year: "2023",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1400&h=900&fit=crop&q=80",
    summary: "A six-week launch: teaser site, announcement visuals, and a reusable motion library for paid and organic channels.",
    scope: ["Campaign site", "Motion toolkit", "Social cut-downs"],
    accent: "rgba(255,100,100,0.15)", // Red
  },
  {
    id: 5, title: "Mern Brand Identity", category: "Branding",
    tags: ["Identity", "Strategy"], year: "2023",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=900&fit=crop&q=80",
    summary: "A complete brand overhaul for a sustainability consultancy — positioning strategy to visual language and brand voice guidelines.",
    scope: ["Brand strategy", "Visual identity", "Guidelines & toolkit"],
    accent: "rgba(80,200,150,0.15)", // Emerald
  },
  {
    id: 6, title: "Atlas Digital Platform", category: "Web",
    tags: ["Web App", "UX Research"], year: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&q=80",
    summary: "A next-gen digital workspace for distributed creative teams — real-time collaboration, asset management, and project tracking.",
    scope: ["UX research", "UI design", "Component library"],
    accent: "rgba(180,100,255,0.15)", // Purple
  },
];

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      >{children}</motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

function CoverflowProjectCard({ project, index, activeProgress }: { project: any; index: number; activeProgress: MotionValue<number> }) {
  // Move it horizontally 65vw for every index it is away from the current scrolled center
  const x = useTransform(activeProgress, (p) => `${(index - p) * 60}vw`);

  // Interpolations based on distance from center
  const rotateY = useTransform(activeProgress, [index - 1, index, index + 1], [30, 0, -30]);
  const scale = useTransform(activeProgress, [index - 1, index, index + 1], [0.8, 1, 0.8]);
  const opacity = useTransform(activeProgress, [index - 2, index - 1, index, index + 1, index + 2], [0, 0.4, 1, 0.4, 0]);
  const zIndex = useTransform(activeProgress, (p) => Math.abs(index - p) < 0.5 ? 50 : 10);
  const filterBlur = useTransform(activeProgress, [index - 1, index, index + 1], ["blur(8px)", "blur(0px)", "blur(8px)"]);

  // Internal image float effect based on movement
  const imageScale = useTransform(activeProgress, [index - 1, index, index + 1], [1.2, 1, 1.2]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        x,
        zIndex,
        perspective: 2000,
        pointerEvents: "none",
      }}
      className="flex items-center justify-center p-6 md:p-12"
    >
      <motion.div
        style={{
          rotateY,
          scale,
          opacity,
          filter: filterBlur,
          transformStyle: "preserve-3d",
          pointerEvents: "auto"
        }}
        className="group relative flex h-[75vh] max-h-[850px] w-full max-w-[1300px] flex-col md:flex-row overflow-visible rounded-none"
      >
        {/* IMAGE SECTOR - Floating off the card */}
        <div className="relative h-1/2 md:h-full w-full md:w-[60%] overflow-hidden rounded-[2rem] shadow-2xl z-20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.05)] transition-shadow duration-700">
          <motion.div className="w-full h-full" style={{ scale: imageScale }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-white/80 font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> View Casestudy
            </span>
          </div>
        </div>

        {/* CONTENT SECTOR - Glassmorphism floating slightly behind/overlapping */}
        <div className="relative flex flex-1 flex-col justify-center p-8 pl-4 md:p-12 md:pl-20 z-10 md:-ml-12 rounded-[2rem] bg-zinc-950/60 backdrop-blur-3xl border border-white/5 shadow-2xl group-hover:bg-zinc-900/60 transition-colors duration-700 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-8">
            <span className="font-satoshi text-3xl italic text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="text-primary/80">{project.category}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.85] drop-shadow-xl group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h2>

          <p className="text-sm md:text-base text-white/60 font-medium leading-relaxed mb-6 max-w-md">
            {project.summary}
          </p>

          <div className="space-y-4 mb-8">
            {project.scope.map((item: string) => (
              <div key={item} className="group/item flex items-center gap-4 text-xs md:text-sm text-white/40 uppercase tracking-widest font-bold hover:text-white transition-colors duration-300">
                <div className="h-[2px] w-0 group-hover/item:w-6 rounded-full bg-primary transition-all duration-300" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <Link href="/showcase" className="group/btn inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-colors duration-300">
              Explore Project
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 transition-all duration-500 group-hover/btn:border-primary group-hover/btn:bg-primary group-hover/btn:text-background group-hover/btn:rotate-45 group-hover/btn:scale-110">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NavDot({ index, activeProgress }: { index: number; activeProgress: MotionValue<number> }) {
  const scale = useTransform(activeProgress, [index - 0.5, index, index + 0.5], [1, 1.6, 1]);
  const opacity = useTransform(activeProgress, [index - 0.5, index, index + 0.5], [0.3, 1, 0.3]);
  const backgroundColor = useTransform(
    activeProgress,
    [index - 0.5, index, index + 0.5],
    ["rgba(255,255,255,0.15)", "rgb(0,102,255)", "rgba(255,255,255,0.15)"]
  );

  return (
    <motion.div
      style={{ scale, opacity, backgroundColor }}
      className="h-2 w-2 rounded-full"
    />
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Hero Animation
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.92]);

  // Gallery Scroll Animation
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  const targetRef = useRef(null);
  const { scrollYProgress: galleryProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  // Map progress to exact indices linearly
  const length = filtered.length;
  // Reduce the track length so cards flip faster per scroll tick (80vh per item instead of 150vh)
  const trackHeight = `${length * 80}vh`;
  const linearProgress = useTransform(galleryProgress, [0, 1], [0, length - 1]);

  // Create a snapped progress integer
  const roundedProgress = useTransform(linearProgress, (p) => Math.round(p));

  // Wrap it in a buttery smooth spring for the perfect one-by-one transition snap
  const activeProgress = useSpring(roundedProgress, { stiffness: 80, damping: 18, mass: 1 });

  // Dynamic Background Accent tracking the focused project
  const backgroundAccent = useTransform(
    activeProgress,
    filtered.map((_, i) => i),
    filtered.map(p => p.accent)
  );

  return (
    <div className="bg-background text-foreground bg-zinc-950">

      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-0 pb-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-white" style={{ left: `${(i + 1) * (100 / 7)}%` }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,68,255,0.08)_0%,transparent_70%)]" />
        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 flex flex-col items-center gap-8 text-center pt-24">
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2 mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 bg-white/5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Focus & Detail
            </span>
          </FadeIn>
          <div className="space-y-2">
            <RevealLine><h1 className="text-[clamp(3.5rem,10vw,12rem)] font-black uppercase tracking-tighter leading-[0.88]">Our Portfolio</h1></RevealLine>
            <RevealLine delay={0.1}><h1 className="text-[clamp(3.5rem,10vw,12rem)] font-satoshi font-normal italic text-primary leading-[0.88]">Revealed.</h1></RevealLine>
          </div>
          <FadeIn delay={0.3} className="max-w-2xl mt-6">
            <p className="text-base md:text-xl text-foreground/40 font-medium leading-relaxed">
              We present our case studies with extreme focus. Scroll down to cycle through each project, one by one.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      {/* 3D HORIZONTAL COVERFLOW */}
      <section ref={targetRef} style={{ height: trackHeight }} className="relative bg-zinc-950">
        <div className="sticky top-0 flex h-screen min-h-screen items-center justify-center overflow-hidden">

          {/* Dynamic Background Glow Layer */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000"
            style={{ background: backgroundAccent }}
          />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,1)_100%)] pointer-events-none" />

          {/* Categories Fixed Header */}
          <div className="absolute top-20 md:top-10 left-0 w-full z-20 px-6 mt-12 md:px-20 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer border ${activeCategory === cat ? "bg-primary border-primary text-background" : "border-white/10 text-white/50 bg-black/40 backdrop-blur-md hover:border-white/40 hover:text-white/80"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Dot Navigation */}
          <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5">
            {filtered.map((_, i) => (
              <NavDot key={i} index={i} activeProgress={activeProgress} />
            ))}
          </div>

          {/* Scrolling Track (Virtual relative bounds for cards) */}
          <div className="relative mt-28 w-full h-[80vh] flex items-center justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {filtered.map((project, index) => (
                  <CoverflowProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    activeProgress={activeProgress}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative px-6 py-32 md:px-12 lg:px-20 bg-zinc-950 overflow-hidden border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1600px] text-center relative z-10">
          <FadeIn>
            <div className="relative inline-block">
              <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase tracking-tighter leading-[0.9] text-white cursor-pointer">
                <motion.div
                  initial="initial"
                  whileHover="hovered"
                  className="relative block overflow-hidden whitespace-nowrap"
                >
                  <div>
                    {"Let's Build".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                          initial: { y: 0 },
                          hovered: { y: "-100%" },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: i * 0.02,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="absolute inset-0">
                    {"Let's Build".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block text-primary italic font-satoshi font-normal"
                        variants={{
                          initial: { y: "100%" },
                          hovered: { y: 0 },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: i * 0.02,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </h2>
              <div className="absolute -right-10 top-0 h-4 w-4 bg-primary animate-pulse" />
            </div>
            <p className="mt-8 text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
              Partner with us to create digital experiences that command attention completely.
            </p>
            <div className="mt-12">
              <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-primary active:scale-95">
                Start Yours
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
