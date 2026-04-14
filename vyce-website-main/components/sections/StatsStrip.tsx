"use client";

import React, { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Years in market", value: 8, suffix: "+" },
  { label: "Launch partners", value: 120, suffix: "" },
  { label: "Awards & features", value: 24, suffix: "" },
  { label: "Avg. project timeline", value: 16, prefix: "10-", suffix: " wk" },
];

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 60,
    damping: 20,
  });

  const displayValue = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toString().padStart(2, "0")}${suffix}`
  );

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className="font-satoshi font-bold text-4xl text-foreground md:text-5xl">
      {displayValue}
    </motion.span>
  );
}

export default function StatsStrip() {
  return (
    <section className="border-y border-border bg-muted/5 px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-[1600px] gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-3 border-border/20 sm:border-l sm:pl-10 first:sm:border-l-0 first:sm:pl-0">
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
