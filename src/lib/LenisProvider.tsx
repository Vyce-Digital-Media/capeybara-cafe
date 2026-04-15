"use client";

// Lenis is intentionally disabled — FullPageScroll manages all scroll
// behaviour with its own wheel / touch interception and smooth CSS transitions.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
