"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TelemetryOverlay() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 280, mass: 0.4 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    // Initial dimensions
    setDimensions({ w: window.innerWidth, h: window.innerHeight });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* 1. Fullscreen matrix grid */}
      <div 
        className="absolute inset-0 opacity-45 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(212, 252, 52, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(212, 252, 52, 0.05) 1px, transparent 1px)`,
          backgroundSize: "3.5rem 3.5rem"
        }}
      />

      {/* 2. Cursor tracking crosshairs */}
      <motion.div 
        style={{ y: springY }}
        className="fixed inset-x-0 h-[1px] bg-a-volt/10 z-40"
      />
      <motion.div 
        style={{ x: springX }}
        className="fixed inset-y-0 w-[1px] bg-a-volt/10 z-40"
      />

      {/* 3. Liquid morphing neon cursor blob */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          filter: "url(#morph-goo)"
        }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-a-volt opacity-55 mix-blend-screen z-50 pointer-events-none filter blur-[1px]"
      />

      {/* SVG filter definitions for the morphing liquid goo */}
      <svg className="hidden">
        <defs>
          <filter id="morph-goo">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.015;0.035;0.015" dur="12s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 4. Telemetry Corner Dashboards */}
      {/* Top Left: Coordinates */}
      <div className="absolute top-28 left-6 font-mono text-[9px] text-a-volt/65 flex flex-col gap-1 z-50 bg-black/45 px-3 py-2 border border-a-volt/15 rounded backdrop-blur-sm">
        <span className="font-bold border-b border-a-volt/20 pb-0.5 mb-0.5">SYS_CURSOR_TELEMETRY</span>
        <span>X_POS // {coords.x}px</span>
        <span>Y_POS // {coords.y}px</span>
      </div>

      {/* Top Right: Scroll status */}
      <div className="absolute top-28 right-6 font-mono text-[9px] text-a-volt/65 flex flex-col gap-1 z-50 bg-black/45 px-3 py-2 border border-a-volt/15 rounded backdrop-blur-sm">
        <span className="font-bold border-b border-a-volt/20 pb-0.5 mb-0.5">SYS_SCROLL_TRACK</span>
        <span>SCROLL_Y // {scrollY}px</span>
        <span>TARGET   // {scrollY + dimensions.h}px</span>
      </div>

      {/* Bottom Left: Dimensions */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-a-volt/65 flex flex-col gap-1 z-50 bg-black/45 px-3 py-2 border border-a-volt/15 rounded backdrop-blur-sm">
        <span className="font-bold border-b border-a-volt/20 pb-0.5 mb-0.5">SYS_VIEW_DIMENSIONS</span>
        <span>VIEWPORT_W // {dimensions.w}px</span>
        <span>VIEWPORT_H // {dimensions.h}px</span>
      </div>

      {/* Bottom Right: Status indicator */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-a-volt/65 flex flex-col gap-1 z-50 bg-black/45 px-3 py-2 border border-a-volt/15 rounded backdrop-blur-sm">
        <span className="font-bold border-b border-a-volt/20 pb-0.5 mb-0.5">SYS_REF_STABILITY</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-a-volt animate-ping" />
          <span>FPS // 60.0_STABLE</span>
        </span>
        <span>MODE // TELEMETRY_ACTIVE</span>
      </div>
    </div>
  );
}
