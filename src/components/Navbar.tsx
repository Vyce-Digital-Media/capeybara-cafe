"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit Us", href: "/visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 280);
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-1/2 z-50"
        style={{ top: "20px" }}
        initial={{ y: -90, opacity: 0, x: "-50%" }}
        animate={visible ? { y: 0, opacity: 1, x: "-50%" } : { y: -90, opacity: 0, x: "-50%" }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className={`
            flex items-center gap-12 px-6 py-3 rounded-full border
            transition-all duration-500
            ${scrolled
              ? "bg-[#f0e8dc]/90 backdrop-blur-xl border-[#c8a882]/20 shadow-lg shadow-charcoal/5"
              : "bg-[#f0e8dc]/60 backdrop-blur-md border-[#c8a882]/10 shadow-sm"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" id="nav-logo" className="group flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold/80 transition-all duration-300 group-hover:scale-105">
              <Image src="/logo.jpg" alt="CapeyBara" fill sizes="64px" className="object-cover" />
            </div>
          </Link>

          <div className="w-px h-8 bg-[#c8a882]/50 flex-shrink-0" />

          {/* Nav links */}
          <nav className="flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} active={pathname === l.href} />
            ))}
          </nav>

          <div className="w-px h-8 bg-[#c8a882]/50 flex-shrink-0" />

          {/* View Menu button */}
          <Link
            href="/menu"
            id="nav-menu-btn"
            target="_blank"
            className="group relative overflow-hidden bg-charcoal/5 border border-charcoal/10 text-[12px] tracking-[0.2em] uppercase font-body px-8 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold hover:shadow-lg hover:shadow-gold/20 hover:scale-105 active:scale-100 whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Menu
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </Link>
        </div>
      </motion.div>
    </>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative text-[13px] tracking-[0.14em] uppercase font-body transition-colors duration-300 py-1 whitespace-nowrap
        ${active ? "text-charcoal" : "text-stone hover:text-charcoal"}`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ease-out
          ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );
}


