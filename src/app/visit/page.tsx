import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FullPageScroll } from "@/components/FullPageScroll";
import { CapybaraJourneyMap } from "@/components/CapybaraJourneyMap";

export const metadata: Metadata = {
  title: "Visit Us | CapeyBara Café",
  description:
    "Follow the Capybara journey to find our hidden café in Surat. Unique interactive map experience.",
};

// 5 sub-steps for the journey section, 1 for the footer
const SECTION_LABELS = ["The Journey", "Footer"];
const SECTION_SUB_STEPS = [5, 1];

export default function VisitPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="h-screen overflow-hidden bg-[#FAF7F2]">
        <FullPageScroll
          sectionLabels={SECTION_LABELS}
          sectionSubSteps={SECTION_SUB_STEPS}
        >
          {/* Section 1: The Giant Interactive Map */}
          <CapybaraJourneyMap />

          {/* Section 2: Footer */}
          <Footer />
        </FullPageScroll>
      </div>
    </>
  );
}
