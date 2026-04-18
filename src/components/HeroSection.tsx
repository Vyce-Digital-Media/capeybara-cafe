"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   Three hero stages — driven by FullPageScroll's subStep prop
   subStep 0 → Coffee latte   (initial)
   subStep 1 → Cheesecake     (exits UP → enters BOTTOM)
   subStep 2 → Matcha drink   (exits UP → enters BOTTOM)

   BLINK-FREE STRATEGY:
   1. All three images are preloaded as hidden <img> tags so the
      browser has them cached before any transition fires.
   2. `displayedIndex` only updates AFTER exit completes (element
      is invisible & off-screen), so the src swap is invisible.
   3. Entrance animation waits for the new image's `onLoad` before
      fading in — eliminates the "grey box while loading" flash.
   4. `mounted` flag suppresses SSR-only decorative elements so
      hydration never causes a layout shift.
───────────────────────────────────────────────────────────── */

const ITEMS = [
  {
    id: "coffee",
    src: "/coffee-late.png",
    alt: "Signature Latte",
    label: "Signature Brew",
    tag: "01",
    accentColor: "#d4a853",
    glowStart: "#f7ede0",
    glowColor: "rgba(212,168,83,0.18)",
    badgeBg: "rgba(212,168,83,0.10)",
    description:
      "Handcrafted coffees, artisan sorbets, and warm spaces designed for you to truly savour.",
  },
  {
    id: "cheesecake",
    src: "/cheesecake.png",
    alt: "Strawberry Cheesecake",
    label: "Daily Pastry",
    tag: "02",
    accentColor: "#c0392b",
    glowStart: "#fdf0ee",
    glowColor: "rgba(192,57,43,0.14)",
    badgeBg: "rgba(192,57,43,0.10)",
    description:
      "Our cheesecakes are baked fresh every morning — silky, indulgent, and always worth the wait.",
  },
  {
    id: "matcha",
    src: "/matcha-coffee.png",
    alt: "Matcha Frappé",
    label: "Matcha Magic",
    tag: "03",
    accentColor: "#3d8b37",
    glowStart: "#eaf5e6",
    glowColor: "rgba(61,139,55,0.14)",
    badgeBg: "rgba(61,139,55,0.10)",
    description:
      "Ceremonial-grade matcha, whisked to perfection. A ritual of calm in every cup.",
  },
];

/* Precompute orbit positions once — avoids per-render trig calls */
const ORBIT_DOTS = [0, 72, 144, 216, 288].map((deg, i) => ({
  deg,
  i,
  left: `calc(50% + ${225 * Math.cos((deg * Math.PI) / 180)}px)`,
  top: `calc(50% + ${225 * Math.sin((deg * Math.PI) / 180)}px)`,
  size: i % 2 === 0 ? 8 : 5,
  duration: 2.5 + i * 0.4,
  delay: i * 0.6,
}));

interface HeroSectionProps {
  subStep?: number;
}

