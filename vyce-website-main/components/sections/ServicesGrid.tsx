"use client";

import React from "react";
import ModernCard from "@/components/ui/ModernCard";
import { Laptop, Cpu, Layers, Palette, BarChart3, Zap } from "lucide-react";

const services = [
  {
    title: "Branding & Identity",
    description: "Your brand is the first impression, the last memory, and everything in between. We build brand identities that are strategic before they're aesthetic. Logo, color system, typography, brand voice - crafted to show up consistently and confidently across every touchpoint.",
    icon: Palette,
    color: "rgba(255, 60, 0, 0.15)",
  },
  {
    title: "Social Media Management",
    description: "Posting for the sake of posting is a waste of everyone's time. We don't do that. Platform-aware, audience-first content strategy - not just a calendar filler. Reels, carousels, captions, community management - handled with an actual plan behind every post.",
    icon: Layers,
    color: "rgba(0, 200, 255, 0.15)",
  },
  {
    title: "Website Design & Development",
    description: "Your website is either your best salesperson or your biggest liability. Choose. We design and build websites that look premium and convert visitors into leads. Fast, mobile-first, SEO-ready, and built to actually do something for your business.",
    icon: Code,
    color: "rgba(180, 0, 255, 0.15)",
  },
  {
    title: "Performance Marketing",
    description: "We turned ₹2 lakhs into ₹20 lakhs for one client. Your turn. Meta and Google campaigns built around real outcomes - sales, leads, bookings. Every rupee tracked. Every campaign optimized. No vanity metrics, no vague brand awareness.",
    icon: Cpu,
    color: "rgba(0, 255, 150, 0.15)",
  },
  {
    title: "UI/UX & Product Design",
    description: "If users have to figure out your app, you've already lost them. Interfaces that feel intuitive - for apps, dashboards, products, and packaging. Research-backed, user-tested, friction-free.",
    icon: BarChart3,
    color: "rgba(255, 200, 0, 0.15)",
  },
  {
    title: "SEO",
    description: "Page 2 of Google is basically not existing. Let's fix that. Technical SEO, on-page optimization, content strategy, and link building - so you rank for searches that actually matter to your business. Long-term, sustainable visibility.",
    icon: Zap,
    color: "rgba(255, 0, 100, 0.15)",
  },
];

import { Code } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="bg-zinc-950/40 border-y border-white/[0.02] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24 flex flex-col items-center text-center">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.6em] text-primary">What We Do</p>
          <h2 className="max-w-5xl text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-6xl">
            Everything your brand needs. <br />
            <span className="font-satoshi font-normal lowercase italic text-foreground/70">Nothing it doesn't.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ModernCard
              key={index}
              spotlightColor={service.color}
              className="h-full border-white/[0.05] p-10 md:p-12"
            >
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                <service.icon size={28} strokeWidth={1.5} />
              </div>

              <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed text-foreground/40 md:text-base">
                {service.description}
              </p>

              <div className="mt-auto pt-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:border-primary group-hover:text-primary group-hover:opacity-100">
                  <Zap size={16} />
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
}
