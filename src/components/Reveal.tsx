"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Apple-ish easing — decisive out, gentle settle.
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  children: ReactNode;
  /** Seconds to wait before animating in (use for stagger). */
  delay?: number;
  /** How far up the element travels while fading in. */
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Fades + lifts its children into view once, when scrolled near.
 * Elements already on screen at load animate in immediately, giving the
 * hero a clean staggered entrance.
 */
export default function Reveal({ children, delay = 0, y = 24, className, style }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
