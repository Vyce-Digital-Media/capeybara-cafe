"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { signalProjectPageReady } from "@/components/ui/ProjectTransition";

// ─── UTILITIES ─────────────────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "120%", opacity: 0 }} animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── SECTIONS ──────────────────────────────────────────────────────────────

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=150%",
        }
      });

      // Initially, image wrapper sits on the right half with some padding
      gsap.set(imageWrapperRef.current, {
        clipPath: "inset(15% 5% 10% 50% round 30px)"
      });

      tl.to(textRef.current, {
        x: "-20vw",
        opacity: 0,
        ease: "power2.inOut",
        duration: 1
      }, 0)
        .to(imageWrapperRef.current, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "power2.inOut",
          duration: 1
        }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center">
      {/* Absolute Image Layer */}
      <div ref={imageWrapperRef} className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2000&auto=format&fit=crop"
          alt="Hero Project"
          className="w-full h-full object-cover origin-center scale-110"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Left Text */}
      <div ref={textRef} className="w-full md:w-1/2 px-8 md:px-20 z-10 relative">
        <RevealLine>
          <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-6 block">Case Study</span>
        </RevealLine>
        <RevealLine delay={0.1}>
          <h1 className="text-[clamp(3rem,6vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            Nexus<br /><span className="font-satoshi italic font-normal text-white/50">Space.</span>
          </h1>
        </RevealLine>
        <RevealLine delay={0.2} className="mt-8">
          <p className="max-w-md text-foreground/60 text-lg">
            Redefining spatial architecture through immersive webGL experiences and precision-crafted interfaces.
          </p>
        </RevealLine>
      </div>
    </section>
  );
}

function DescriptionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".desc-word");
      gsap.to(words, {
        color: "#ffffff",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
          pin: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const text = "We approached this challenge by dismantling the conventional grid. Every element was designed to float, react, and breathe, creating an organic journey rather than a rigid layout.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center px-8 md:px-20 relative z-30 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[clamp(1.5rem,4vw,4.5rem)] font-black uppercase tracking-tighter leading-[1.1] flex flex-wrap gap-x-[clamp(0.5rem,1.5vw,1.5rem)]">
          {words.map((word, i) => (
            <span key={i} className="desc-word text-white/10 transition-colors duration-300">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

function FloatingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".float-wrapper");
      wrappers.forEach((wrapper) => {
        const speed = parseFloat(wrapper.dataset.speed || "1");
        gsap.to(wrapper, {
          y: -1000 * speed, // Move up significantly while scrolling
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[180vh] w-full overflow-hidden bg-background z-30">
      {/* Background Typography pinned to center via sticky */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none opacity-5 w-full">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter mix-blend-overlay">Gallery</h2>
      </div>

      {/* Positioned Images - We remove `animate` and let user freely drag */}

      {/* TOP */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[240px] md:w-[300px] aspect-[4/5] float-wrapper z-20" data-speed="1.5">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: -2, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Top" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* LEFT */}
      <div className="absolute top-[75%] left-[5%] md:left-[10%] w-[280px] md:w-[350px] aspect-[4/5] float-wrapper z-10" data-speed="2.2">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: 3, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Left" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* CENTER */}
      <div className="absolute top-[75%] left-[50%] -translate-x-1/2 w-[320px] md:w-[450px] aspect-video float-wrapper z-30" data-speed="1.2">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: -1, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900"
        >
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80" alt="Center" className="w-full h-full object-cover pointer-events-none opacity-90" />
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="absolute top-[70%] right-[5%] md:right-[10%] w-[250px] md:w-[320px] aspect-[3/4] float-wrapper z-20" data-speed="1.8">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: 4, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Right" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="absolute top-[100%] left-[20%] -translate-x-1/2 w-[240px] md:w-[300px] aspect-[4/5] float-wrapper z-20" data-speed="1.5">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: -2, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Top" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* BOTTOM RIGHT */}
      <div className="absolute top-[100%] right-[0%] -translate-x-1/2 w-[240px] md:w-[300px] aspect-[4/5] float-wrapper z-20" data-speed="1.5">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: -2, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Top" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* BOTTOM */}
      <div className="absolute top-[90%] left-[50%] -translate-x-1/2 w-[300px] md:w-[400px] aspect-square float-wrapper z-10" data-speed="0.9">
        <motion.div
          drag dragConstraints={{ top: -150, bottom: 150, left: -200, right: 200 }} dragElastic={0.1}
          whileHover={{ scale: 1.02 }} whileDrag={{ scale: 1.1, rotate: -3, zIndex: 50, cursor: "grabbing" }}
          className="w-full h-full cursor-grab overflow-hidden rounded-[30px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=800&q=80" alt="Bottom" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>

      {/* Overlay gradient to smooth edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent h-40 top-0 z-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-40 bottom-0 z-40 mt-auto pointer-events-none" />
    </section>
  );
}

function LightModeSection({ setGlobalTheme }: { setGlobalTheme: (theme: 'dark' | 'light') => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%", // when top of section hits 60% down the viewport
        onEnter: () => setGlobalTheme('light'),
        onLeaveBack: () => setGlobalTheme('dark'),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [setGlobalTheme]);

  return (
    <section ref={sectionRef} className="py-40 md:py-60 px-8 md:px-20 relative z-30 transition-colors duration-1000">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <RevealLine>
          <span className="text-current font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-8 block">The Architecture</span>
        </RevealLine>
        <RevealLine delay={0.1}>
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-tighter leading-none mb-12">
            Minimalism <br />
            <span className="font-satoshi italic font-normal opacity-50">is complex.</span>
          </h2>
        </RevealLine>
        <RevealLine delay={0.2}>
          <p className="text-xl md:text-2xl font-medium opacity-60 max-w-2xl leading-relaxed">
            Stripping away the noise requires a robust technical foundation. We utilized edge routing and native compiled animations to ensure 60fps performance across 99% of devices.
          </p>
        </RevealLine>
      </div>
    </section>
  );
}

function CenteredGrowthSection({ setGlobalTheme }: { setGlobalTheme: (theme: 'dark' | 'light') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Longer pin for content reveal
          pin: true,
          scrub: 1,
          onEnter: () => setGlobalTheme('dark'),
          onLeaveBack: () => setGlobalTheme('light'),
        }
      });

      tl.to(imageRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "none",
        duration: 1
      })
      .to(ctaContentRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.4
      }, "-=0.3"); // Fade in during the last 30% of growth
    }, containerRef);
    return () => ctx.revert();
  }, [setGlobalTheme]);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden z-30">
      <div
        ref={imageRef}
        className="w-[30vw] md:w-[20vw] aspect-[4/5] rounded-[24px] overflow-hidden relative shadow-2xl"
      >
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          alt="Center Growth"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Integrated CTA Content */}
        <div 
          ref={ctaContentRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-20 pointer-events-auto"
        >
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-black uppercase tracking-tighter leading-[0.8] mb-12 relative group cursor-pointer overflow-hidden">
            <motion.div
              initial="initial"
              whileHover="hovered"
              className="relative block overflow-hidden whitespace-nowrap"
            >
              <div>
                {"Let's Talk".split("").map((char, i) => (
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
                {"Let's Talk".split("").map((char, i) => (
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

          <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95">
            Start Project
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}




// ─── MAIN PAGE ─────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Set the global theme for this page only, controlling the background Fixed Wrapper
  // and body text color to avoid messing with other Next.js routes.
  const setGlobalTheme = (theme: 'dark' | 'light') => {
    if (!bgRef.current) return;
    if (theme === 'light') {
      gsap.to(bgRef.current, { backgroundColor: "#ffffff", duration: 0.8, ease: "power2.inOut" });
      gsap.to(document.body, { color: "#000000", duration: 0.8, ease: "power2.inOut" });
    } else {
      gsap.to(bgRef.current, { backgroundColor: "#030303", duration: 0.8, ease: "power2.inOut" });
      gsap.to(document.body, { color: "#f4f4f5", duration: 0.8, ease: "power2.inOut" });
    }
  };

  // Reset body color on unmount just in case
  useEffect(() => {
    signalProjectPageReady();
    return () => {
      gsap.set(document.body, { color: "#f4f4f5", backgroundColor: "#030303" });
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* 
        Fixed Background Wrapper.
        Instead of animating `body.backgroundColor`, we animate this div.
        Sections with `bg-background` are opaque, and sections without 
        will reveal this changing background layer. 
      */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none transition-colors"
        style={{ backgroundColor: "#030303" }}
      />

      {/* Main Content Space - z-index higher than fixed BG */}
      <div className="relative z-10">
        <HeroSection />
        <DescriptionSection />
        <FloatingGallery />
        <LightModeSection setGlobalTheme={setGlobalTheme} />
        <CenteredGrowthSection setGlobalTheme={setGlobalTheme} />
      </div>
    </div>
  );
}
