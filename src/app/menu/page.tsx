import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Menu | CapeyBara Café",
  description:
    "Explore the full CapeyBara menu — handcrafted espressos, cold brews, ceremonial matchas, and seasonal bites.",
};

const CATEGORIES = [
  {
    title: "Espresso Bar",
    subtitle: "Made fresh, every single shot.",
    items: [
      { name: "CapeyBara Signature",      desc: "House blend · vanilla cold foam · cardamom",              price: "₹220" },
      { name: "Dark Velvet Espresso",     desc: "Double shot · Venezuelan cacao · smoked salt",            price: "₹240" },
      { name: "Honey Oat Cortado",       desc: "Cortado style · raw honey · oat milk",                    price: "₹200" },
      { name: "Classic Americano",        desc: "Triple shot · filtered water",                            price: "₹160" },
    ],
  },
  {
    title: "Cold Brews & Iced",
    subtitle: "Slow-steeped. Served cold. Absolutely worth it.",
    items: [
      { name: "Mango Cold Brew",          desc: "24-hr steep · sun-ripened mango · hand-chipped ice",      price: "₹280" },
      { name: "Black Cold Brew",          desc: "Pure 24-hr concentrate · served over ice",                price: "₹220" },
      { name: "Iced Hazelnut Latte",      desc: "Espresso · oat milk · toasted hazelnut syrup",            price: "₹260" },
      { name: "Sparkling Espresso Tonic", desc: "Espresso · premium tonic · lime zest",                   price: "₹270" },
    ],
  },
  {
    title: "Matcha & Specialty",
    subtitle: "For those who look a little beyond coffee.",
    items: [
      { name: "Rose Gold Matcha",         desc: "Ceremonial grade · oat milk · rose water · edible gold",  price: "₹260" },
      { name: "Iced Matcha Lemonade",     desc: "Matcha · fresh lemon · honey",                           price: "₹230" },
      { name: "Saffron Chai Latte",       desc: "Organic chai · saffron · steamed whole milk",             price: "₹240" },
    ],
  },
  {
    title: "Sorbets & Bites",
    subtitle: "Handmade in-house. Always seasonal.",
    items: [
      { name: "Seasonal Sorbet",          desc: "Ask us today — it changes with the market",               price: "₹150" },
      { name: "Croissant",                desc: "Buttery laminated pastry · served warm",                  price: "₹130" },
      { name: "Banana Bread",             desc: "House recipe · walnuts · brown butter glaze",             price: "₹140" },
      { name: "Dark Chocolate Brownie",   desc: "Fudgy · sea salt · served with vanilla cream",           price: "₹160" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory min-h-screen pt-36 pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="text-center mb-24">
            <img src="/logo.jpg" alt="CapeyBara" className="w-16 h-16 rounded-full mx-auto mb-6 border border-gold/30" />
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-4">CapeyBara Café</p>
            <h1 className="font-display font-light text-charcoal text-6xl md:text-7xl leading-none tracking-tight mb-6">
              Our Menu
            </h1>
            <div className="h-px w-24 bg-gold mx-auto" />
          </div>

          {/* Categories */}
          <div className="space-y-20">
            {CATEGORIES.map((cat) => (
              <div key={cat.title}>
                {/* Category header */}
                <div className="mb-10">
                  <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-2">{cat.title}</h2>
                  <p className="font-body text-charcoal/45 text-sm italic">{cat.subtitle}</p>
                  <div className="h-px bg-cream-dark mt-6" />
                </div>

                {/* Items */}
                <div className="space-y-0">
                  {cat.items.map((item, i) => (
                    <div key={item.name}>
                      <div className="group flex items-start justify-between gap-6 py-6 hover:bg-cream/60 -mx-4 px-4 rounded-sm transition-colors duration-300">
                        <div className="flex-1">
                          <h3 className="font-display text-xl md:text-2xl text-charcoal group-hover:text-charcoal transition-colors duration-300 mb-1.5">
                            {item.name}
                          </h3>
                          <p className="font-body text-charcoal/45 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                        <span className="font-display text-xl text-gold flex-shrink-0 pt-0.5">{item.price}</span>
                      </div>
                      {i < cat.items.length - 1 && <div className="h-px bg-cream-dark/80" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-24 text-center border-t border-charcoal-dark pt-12">
            <p className="font-display text-charcoal/40 text-xl italic mb-3">
              All prices are inclusive of taxes.
            </p>
            <p className="font-body text-charcoal/30 text-xs tracking-[0.2em] uppercase">
              Menu items are subject to seasonal availability · Please inform us of any allergies
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
