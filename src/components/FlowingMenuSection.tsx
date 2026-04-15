"use client";

import FlowingMenu from "./FlowingMenu";
import { motion } from "framer-motion";

const MENU_ITEMS = [
  {
    link: "/menu",
    text: "Artisan Coffee",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    link: "/menu",
    text: "Delicate Pastries",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    link: "/menu",
    text: "Signature Sorbets",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    link: "/about",
    text: "Our Philosophy",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop",
  },
];

export function FlowingMenuSection() {
  return (
    <section className="bg-ivory border-y border-charcoal/5 relative z-10 h-screen flex flex-col">
      {/* Centered heading */}
      <div className="flex-shrink-0 pt-30 pb-4 flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          className="font-display text-4xl md:text-6xl text-charcoal tracking-tight leading-tight text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          Special Things <em className="text-gold">Just For You</em>
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-6"
          initial={{ width: 0 }}
          whileInView={{ width: "160px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        />
      </div>

      <div className="flex-1 min-h-0">
        <FlowingMenu
          items={MENU_ITEMS}
          speed={20}
        />
      </div>
    </section>
  );
}
