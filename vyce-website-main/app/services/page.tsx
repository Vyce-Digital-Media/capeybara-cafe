"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Palette,
  Globe,
  Smartphone,
  BarChart,
  Layers,
  Code,
  ArrowRight,
  CheckCircle2,
  Send,
  CodeXml,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Data ──────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    title: "Branding & Identity",
    icon: Palette,
    iconColor: "rgba(255, 60, 0, 0.15)",
    summary:
      "Your brand is the first impression, the last memory, and everything in between.",
    description:
      "Before anyone buys from you, they judge you. Logo, color, typography, tone of voice - all of it sends a signal before a single word is read. We make sure that signal says exactly what your business deserves to say.",
    deliverables: [
      "Brand strategy & positioning",
      "Logo & visual identity system",
      "Color palette, typography & design tokens",
      "Brand voice & messaging guide",
      "Brand guidelines document",
    ],
    href: "/services/branding",
  },
  {
    num: "02",
    title: "Website Design & Development",
    icon: CodeXml,
    iconColor: "rgba(0, 200, 255, 0.15)",
    summary:
      "If your website isn't bringing in leads, it's not a website. It's a bill you pay every year.",
    description:
      "A website that looks great but doesn't convert is just expensive decoration. We design and build websites that do both - premium aesthetics and actual business performance. Fast load times, mobile-first, SEO-ready, and built with a clear conversion path so visitors know exactly what to do next.",
    deliverables: [
      "UX strategy & sitemap",
      "UI design (desktop + mobile)",
      "Frontend & backend development",
      "On-page SEO foundations",
      "Speed & performance optimization",
    ],
    href: "/services/web-experiences",
  },
  {
    num: "03",
    title: "UI/UX & PRODUCT DESIGN",
    icon: Smartphone,
    iconColor: "rgba(180, 0, 255, 0.15)",
    summary:
      "If users need a tutorial to understand your interface, something went wrong in the design phase.",
    description:
      "Good design is invisible. Users shouldn't notice the navigation - they should just effortlessly end up where they need to be. We design interfaces, app flows, dashboards, and product experiences that feel intuitive, not figuring-it-out.",
    deliverables: [
      "User research & persona mapping",
      "UX flows & wireframes",
      "High-fidelity UI design",
      "Interactive prototyping",
      "Usability testing & iteration",
    ],
    href: "/services/product-design",
  },
  {
    num: "04",
    title: "Performance Marketing",
    icon: BarChart,
    iconColor: "rgba(255, 200, 0, 0.15)",
    summary:
      "Ads that don't return money aren't ads. They're donations to Meta and Google.",
    description:
      "We've turned ₹2 lakhs in ad spend into ₹20 lakhs in sales. In one year. For one client. That's not luck - that's what happens when campaigns are built on proper strategy, tested creatives, and relentless optimization.",
    deliverables: [
      "Campaign strategy & audience mapping",
      "Ad copy & creative production (static + video)",
      "Campaign setup, targeting & launch",
      "A/B testing & ongoing optimization",
      "Weekly performance reporting",
    ],
    href: "/services/digital-growth",
  },
  {
    num: "05",
    title: "Social Media Management",
    icon: Send,
    iconColor: "rgba(255, 60, 0, 0.15)",
    summary:
      "Posting without a strategy is just noise. There's enough of that already.",
    description:
      "Social media that works isn't about volume - it's about relevance. The right content, on the right platform, to the right audience, at the right time. We handle the strategy, the creation, and the execution so you can stop spending three hours on a reel that gets twelve likes.",
    deliverables: [
      "Monthly content strategy & calendar",
      "Reel & short-form video production",
      "Carousel & static creative design",
      "Caption & copy writing",
      "Community management & engagement",
    ],
    href: "/services/",
  },
  {
    num: "06",
    title: "SEO",
    icon: Globe,
    iconColor: "rgba(0, 200, 255, 0.15)",
    summary:
      "Your customers are searching for exactly what you offer. They're just finding your competitors first.",
    description:
      "SEO isn't magic and it isn't fast. But it is the most sustainable, compounding investment you can make in your brand's online visibility. We handle the technical foundation, the on-page optimization, the content strategy, and the link building - so you rank for searches that actually send you business.",
    deliverables: [
      "Full SEO audit & strategy",
      "Technical SEO fixes",
      "On-page optimization",
      "Keyword research & content strategy",
      "Link building & authority building",
    ],
    href: "/services/",
  },
];

