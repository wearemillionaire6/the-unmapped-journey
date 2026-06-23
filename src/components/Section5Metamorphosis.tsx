"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Send, Map, Heart } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Section5Metamorphosis() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer 
      id="metamorphosis"
      className="relative min-h-screen w-full bg-[#0a0706] flex flex-col justify-between overflow-hidden"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      {/* ================= TOP COLLAGE CANVAS (Swallows Viewport) ================= */}
      <div className="relative w-full h-[65vh] md:h-[70vh] bg-gradient-to-b from-[#1c0c08] to-[#0a0706] overflow-hidden">
        
        {/* Layer 1: Radiant Golden Sunrise Sky */}
        <div className="absolute inset-0 bg-gradient-to-t from-a-amber/30 via-a-crimson/20 to-transparent opacity-65 z-0 pointer-events-none" />
        
        {/* Huge Sunrise Sun */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-t from-a-amber to-a-crimson filter blur-[4px] drop-shadow-[0_0_60px_rgba(255,184,0,0.6)] z-0"
        />

        {/* Layer 2: Huayna Picchu mountain peaks & Stone Terraces (Machu Picchu) */}
        <div className="absolute bottom-[20%] right-[-5%] w-[65%] h-[40%] pointer-events-none z-5 opacity-70 filter drop-shadow-[0_-4px_8px_rgba(0,0,0,0.35)]">
          <svg viewBox="0 0 500 300" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#1c1815]">
            {/* Mountain Peak */}
            <path d="M 100 300 L 250 80 Q 280 60 300 80 L 450 300 Z" />
            {/* Incas terraces */}
            <path d="M 0 300 H 500 V 220 Q 420 200 380 230 Q 300 210 260 240 Q 180 220 120 250 H 0 Z" fill="#2d221b" />
            <path d="M 0 300 H 500 V 245 Q 430 230 400 255 Q 320 235 280 260 Q 200 245 150 270 H 0 Z" fill="#3d2c22" />
          </svg>
        </div>

        {/* Layer 3: Rolling Clouds (Deep Wave) */}
        <motion.div 
          animate={{ x: [-40, 20, -40] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute bottom-[10%] inset-x-[-100px] h-[35%] z-10 pointer-events-none opacity-45 filter drop-shadow-[0_-6px_12px_rgba(0,0,0,0.25)]"
        >
          <svg viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#cbbcad]">
            <path d="M 0 200 C 150 140, 250 80, 450 120 C 650 160, 750 90, 950 130 C 1150 170, 1250 110, 1400 150 L 1400 200 Z" />
          </svg>
        </motion.div>

        {/* Layer 4: Rolling Clouds (Mid Wave) */}
        <motion.div 
          animate={{ x: [30, -30, 30] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute bottom-[5%] inset-x-[-100px] h-[30%] z-20 pointer-events-none opacity-65 filter drop-shadow-[0_-8px_16px_rgba(0,0,0,0.35)]"
        >
          <svg viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#a8988a]">
            <path d="M 0 200 C 200 120, 350 160, 500 110 C 650 60, 800 140, 1000 90 C 1200 40, 1300 120, 1400 130 L 1400 200 Z" />
          </svg>
        </motion.div>

        {/* Layer 5: Rolling Clouds (Foreground Wave) */}
        <motion.div 
          animate={{ x: [-20, 40, -20] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute bottom-[-10px] inset-x-[-100px] h-[25%] z-30 pointer-events-none filter drop-shadow-[0_-12px_24px_rgba(0,0,0,0.45)]"
        >
          <svg viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#817266]">
            <path d="M 0 200 C 100 150, 300 90, 450 130 C 600 170, 800 100, 950 140 C 1100 180, 1250 110, 1400 160 L 1400 200 Z" />
          </svg>
        </motion.div>

        {/* Layer 6: Towering Cliff Edge (Foreground Left) */}
        <div className="absolute inset-y-0 left-0 w-[35%] pointer-events-none z-30 filter drop-shadow-[12px_0_24px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 200 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#0f0b09]">
            {/* Massive towering cliff */}
            <path d="M 0 0 C 30 50, 50 120, 45 180 C 40 230, 85 290, 75 350 C 65 410, 110 440, 90 450 L 0 450 Z" />
            <path d="M 0 0 C 15 30, 30 90, 25 140 C 20 180, 55 240, 45 300 C 35 360, 60 410, 50 450 L 0 450 Z" fill="#201714" opacity="0.5" />
          </svg>
        </div>

        {/* Layer 7: Traveler with expanding chest (Breathing) and Interactive Map */}
        <div 
          className="absolute top-[40%] left-[10%] w-24 h-40 z-40"
          onMouseEnter={() => setMapOpen(true)}
          onMouseLeave={() => setMapOpen(false)}
          onClick={() => setMapOpen(!mapOpen)}
        >
          {/* Subtle Breathing Scale on the silhouette */}
          <motion.div
            animate={{ 
              scaleY: [1, 1.018, 1],
              scaleX: [1, 1.008, 1],
              y: [0, -1, 0]
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            {/* SVG Traveler silhouette */}
            <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
              <path 
                d="M 22 130 C 22 105, 32 95, 37 95 C 42 95, 47 90, 47 80 C 47 70, 50 65, 48 55 C 45 45, 52 42, 57 42 C 62 42, 65 45, 62 55 C 59 65, 62 70, 62 80 C 62 90, 52 105, 52 130 Z" 
                fill="#050302" 
              />
              {/* Legs standing stable */}
              <path d="M 32 130 L 28 160 M 42 130 L 46 160" stroke="#050302" strokeWidth="6.5" strokeLinecap="round" />
              
              {/* Arm holding out map */}
              <path d="M 46 82 L 65 85 L 68 76" stroke="#050302" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Interactive folding map and face-glow */}
            <div className="absolute top-[45%] left-[55%] w-10 h-10 flex items-center justify-center">
              
              {/* Radial gradient face glow, triggers when map is open */}
              <motion.div
                animate={mapOpen ? { opacity: 0.75, scale: 1.1 } : { opacity: 0, scale: 0.8 }}
                className="absolute w-24 h-24 rounded-full bg-radial from-a-amber/40 to-transparent blur-[6px] pointer-events-none mix-blend-color-dodge z-50 translate-x-[-15px] translate-y-[-35px]"
              />

              {/* Map Asset SVG */}
              <motion.div
                animate={mapOpen ? { rotateY: 0, scale: 1.1 } : { rotateY: 55, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full cursor-pointer relative z-50"
              >
                <Map className={`w-8 h-8 ${mapOpen ? 'text-a-amber' : 'text-m-sepia'} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-300`} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Absolute Canvas overlay border */}
        <div className="absolute inset-0 shadow-[inset_0_-40px_60px_rgba(10,7,6,1)] pointer-events-none z-50" />
      </div>

      {/* ================= BOTTOM B2B CTA BLOCK ================= */}
      <div className="relative w-full px-6 md:px-12 lg:px-20 py-16 z-50 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5">
        
        {/* Left Side: Call to Action Details */}
        <div className="max-w-md text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-a-amber uppercase tracking-[0.25em] text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Showcase Chapter 05 / Machu Picchu, Peru</span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-m-cream font-light mb-4 leading-tight">
            Scale New Heights: <br />
            The <span className="italic text-a-amber">Peru Expedition</span>
          </h3>

          <p className="text-m-sepia text-sm font-light leading-relaxed">
            Collaborate with our studio to craft high-fidelity interactive portals for luxury travel destinations. Let's map out something unforgettable.
          </p>
        </div>

        {/* Right Side: Form intake */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative flex items-center border border-white/10 bg-[#120f0e] rounded focus-within:border-a-amber/50 transition-colors">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EXPEDITION EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 py-3.5 text-xs font-mono tracking-widest text-m-cream placeholder-m-grey outline-none"
              />
              <button
                type="submit"
                disabled={submitted}
                className="px-4 py-3.5 text-a-amber hover:text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <span className="text-[9px] font-mono text-m-sepia tracking-widest uppercase">
              {submitted ? "SYS_STATUS // EXPEDITION LOCKED" : "SYS_STATUS // STANDBY FOR EXPEDITION INFO"}
            </span>
          </form>
        </div>
      </div>

      {/* ================= COPYRIGHT / FOOTER DETAILS ================= */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-8 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-m-sepia uppercase tracking-widest border-t border-white/5 pt-8 gap-4 select-none">
        <span>© 2026 THE UNMAPPED JOURNEY COLLABORATIVE</span>
        <div className="flex items-center gap-1.5">
          <span>DESIGNED WITH</span>
          <Heart className="w-3 h-3 text-a-crimson animate-pulse" />
          <span>AND NEXT.JS</span>
        </div>
        <span>COORD // 13.1631S 72.5450W</span>
      </div>
    </footer>
  );
}
