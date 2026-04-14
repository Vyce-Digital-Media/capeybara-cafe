"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "Deep diving into your brand's essence and target audience to define a clear strategic direction.",
    details: ["Audit & Research", "Competitor Analysis", "Brand Positioning", "User Persona Mapping"]
  },
  {
    step: "02",
    title: "Plan",
    description: "Mapping out the digital blueprint, from user experience paths to core technological foundations.",
    details: ["Architecture Design", "UX Workflows", "Tech Stack Selection", "Project Scoping"]
  },
  {
    step: "03",
    title: "Create",
    description: "Crafting visual identities and interactive prototypes that marry aesthetic luxury with peak functionality.",
    details: ["Visual Identity", "UI Systems", "Interactive Prototypes", "Motion Direction"]
  },
  {
    step: "04",
    title: "Launch",
    description: "Coding high-performance, smooth, and scalable digital ecosystems with meticulous attention to detail.",
    details: ["Frontend Craft", "Backend Systems", "Performance Tuning", "Quality Assurance"]
  },
  {
    step: "05",
    title: "Grow",
    description: "Coding high-performance, smooth, and scalable digital ecosystems with meticulous attention to detail.",
    details: ["Frontend Craft", "Backend Systems", "Performance Tuning", "Quality Assurance"]
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative bg-background py-32 md:py-48" id="process">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-24 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Side: Sticky Title & Info */}
          <div className="lg:sticky lg:top-48 lg:h-fit space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">How we work</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                No black boxes. <br />
                <span className="font-satoshi font-normal italic text-primary/80">No surprise invoices.</span> <br />
                No "we'll figure it out as we go."
              </h2>
            </div>

            <p className="max-w-md text-md leading-relaxed text-foreground/40 font-medium">
              Every project runs through the same five phases - Understand, Plan, Create, Launch, Grow. The last one is where most agencies check out. It's where we double down.
            </p>


          </div>

          {/* Right Side: Step Progression */}
          <div className="space-y-32 md:space-y-48">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-10"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-satoshi font-black text-6xl text-primary/20 md:text-8xl transition-colors duration-500 group-hover:text-primary">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/40" />
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter md:text-5xl lg:text-6xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xl text-lg md:text-xl text-foreground/50 leading-relaxed font-medium">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 group-hover:text-foreground/60 transition-colors">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-[calc(100%/2.2)] top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-border/20 to-transparent hidden lg:block" />
    </section>
  );
}
