"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullPageScrollProps {
  children: React.ReactNode;
  /** Display label per section (shown in dot tooltip) */
  sectionLabels?: string[];
  /**
   * How many internal scroll steps each section consumes before the outer
   * section advances. Default = 1 (single scroll = move on immediately).
   * e.g. [1, 1, 3, 4, 1] means section 2 consumes 3 scrolls internally.
   */
  sectionSubSteps?: number[];
}

export function FullPageScroll({
  children,
  sectionLabels = [],
  sectionSubSteps = [],
}: FullPageScrollProps) {
  const sections = Children.toArray(children);
  const total = sections.length;

  /** Index of the visible outer section */
  const [current, setCurrent] = useState(0);
  /** Per-section internal sub-step index */
  const [subIndexes, setSubIndexes] = useState<number[]>(Array(total).fill(0));
  /** Locks outer-section transitions during the slide animation */
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  /** Hard lock — true while a section transition animation is running */
  const scrollLocked = useRef<boolean>(false);
  /** Accumulated wheel delta for touchpad debouncing */
  const accumDelta = useRef<number>(0);
  /** Timer to reset accumulator when wheel events stop (touchpad lift) */
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getSubSteps = (idx: number) => Math.max(1, sectionSubSteps[idx] ?? 1);

  /* ── Outer section jump (dot click) ────────────────────────────── */
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total || isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setSubIndexes((prev) => {
        const next = [...prev];
        next[index] = 0; // reset sub-step when jumping directly
        return next;
      });
      setTimeout(() => setIsAnimating(false), 950);
    },
    [total, isAnimating]
  );

  /** Lock scroll for the animation duration + a small buffer */
  const lockScroll = useCallback(() => {
    scrollLocked.current = true;
    // Unlock slightly after the animation finishes so the next gesture works
    setTimeout(() => { scrollLocked.current = false; }, 1050);
  }, []);

  /* ── Scroll-down logic ──────────────────────────────────────────── */
  const handleScrollDown = useCallback(() => {
    if (scrollLocked.current) return;
    const subSteps = getSubSteps(current);
    const subIdx = subIndexes[current];

    if (subIdx < subSteps - 1) {
      lockScroll();
      setSubIndexes((prev) => {
        const next = [...prev];
        next[current] = subIdx + 1;
        return next;
      });
    } else if (current < total - 1) {
      lockScroll();
      setIsAnimating(true);
      setCurrent((c) => {
        const next = c + 1;
        setSubIndexes((prev) => {
          const arr = [...prev];
          arr[next] = 0;
          return arr;
        });
        return next;
      });
      setTimeout(() => setIsAnimating(false), 950);
    }
  }, [current, subIndexes, total, sectionSubSteps, lockScroll]);

  /* ── Scroll-up logic ────────────────────────────────────────────── */
  const handleScrollUp = useCallback(() => {
    if (scrollLocked.current) return;
    const subIdx = subIndexes[current];

    if (subIdx > 0) {
      lockScroll();
      setSubIndexes((prev) => {
        const next = [...prev];
        next[current] = subIdx - 1;
        return next;
      });
    } else if (current > 0) {
      const prevSubSteps = getSubSteps(current - 1);
      lockScroll();
      setIsAnimating(true);
      setCurrent((c) => {
        const next = c - 1;
        setSubIndexes((prev) => {
          const arr = [...prev];
          arr[next] = prevSubSteps - 1;
          return arr;
        });
        return next;
      });
      setTimeout(() => setIsAnimating(false), 950);
    }
  }, [current, subIndexes, sectionSubSteps, lockScroll]);

  /* ── Wheel ──────────────────────────────────────────────────────── */
  useEffect(() => {
    // Threshold before a gesture fires (px). Higher = less sensitive to tiny flicks.
    const DELTA_THRESHOLD = 50;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Reset idle timer — accumulator clears when wheel events stop
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        accumDelta.current = 0;
      }, 80);

      // While locked, drain the accumulated delta (swallow touchpad inertia)
      if (scrollLocked.current) {
        accumDelta.current = 0;
        return;
      }

      accumDelta.current += e.deltaY;

      if (Math.abs(accumDelta.current) >= DELTA_THRESHOLD) {
        const direction = accumDelta.current > 0 ? "down" : "up";
        accumDelta.current = 0; // reset immediately so next gesture starts fresh
        if (direction === "down") handleScrollDown();
        else handleScrollUp();
      }
    };

    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [handleScrollDown, handleScrollUp]);

  /* ── Touch ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) handleScrollDown();
      else handleScrollUp();
    };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [handleScrollDown, handleScrollUp]);

  /* ── Keyboard ───────────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); handleScrollDown(); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); handleScrollUp(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleScrollDown, handleScrollUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* ── Section slides ──────────────────────────────────────────── */}
      {sections.map((section, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `translateY(${(i - current) * 100}%)`,
            transition: "transform 850ms cubic-bezier(0.76,0,0.24,1)",
          }}
        >
          {/* Inject subStep into the child component */}
          {isValidElement(section)
            ? cloneElement(section as React.ReactElement<{ subStep?: number }>, {
                subStep: subIndexes[i],
              })
            : section}
        </div>
      ))}

      {/* ── Premium dot indicator ───────────────────────────────────── */}
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-[10px]"
        aria-label="Page navigation"
      >
        {sections.map((_, i) => {
          const isActive = i === current;
          const label = sectionLabels[i] ?? `Section ${i + 1}`;
          const subSteps = getSubSteps(i);
          const subIdx = isActive ? subIndexes[i] : 0;

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
              aria-label={`Go to ${label}`}
              aria-current={isActive ? "true" : undefined}
              className="relative flex flex-col items-center gap-[4px]"
              style={{ width: 24 }}
            >
              {/* Main dot + ring */}
              <div className="relative flex items-center justify-center" style={{ width: 24, height: 24 }}>
                <span
                  className="absolute rounded-full border transition-all duration-500"
                  style={{
                    width: isActive ? 20 : 10,
                    height: isActive ? 20 : 10,
                    borderColor: isActive ? "rgba(212,168,83,0.85)" : "rgba(212,168,83,0.22)",
                    borderWidth: isActive ? 1.5 : 1,
                    transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
                <span
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: isActive ? 7 : 4,
                    height: isActive ? 7 : 4,
                    backgroundColor: isActive ? "rgba(212,168,83,1)" : "rgba(212,168,83,0.4)",
                    transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />
              </div>

              {/* Sub-step mini dots (only on active section with multiple sub-steps) */}
              {isActive && subSteps > 1 && (
                <div className="flex flex-col items-center gap-[3px]">
                  {Array.from({ length: subSteps }).map((_, si) => (
                    <span
                      key={si}
                      className="rounded-full transition-all duration-400"
                      style={{
                        width: si === subIdx ? 5 : 3,
                        height: si === subIdx ? 5 : 3,
                        backgroundColor: si === subIdx
                          ? "rgba(212,168,83,0.9)"
                          : si < subIdx
                            ? "rgba(212,168,83,0.55)"
                            : "rgba(212,168,83,0.2)",
                        transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredDot === i && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-[30px] top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "rgba(212,168,83,0.9)",
                      background: "rgba(26,26,26,0.78)",
                      backdropFilter: "blur(10px)",
                      padding: "5px 11px",
                      borderRadius: 5,
                      border: "1px solid rgba(212,168,83,0.2)",
                    }}
                  >
                    {label}
                    {subSteps > 1 && isActive && (
                      <span style={{ opacity: 0.55, marginLeft: 6 }}>
                        {subIdx + 1}/{subSteps}
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        </nav>
    </div>
  );
}
