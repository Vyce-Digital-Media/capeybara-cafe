"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX - 18) * 0.11;
      ringY += (mouseY - ringY - 18) * 0.11;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.width  = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "#1a1a1a";
      ring.style.opacity = "0.9";
    };
    const onLeave = () => {
      ring.style.width  = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(26,26,26,0.55)";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    const attachTo = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachTo();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-charcoal rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          width: "36px",
          height: "36px",
          border: "1.5px solid rgba(26,26,26,0.55)",
          transition: "width 0.35s ease, height 0.35s ease, border-color 0.35s ease, opacity 0.35s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
