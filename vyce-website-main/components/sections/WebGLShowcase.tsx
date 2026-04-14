"use client";

import LatticeField from "@/components/three/LatticeField";

export default function WebGLShowcase() {
  return (
    <section className="border-y border-border bg-background px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Immersive layer</p>
          <h2 className="mt-5 font-satoshi font-bold text-3xl leading-tight text-foreground md:text-4xl">
            WebGL moments that feel tactile — built for performance-first storytelling.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/55 md:text-base">
            We choreograph depth, light, and motion so your brand reads as confident and contemporary — without
            sacrificing frame budgets or accessibility. Each scene is authored to degrade gracefully on lighter
            devices.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-foreground/50">
            <li className="flex gap-2">
              <span className="text-primary">—</span> Shader-led hero forms & product reveals
            </li>
            <li className="flex gap-2">
              <span className="text-primary">—</span> Scroll-synced spatial transitions
            </li>
            <li className="flex gap-2">
              <span className="text-primary">—</span> Reduced-motion aware fallbacks
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-muted/20 p-2 md:p-4">
          <LatticeField />
        </div>
      </div>
    </section>
  );
}
