"use client";

import OrbCluster from "@/components/three/OrbCluster";

export default function OrbShowcase() {
  return (
    <section className="bg-background px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 rounded-3xl border border-border bg-muted/20 p-2 md:order-1 md:p-4">
          <OrbCluster />
        </div>
        <div className="order-1 md:order-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Product & launch</p>
          <h2 className="mt-5 text-3xl font-bold uppercase tracking-tighter text-foreground md:text-4xl">
            Launch systems <span className="font-satoshi lowercase text-primary">with depth</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/55 md:text-base">
            Borrowing patterns from studios like Instrument and Active Theory, we pair cinematic motion with pragmatic
            component libraries — so marketing can iterate while engineering stays stable.
          </p>
        </div>
      </div>
    </section>
  );
}
