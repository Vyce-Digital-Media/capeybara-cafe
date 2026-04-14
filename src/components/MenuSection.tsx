"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ITEMS = [
  {
    id: 1,
    name: "The CapeyBara Signature",
    category: "Signature Espresso",
    description:
      "House-blend espresso layered with caramelised vanilla cold foam and a whisper of cardamom — our love letter in a cup.",
    price: "₹220",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=700&q=85",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Mango Cold Brew",
    category: "Cold Brew",
    description:
      "Sun-ripened mango infused into 24-hour slow-steeped cold brew, poured over hand-chipped ice for a tropical escape.",
    price: "₹280",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700&q=85",
    tag: "Seasonal",
  },
  {
    id: 3,
    name: "Rose Gold Matcha",
    category: "Ceremonial Matcha",
    description:
      "Premium ceremonial matcha whisked with oat milk, brightened with rose water and a finish of edible gold dust.",
    price: "₹260",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=700&q=85",
    tag: "New",
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="bg-cream py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Crafted for You
            </motion.p>
            <motion.h2
              className="font-display text-5xl md:text-6xl text-charcoal leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              Our Signature
              <br />
              <em className="text-charcoal">Creations</em>
            </motion.h2>
          </div>

          <motion.a
            href="#"
            id="view-full-menu"
            className="text-[10px] tracking-[0.22em] uppercase font-body text-charcoal/70 hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-gold/40 hover:decoration-gold self-start md:self-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            View Full Menu →
          </motion.a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              className="group relative bg-ivory rounded-sm overflow-hidden"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.13, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-cream/0 group-hover:bg-cream/15 transition-colors duration-500" />
                {/* Tag */}
                <span className="absolute top-4 left-4 bg-gold text-ivory text-[8px] tracking-[0.2em] uppercase px-3 py-1 font-body rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-7">
                <p className="text-gold text-[9px] tracking-[0.32em] uppercase font-body mb-2">
                  {item.category}
                </p>
                <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-charcoal transition-colors duration-300 leading-tight">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-charcoal/58 leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-charcoal">{item.price}</span>
                  <button
                    id={`menu-order-${item.id}`}
                    className="text-[9px] tracking-[0.2em] uppercase font-body border border-navy/25 hover:border-gold hover:text-gold text-charcoal px-4 py-2 rounded-full transition-all duration-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>

              {/* Decorative bottom gold line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
