"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, Sliders, TrendingUp } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Panel3Equity() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax spring control for topographical peaks illumination
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Translate glow light based on mouse
  const lightX = useTransform(smoothX, [-300, 300], ["40%", "60%"]);
  const lightY = useTransform(smoothY, [-300, 300], ["35%", "55%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[100vw] h-full flex items-center justify-center bg-gradient-to-r from-[#1C2541] via-[#151D35] to-[#0B132B] px-12 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Growth Equity Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <TrendingUp className="w-4 h-4 text-a-volt" />
            <span>SAPPHIRE LTD // PRIVATE EQUITY</span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
            Growth Equity <br />
            <span className="italic text-a-volt font-normal">& Strategic Scale</span>
          </h2>
          
          <StaggeredText
            text="Minority and growth equity partnerships to unlock generational scale. Enabling exceptional management teams to maintain operating control while leveraging institutional-grade financial architecture."
            el="p"
            className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
            delay={0.2}
          />

          <ul className="space-y-3 text-xs sm:text-sm font-mono text-slate-400">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-a-volt animate-pulse" />
              <span>Capital Structure Optimization</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-a-volt" />
              <span>Institutional Governance Alignment</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-a-volt" />
              <span>Generational Transition Financing</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Soaring Geometric Peaks with illumination */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <div className="relative w-full aspect-[4/3] border border-white/10 p-4 bg-black/45 shadow-paper-depth-3 backdrop-blur-md rounded-lg overflow-hidden group">
            
            {/* Tech telemetry corner markings */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[SYS_PEAKS_03]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[STRATEGIC_SCALE]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-a-volt/40 pointer-events-none z-30" />

            <div className="relative w-full h-full bg-[#070b17] rounded overflow-hidden">
              
              {/* Illumination light source (follows mouse) */}
              <motion.div 
                style={{ left: lightX, top: lightY }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(72,202,228,0.25)_0%,transparent_70%)] pointer-events-none z-10 mix-blend-color-dodge"
              />

              {/* Topographical Peaks (layered polygon meshes representing peaks) */}
              <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="absolute inset-0 w-full h-full stroke-[#48CAE4]/25 strokeWidth-1 fill-[#121A33] opacity-85 z-0">
                {/* Grid contour lines */}
                <path d="M 0 250 Q 100 230 200 240 T 400 220 T 500 210" fill="none" strokeWidth="0.5" />
                <path d="M 0 220 Q 120 190 250 200 T 450 180 T 500 170" fill="none" strokeWidth="0.5" />
                <path d="M 0 190 Q 150 150 280 170 T 480 140 T 500 130" fill="none" strokeWidth="0.5" />
                
                {/* Peak 1 (Left - Midnight Metal) */}
                <polygon points="50,280 150,110 220,280" fill="#0E1E46" stroke="#48CAE4" strokeWidth="1.5" />
                
                {/* Peak 2 (Center - High Growth Peak) */}
                <polygon points="150,280 260,60 380,280" fill="#1C2541" stroke="#48CAE4" strokeWidth="2" />
                
                {/* Peak 3 (Right - Sapphire Crystal Shard Peak) */}
                <polygon points="320,280 410,130 480,280" fill="#0E1E46" stroke="#48CAE4" strokeWidth="1.5" />
              </svg>

              {/* Shifting cyan light reflections on forward edges */}
              <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="absolute inset-0 w-full h-full fill-none z-20 pointer-events-none">
                {/* illuminated edges of Peak 2 */}
                <path d="M 150 280 L 260 60" stroke="#FFFFFF" strokeWidth="2.5" className="opacity-75" />
                <path d="M 260 60 L 380 280" stroke="#48CAE4" strokeWidth="1.5" className="opacity-55" />
                {/* illuminated edges of Peak 1 */}
                <path d="M 50 280 L 150 110" stroke="#FFFFFF" strokeWidth="2" className="opacity-60" />
                {/* illuminated edges of Peak 3 */}
                <path d="M 320 280 L 410 130" stroke="#FFFFFF" strokeWidth="2" className="opacity-60" />
              </svg>
              
            </div>

            {/* Bottom canvas telemetry */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[9px] tracking-widest font-mono text-slate-400 select-none">
              <span>LOC // HYDERABAD_CORP</span>
              <span>PEAK_ANGLE // 68_DEG</span>
              <span>SYS_LUM // ACTIVE</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
