"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorState = "default" | "interactive" | "field" | "hidden";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.35 });
  const [state, setState] = useState<CursorState>("hidden");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");
    const updateEnabled = () => setEnabled(media.matches);

    updateEnabled();
    media.addEventListener("change", updateEnabled);

    return () => media.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;

    function updateState(target: EventTarget | null) {
      if (!(target instanceof Element)) {
        setState("default");
        return;
      }

      if (target.closest("input, textarea, select")) {
        setState("field");
        return;
      }

      if (target.closest("a, button, [role='button'], [data-cursor='interactive'], .premium-card, .glass-panel")) {
        setState("interactive");
        return;
      }

      setState("default");
    }

    function handleMove(event: PointerEvent) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursorX.set(event.clientX - 12);
        cursorY.set(event.clientY - 12);
        updateState(event.target);
      });
    }

    function handleLeave() {
      setState("hidden");
    }

    function handleEnter() {
      setState("default");
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    document.documentElement.addEventListener("pointerenter", handleEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      document.documentElement.removeEventListener("pointerenter", handleEnter);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) {
    return null;
  }

  const variants = {
    default: {
      scale: 1,
      opacity: 0.78,
      backgroundColor: "rgba(17, 19, 24, 0.88)",
      borderColor: "rgba(255, 255, 255, 0.8)",
      filter: "blur(0px)"
    },
    interactive: {
      scale: 2.35,
      opacity: 0.34,
      backgroundColor: "rgba(59, 183, 200, 0.72)",
      borderColor: "rgba(17, 19, 24, 0.2)",
      filter: "blur(0.5px)"
    },
    field: {
      scale: 1.55,
      opacity: 0.42,
      backgroundColor: "rgba(182, 214, 107, 0.78)",
      borderColor: "rgba(17, 19, 24, 0.14)",
      filter: "blur(0px)"
    },
    hidden: {
      scale: 0.2,
      opacity: 0,
      backgroundColor: "rgba(17, 19, 24, 0)",
      borderColor: "rgba(17, 19, 24, 0)",
      filter: "blur(4px)"
    }
  };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-6 w-6 rounded-full border mix-blend-multiply md:block"
      style={{ x: springX, y: springY }}
      variants={variants}
      animate={state}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.28 }}
    />
  );
}
