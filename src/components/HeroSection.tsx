"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <div
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Video/Webp */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src="/hero-video.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.02] transform origin-center animate-[slowPan_20s_ease-in-out_infinite_alternate]"
        />
        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-charcoal/40 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto mt-12 md:mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] mb-6 drop-shadow-2xl tracking-tight"
          style={{ fontFamily: 'var(--font-aboreto), cursive' }}
        >
          Coffee That <br />
          <span className="text-gold italic opacity-90 font-semibold tracking-normal">Carries a Story</span> <br />
          For Lifetimes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-cream/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md tracking-wide"
        >
          Each CapeyBara brew is handcrafted by master baristas — made to be savoured on the days that matter most, and every quiet day in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href="https://drive.google.com/file/d/1_OMH4MZ6QWK_n1wl7evbGFPbVhBI27DH/view"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase px-10 py-4 bg-gold text-white hover:bg-white hover:text-charcoal transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(212,168,83,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            Explore The Menu
          </a>
          <Link
            href="/#"
            className="font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase px-10 py-4 border border-white/40 text-white hover:bg-white hover:text-charcoal transition-all duration-500 rounded-sm backdrop-blur-sm"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
