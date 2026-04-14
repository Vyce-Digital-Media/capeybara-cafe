"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Delivered"
  },
  {
    value: 5,
    prefix: "",
    suffix: "Cr+",
    label: "Revenue Generated for Clients"
  },
  {
    value: 15,
    suffix: "+",
    label: "Industries Served"
  },
  {
    value: 15,
    suffix: "+",
    label: "Team Members"
  },
];

function Counter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 15,
  });

  const displayValue = useTransform(spring, (current) =>
    `${prefix}${Math.round(current).toString()}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span
      ref={ref}
      className="text-5xl font-black tracking-tighter text-white transition-all duration-500 group-hover:text-primary md:text-7xl lg:text-8xl group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,68,255,0.5)]"
    >
      {displayValue}
    </motion.span>
  );
}

export default function StatsBox() {
  return (
    <section className="bg-background px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950/50 p-20 md:p-24">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 md:gap-y-16 lg:gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center text-center md:px-10 group cursor-pointer"
              >
                {/* Vertical Divider for desktop (4 columns) */}
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 h-20 w-px -translate-y-1/2 bg-white/10 hidden lg:block" />
                )}

                {/* Vertical Divider for tablet (2 columns) */}
                {index % 2 !== 0 && (
                  <div className="absolute left-0 top-1/2 h-20 w-px -translate-y-1/2 bg-white/10 hidden sm:block lg:hidden" />
                )}

                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <p className="mt-6 max-w-[200px] text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30 group-hover:text-foreground/80 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Background subtle glow */}
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
