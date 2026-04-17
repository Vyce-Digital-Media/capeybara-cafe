"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit Us", href: "/#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        className="fixed left-1/2 z-[60]"
        style={{ top: "20px", width: "calc(100% - 40px)", maxWidth: "max-content" }}
        initial={{ y: -90, opacity: 0, x: "-50%" }}
        animate={visible ? { y: 0, opacity: 1, x: "-50%" } : { y: -90, opacity: 0, x: "-50%" }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className={`
            flex items-center justify-between md:justify-center gap-4 md:gap-12 px-4 md:px-6 py-2 md:py-3 rounded-full border
            transition-all duration-500 w-full
            ${scrolled || menuOpen
              ? "bg-[#f0e8dc]/90 backdrop-blur-xl border-[#c8a882]/20 shadow-lg shadow-charcoal/5"
              : "bg-[#f0e8dc]/60 backdrop-blur-md border-[#c8a882]/10 shadow-sm"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" id="nav-logo" className="group flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold/80 transition-all duration-300 group-hover:scale-105">
              <Image src="/logo.jpg" alt="CapeyBara" fill sizes="(max-width: 768px) 48px, 64px" className="object-cover" />
            </div>
          </Link>

          <div className="hidden md:block w-px h-8 bg-[#c8a882]/50 flex-shrink-0" />

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} active={pathname === l.href} />
            ))}
          </nav>

          <div className="hidden md:block w-px h-8 bg-[#c8a882]/50 flex-shrink-0" />

          <div className="flex items-center gap-3">
            {/* View Menu button */}
            <Link
              href="https://drive.google.com/file/d/1_OMH4MZ6QWK_n1wl7evbGFPbVhBI27DH/view?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnLfptwr8uBu3xebhfjYSlux0xbXEHSvIUT3BlPnZDxcGaNnSGiYq0Q_gJCWY_aem__9OcuIgoTxLE3wkyKqSLzA"
              id="nav-menu-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-charcoal/5 border border-charcoal/10 text-[10px] md:text-[12px] tracking-[0.2em] uppercase font-body px-5 py-2.5 md:px-8 md:py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold hover:shadow-lg hover:shadow-gold/20 hover:scale-105 active:scale-100 whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                <span className="hidden md:inline-block mr-2">View Menu</span>
                <span className="md:hidden">Menu</span>
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors border border-charcoal/10 relative z-[70]"
              aria-label="Toggle Menu"
            >
              <span className={`block w-4 h-px bg-charcoal transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[1px]" : "-translate-y-1"}`} />
              <span className={`block w-4 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100 mt-[3px]"}`} />
              <span className={`block w-4 h-px bg-charcoal transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[1px]" : "translate-y-1 mt-[3px]"}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-cream/90 md:hidden flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-orange-200/10 rounded-full blur-[80px]" />

            <nav className="flex flex-col items-center gap-8 relative z-10 w-full max-w-sm px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative inline-block"
                  >
                    <span className="font-display text-4xl text-charcoal leading-none inline-block">
                      {link.label}
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer info in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-stone">Follow Us</p>
              <a href="https://www.instagram.com/capeybara.srt" target="_blank" rel="noopener noreferrer" className="font-display text-lg text-charcoal hover:text-gold transition-colors">
                @capeybara.srt
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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


