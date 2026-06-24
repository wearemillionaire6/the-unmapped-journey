"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function SapphireScrollEngine({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Tracks vertical scrolling depth of the wrapper, locked to start-to-end of sticky window
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progression
  const smoothProgress = useSpring(scrollYProgress, { damping: 22, stiffness: 90 });

  // 2. Maps the 0-1 vertical scroll directly to horizontal translate-x
  // Translating -80% since we have 5 panels (each 100vw), shifting 4 panels total
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-[#0B132B]">
      {/* Sticky viewport frame locks container in view */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Continuous background horizontal moving strip */}
        <motion.div 
          style={{ x: xTranslate }} 
          className="flex w-[500vw] h-full"
        >
          {children}
        </motion.div>
        
      </div>
    </section>
  );
}
