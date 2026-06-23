"use client";

import React from "react";
import { motion } from "framer-motion";

interface StaggeredTextProps {
  text: string;
  el?: keyof React.JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  delay?: number;
}

export default function StaggeredText({
  text,
  el: Wrapper = "p",
  className = "",
  once = true,
  delay = 0,
}: StaggeredTextProps) {
  // Split into characters
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: "0.25em",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  // Type assertion for Wrapper element
  const MotionEl = motion(Wrapper) as any;

  return (
    <MotionEl
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </MotionEl>
  );
}
