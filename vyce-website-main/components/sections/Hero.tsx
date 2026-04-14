"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

// ─── Custom Dot Cursor ───────────────────────────────────────────────────

function DotCursor({ isVisible }: { isVisible: boolean }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
    />
  );
}

gsap.registerPlugin(ScrollTrigger);

// ─── Shared mouse state (NDC: -1 to 1 on each axis) ────────────────────────
const mouseNDC = { x: -999, y: -999 };
const currentNDC = { x: -999, y: -999 }; // trailing state

// ─── Particle Swarm with Mouse Repulsion ─────────────────────────────────────
function ParticleSwarm({ count = 4000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Camera fov=60, z=5 → visible half-height = tan(30°)*5 ≈ 2.89, half-width ≈ 5.14 for 16:9
  // Spread particles to exactly cover the full visible frustum with some margin
  const { positions, origins, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;  // ±6 covers full width incl. ultrawide
      const y = (Math.random() - 0.5) * 7;   // ±3.5 covers full viewport height
      const z = (Math.random() - 0.5) * 2;
      positions[i * 3] = origins[i * 3] = x;
      positions[i * 3 + 1] = origins[i * 3 + 1] = y;
      positions[i * 3 + 2] = origins[i * 3 + 2] = z;
    }
    return { positions, origins, velocities };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Trailing mouse logic (produces delay effect)
    if (mouseNDC.x === -999) {
      currentNDC.x = -999;
      currentNDC.y = -999;
    } else if (currentNDC.x === -999) {
      currentNDC.x = mouseNDC.x;
      currentNDC.y = mouseNDC.y;
    } else {
      // Small factor for slow trailing delay (0.5-0.8s effectively)
      currentNDC.x += (mouseNDC.x - currentNDC.x) * 0.05;
      currentNDC.y += (mouseNDC.y - currentNDC.y) * 0.05;
    }

    // Convert trailing NDC → world space at z = 0 plane
    const camera = state.camera as THREE.PerspectiveCamera;
    const fovRad = (camera.fov * Math.PI) / 180;
    const camDist = Math.abs(camera.position.z);
    const halfH = camDist * Math.tan(fovRad / 2);
    const halfW = halfH * camera.aspect;

    const mx = currentNDC.x * halfW;
    const my = currentNDC.y * halfH;

    const REPULSION_R = 2.8;   // world-unit radius
    const REPULSION_F = 0.15;  // max force per frame
    const SPRING = 0.045; // restoring spring strength
    const DAMPING = 0.82;  // velocity damping

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // Slow initial drift
      const driftX = Math.sin(time * 0.3 + i * 0.1) * 0.3;
      const driftY = Math.cos(time * 0.2 + i * 0.1) * 0.3;

      // Spring back toward origin + drift
      const sx = (origins[ix] + driftX - pos[ix]) * SPRING;
      const sy = (origins[ix + 1] + driftY - pos[ix + 1]) * SPRING;
      const sz = (origins[ix + 2] - pos[ix + 2]) * SPRING * 0.3;

      // Repulsion from cursor (2D, ignore z)
      const dx = pos[ix] - mx;
      const dy = pos[ix + 1] - my;

      // Use Manhattan distance to create a diamond/cross shape instead of circle
      const dist = Math.abs(dx) + Math.abs(dy);

      let rx = 0, ry = 0;

      if (dist < REPULSION_R && dist > 0.001) {
        const t = 1 - (dist / REPULSION_R);
        const force = t * t * REPULSION_F;

        // Push outward from center (using euclidean for direction)
        const trueDist = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));
        rx = (dx / trueDist) * force;
        ry = (dy / trueDist) * force;
      }

      velocities[ix] = (velocities[ix] + sx + rx) * DAMPING;
      velocities[ix + 1] = (velocities[ix + 1] + sy + ry) * DAMPING;
      velocities[ix + 2] = (velocities[ix + 2] + sz) * DAMPING;

      pos[ix] += velocities[ix];
      pos[ix + 1] += velocities[ix + 1];
      pos[ix + 2] += velocities[ix + 2];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0044ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Track mouse NDC across the FULL hero section via window-level listener
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Only track while cursor is within the hero section
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const handleWindowMouseLeave = () => {
      mouseNDC.x = -999;
      mouseNDC.y = -999;
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseleave", handleWindowMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(titleLinesRef.current, {
        y: 120,
        opacity: 0,
        rotateX: -40,
        stagger: 0.12,
        duration: 1.6,
        delay: 0.4,
      })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 1.2 }, "-=0.8")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 1 }, "-=0.6")
        .from(scrollRef.current, { opacity: 0, duration: 1.5 }, "-=0.4");

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        scale: 0.96,
        opacity: 0,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex h-dvh min-h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-background ${isHovered ? 'cursor-none' : ''}`}
    >
      <DotCursor isVisible={isHovered} />
      {/* Particle Background */}
      <div className="absolute inset-0 z-[1] opacity-55">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleSwarm />
        </Canvas>
      </div>

      {/* Gradient Overlays — only a subtle bottom fade for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 flex w-full max-w-[1400px] flex-col items-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-0"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 bg-white/5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Surat's Most Referred Digital Marketing Agency
          </span>
        </motion.div>
        {/* Title Block */}
        <h1 className="flex flex-col items-center text-center mt-12">
          <span className="block overflow-hidden">
            <span
              ref={(el) => { titleLinesRef.current[0] = el; }}
              className="inline-block font-satoshi font-black text-[clamp(2.2rem,8vw,9.5rem)] tracking-[-0.04em] leading-[0.95]"
            >
              Your competitors
            </span>
          </span>
          <span className="block overflow-hidden -mt-1">
            <span
              ref={(el) => { titleLinesRef.current[1] = el; }}
              className="inline-block font-satoshi font-black text-primary pb-8 text-[clamp(2.2rem,8vw,9.5rem)] tracking-[-0.03em] leading-[0.85]"
            >
              are eating online.
            </span>
          </span>
          <span className="block overflow-hidden mt-1 md:mt-6">
            <span
              ref={(el) => { titleLinesRef.current[2] = el; }}
              className="inline-block text-[clamp(2rem,4vw,4rem)] font-bold uppercase tracking-[0.02em] leading-[1] text-foreground/80"
            >
              Let's change that.
            </span>
          </span>
        </h1>
      </div>


    </section>
  );
}
