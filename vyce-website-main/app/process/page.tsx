"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────

const processSteps = [
  {
    step: "01",
    title: "UNDERSTAND",
    tagline: "Know before you build.",
    duration: "Week 1–2",
    description:
      "We start by listening - genuinely listening. To your business, your goals, your audience, your competition, what's worked, and what hasn't. We don't come in with a template. We come in with questions. And we don't move until we have real answers. Most problems in digital marketing are solved here - in the understanding phase. Executing on the wrong insight is how budgets disappear.",
    details: ["Founder & stakeholder discovery call", "Business, brand & digital audit", "Competitor landscape mapping", "Target audience & persona definition"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop&q=80",
    color: "rgba(0,68,255,0.12)",
  },
  {
    step: "02",
    title: "PLAN",
    tagline: "Direction before action.",
    duration: "Week 2–4",
    description:
      "No pixel moves, no rupee gets spent, and no content gets created before we have a clear map. We define the strategy, the structure, the platforms, the content pillars, the campaign approach, and the success metrics - all locked before execution begins.This is how we avoid the painful mid-project pivot. And how we avoid even more painful 'we need to redo everything' conversations.",
    details: ["Strategic roadmap & plan of action", "Platform, channel & format selection", "Content pillars & campaign framework", "Detailed project scope & timeline"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=600&fit=crop&q=80",
    color: "rgba(255,140,0,0.12)",
  },
  {
    step: "03",
    title: "CREATE",
    tagline: "Craft with intention.",
    duration: "Parallel track",
    description:
      "This is where strategy becomes real. Design, copy, content, code - everything built with the plan front of mind, not as an afterthought. You'll see real work in regular cycles. Structured feedback. Clear revisions. No waiting three weeks for a first draft.",
    details: ["Visual identity & UI design", "Content production (reels, carousels, copy)", "Website design & development", "Ad creative & campaign build"],
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=900&h=600&fit=crop&q=80",
    color: "rgba(200,50,255,0.12)",
  },
  {
    step: "04",
    title: "LAUNCH",
    tagline: "Go live properly.",
    duration: "Ongoing sprint",
    description:
      "Going live isn't the finish line - it's the starting gun. We make sure everything is tested, tracked, and working before anything goes public. QA, analytics, tracking, final review. 'No we'll fix it after launch.' We fix it before.",
    details: ["Pre-launch quality assurance", "Analytics & conversion tracking setup", "Campaign activation & monitoring", "Final client review & sign-off"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&h=600&fit=crop&q=80",
    color: "rgba(0,200,100,0.12)",
  },
  {
    step: "05",
    title: "GROW",
    tagline: "The part most agencies skip. We don't.",
    duration: "Final sprint",
    description:
      "This is the phase that separates agencies from partners. Once we launch, we don't file the project and move on. We track performance. We flag what's working and what isn't. We optimize. We bring the next opportunity before you even know to ask about it. This is why most of our client relationships are measured in years, not projects. And why most of our new clients come from someone we already work with.",
    details: ["Performance monitoring & reporting", "Ongoing optimization & iteration", "Monthly strategy reviews", "Expansion scope identification"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&h=600&fit=crop&q=80",
    color: "rgba(255,60,80,0.12)",
  },
];

const faqItems = [
  {
    q: "How long does a typical project take?",
    a: "Depends on the scope. A brand identity: 3–4 weeks. A website: 6–10 weeks. A social media retainer: ongoing from month one, results visible from month two or three. We'll give you an honest timeline during the scoping call - no inflated estimates, no 'we'll figure it out.'",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with brands in India and internationally. Time zones, communication cadences, and currency - we've handled all of it. If you're building something serious, geography isn't a barrier.",
  },
  {
    q: "What's the minimum budget to work with Vyce?",
    a: "We work with medium to large-budget projects - not MNC-scale, but not ₹5,000-a-month budgets either. The right answer depends on your scope. Best to have a 15-minute call and find out together.",
  },
  {
    q: "Will I be working directly with the founders?",
    a: "Yes, especially in the strategy and planning phases. And you'll always have direct access to the leads on your project throughout. We don't hand you off to a junior and disappear.",
  },
  {
    q: "What if the project needs to change mid-wa",
    a: "It happens. We build flexibility into our process - but also do thorough upfront scoping precisely to reduce surprises. When scope does change, we're transparent about what that means for timeline and budget. No hidden costs.",
  },
];

// ─── Primitives ────────────────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "100%", opacity: 0 }} animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}>{children}</motion.div>
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

// ─── FAQ Accordion ─────────────────────────────────────────────────────────

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <FadeIn delay={0}>
      <div className={`border-t border-white/[0.07] transition-colors duration-300 ${isOpen ? "border-primary/20" : ""}`}>
        <button
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-7 text-left cursor-pointer"
        >
          <span className={`text-base font-semibold leading-snug transition-colors duration-300 md:text-lg ${isOpen ? "text-white" : "text-foreground/60"}`}>
            {item.q}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-1 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground/30"}`}
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-8 text-base leading-relaxed text-foreground/50 font-medium">{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

// ─── Step Card ─────────────────────────────────────────────────────────────

function StepCard({ step, index, onHover }: { step: typeof processSteps[0]; index: number; onHover: (id: string | null) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(step.step)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col gap-10"
    >
      <div className="flex items-baseline gap-6 leading-none">
        <span className="font-satoshi text-6xl text-primary/20 md:text-8xl transition-all duration-700 group-hover:text-primary/40 group-hover:scale-105 leading-none">
          {step.step}
        </span>
        <div className="h-px flex-1 bg-white/[0.06] transition-all duration-700 group-hover:bg-primary/40 group-hover:scale-x-105 origin-left" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 mb-3 block">{step.tagline}</span>
            <h3 className="text-3xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl transition-colors duration-500 group-hover:text-white">
              {step.title}
            </h3>
          </div>

          <p className="max-w-xl text-md md:text-lg text-foreground/50 leading-relaxed font-medium transition-colors duration-500 group-hover:text-foreground/75">
            {step.description}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6">
            {step.details.map((detail) => (
              <div key={detail} className="flex items-center gap-3">
                <CheckCircle2 size={14} className="text-primary/40 transition-colors duration-500 group-hover:text-primary" strokeWidth={2} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Image */}
        <div className="hidden lg:block relative aspect-square overflow-hidden rounded-2xl border border-white/[0.07]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${step.color} 0%, transparent 70%)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  const heroRef = useRef(null);
  const processRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.92]);

  const { scrollYProgress: lineScroll } = useScroll({ target: processRef, offset: ["start 80%", "end 20%"] });
  const lineScaleY = useTransform(lineScroll, [0, 1], [0, 1]);

  return (
    <div className="bg-background text-foreground overflow-clip">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-white" style={{ left: `${(i + 1) * (100 / 7)}%` }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,68,255,0.07)_0%,transparent_65%)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 flex flex-col items-center gap-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              How We Work
            </span>
          </FadeIn>
          <div className="space-y-2">
            <RevealLine><h1 className="text-[clamp(1.8rem,5vw,6rem)] font-black uppercase tracking-tighter leading-[0.88]">Five phases. Every project.</h1></RevealLine>
            <RevealLine delay={0.1}><h1 className="text-[clamp(1.8rem,5vw,6rem)] font-satoshi font-normal italic text-primary leading-[0.88]">Because winging it is expensive.</h1></RevealLine>
          </div>
          <FadeIn delay={0.3} className="max-w-2xl">
            <p className="text-base md:text-xl text-foreground/40 font-medium leading-relaxed">
              We've refined how we work across 100+ projects in 15+ industries. The result is a process that's clear, repeatable, and - most importantly - designed to actually deliver. No black boxes. No surprises. Just a visible path from where you are to where you want to be.
            </p>
          </FadeIn>
        </motion.div>

      </section>

      {/* ── INTRO STRIP ───────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn className="border-y border-white/[0.06] py-10">
            <div className="grid grid-cols-3 gap-6 md:grid-cols-5">
              {processSteps.map((s) => (
                <div key={s.step} className="group flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-primary/40 group-hover:text-primary transition-colors duration-300">{s.step}</span>
                  <div className="h-px flex-1 bg-white/[0.06] group-hover:bg-primary/30 transition-colors duration-500" />
                  <span className="hidden md:block text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/25 group-hover:text-foreground/60 transition-colors duration-300">{s.title}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS STEPS ─────────────────────────────────────────── */}
      <section ref={processRef} className="relative px-6 pt-24 pb-32 md:px-12 lg:px-20 overflow-clip">
        <div className="mx-auto max-w-[1600px] grid gap-24 lg:grid-cols-[1fr_1.2fr] items-start">

          {/* Left Side: Sticky Title & Info */}
          <div className="lg:sticky lg:top-48 lg:h-fit space-y-12">
            <div className="space-y-6">
              <RevealLine>
                <h2 className="text-5xl font-black uppercase tracking-tighter md:text-6xl lg:text-7xl leading-none">
                  The Digital <br />
                  <span className="font-satoshi font-normal italic text-primary">Mastery</span> <br />
                  Process
                </h2>
              </RevealLine>
            </div>

            <FadeIn delay={0.2}>
              <p className="max-w-md text-lg leading-relaxed text-foreground/40 font-medium">
                We&apos;ve refined our methodology over a decade to ensure every project is launched with clinical precision and creative flair.
              </p>
            </FadeIn>

            <div className="hidden lg:flex flex-col gap-8">
              {processSteps.map((s) => {
                const isHovered = hoveredStep === s.step;
                return (
                  <div
                    key={s.step}
                    className={cn(
                      "flex items-center gap-6 transition-all duration-500",
                      isHovered ? "opacity-100 translate-x-4" : "opacity-20 translate-x-0"
                    )}
                    onMouseEnter={() => setHoveredStep(s.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <span className={cn(
                      "text-xs font-bold font-mono transition-colors duration-500",
                      isHovered ? "text-primary scale-110" : "text-foreground"
                    )}>
                      {s.step}
                    </span>
                    <div className={cn(
                      "h-px transition-all duration-500 origin-left",
                      isHovered ? "bg-primary w-24 scale-x-125" : "bg-foreground w-12 opacity-30"
                    )} />
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
                      isHovered ? "text-primary translate-x-2 opacity-100" : "text-foreground opacity-0"
                    )}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Step Progression */}
          <div className="space-y-32 md:space-y-48">
            {processSteps.map((step, index) => (
              <StepCard
                key={step.step}
                step={step}
                index={index}
                onHover={setHoveredStep}
              />
            ))}
          </div>
        </div>

        {/* Decorative vertical line */}
        <div className="absolute left-[calc(100%/2.2)] top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      </section>

      {/* ── WHY IT WORKS ──────────────────────────────────────────── */}
      <section className="relative px-6 py-32 md:px-12 lg:px-20 bg-zinc-950/30 overflow-hidden">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20">
            <RevealLine><h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] md:text-7xl">Why It Works</h2></RevealLine>
            <RevealLine delay={0.08}><h2 className="text-5xl font-satoshi font-normal italic text-primary leading-[0.9] md:text-7xl">Every Time.</h2></RevealLine>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "You always know where things stand.", body: "Regular check-ins, shared timelines, documented deliverables. You're never in the dark about where your project is - or waiting on a response to find out." },
              { num: "02", title: "Strategy and execution stay connected.", body: "The people who planned your project are involved in building it. No briefing gaps. No 'that's not what we discussed.' What was planned is what gets built." },
              { num: "03", title: "We stay when others leave.", body: "Most agencies stop at launch. We treat launch as the beginning - because that's when the real data starts coming in and the real optimization starts." },
            ].map((card, i) => (
              <FadeIn key={card.num} delay={i * 0.1} className="h-full">
                <div className="group relative h-full flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-zinc-950 to-zinc-900 p-10 transition-all duration-500 hover:border-primary/25">
                  <span className="font-satoshi text-6xl italic text-primary/10 group-hover:text-primary/25 transition-colors duration-700 leading-none">{card.num}</span>
                  <h3 className="mt-4 text-xl font-black uppercase tracking-tighter">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/45 font-medium">{card.body}</p>
                  <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/15" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>


      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="relative px-6 py-32 md:px-12 lg:px-20 overflow-hidden">
        <div className="mx-auto max-w-[1600px] flex flex-col items-center gap-24">
          <div className="space-y-8 text-center flex flex-col items-center">
            <RevealLine>
              <h2 className="max-w-4xl text-5xl font-black uppercase tracking-tighter leading-[0.9] md:text-7xl">
                Questions people ask <br className="hidden md:block" /> before they start.
              </h2>
            </RevealLine>
          </div>

          <div className="w-full max-w-4xl">
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                isOpen={openFaqIndex === i}
                onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              />
            ))}
            <div className="border-t border-white/[0.07]" />
          </div>
          <FadeIn delay={0.3}>
            <Link href="/contact" className="group inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors duration-300">
              Ask something else
              <span className="h-8 w-8 rounded-full border border-border flex items-center justify-center transition-all group-hover:border-primary group-hover:translate-x-2"><ArrowUpRight size={14} /></span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 lg:px-20 bg-zinc-950/30 overflow-hidden">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[40px] border border-white/[0.07] bg-gradient-to-br from-[#050a15] to-[#01020a] p-12 md:p-20">
              <div className="pointer-events-none absolute -top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative z-10 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-5">
                  <RevealLine>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-[0.9] md:text-6xl">
                      Ready to{" "}<span className="font-satoshi font-normal italic text-primary">actually start?</span>
                    </h2>
                  </RevealLine>
                  <FadeIn delay={0.2}><p className="text-lg text-foreground/40 leading-relaxed font-medium">Tell us about your project and we'll come back with a clear path forward - scope, timeline, team, and an honest estimate. No pitch deck. No jargon. Just what makes sense for you.</p></FadeIn>
                </div>
                <FadeIn delay={0.35} className="flex-shrink-0">
                  <Link href="/contact" className="group inline-flex items-center gap-4 rounded-full bg-primary px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,68,255,0.3)]">
                    Start the Brief
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </FadeIn>
              </div>
              <motion.div animate={{ x: ["-120%", "220%"] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-25deg]" />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
