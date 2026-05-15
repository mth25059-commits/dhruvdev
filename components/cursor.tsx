"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsDesktop } from "@/lib/use-media-query";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringSpringX = useSpring(ringX, { damping: 24, stiffness: 220, mass: 0.4 });
  const ringSpringY = useSpring(ringY, { damping: 24, stiffness: 220, mass: 0.4 });
  const dotSpringX = useSpring(dotX, { damping: 35, stiffness: 800, mass: 0.2 });
  const dotSpringY = useSpring(dotY, { damping: 35, stiffness: 800, mass: 0.2 });
  const initialised = useRef(false);

  useEffect(() => {
    if (!isDesktop) {
      document.body.dataset.cursorActive = "false";
      return;
    }
    document.body.dataset.cursorActive = "true";

    const onMove = (e: MouseEvent) => {
      if (!initialised.current) {
        ringX.jump(e.clientX);
        ringY.jump(e.clientY);
        dotX.jump(e.clientX);
        dotY.jump(e.clientY);
        initialised.current = true;
        setHidden(false);
      } else {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.dataset.cursorActive = "false";
    };
  }, [isDesktop, ringX, ringY, dotX, dotY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          border: "1.5px solid white",
          opacity: hidden ? 0 : 1,
          transition: "width 240ms ease, height 240ms ease",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          width: hovering ? 4 : 6,
          height: hovering ? 4 : 6,
          background: "white",
          opacity: hidden ? 0 : 1,
          transition: "width 240ms ease, height 240ms ease",
        }}
      />
    </>
  );
}
