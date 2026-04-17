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

  /** Lock scroll for the animation duration + a small buffer to clear inertia */
  const lockScroll = useCallback(() => {
    scrollLocked.current = true;
    accumDelta.current = 0;
    // Unlock later to fully swallow lingering touchpad inertia
    setTimeout(() => {
      scrollLocked.current = false;
      accumDelta.current = 0;
    }, 1500);
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
      const localScroll = (e.target as Element).closest(".signature-local-scroll") as HTMLElement;
      if (localScroll) {
        const isScrollingDown = e.deltaY > 0;
        const reachedTop = localScroll.scrollTop <= 0;
        const reachedBottom = localScroll.scrollTop + localScroll.clientHeight >= localScroll.scrollHeight - 1;

        if ((isScrollingDown && !reachedBottom) || (!isScrollingDown && !reachedTop)) {
          // Inside boundaries, allow native scroll
          return;
        }
      }

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
          {/* Inject subStep into the child component only if it is a custom component */}
          {isValidElement(section)
            ? typeof section.type === "string"
              ? section
              : cloneElement(section as React.ReactElement<{ subStep?: number }>, {
                  subStep: subIndexes[i],
                })
            : section}
        </div>
      ))}


    </div>
  );
}