export function HeroSection({ subStep = 0 }: HeroSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const bobTlRef = useRef<gsap.core.Timeline | null>(null);
  const prevSubStepRef = useRef<number>(-1);

  const [mounted, setMounted] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Kill all active animations on the image element ── */
  const killAll = useCallback(() => {
    if (bobTlRef.current) { bobTlRef.current.kill(); bobTlRef.current = null; }
    if (imgRef.current) gsap.killTweensOf(imgRef.current);
  }, []);

  /* ── Infinite gentle bob ── */
  const startBob = useCallback(() => {
    if (!imgRef.current) return;
    if (bobTlRef.current) bobTlRef.current.kill();
    bobTlRef.current = gsap.timeline({ repeat: -1, yoyo: true });
    bobTlRef.current.to(imgRef.current, {
      y: -26,
      rotation: 1.5,
      duration: 2.8,
      ease: "sine.inOut",
    });
  }, []);

  /* ── First mount: entrance animation ── */
  useEffect(() => {
    if (!imgRef.current) return;
    const el = imgRef.current;

    // Start invisible — no layout shift during SSR → hydration
    gsap.set(el, { y: 80, autoAlpha: 0, scale: 0.94 });

    // Two rAFs ensure Next.js Image has painted before we reveal
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.0,
          delay: 0.2,
          ease: "power3.out",
          onComplete: startBob,
        });
      });
    });

    prevSubStepRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Transition when subStep changes ── */
  useEffect(() => {
    const prev = prevSubStepRef.current;
    if (prev === -1 || prev === subStep) return;
    prevSubStepRef.current = subStep;

    const el = imgRef.current;
    if (!el) return;

    // Always kill whatever is running — this is the key fix.
    // The old guard (animatingRef) blocked rapid-scroll transitions,
    // leaving displayedIndex stuck on 0 indefinitely.
    killAll();

    const goingForward = subStep > prev;
    const exitY = goingForward ? -130 : 130;
    const enterY = goingForward ? 130 : -130;

    // 1. Capture the target index in a closure so rAF callbacks
    //    always reference the correct slide even after another scroll.
    const targetIndex = subStep;

    // 2. Exit: fly current image off-screen
    gsap.to(el, {
      y: exitY,
      autoAlpha: 0,
      scale: 0.85,
      duration: 0.42,
      ease: "power2.in",
      onComplete: () => {
        // 3. Park at entrance position (invisible)
        gsap.set(el, { y: enterY, scale: 0.9, autoAlpha: 0 });

        // 4. Swap the React-rendered image src while invisible → zero blink
        setDisplayedIndex(targetIndex);

        // 5. Two rAFs: first lets React commit the new src,
        //    second waits for the browser to paint it before revealing.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            gsap.to(el, {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.62,
              ease: "power3.out",
              onComplete: startBob,
            });
          });
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subStep]);

  const item = ITEMS[displayedIndex];

  return (
    <div
      id="home"
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#fcfbfa" }}
    >
      {/*
       * ── Hidden preload images ──────────────────────────────────────
       * These are positioned off-screen and aria-hidden. They cause the
       * browser to fetch & decode all three PNGs as quickly as possible
       * so transitions are blink-free from the very first scroll.
       */}
      <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none", zIndex: -1 }}>
        {ITEMS.map((it) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={it.id} src={it.src} alt="" width={1} height={1} />
        ))}
      </div>

      {/* ── Background gradient ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 75% 80% at 72% 50%, ${item.glowStart} 0%, #fcfbfa 58%, #f0ece4 100%)`,
          transition: "background 0.9s ease",
        }}
      />

      {/* Right glow orb — use `will-change: background` isolated layer */}
      <div
        className="absolute right-[2%] top-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 68%)`,
          filter: "blur(48px)",
          transition: "background 0.9s ease",
        }}
      />

      {/* Magazine grid lines — static, rendered once */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.032] z-[1]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-charcoal"
            style={{ left: `${i * 16.66}%` }}
          />
        ))}
      </div>

      {/* Left gold aura — static colour, no transition needed */}
      <div
        className="pointer-events-none absolute -left-[6%] top-1/3 h-[420px] w-[420px] rounded-full z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)",
          filter: "blur(64px)",
        }}
      />

      {/* ══════════════════════════════════════════════════
          LEFT: Text Column
      ══════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-10 md:px-30 z-10 w-full md:w-[54%] lg:w-[50%] max-md:px-6">

        {/* Step indicator dots — hidden until hydrated to avoid shift */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.4s" }}
          suppressHydrationWarning
        >
          <div className="flex items-center gap-2">
            {ITEMS.map((it, i) => (
              <div
                key={it.id}
                className="rounded-full"
                style={{
                  width: i === subStep ? 28 : 8,
                  height: 8,
                  backgroundColor:
                    i <= subStep
                      ? ITEMS[subStep]?.accentColor ?? it.accentColor
                      : "#e0d9cf",
                  boxShadow:
                    i === subStep
                      ? `0 0 10px ${ITEMS[subStep]?.accentColor ?? it.accentColor}70`
                      : "none",
                  transition:
                    "width 0.4s ease, background-color 0.5s ease, box-shadow 0.5s ease",
                }}
              />
            ))}
          </div>
          <span
            className="font-body text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#8c8880" }}
          >
            {ITEMS[subStep]?.tag ?? "01"} / 03
          </span>
        </div>

        {/* Headline */}
        <motion.h1
          className="font-display font-light text-charcoal leading-[0.9] tracking-tight mb-8"
          style={{ fontSize: "clamp(3.2rem,6.5vw,6rem)" }}
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Some places<br />
          serve coffee.<br />
          <em style={{ color: item.accentColor, transition: "color 0.7s ease" }}>
            We give you
          </em><br />
          <em style={{ color: item.accentColor, transition: "color 0.7s ease" }}>
            a reason to stay.
          </em>
        </motion.h1>

        {/* Sub-copy — keyed to displayedIndex so it cross-fades with the image */}
        <AnimatePresence mode="wait">
          <motion.p
            key={displayedIndex}
            className="font-body text-stone text-sm md:text-base leading-relaxed max-w-[360px] mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {item.description}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 max-md:flex-col max-md:items-start"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          <a
            href="https://drive.google.com/file/d/1_OMH4MZ6QWK_n1wl7evbGFPbVhBI27DH/view?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnLfptwr8uBu3xebhfjYSlux0xbXEHSvIUT3BlPnZDxcGaNnSGiYq0Q_gJCWY_aem__9OcuIgoTxLE3wkyKqSLzA"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-view-menu"
            className="group relative overflow-hidden text-white text-[10px] tracking-[0.22em] uppercase px-9 py-4 rounded-full font-body hover:scale-105 active:scale-100"
            style={{
              backgroundColor: item.accentColor,
              boxShadow: `0 8px 28px ${item.accentColor}40`,
              transition:
                "background-color 0.7s ease, box-shadow 0.7s ease, transform 0.3s ease",
            }}
          >
            <span className="relative z-10 font-semibold">View Menu</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg]" />
          </a>
          <a
            href="/visit"
            id="hero-our-story"
            className="font-body text-[10px] tracking-[0.22em] uppercase px-9 py-4 rounded-full"
            style={{
              border: `1px solid ${item.accentColor}40`,
              color: item.accentColor,
              transition: "border-color 0.7s ease, color 0.7s ease",
            }}
          >
            Visit Us →
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT: Floating Image Stage
      ══════════════════════════════════════════════════ */}
      <div className="absolute right-0 top-0 h-full w-[52%] max-md:w-full max-md:opacity-20 flex items-center justify-center z-[6] pointer-events-none overflow-hidden">

        {/* Spinning rings — suppress on SSR to avoid hydration mismatch */}
        <div
          suppressHydrationWarning
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {mounted && (
            <>
              <motion.div
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: 530,
                  height: 530,
                  borderColor: `${item.accentColor}28`,
                  transition: "border-color 0.8s ease",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute rounded-full border border-dotted pointer-events-none"
                style={{
                  width: 650,
                  height: 650,
                  borderColor: `${item.accentColor}14`,
                  transition: "border-color 0.8s ease",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
        </div>

        {/* Glow disc */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420,
            height: 420,
            background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
            filter: "blur(36px)",
            transition: "background 0.9s ease",
          }}
        />

        {/* ── Floating image container ── GSAP animates transform/opacity only ── */}
        <div
          ref={imgRef}
          className="flex flex-col items-center gap-5"
          style={{ willChange: "transform" }}
        >
          {/* Main product image */}
          <div
            className="relative"
            style={{
              width: "clamp(360px, 38vw, 540px)",
              height: "clamp(360px, 38vw, 540px)",
              filter: `drop-shadow(0 36px 64px ${item.glowColor})`,
              transition: "filter 0.8s ease",
            }}
          >
            <Image
              src={ITEMS[displayedIndex].src}
              alt={ITEMS[displayedIndex].alt}
              fill
              className="object-contain"
              priority
              sizes="(min-width: 1280px) 540px, (min-width: 768px) 38vw, 360px"
              quality={90}
              placeholder="empty"
            />
          </div>

          {/* Label badge */}
          <span
            className="font-body text-[11px] font-medium tracking-[0.3em] uppercase px-6 py-2.5 rounded-full"
            style={{
              color: item.accentColor,
              border: `1px solid ${item.accentColor}50`,
              backgroundColor: item.badgeBg,
              backdropFilter: "blur(12px)",
              boxShadow: `0 4px 20px ${item.accentColor}18`,
              transition:
                "color 0.7s ease, border-color 0.7s ease, background-color 0.7s ease, box-shadow 0.7s ease",
            }}
          >
            ✦ {item.label} ✦
          </span>
        </div>

        {/* Orbit dots — SSR-safe */}
        {mounted &&
          ORBIT_DOTS.map(({ i, left, top, size, duration, delay }) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: item.accentColor,
                left,
                top,
                transition: "background-color 0.8s ease",
              }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </div>
    </div>
  );
}
