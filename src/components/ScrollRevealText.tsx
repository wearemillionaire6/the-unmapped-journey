"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useTransform, MotionValue } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  // For horizontal sections, pass scrollProgress and range
  scrollProgress?: MotionValue<number>;
  range?: [number, number];
}

export default function ScrollRevealText({ text, className = "", scrollProgress, range }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    // If inside horizontal track, we skip the vertical GSAP ScrollTrigger
    if (scrollProgress && range) return;

    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { color: "rgba(244, 246, 249, 0.15)" },
        {
          color: "rgba(244, 246, 249, 1)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, scrollProgress, range]);

  if (scrollProgress && range) {
    return (
      <p ref={containerRef} className={className}>
        {words.map((word, idx) => {
          const totalWords = words.length;
          const start = range[0];
          const end = range[1];
          const spanDuration = (end - start) / totalWords;
          const wordStart = start + idx * spanDuration;
          const wordEnd = wordStart + spanDuration;

          // Map color from transparent/faded to full white
          const color = useTransform(
            scrollProgress,
            [wordStart, wordEnd],
            ["rgba(244, 246, 249, 0.15)", "rgba(244, 246, 249, 1)"]
          );

          return (
            <motion.span
              key={idx}
              style={{ color }}
              className="reveal-word inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="reveal-word inline-block mr-[0.25em]"
          style={{ color: "rgba(244, 246, 249, 0.15)" }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
