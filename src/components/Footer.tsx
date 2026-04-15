"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE = [
  { label: "Home", href: "#" },
  { label: "Our Story", href: "#" },
  { label: "Menu", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Visit Us", href: "#" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/capeybara.srt" },
  { label: "Google Maps", href: "#" },
  { label: "WhatsApp", href: "#" },
];

/* Magnetic link — cursor attraction effect */
function SideShiftLink({
  href, children, id, target, rel,
}: {
  href: string; children: React.ReactNode; id?: string;
  target?: string; rel?: string;
}) {
  return (
    <motion.a
      href={href}
      id={id}
      target={target}
      rel={rel}
      whileHover={{ x: 8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group font-body text-stone hover:text-gold text-sm transition-colors duration-300 flex items-center justify-center gap-2"
    >
      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold text-xs">→</span>
      {children}
    </motion.a>
  );
}

export function Footer() {
  const goldLineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(goldLineRef.current, {
      scaleX: 0,
      transformOrigin: "center center",
      duration: 1.3,
      ease: "power2.out",
      scrollTrigger: { trigger: goldLineRef.current, start: "top 98%" },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-ivory overflow-hidden h-full flex flex-col">

      {/* ── Animated gold top border ─────────────────────── */}
      <div ref={goldLineRef} className="h-px bg-gold origin-center shrink-0" />

      {/* ── Watermark ────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <p className="font-display text-[17vw] text-charcoal/[0.07] leading-none whitespace-nowrap">
          CapeyBara
        </p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 mt-12 lg:px-12 py-12">

        {/* ── Brand block — centred ─────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/logo.jpg"
            alt="CapeyBara"
            className="w-16 h-16 rounded-full mb-4 border border-gold/30 drop-shadow-[0_0_20px_rgba(212,168,83,0.35)]"
          />
          <p className="font-display text-charcoal text-3xl mb-1">CapeyBara</p>
          <p className="font-body text-gold text-[10px] tracking-[0.35em] uppercase mb-4">
            Café · Coffee · More
          </p>
          <p className="font-body text-stone text-sm leading-relaxed max-w-sm">
            A sanctuary for coffee lovers in the heart of Surat. Every sip, a story.
          </p>

          {/* Gold divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* ── Nav links — centred columns ───────────────────── */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-12 sm:gap-24 mb-12 w-full">

          {/* Explore */}
          <motion.div
            className="flex flex-col items-center gap-3 min-w-[120px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-0.5">Explore</p>
            <ul className="flex flex-col items-center gap-2">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <SideShiftLink href={l.href} id={`footer-${l.label.toLowerCase().replace(" ", "-")}`}>
                    {l.label}
                  </SideShiftLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            className="flex flex-col items-center gap-3 min-w-[140px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-0.5">Connect</p>
            <ul className="flex flex-col items-center gap-2">
              {SOCIALS.map((l) => (
                <li key={l.label}>
                  <SideShiftLink
                    href={l.href}
                    id={`footer-${l.label.toLowerCase()}`}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {l.label}
                  </SideShiftLink>
                </li>
              ))}
            </ul>

            {/* Instagram handle */}
            <div className="mt-2 p-3 border border-charcoal/10 rounded-xl hover:border-gold/50 transition-colors duration-300 text-center">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-stone mb-1">Follow</p>
              <a
                href="https://www.instagram.com/capeybara.srt"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-ig-handle"
                className="font-display text-lg text-charcoal hover:text-gold transition-colors duration-300"
              >
                @capeybara.srt
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ───────────────────────────────────────── */}
        <div className="w-full max-w-md h-px bg-charcoal/5 mb-8" />

        {/* ── Bottom bar — centred ──────────────────────────── */}
        <div className="flex flex-col items-center gap-2 text-center opacity-80">
          <p className="font-body text-stone text-[10px] tracking-[0.18em]">
            © {new Date().getFullYear()} CapeyBara. All rights reserved.
          </p>
          <p className="font-body text-stone text-[10px] tracking-[0.18em]">
            Surat · Gujarat · India
          </p>
        </div>
      </div>
    </footer>
  );
}
