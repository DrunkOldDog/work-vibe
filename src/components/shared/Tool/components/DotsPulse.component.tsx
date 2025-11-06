"use client";

import { motion, stagger } from "motion/react";

import type { Variants } from "motion/react";

const dotVariants: Variants = {
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function Dot() {
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-primary will-change-transform"
      variants={dotVariants}
    />
  );
}

export default function DotsPulse() {
  return (
    <motion.div
      animate="pulse"
      transition={{ delayChildren: stagger(-0.2, { from: "last" }) }}
      className="flex items-center gap-1"
    >
      <Dot />
      <Dot />
      <Dot />
    </motion.div>
  );
}
