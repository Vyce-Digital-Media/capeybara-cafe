"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#" },
  { label: "Menu", href: "https://drive.google.com/file/d/1_OMH4MZ6QWK_n1wl7evbGFPbVhBI27DH/view?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnLfptwr8uBu3xebhfjYSlux0xbXEHSvIUT3BlPnZDxcGaNnSGiYq0Q_gJCWY_aem__9OcuIgoTxLE3wkyKqSLzA" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit Us", href: "/visit" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/capeybara.srt" },
  { label: "Google Maps", href: "#" },
  { label: "WhatsApp", href: "#" },
];

const INFO = [
  { label: "Address", value: "Near Vesu Main Road, Surat, Gujarat", icon: "📍" },
  { label: "Hours", value: "Mon – Sun  ·  8 AM – 11 PM", icon: "🕗" },
  { label: "Phone", value: "+91 98765 43210", icon: "📞" },
  { label: "Email", value: "hello@capeybara.in", icon: "✉️" },
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
      className="group font-body text-stone hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2"
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
    <footer ref={footerRef} className="relative bg-ivory overflow-hidden h-full flex flex-col justify-center mt-16 md:mt-0">

      {/* ── Animated gold top border ─────────────────────── */}
      <div ref={goldLineRef} className="absolute top-0 left-0 right-0 h-px bg-gold origin-center shrink-0 z-20" />

      {/* ── Watermark ────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <p className="font-display text-[17vw] text-charcoal/[0.04] leading-none whitespace-nowrap">
          CapeyBara
        </p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 max-md:py-4 mt-8 md:mt-16 max-md:mt-0">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between max-md:justify-center w-full gap-16 lg:gap-8 max-md:gap-6">

          {/* ── Left Column: Brand block ─────────────────────────── */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left md:w-[30%] shrink-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-16 h-16 rounded-full mb-4 border border-gold/30 drop-shadow-[0_0_20px_rgba(212,168,83,0.35)] overflow-hidden ">
              <Image
                src="/logo.jpg"
                alt="CapeyBara"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <p className="font-display text-charcoal text-3xl mb-1 max-md:text-2xl">CapeyBara</p>
            <p className="font-body text-gold text-[10px] tracking-[0.35em] uppercase mb-4 max-md:mb-2">
              Café · Coffee · More
            </p>
            <p className="font-body text-stone text-sm leading-relaxed max-w-[260px]">
              A sanctuary for coffee lovers in the heart of Surat. Every sip, a story.
            </p>
            <motion.div
              className="h-px bg-gradient-to-r from-gold/50 to-transparent mt-8 w-[120px]"
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          {/* ── Center Column: Nav links ───────────────────── */}
          <div className="flex flex-row justify-center gap-12 sm:gap-24 w-full md:w-auto shrink-0 mt-4 md:mt-0 max-md:mt-2">
            {/* Explore */}
            <motion.div
              className="flex flex-col items-center md:items-start gap-4 min-w-[120px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-1">Explore</p>
              <ul className="flex flex-col items-center md:items-start gap-3">
                {EXPLORE.map((l) => (
                  <li key={l.label}>
                    <SideShiftLink
                      href={l.href}
                      id={`footer-${l.label.toLowerCase().replace(" ", "-")}`}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </SideShiftLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div
              className="flex flex-col items-center md:items-start gap-4 min-w-[140px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <p className="text-gold text-[10px] tracking-[0.42em] uppercase font-body mb-1">Connect</p>
              <ul className="flex flex-col items-center md:items-start gap-3">
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

          {/* ── Right Column: Newsletter ──────────────────────── */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 md:w-[30%] md:pl-8 mt-8 md:mt-0 max-md:mt-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h2 className="font-display font-light text-charcoal text-4xl mb-4 max-md:text-3xl max-md:mb-2">
              Stay <em className="text-gold">Updated.</em>
            </h2>
            <p className="font-body text-stone text-sm leading-relaxed mb-6 max-md:mb-4 max-md:text-xs">
              Subscribe to our newsletter for exclusive blends, special offers, and café news.
            </p>

            <form className="w-full flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full text-left">
                <label htmlFor="newsletter" className="font-body text-[10px] tracking-[0.2em] uppercase text-stone mb-2 block pl-2">
                  Subscribe
                </label>
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Enter your email"
                  className="w-full bg-charcoal/[0.03] border border-charcoal/10 rounded-full px-6 py-4 text-sm font-body text-charcoal placeholder:text-stone/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-charcoal text-ivory text-[10px] tracking-[0.28em] uppercase px-8 py-4 rounded-full font-body shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-[1.02] w-full mt-1"
              >
                <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
                <span className="relative z-10 font-semibold">Subscribe</span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar — full width ──────────────────────────── */}
      <div className="relative z-10 w-full border-t border-charcoal/5 py-6 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 opacity-80 mt-auto">
        <p className="font-body text-stone text-[10px] tracking-[0.18em]">
          © {new Date().getFullYear()} CapeyBara. All rights reserved.
        </p>
        <p className="font-body text-stone text-[10px] tracking-[0.18em]">
          Surat · Gujarat · India
        </p>
      </div>
    </footer>
  );
}