const phases = [
  {
    step: "01",
    title: "Project-Based",
    detail:
      "A defined scope, a clear timeline, and a fixed deliverable. Ideal for brand builds, website launches, and one-time campaigns.",
  },
  {
    step: "02",
    title: "Retainer",
    detail:
      "An ongoing partnership for consistent growth - monthly strategy, execution, and reporting. Ideal for social media, SEO, and performance marketing.",
  },
  {
    step: "03",
    title: "Consultation",
    detail:
      "A focused strategy session if you need direction before commitment. We'll tell you exactly what we'd do if it were our business.",
  },
];

// ─── Animation Primitives ─────────────────────────────────────────────────

function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Service Card (horizontal full-bleed rows with stagger) ──────────────

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // 3D tilt on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(e.clientY / rect.height - rect.top / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;
  const isEven = index % 2 === 0;

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: "-10%" },
          {
            y: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group w-full max-w-[1600px] mx-auto px-4 md:px-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-zinc-950 p-6 md:p-12 min-h-[280px] md:min-h-[340px] transition-all duration-700 hover:border-primary/25 hover:shadow-[0_40px_80px_-20px_rgba(0,10,30,0.8)] flex items-center justify-center"
      >
        <div
          ref={bgRef}
          className="absolute -inset-[20%] z-0 bg-gradient-to-br from-zinc-950 to-zinc-900/80 pointer-events-none"
        />

        {/* Animated glow */}
        <div
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isEven ? "20% 50%" : "80% 50%"}, ${service.iconColor.replace("0.15", "0.08")} 0%, transparent 60%)`,
          }}
        />

        {/* Sweeping light */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent skew-x-[-25deg] z-0"
        />

        <div className={`relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-center ${isEven ? "" : "lg:flex-row-reverse"} max-w-7xl mx-auto`}>
          {/* Left column */}
          <div className="flex flex-col items-center text-center gap-8 lg:w-[45%]">
            <div className="flex flex-col items-center justify-center gap-6">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30"
                style={{ background: service.iconColor }}
              >
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <span className="font-satoshi text-[4rem] leading-none text-foreground/[0.2] md:text-[6rem]">
                {service.num}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl lg:text-6xl leading-[0.95]">
                {service.title}
              </h2>
              <p className="text-lg font-medium leading-relaxed text-foreground/40 md:text-xl italic font-satoshi">
                {service.summary}
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent mx-4" />

          {/* Right column */}
          <div className="flex flex-col items-center text-center gap-8 lg:flex-1">
            <p className="text-sm border-white/5 pb-2 leading-relaxed text-foreground/55 md:text-base lg:text-lg font-medium tracking-tight">
              {service.description}
            </p>

            <div className="w-full">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.6em] text-primary/40">
                Typical Deliverables
              </p>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 text-primary/40"
                      strokeWidth={2}
                    />
                    <span className="text-base font-medium text-foreground/45 transition-colors duration-300 group-hover:text-foreground/70">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <Link
                href={service.href}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-primary/10 border border-primary/20 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-all duration-500 hover:bg-primary hover:text-background hover:scale-105"
              >
                View More
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

function DeckingCards({ servicesList, titleNode }: { servicesList: typeof services; titleNode: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.deck-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 12%", // Pin when the title reaches the top
          end: `+=${cards.length * 90}%`,
          pin: true,
          scrub: 1, // Slight scrub delay for smoother feeling
        }
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          // Add a label for this card's entrance
          tl.addLabel(`card-${i}`);

          // Card enters from bottom
          tl.from(card, {
            y: window.innerHeight,
            ease: "power2.out"
          }, `card-${i}`);

          // Simultaneously scale down ALL previous cards
          for (let j = 0; j < i; j++) {
            tl.to(cards[j], {
              scale: "-=0.04", // Shrink further with each new card
              y: "-=15",      // Move up slightly with each new card
              opacity: "-=0.15", // Dim further with each new card
              ease: "power2.out"
            }, `card-${i}`);
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [servicesList]);

  return (
    <div ref={containerRef} className="relative w-full hidden md:block">
      {/* Pinned Title Layer */}
      {titleNode}

      {/* Pinned Stacking Cards Layer */}
      <div className="relative h-[75vh] w-full mt-0 lg:-mt-4">
        {servicesList.map((service, index) => (
          <div
            key={service.num}
            className="deck-card absolute w-full top-0 left-0"
            style={{ zIndex: index + 1 }}
          >
            <ServiceRow service={service} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [hoveredStep, setHoveredStep] = React.useState<string | null>(null);
  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 180]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.93]);

  // Process section scroll-driven line fill
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(processScroll, [0, 1], [0, 1]);

  return (
    <div className="bg-background text-foreground">

      {/* ── 00. HERO ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-32"
      >
        {/* Decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-white"
              style={{ left: `${(i + 1) * (100 / 7)}%` }}
            />
          ))}
        </div>

        {/* Blue radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,68,255,0.07)_0%,transparent_65%)]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 flex flex-col items-center gap-8 text-center mt-16"
        >
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              What We Do
            </span>
          </FadeIn>

          <div className="space-y-2">
            <RevealLine>
              <h1 className="text-[clamp(2rem,5.5vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.88]">
                Six ways we make your
              </h1>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h1 className="text-[clamp(2rem,5.5vw,6.5rem)] font-satoshi font-normal italic text-primary leading-[0.88]">
                brand impossible to ignore.
              </h1>
            </RevealLine>
          </div>

          <FadeIn delay={0.3} className="max-w-2xl">
            <p className="text-base md:text-xl text-foreground/40 font-medium leading-relaxed mb-16">
              Strategy. Design. Content. Web. Ads. SEO. We do all of it. Together. Under one roof. So your entire digital presence actually makes sense - instead of looking like six different teams all doing their own thing.
            </p>
          </FadeIn>

        </motion.div>


      </section>

      {/* ── 01. SERVICE CARDS ─────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 lg:px-20 bg-zinc-950/30 overflow-hidden">
        <div className="mx-auto max-w-[1600px]">
          <DeckingCards
            servicesList={services}
            titleNode={
              <div className="mb-16 flex justify-center w-full text-center">
                <RevealLine>
                  <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] md:text-7xl flex flex-wrap items-center justify-center gap-4">
                    What We Do <span className="font-satoshi font-normal italic text-primary mb-2 md:mb-0">Best.</span>
                  </h2>
                </RevealLine>
              </div>
            }
          />

          {/* Fallback for mobile since pinning is better on desktop */}
          <div className="relative md:hidden flex flex-col gap-8 pb-12 mt-16">
            <div className="mb-8 flex justify-center w-full text-center">
              <RevealLine>
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap items-center justify-center gap-3">
                  What We Do <span className="font-satoshi font-normal italic text-primary mt-1 md:mt-0">Best.</span>
                </h2>
              </RevealLine>
            </div>
            {services.map((service, index) => (
              <ServiceRow key={service.num} service={service} index={index} />
            ))}
          </div>
        </div>


      </section>

      {/* ── 02. PROCESS ───────────────────────────────────────────── */}
      <section
        ref={processRef}
        className="relative px-6 py-32 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-[1600px] grid gap-24 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Sticky left */}
          <div className="lg:sticky lg:top-48 lg:h-fit space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Engagements</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] md:text-7xl">
                How <br />
                <span className="font-satoshi font-normal italic text-primary/80">Engagements</span> <br />
                Work.
              </h2>
            </div>
            <FadeIn delay={0.2}>
              <p className="max-w-md text-lg text-foreground/40 font-medium leading-relaxed">
                Every engagement starts with understanding your actual situation - your goal, your timeline, your budget, and what success looks like for you specifically. Then we recommend what makes the most sense.
              </p>
            </FadeIn>

            {/* Mini step map */}
            <div className="hidden lg:flex flex-col gap-5">
              {phases.map((p) => {
                const isHovered = hoveredStep === p.step;
                return (
                  <div
                    key={p.step}
                    className={cn(
                      "flex items-center gap-5 transition-all duration-500",
                      isHovered ? "opacity-100 translate-x-4" : "opacity-30"
                    )}
                  >
                    <span className={cn(
                      "font-mono text-xs font-bold transition-colors duration-500",
                      isHovered ? "text-primary" : "text-foreground"
                    )}>
                      {p.step}
                    </span>
                    <div className={cn(
                      "h-px transition-all duration-500 origin-left",
                      isHovered ? "bg-primary w-20 scale-x-110" : "bg-foreground w-16"
                    )} />
                    <span className={cn(
                      "text-xs uppercase tracking-widest transition-colors duration-500",
                      isHovered ? "text-primary" : "text-foreground"
                    )}>
                      {p.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Steps with scroll-driven vertical line */}
          <div className="relative">
            {/* Animated vertical line */}
            <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-white/5 lg:block">
              <motion.div
                style={{ scaleY: lineScaleY, transformOrigin: "top" }}
                className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
              />
            </div>

            <div className="space-y-32 md:space-y-48 lg:pl-16">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredStep(phase.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="group relative flex flex-col gap-10"
                >
                  {/* Dot on the line */}
                  <div className="absolute -left-[68px] top-4 hidden h-3 w-3 rounded-full border-2 border-primary/30 bg-background transition-all duration-500 group-hover:border-primary group-hover:bg-primary/20 lg:block" />

                  <div className="flex items-baseline gap-6">
                    <span className="font-satoshi text-6xl text-primary/20 md:text-8xl transition-colors duration-500 group-hover:text-primary">
                      {phase.step}
                    </span>
                    <div className="h-px flex-1 bg-white/10 transition-colors group-hover:bg-primary/40" />
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl">
                      {phase.title}
                    </h3>
                    <p className="max-w-xl text-lg md:text-xl text-foreground/50 leading-relaxed font-medium">
                      {phase.detail}
                    </p>
                    <div className="h-px w-0 bg-primary/30 transition-all duration-700 group-hover:w-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* ── 03. ENGINEERING CALLOUT ───────────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 lg:px-20 bg-zinc-950/30 overflow-hidden">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[40px] border border-white/[0.07] bg-gradient-to-br from-[#050a15] to-[#01020a] p-12 md:p-20">
              {/* Glow orb */}
              <div className="pointer-events-none absolute -top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

              <div className="relative z-10 flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-6">
                  <FadeIn>
                    <div className="flex items-center gap-3">
                      <Code size={16} className="text-primary" strokeWidth={1.5} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">
                        Engineering-Friendly
                      </span>
                    </div>
                  </FadeIn>

                  <RevealLine>
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-[0.9] md:text-6xl">
                      Not sure which services you need?
                      <span className="font-satoshi font-normal italic text-primary">
                        That's exactly what the first conversation is for.
                      </span>
                    </h2>
                  </RevealLine>

                  <FadeIn delay={0.2}>
                    <p className="text-lg leading-relaxed text-foreground/45 md:text-xl">
                      Bring us the problem. We'll figure out the solution - together, honestly, without pushing you toward something you don't need.
                    </p>
                  </FadeIn>

                </div>

                <FadeIn delay={0.4} className="flex-shrink-0">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-4 rounded-full bg-primary px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,68,255,0.3)]"
                  >
                    Book a Free Call
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </FadeIn>
              </div>

              {/* Subtle sweep */}
              <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-25deg]"
              />
            </div>
          </FadeIn>
        </div>


      </section>

    </div>
  );
}
