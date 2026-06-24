"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, ArrowDown } from "lucide-react";
import ScrollRevealText from "./ScrollRevealText";

export default function Panel1Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Spring Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax shifts for crystal layers
  const facet1X = useTransform(smoothX, [-300, 300], [-8, 8]);
  const facet1Y = useTransform(smoothY, [-300, 300], [-8, 8]);
  const facet2X = useTransform(smoothX, [-300, 300], [12, -12]);
  const facet2Y = useTransform(smoothY, [-300, 300], [12, -12]);

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

  // Text motion animation definitions
  const containerVars = {
    animate: { transition: { staggerChildren: 0.15 } }
  };

  const textVars = {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50 },
    animate: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full min-h-screen flex items-center justify-center bg-[#06101E] px-12 md:px-24 relative overflow-hidden select-none border-b border-white/5 py-24"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Column: Asymmetric Typography Reveal */}
        <motion.div 
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          <motion.div variants={textVars} className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <Compass className="w-4 h-4 text-[#0077FF] animate-spin-slow" />
            <span>SAPPHIRE LTD // INSTITUTIONAL CORE</span>
          </motion.div>

          <motion.h1 
            variants={textVars}
            className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#F4F6F9] mb-6 uppercase"
          >
            Alternative Capital Solutions <br className="hidden sm:inline" />
            for India's Corporate Engine.
          </motion.h1>

          <div className="mb-8">
            <ScrollRevealText 
              text="Sapphire Ltd operates at the intersection of flexibility and structural institutional alignment. We provide customized, long-term financing matrices across the capital spectrum to fuel middle-market champions."
              className="text-[#60738A] text-base md:text-lg font-light leading-relaxed max-w-2xl"
            />
          </div>

          {/* Baseline metrics row */}
          <motion.div 
            variants={textVars}
            className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 max-w-xl font-mono text-[10px] sm:text-xs text-[#60738A]"
          >
            <div>
              <span className="text-[#48CAE4] font-extrabold block text-base sm:text-lg mb-1">₹7,500+ Cr</span>
              <span>AUM MANAGED</span>
            </div>
            <div>
              <span className="text-[#48CAE4] font-extrabold block text-base sm:text-lg mb-1">42 Active</span>
              <span>PORTFOLIO ENTITIES</span>
            </div>
            <div>
              <span className="text-[#48CAE4] font-extrabold block text-base sm:text-lg mb-1">14 Years</span>
              <span>STRUCTURAL RUN-RATE</span>
            </div>
          </motion.div>

          <motion.div 
            variants={textVars}
            className="flex items-center gap-2 text-a-volt font-mono text-[9px] tracking-widest uppercase mt-8 animate-pulse"
          >
            <span>SCROLL DOWN TO INITIATE TRACK</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Sapphire Crystal block */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square border border-white/10 p-4 bg-black/45 shadow-paper-depth-3 backdrop-blur-md rounded-lg overflow-hidden"
          >
            {/* Tech markings */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[SYS_FACET_01]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[CRYSTAL_REF_16]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-[#0077FF]/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-[#0077FF]/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-[#0077FF]/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-[#0077FF]/40 pointer-events-none z-30" />
            
            <div className="relative w-full h-full bg-[#030712] rounded overflow-hidden flex items-center justify-center">
              
              {/* Backing structural grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,119,255,0.12)_0%,transparent_75%)] pointer-events-none" />

              {/* Shard 2 (Deep) */}
              <motion.svg 
                style={{ x: facet2X, y: facet2Y }}
                viewBox="0 0 400 300" className="absolute w-[80%] h-[80%] fill-[#1C2541] stroke-[#0077FF]/15 strokeWidth-1 z-0 opacity-40"
              >
                <polygon points="120,80 180,50 220,110 150,150" />
                <polygon points="220,110 280,70 320,130 240,180" />
              </motion.svg>

              {/* Shard 1 (Foremost Core) */}
              <motion.svg 
                style={{ x: facet1X, y: facet1Y }}
                viewBox="0 0 400 300" className="absolute w-[90%] h-[90%] fill-[#0E1E46] stroke-[#0077FF] strokeWidth-2 z-10"
              >
                <polygon points="160,110 240,80 260,150 180,190" />
                <line x1="160" y1="110" x2="260" y2="150" stroke="#FFFFFF" strokeWidth="2.5" />
                <line x1="240" y1="80" x2="180" y2="190" stroke="#FFFFFF" strokeWidth="1.5" />
              </motion.svg>

              {/* Glow overlay */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-40 h-40 rounded-full bg-radial from-[#0077FF]/20 to-transparent blur-xl pointer-events-none mix-blend-color-dodge z-30"
              />
              
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
