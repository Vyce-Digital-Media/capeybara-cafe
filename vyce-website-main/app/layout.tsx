import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import ProjectTransitionOverlay from "@/components/ui/ProjectTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "VYCE | Creative Design Agency",
  description: "VYCE is a premium creative agency crafting high-end digital experiences, 3D, and brand systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body
        className="bg-background text-foreground antialiased selection:bg-primary selection:text-white"
      >
        <LenisProvider>
          <ScrollToTop />
          <div className="noise-bg" aria-hidden />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ProjectTransitionOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
