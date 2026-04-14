"use client";

import FlowingMenu from "./FlowingMenu";

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
  {
    link: "/menu",
    text: "Artisan Coffee",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
  },
];

export function FlowingMenuSection() {
  return (
    <section className="bg-ivory border-y border-charcoal/5 relative z-10 h-screen">
      <FlowingMenu
        items={MENU_ITEMS}
        speed={20}
      />
    </section>
  );
}
