import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CapeyBara — Café · Sorbet · More",
  description:
    "Experience handcrafted coffees, artisan sorbets, and warm hospitality at CapeyBara Cafe in Surat. A sanctuary for those who appreciate the finer sip.",
  keywords: ["cafe", "coffee", "sorbet", "CapeyBara", "Surat", "artisan"],
  openGraph: {
    title: "CapeyBara — Café · Sorbet · More",
    description: "A Place to Savor Every Moment",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <div className="noise-bg" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
