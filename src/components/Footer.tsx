"use client";

import { useRef }         from "react";
import { useGSAP }        from "@gsap/react";
import gsap               from "gsap";
import { ScrollTrigger }  from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE = [
  { label: "Home",      href: "#"        },
  { label: "Our Story", href: "#about"   },
  { label: "Menu",      href: "#menu"    },
  { label: "Gallery",   href: "#gallery" },
  { label: "Visit Us",  href: "#visit"   },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/capeybara.srt" },
  { label: "Google Maps", href: "#" },
  { label: "WhatsApp",  href: "#"  },
];

/* Magnetic link — cursor attraction effect */
function MagneticLink({
  href, children, id, target, rel,
}: {
  href: string; children: React.ReactNode; id?: string;
  target?: string; rel?: string;
}) {
  const ref  = useRef<HTMLAnchorElement>(null);
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const sx   = useSpring(x, { stiffness: 250, damping: 22 });
  const sy   = useSpring(y, { stiffness: 250, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.38;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.38;
    x.set(dx);
    y.set(dy);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      id={id}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group font-body text-stone hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 inline-flex"
    >
      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-gold text-xs">→</span>
      {children}
    </motion.a>
  );
}

export function Footer() {
  const goldLineRef = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Gold top line draws in from centre
    gsap.from(goldLineRef.current, {
      scaleX: 0,
      transformOrigin: "center center",
      duration: 1.3,
      ease: "power2.out",
      scrollTrigger: { trigger: goldLineRef.current, start: "top 98%" },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-ivory overflow-hidden">

      {/* ── Animated gold top border ─────────────────────── */}
      <div ref={goldLineRef} className="h-px bg-gold origin-center" />

      {/* ── Watermark ────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <p className="font-display text-[17vw] text-charcoal/[0.10] leading-none whitespace-nowrap">
          CapeyBara
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

        {/* ── Top grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src="/logo.jpg" alt="CapeyBara" className="w-16 h-16 rounded-full mb-6 border border-gold/30 drop-shadow-[0_0_15px_rgba(212,168,83,0.3)]" />
            <p className="font-display text-charcoal text-2xl mb-2">CapeyBara</p>
            <p className="font-body text-gold text-[9px] tracking-[0.3em] uppercase mb-6">
              Café · Sorbet · More
            </p>
            <p className="font-body text-stone text-sm leading-relaxed max-w-xs">
              A sanctuary for coffee lovers in the heart of Surat. Every sip, a story.
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <p className="text-gold text-[9px] tracking-[0.42em] uppercase font-body mb-7">Explore</p>
            <ul className="flex flex-col gap-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <MagneticLink href={l.href} id={`footer-${l.label.toLowerCase().replace(" ", "-")}`}>
                    {l.label}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="text-gold text-[9px] tracking-[0.42em] uppercase font-body mb-7">Connect</p>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map((l) => (
                <li key={l.label}>
                  <MagneticLink
                    href={l.href}
                    id={`footer-${l.label.toLowerCase()}`}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {l.label}
                  </MagneticLink>
                </li>
              ))}
            </ul>

            {/* Instagram handle */}
            <div className="mt-8 p-5 border border-charcoal/10 rounded-sm hover:border-gold/50 transition-colors duration-300">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-stone mb-2">Follow</p>
              <a
                href="https://www.instagram.com/capeybara.srt"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-ig-handle"
                className="font-display text-xl text-charcoal hover:text-gold transition-colors duration-300"
              >
                @capeybara.srt
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ───────────────────────────────────────── */}
        <div className="h-px bg-charcoal/10 mb-8" />

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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
