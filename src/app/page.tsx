"use client";

import { useState, useEffect, useCallback } from "react";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FlowingMenuSection } from "@/components/FlowingMenuSection";
import { CraftSection } from "@/components/CraftSection";
import { SignatureSection } from "@/components/SignatureSection";
import { GalleryTeaser } from "@/components/GalleryTeaser";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatsStrip } from "@/components/MarqueeStrip";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FullPageScroll } from "@/components/FullPageScroll";
import { motion, AnimatePresence } from "framer-motion";
import { VisitCTA } from "@/components/VisitCTA";

// ── Section metadata ─────────────────────────────────────────────
const SECTION_LABELS = [
  "Home",
  "Menu",
  "Our Craft",    // 3 internal sub-steps
  "Signature",    // 4 internal sub-steps
  "Gallery",
  "Testimonials",
  "Highlights",
  "Footer",
];

// Must match the order of children passed to FullPageScroll below.
// 1 = single scroll advances immediately; N = N scrolls consumed internally first.
const SECTION_SUB_STEPS = [
  1, // Home
  1, // Menu
  3, // Our Craft  — 3 slides
  1, // Signature  — Internal GSAP smooth scroll
  1, // Gallery
  1, // Testimonials
  1, // Highlights
  1, // Footer
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <CustomCursor />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <Navbar />

      <AnimatePresence>
        <motion.div
          key="content"
          initial={introComplete ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: introComplete ? 0 : 0.5 }}
          className={!introComplete ? "pointer-events-none h-screen overflow-hidden" : "h-screen overflow-hidden"}
        >
          <FullPageScroll
            sectionLabels={SECTION_LABELS}
            sectionSubSteps={SECTION_SUB_STEPS}
          >
            {/* 01 — Hero */}
            <HeroSection />

            {/* 02 — Flowing Menu */}
            <FlowingMenuSection />

            {/* 03 — Our Craft (3 sub-scrolls: Sourced / Brewed / Served) */}
            <CraftSection />

            {/* 04 — Signature Creations (4 sub-scrolls: one per card) */}
            <SignatureSection />

            {/* 05 — Gallery Teaser */}
            <GalleryTeaser />

            {/* 06 — Testimonials */}
            <TestimonialsSection />

            {/* 07 — Stats Strip */}
            <StatsStrip />

            <VisitCTA />

            {/* 08 — Footer */}
            <Footer />
          </FullPageScroll>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
