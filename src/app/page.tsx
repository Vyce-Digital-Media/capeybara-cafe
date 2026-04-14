"use client";

import { useState, useEffect } from "react";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/MarqueeStrip";
import { FlowingMenuSection } from "@/components/FlowingMenuSection";
import { CraftSection } from "@/components/CraftSection";
import { SignatureSection } from "@/components/SignatureSection";
import { GalleryTeaser } from "@/components/GalleryTeaser";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisitCTA } from "@/components/VisitCTA";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Intro always plays on fresh load. We only skip it if same-session
  // internal navigation brought us back (sessionStorage flag set by handleIntroComplete).
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("introSeen") === "true";
    if (alreadySeen) {
      setIntroComplete(true);
    }
    // Clear the flag so next hard refresh plays the animation again.
    sessionStorage.removeItem("introSeen");
  }, []);

  const handleIntroComplete = () => {
    // Mark seen for the current session's client-side navigation only.
    sessionStorage.setItem("introSeen", "true");
    setIntroComplete(true);
  };

  return (
    <>
      <CustomCursor />
      {!introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      <Navbar />

      <AnimatePresence>
        <motion.div
          key="content"
          initial={introComplete ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: introComplete ? 0 : 0.5 }}
          className={!introComplete ? "pointer-events-none" : ""}
        >
          <main>
            <HeroSection />
            <FlowingMenuSection />
            <CraftSection />
            <SignatureSection />
            <GalleryTeaser />
            <TestimonialsSection />
            <StatsStrip />
            <VisitCTA />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
