"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;
    if (!cursor || !follower) return;

    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let fx = 0;
    let fy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      fx += (tx - fx) * 0.18;
      fy += (ty - fy) * 0.12;
      cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      follower.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-primary md:block"
        style={{ willChange: "transform" }}
        aria-hidden
      />
      <div
        ref={cursorFollowerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full border border-primary/35 md:block"
        style={{ willChange: "transform" }}
        aria-hidden
      />
    </>
  );
}
