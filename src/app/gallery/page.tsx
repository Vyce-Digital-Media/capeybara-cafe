import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import DomeGallery from "@/components/DomeGallery";
import { CustomCursor } from "@/components/CustomCursor";
import { GalleryCTA } from "@/components/GalleryCTA";
import { FullPageScroll } from "@/components/FullPageScroll";

export const metadata: Metadata = {
  title: "Gallery | CapeyBara Café",
  description:
    "A visual journey through CapeyBara — our coffees, our space, our craft. Follow us on Instagram @capeybara.srt.",
};

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85", alt: "Coffee flat-lay", tall: true },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=85", alt: "Cafe interior", tall: false },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85", alt: "Artisan desserts", tall: false },
  { src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=85", alt: "Barista at work", tall: true },
  { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85", alt: "Fresh pastries", tall: false },
  { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=85", alt: "Coffee beans", tall: false },
  { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=85", alt: "Espresso shot", tall: false },
  { src: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=900&q=85", alt: "Latte art", tall: false },
  { src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=900&q=85", alt: "Matcha", tall: true },
];

const SECTION_LABELS = ["Gallery", "Connect", "Footer"];
const SECTION_SUB_STEPS = [1, 1, 1];

export default function GalleryPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="h-screen overflow-hidden">
        <FullPageScroll
          sectionLabels={SECTION_LABELS}
          sectionSubSteps={SECTION_SUB_STEPS}
        >
          {/* Section 1 */}
          <main className="relative w-full h-screen shrink-0 bg-[#0a0a0a] overflow-hidden">
            {/* Background Watermark Strips */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03] flex flex-col justify-between py-10 -rotate-6 scale-150 mix-blend-overlay">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`whitespace-nowrap font-display text-[15rem] leading-none text-white ${i % 2 === 0 ? 'animate-marquee-slow' : 'animate-marquee-slow-reverse'}`}>
                  CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA
                </div>
              ))}
            </div>

            {/* Header Overlay - Z-Index 50, White Text, Top Left */}
            <div className="absolute top-36 left-6 md:left-12 z-50 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-3 font-semibold drop-shadow-md">Visual Stories</p>
                <h1 className="font-display font-medium text-white text-4xl md:text-6xl leading-none tracking-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  Life at <em className="text-white">CapeyBara</em>
                </h1>
                <p className="font-body text-white/90 text-xs md:text-sm max-w-sm leading-relaxed mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  Moments, textures, and aromas — captured to bring you a little closer to our world.
                </p>
              </div>
            </div>

            {/* Dome Gallery - Full viewport */}
            <div className="absolute inset-0 w-full h-full">
              <DomeGallery
                images={PHOTOS}
                grayscale={false}
                overlayBlurColor="#0a0a0a"
                padFactor={0.15}
                dragSensitivity={15}
                fit={1.5}
                minRadius={1500}
                imageBorderRadius="16px"
                openedImageBorderRadius="24px"
                openedImageWidth={undefined}
                openedImageHeight={undefined}
              />
            </div>
          </main>

          {/* Section 2 */}
          <GalleryCTA />

          {/* Section 3 */}
          <Footer />
        </FullPageScroll>
      </div>
    </>
  );
}
