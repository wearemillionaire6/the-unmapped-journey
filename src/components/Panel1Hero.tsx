"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Panel1Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Spring Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for crystal facets
  const facet1X = useTransform(smoothX, [-300, 300], [-8, 8]);
  const facet1Y = useTransform(smoothY, [-300, 300], [-8, 8]);
  
  const facet2X = useTransform(smoothX, [-300, 300], [12, -12]);
  const facet2Y = useTransform(smoothY, [-300, 300], [12, -12]);

  const facet3X = useTransform(smoothX, [-300, 300], [-15, 15]);
  const facet3Y = useTransform(smoothY, [-300, 300], [15, -15]);

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
      className="w-[100vw] h-full flex items-center justify-center bg-gradient-to-r from-[#0B132B] via-[#0D1836] to-[#122046] px-12 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      {/* Structural layout grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Corporate Thesis Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <Compass className="w-4 h-4 text-a-volt animate-spin-slow" />
            <span>SAPPHIRE LTD // THE THESIS</span>
          </div>

          <StaggeredText 
            text="Tailored Capital Solutions for the Indian Mid-Market"
            el="h1"
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6 uppercase"
          />

          <StaggeredText 
            text="We back high-growth enterprises and institutional managers across the subcontinent with flexible financing structures built for absolute endurance."
            el="p"
            className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl"
            delay={0.4}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-3 text-xs font-mono text-a-volt tracking-widest uppercase cursor-pointer group"
          >
            <span>SCROLL TO EXPLORE CAPITAL SECTORS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </motion.div>
        </div>

        {/* Right Side: Premium Crystalline Sapphire Facets Visual */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] border border-white/10 p-4 bg-black/45 shadow-paper-depth-3 backdrop-blur-md rounded-lg overflow-hidden group/crystal"
          >
            {/* Tech Telemetry corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[SYS_FACET_01]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[CRYSTAL_REF_16]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-a-volt/40 pointer-events-none z-30" />
            
            {/* Crystal SVG Frame */}
            <div className="relative w-full h-full bg-[#0a0f20] rounded overflow-hidden flex items-center justify-center">
              
              {/* Radial gradient backing glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(72,202,228,0.12)_0%,transparent_75%)] pointer-events-none" />

              {/* Facet 3 (Deepest / Back Shards) */}
              <motion.svg 
                style={{ x: facet3X, y: facet3Y }}
                viewBox="0 0 400 300" className="absolute w-[80%] h-[80%] fill-[#1C2541] stroke-[#48CAE4]/15 strokeWidth-1 z-0 opacity-40"
              >
                <polygon points="120,80 180,50 220,110 150,150" />
                <polygon points="220,110 280,70 320,130 240,180" />
                <polygon points="80,160 140,190 100,240 60,210" />
              </motion.svg>

              {/* Facet 2 (Middle Shards) */}
              <motion.svg 
                style={{ x: facet2X, y: facet2Y }}
                viewBox="0 0 400 300" className="absolute w-[85%] h-[85%] fill-[#0E1E46] stroke-[#48CAE4]/30 strokeWidth-1.5 z-10"
              >
                <polygon points="150,150 200,90 280,140 220,210" />
                <polygon points="80,120 160,80 190,140 110,180" />
                <polygon points="210,180 290,120 340,210 260,240" />
              </motion.svg>

              {/* Facet 1 (Foremost Sharp Crystalline Core Shards) */}
              <motion.svg 
                style={{ x: facet1X, y: facet1Y }}
                viewBox="0 0 400 300" className="absolute w-[90%] h-[90%] fill-[#0a1738] stroke-[#48CAE4] strokeWidth-2 z-20"
              >
                {/* Core Crystal Shard */}
                <polygon points="160,110 240,80 260,150 180,190" className="transition-all duration-300 hover:fill-[#0c2254]" />
                
                {/* Laser Light lines cutting through crystal facets */}
                <line x1="160" y1="110" x2="260" y2="150" stroke="#FFFFFF" strokeWidth="2.5" />
                <line x1="240" y1="80" x2="180" y2="190" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="130" y1="210" x2="220" y2="160" stroke="#FFFFFF" strokeWidth="1" />
              </motion.svg>

              {/* laser glow overlay effect */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-36 h-36 rounded-full bg-radial from-[#48CAE4]/25 to-transparent blur-xl pointer-events-none mix-blend-color-dodge z-30 translate-x-[15px] translate-y-[-10px]"
              />
              
            </div>

            {/* Bottom canvas telemetry */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[9px] tracking-widest font-mono text-slate-400 select-none">
              <span>LOC // BENGALURU_CORP</span>
              <span>LIGHT_VECTOR // ACTIVE</span>
              <span>SYS_CODE // SAPPHIRE_CORE</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
