"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Compass, ArrowDown, Watch } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Section1Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Spring Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background shifts opposite (-15px max)
  const bgTranslateX = useTransform(smoothX, [-300, 300], [15, -15]);
  const bgTranslateY = useTransform(smoothY, [-300, 300], [15, -15]);
  
  // Foreground traveler/torii shifts with (+10px max)
  const fgTranslateX = useTransform(smoothX, [-300, 300], [-10, 10]);
  const fgTranslateY = useTransform(smoothY, [-300, 300], [-10, 10]);

  // Track cursor coordinates relative to container center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Calculate offset from center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-m-charcoal flex flex-col justify-center items-center py-20 px-6 md:px-12 lg:px-20 border-b border-white/5 overflow-hidden animate-fade-in"
    >
      {/* Decorative Grid Lines to give a draft / craftsmanship vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Agency Info & Editorial Title */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6 text-a-amber uppercase tracking-[0.25em] text-xs font-semibold">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Showcase Chapter 01 / Kyoto, Japan</span>
          </div>

          <StaggeredText 
            text="THE UNMAPPED JOURNEY"
            el="h1"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-m-cream mb-6"
          />

          <StaggeredText 
            text="A premium travel showcase fusing custom AI image-to-video loops with premium digital papercut collage aesthetics."
            el="p"
            className="text-m-sepia text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg"
            delay={0.4}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <a 
              href="#departure"
              className="group relative inline-flex items-center justify-center px-6 py-3.5 bg-a-amber text-m-charcoal font-medium text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,184,0,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Destination 
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0 opacity-20" />
            </a>
            
            <div className="flex items-center gap-3 py-3 text-xs tracking-widest text-m-grey font-mono uppercase">
              <span>EST. 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-a-teal animate-pulse" />
              <span>KYOTO SUNSET</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: 16:9 Canvas Frame containing the Kyoto Paper Collage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[16/9] border border-white/10 p-4 bg-m-charcoal/80 shadow-paper-depth-3 backdrop-blur-sm rounded-lg overflow-hidden group"
          >
            {/* Inner Frame */}
            <div className="relative w-full h-full bg-[#1b1916] rounded overflow-hidden flex items-center justify-center">
              
              {/* Layer 1: Textured Sunset Golden Background Paper */}
              <motion.div 
                style={{ x: bgTranslateX, y: bgTranslateY }}
                className="absolute inset-[-20px] bg-gradient-to-b from-[#ffb800]/25 via-[#9e2a2b]/25 to-[#121212] paper-cut-layer flex items-center justify-center"
              >
                {/* SVG representing organic paper fibers/noise background */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* Soft gradient cardstock layers representing distant mountains */}
                <div className="absolute inset-x-8 bottom-0 top-16 bg-[#4e312a] rounded-t-full opacity-60 border-t border-white/5 shadow-paper-inner" />
                <div className="absolute inset-x-16 bottom-0 top-24 bg-[#332220] rounded-t-full opacity-80 border-t border-white/5 shadow-paper-inner" />
              </motion.div>

              {/* Layer 2: Giant Pocket Watch / Clockwork Gateway */}
              <motion.div 
                style={{ x: bgTranslateX, y: bgTranslateY }}
                className="absolute w-[85%] h-[85%] flex items-center justify-center pointer-events-none z-10"
              >
                {/* SVG Watch Face and Gears */}
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.6)]">
                  {/* Outer Watch Brass Rim */}
                  <circle cx="200" cy="200" r="150" fill="#201c18" stroke="#ffb800" strokeWidth="3" opacity="0.6" />
                  
                  {/* Ticking Rotating Gears (4rpm = 15s per rotation, counter-clockwise) */}
                  <motion.g
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                  >
                    {/* Center Gear */}
                    <circle cx="200" cy="200" r="30" fill="#12110f" stroke="#b5a895" strokeWidth="2" opacity="0.4" />
                    {[...Array(8)].map((_, i) => (
                      <path
                        key={`gear-tooth-${i}`}
                        d="M 196 160 L 204 160 L 202 170 L 198 170 Z"
                        fill="#b5a895"
                        opacity="0.5"
                        transform={`rotate(${i * 45} 200 200)`}
                      />
                    ))}
                  </motion.g>

                  {/* Crack along watch face, leaking a sliver of golden hour light */}
                  <motion.path
                    d="M 200 200 L 170 230 L 150 280 L 130 330"
                    stroke="#ffb800"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                    filter="url(#glow)"
                  />
                  
                  {/* Glow filter definition */}
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* Powerful sliver of golden light leaking from watch seam using CSS overlay */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 0.7, 0.4, 0.7] }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 3, repeat: Infinity, repeatType: "mirror" }}
                  className="absolute w-32 h-64 bg-gradient-to-r from-a-amber/20 to-transparent blur-xl origin-left rotate-[40deg] translate-x-[-10px] translate-y-[20px] pointer-events-none mix-blend-color-dodge"
                />
              </motion.div>

              {/* Layer 3: Kyoto red Torii Gate & Cherry Blossoms (Tactile silhouettes) */}
              <motion.div
                style={{ x: fgTranslateX, y: fgTranslateY }}
                className="absolute inset-0 flex items-end justify-center pointer-events-none z-20"
              >
                <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full filter drop-shadow-[0_-6px_12px_rgba(0,0,0,0.5)]">
                  {/* Stone steps path leading into gate */}
                  <path d="M 320 450 L 340 340 L 460 340 L 480 450 Z" fill="#1b1816" stroke="#2a2522" strokeWidth="2" />
                  <line x1="330" y1="400" x2="470" y2="400" stroke="#2a2522" strokeWidth="2" />
                  <line x1="335" y1="370" x2="465" y2="370" stroke="#2a2522" strokeWidth="2" />

                  {/* Left stone lantern */}
                  <path d="M 280 430 L 290 430 L 290 390 L 280 390 Z" fill="#2d2822" />
                  <path d="M 275 390 L 295 390 L 285 375 Z" fill="#ffb800" opacity="0.8" filter="url(#glow)" />
                  <path d="M 275 390 L 295 390 L 285 375 Z" fill="#2d2822" />

                  {/* Majestic Red Torii Gate Silhouette (Kyoto Destination) */}
                  {/* Left Column */}
                  <rect x="335" y="170" width="16" height="170" fill="#9e2a2b" stroke="#000000" strokeWidth="1" />
                  {/* Right Column */}
                  <rect x="449" y="170" width="16" height="170" fill="#9e2a2b" stroke="#000000" strokeWidth="1" />
                  {/* Base blocks */}
                  <rect x="331" y="325" width="24" height="15" fill="#111111" />
                  <rect x="445" y="325" width="24" height="15" fill="#111111" />
                  {/* Lower Crossbar */}
                  <rect x="310" y="195" width="180" height="12" fill="#9e2a2b" stroke="#000000" strokeWidth="1" />
                  {/* Top Curved Lintels (Black top, red body) */}
                  <path d="M 290 148 C 340 160, 460 160, 510 148 L 505 162 C 460 170, 340 170, 295 162 Z" fill="#9e2a2b" stroke="#000000" strokeWidth="1" />
                  <path d="M 288 140 C 340 152, 460 152, 512 140 L 510 148 C 460 160, 340 160, 290 148 Z" fill="#111111" />

                  {/* Silhouette of modern traveler looking up at Torii gate */}
                  {/* Coordinates: standing slightly left of center */}
                  <path 
                    d="M 375 390 C 375 360, 385 348, 395 348 C 405 348, 410 338, 410 332 C 413 332, 416 326, 415 320 C 413 314, 407 308, 398 308 C 386 308, 383 317, 380 320 C 377 323, 374 329, 374 338 C 374 350, 362 362, 356 390 Z" 
                    fill="#050505" 
                  />

                  {/* Overhanging Cherry Blossom branches framing from top-right and top-left */}
                  <path 
                    d="M 800 0 C 720 40, 680 80, 600 85 M 800 30 C 750 60, 710 110, 650 115" 
                    stroke="#1a1412" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                  {/* Cherry blossom paper petals (pink `#fae1e5` & magenta `#c3073f` highlights) */}
                  <circle cx="600" cy="85" r="10" fill="#fae1e5" opacity="0.9" />
                  <circle cx="605" cy="88" r="6" fill="#c3073f" opacity="0.9" />
                  
                  <circle cx="650" cy="115" r="12" fill="#fae1e5" opacity="0.9" />
                  <circle cx="645" cy="112" r="8" fill="#c3073f" opacity="0.9" />
                  
                  <circle cx="700" cy="70" r="14" fill="#fae1e5" opacity="0.8" />
                  <circle cx="730" cy="110" r="11" fill="#fae1e5" opacity="0.8" />

                  {/* Left side branches */}
                  <path 
                    d="M 0 0 C 80 30, 120 70, 180 80" 
                    stroke="#1a1412" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                  />
                  <circle cx="180" cy="80" r="10" fill="#fae1e5" opacity="0.9" />
                  <circle cx="178" cy="78" r="6" fill="#c3073f" opacity="0.9" />
                  <circle cx="140" cy="60" r="12" fill="#fae1e5" opacity="0.8" />
                </svg>
              </motion.div>

              {/* Physical Border Shadow Mask around the papercut edges */}
              <div className="absolute inset-0 border-[8px] border-[#1b1916] pointer-events-none rounded" />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)] pointer-events-none" />
            </div>

            {/* Bottom canvas metadata indicators */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-m-sepia select-none">
              <span>SYS.LOC // KYOTO_JAPAN</span>
              <div className="flex items-center gap-1.5">
                <Watch className="w-3 h-3 text-a-amber animate-pulse" />
                <span>4.0 RPM</span>
              </div>
              <span>ASSET_REF: KYOTO_TORII</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background overlay transitions */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-m-charcoal to-transparent pointer-events-none z-30" />
    </section>
  );
}
