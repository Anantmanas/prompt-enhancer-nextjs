"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const revealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04
    }
  }
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function MotionCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      data-cursor="interactive"
      className={cn("premium-card", className)}
      variants={revealItem}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {children}
    </motion.article>
  );
}

export function MotionButton({
  children,
  className,
  ...props
}: HTMLMotionProps<"button"> & {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      {...props}
      className={cn("magnetic-button focus-ring", className)}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
    >
      {children}
    </motion.button>
  );
}
