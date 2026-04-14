"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface FanCardProps {
  index: number;
  total: number;
  title: string;
  category: string;
  image: string;
  mouseX: MotionValue<number>;
  scrollUnfold: MotionValue<number>;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

export function FanCard({ 
  index, 
  total, 
  title, 
  category, 
  image, 
  mouseX,
  isHovered,
  onHover 
}: FanCardProps) {
  // Calculate relative index from center
  const center = (total - 1) / 2;
  const relativeIndex = index - center;
  
  // Uniform Tilt: All cards tilt in the same direction for a consistent slanted look
  const baseRotation = -25; 
  
  // Horizontal mouse parallax (subtle sway)
  const xOffset = useTransform(mouseX, [0, 1], [-20, 20]);
  const rotateParallax = useTransform(mouseX, [0, 1], [-2, 2]);

  // Combined rotation
  const finalRotate = useTransform(
    [rotateParallax],
    ([rMouse]) => (baseRotation as number) + (rMouse as number)
  );

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isHovered ? 1 : 0.35, 
        scale: isHovered ? 1.08 : 1,
        z: isHovered ? 350 : 0, // Deep translateZ as requested
        y: isHovered ? -30 : 0 // Upward lift
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      style={{ 
        rotateY: isHovered ? 0 : finalRotate, // Face forward on hover
        x: xOffset,
        transformStyle: "preserve-3d",
        zIndex: isHovered ? 500 : total - Math.abs(relativeIndex)
      }}
      className={cn(
        "group relative h-[380px] w-[270px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 md:h-[500px] md:w-[340px]",
        isHovered && "ring-1 ring-white/20 shadow-[0_45px_100px_rgba(0,0,0,1)]"
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={cn(
          "object-cover transition-all duration-1000 group-hover:scale-105",
          !isHovered && "grayscale opacity-70"
        )}
      />
      
      {/* Title & Indicator Dot for the pick-out experience */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-12 transition-all duration-700",
        isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        <div className="flex flex-col items-start gap-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary/80">{category}</p>
          <div className="flex items-center gap-4">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
            <h3 className="text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Profile light for "spine" - dynamically switches side based on position */}
      <div className={cn(
        "absolute top-0 z-10 h-full w-[2px] bg-gradient-to-b from-white/20 via-transparent to-white/20",
        relativeIndex < 0 ? "right-0" : "left-0",
        !isHovered ? "opacity-100" : "opacity-0"
      )} />
    </motion.div>
  );
}
