"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  colorClass?: string;
}

export default function Marquee({ text, speed = 25, reverse = false, colorClass = "stroke-white/10" }: MarqueeProps) {
  // Repeat words to ensure continuous scroll width
  const words = Array(8).fill(text);

  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap select-none pointer-events-none">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex gap-8 text-[7vw] font-sans font-black tracking-widest uppercase text-transparent"
        style={{ WebkitTextStroke: `1px currentColor` }}
      >
        {words.map((w, i) => (
          <span key={i} className={`flex-shrink-0 ${colorClass} flex items-center gap-8`}>
            <span>{w}</span>
            <span>//</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
