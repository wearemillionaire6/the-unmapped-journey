"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { MotionValue } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollEngineProps {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
}

export default function ScrollEngine({ children, scrollProgress }: ScrollEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP ScrollTrigger Configuration for Horizontal Sliding Track
    const scrollWidth = scrollSectionRef.current?.offsetWidth || 0;
    const viewportWidth = window.innerWidth;
    const amountToScroll = scrollWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollSectionRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, // Pins the viewport frame so it locks in place vertically
          scrub: 1,  // Links animation progression strictly to scrollbar position
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update the Framer Motion value for high-performance sub-element transforms
            scrollProgress.set(self.progress);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-m-charcoal">
      <div ref={scrollSectionRef} className="flex h-screen w-max items-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}
