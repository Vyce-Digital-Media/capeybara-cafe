"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import { FanCard } from "@/components/ui/FanCard";
import { cn } from "@/lib/utils";

const categories = ["All Projects", "Motion & Animation", "Branding", "Visual Storytelling", "Web Development", "Architectural Experiences", "Growth & Social"];

const projects = [
  {
    id: 1,
    title: "Aura Luxury",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
  },
  {
    id: 2,
    title: "Elysian Space",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
  },
  {
    id: 3,
    title: "Vortex Motion",
    category: "Motion & Animation",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000",
  },
  {
    id: 4,
    title: "Lumina Archive",
    category: "Architectural Experiences",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000",
  },
  {
    id: 5,
    title: "Nova Horizon",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000",
  },
  {
    id: 6,
    title: "Eco Sphere",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000",
  }
];

export default function FanPortfolio() {
  const [filter, setFilter] = useState("All Projects");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Animation state
  const [isPaused, setIsPaused] = useState(false);
  const driftX = useMotionValue(0);
  const springDriftX = useSpring(driftX, { stiffness: 50, damping: 20 });

  // Mouse tracking for parallax influence
  const mouseX = useMotionValue(0.5);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });

  // Idle motion drift (Faster speed as requested)
  useAnimationFrame((time, delta) => {
    if (!isPaused) {
      const speed = -0.05;
      const currentX = driftX.get();
      const limit = 300;

      let nextX = currentX + speed * delta;
      if (nextX < -limit) nextX = limit;

      driftX.set(nextX);
    }
  });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, width } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    mouseX.set(x);
  };

  const filteredProjects = filter === "All Projects"
    ? projects
    : projects.filter((p) => p.category === filter);

  // Find index of hovered card to calculate "Neighbor Push"
  const hoveredIndex = filteredProjects.findIndex(p => p.id === hoveredId);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative z-10 overflow-hidden bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-6 text-center md:px-12 lg:px-16">
        <div className="mb-20 flex flex-col items-center space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground sm:text-6xl md:text-[10rem] lg:text-[12rem] whitespace-nowrap">
            Portfolio
          </h2>

          {/* Category Filter Buttons with Borders */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full border transition-all duration-500",
                  filter === cat
                    ? "border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "border-white/5 bg-white/5 text-foreground/40 hover:border-white/20 hover:text-foreground"
                )}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.4em]">
                  {cat}
                </span>
                {filter === cat && (
                  <motion.div
                    layoutId="filter-dot-shelf"
                    className="h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Bookshelf Container with Extreme Depth & Neighbor Push */}
        <div
          className="relative flex min-h-[650px] items-center justify-center pt-12"
          style={{ perspective: "3500px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ x: springDriftX, transformStyle: "preserve-3d" }}
            className="relative flex items-center justify-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, i) => {
                const center = (filteredProjects.length - 1) / 2;

                // Increased Gap: Spaced out (380px) to fill horizontal width and avoid overlap
                let xPos = (i - center) * 380;

                // Neighbor Push Logic (Subtle now that they are spaced)
                if (hoveredIndex !== -1 && hoveredId !== project.id) {
                  const pushDistance = 40;
                  if (i < hoveredIndex) xPos -= pushDistance;
                  if (i > hoveredIndex) xPos += pushDistance;
                }

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: xPos,
                      zIndex: hoveredId === project.id ? 500 : filteredProjects.length - Math.abs(i - center)
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 180, damping: 25 }}
                    className="absolute"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FanCard
                      index={i}
                      total={filteredProjects.length}
                      {...project}
                      mouseX={springMouseX}
                      scrollUnfold={useMotionValue(1)}
                      isHovered={hoveredId === project.id}
                      onHover={(h) => {
                        setHoveredId(h ? project.id : null);
                        setIsPaused(h);
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 blur-[120px]" />
    </section>
  );
}
