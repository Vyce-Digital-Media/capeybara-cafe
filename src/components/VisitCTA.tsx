"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const INFO = [
  { label: "Address", value: "Near Vesu Main Road, Surat, Gujarat" },
  { label: "Hours", value: "Mon – Sun  ·  8 AM – 11 PM" },
  { label: "Phone", value: "+91 98765 43210" },
  { label: "Email", value: "hello@capeybara.in" },
];

export function VisitCTA() {
  return (
    <section className="relative bg-cream py-16 md:py-24 overflow-hidden">

      {/* Faint background watermark */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none pr-8">
        <p className="font-display text-[20vw] text-charcoal/[0.04] leading-none whitespace-nowrap">
          Visit
        </p>
      </div>

      {/* Gold glow orb */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: editorial text block */}
          <div>
            <motion.p
              className="text-gold text-[9px] tracking-[0.55em] uppercase font-body mb-6"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Come Find Us
            </motion.p>

            <motion.h2
              className="font-display font-light text-charcoal leading-[0.9] tracking-tight mb-10"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.9 }}
            >
              A place worth<br />
              <em className="text-gold">visiting.</em>
            </motion.h2>

            {/* Info grid */}
            <motion.dl
              className="grid grid-cols-1 gap-5 mb-12"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
            >
              {INFO.map((row) => (
                <div key={row.label} className="flex items-start gap-5 group">
                  <div className="w-px h-8 bg-gold/50 mt-1 flex-shrink-0 group-hover:bg-gold transition-colors duration-300" />
                  <div>
                    <dt className="font-body text-[9px] tracking-[0.35em] uppercase text-stone mb-0.5">
                      {row.label}
                    </dt>
                    <dd className="font-body text-charcoal text-sm">{row.value}</dd>
                  </div>
                </div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}
            >
              <Link
                href="/visit"
                id="visit-cta-btn"
                className="group relative overflow-hidden inline-block bg-gold border border-gold text-white text-[10px] tracking-[0.28em] uppercase px-12 py-5 rounded-full font-body transition-all duration-300 hover:bg-charcoal hover:border-charcoal hover:scale-105 shadow-[0_10px_30px_rgba(212,168,83,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
              >
                <span className="relative z-10 font-semibold">Plan Your Visit</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]" />
              </Link>
            </motion.div>
          </div>

          {/* Right: stylised map card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-charcoal/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            style={{ height: "420px" }}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.9 }}
          >
            <iframe
              title="CapeyBara Café Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.9!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEzLjAiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(30%) contrast(1.05) sepia(10%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Bottom info strip overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-ivory/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-body text-charcoal text-xs font-semibold">CapeyBara Café</p>
                <p className="font-body text-stone text-[10px] tracking-wide">Vesu, Surat · Gujarat</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[9px] tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors flex items-center gap-1"
              >
                Open Maps <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
