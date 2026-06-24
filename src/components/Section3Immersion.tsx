"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Compass, Cpu, Sliders, Layers, BarChart } from "lucide-react";
import StaggeredText from "./StaggeredText";
import Marquee from "./Marquee";

export default function Section3Immersion({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Parallax intensity control state (from dial/sliders)
  const [parallaxIntensity, setParallaxIntensity] = useState(60); 
  const parallaxMultiplier = parallaxIntensity / 100;

  // Map the horizontal track progress [0.6, 0.8] to Serengeti parallax zoom
  const bgScale = useTransform(scrollProgress, [0.6, 0.8], [1, 1 + 0.15 * parallaxMultiplier]);
  const midScale = useTransform(scrollProgress, [0.6, 0.8], [1, 1 + 0.3 * parallaxMultiplier]);
  
  const fgLeftX = useTransform(scrollProgress, [0.6, 0.8], [0, -60 * parallaxMultiplier]);
  const fgLeftScale = useTransform(scrollProgress, [0.6, 0.8], [1, 1 + 0.45 * parallaxMultiplier]);
  
  const fgRightX = useTransform(scrollProgress, [0.6, 0.8], [0, 60 * parallaxMultiplier]);
  const fgRightScale = useTransform(scrollProgress, [0.6, 0.8], [1, 1 + 0.45 * parallaxMultiplier]);

  // Giraffe walk & ripples states
  const [animalState, setAnimalState] = useState<"walking" | "drinking" | "rippling">("walking");
  const [shadowDepth, setShadowDepth] = useState(3);
  const [dialRotation, setDialRotation] = useState(0);

  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const intensity = shadowDepth * 0.1;
    document.documentElement.style.setProperty(
      "--shadow-paper-depth-3",
      `0 14px 28px rgba(0, 0, 0, ${0.15 + intensity}), 0 10px 10px rgba(0, 0, 0, ${0.12 + intensity})`
    );
  }, [shadowDepth]);

  useEffect(() => {
    if (!isIntersecting) return;
    
    const interval = setInterval(() => {
      setAnimalState("walking");
      setTimeout(() => {
        setAnimalState("drinking");
        setTimeout(() => {
          setAnimalState("rippling");
        }, 1500);
      }, 3000);
    }, 8500);

    return () => clearInterval(interval);
  }, [isIntersecting]);

  // Canvas ripple loop
  useEffect(() => {
    if (animalState !== "rippling") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let localRipples = [{ x: 215, y: 220, r: 0, opacity: 0.95 }];

    const drawRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      localRipples = localRipples.map((rip) => {
        rip.r += 1.8;
        rip.opacity -= 0.015;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 59, 104, ${rip.opacity})`; 
        ctx.lineWidth = 2.5;
        ctx.ellipse(rip.x, rip.y, rip.r * 1.5, rip.r * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();

        return rip;
      }).filter(rip => rip.opacity > 0);

      if (localRipples.length > 0 && localRipples[localRipples.length - 1].r > 20 && localRipples.length < 3) {
        localRipples.push({
          x: 215,
          y: 220,
          r: 0,
          opacity: 0.95 - localRipples.length * 0.25
        });
      }

      if (localRipples.length > 0) {
        animationId = requestAnimationFrame(drawRipples);
      } else {
        setAnimalState("walking");
      }
    };

    drawRipples();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [animalState]);

  return (
    <div 
      ref={sectionRef}
      className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center bg-m-charcoal relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      
      <div className="absolute top-[5%] inset-x-0 z-0 opacity-15 overflow-hidden select-none pointer-events-none">
        <Marquee text="SERENGETI SAFARI WILDERNESS PORTAL KENYA" speed={40} colorClass="stroke-white/5" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-12 md:px-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-4 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
              <Cpu className="w-4 h-4" />
              <span>Showcase Chapter 03 / Serengeti, Kenya</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-m-cream mb-4 leading-tight">
              Interlocking Bento Systems & <br />
              <span className="italic text-a-teal font-normal text-3xl">Savanna Expanses</span>
            </h2>
            
            <p className="text-m-sepia text-xs sm:text-sm font-light leading-relaxed mb-6">
              Adjust the Z-depth parallax sliders, or scroll horizontally to see the walking giraffe ripple the river and the mountain layers zoom.
            </p>

            {/* Tactile sliders in column */}
            <div className="space-y-4 border-t border-white/5 pt-4">
              <div>
                <div className="flex justify-between text-[8px] font-mono mb-1 text-m-grey">
                  <span>Z-DEPTH PARALLAX</span>
                  <span className="text-a-volt">{parallaxIntensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={parallaxIntensity} 
                  onChange={(e) => setParallaxIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-a-volt"
                />
              </div>
              <div>
                <div className="flex justify-between text-[8px] font-mono mb-1 text-m-grey">
                  <span>SHADOW FACTOR</span>
                  <span className="text-a-volt">x{shadowDepth}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={shadowDepth} 
                  onChange={(e) => setShadowDepth(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-a-volt"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Parallax Bento Card collage */}
          <div className="lg:col-span-8 flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] max-w-xl bg-[#121110] border border-white/10 rounded-lg overflow-hidden shadow-paper-depth-3">
              <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[LN_SYS_03]</span>
              <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[1.9863S 34.8219E]</span>
              
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#eae1cc] overflow-hidden">
                {/* Mount Kilimanjaro */}
                <motion.div 
                  style={{ scale: bgScale }}
                  className="absolute inset-0 flex items-end justify-center pointer-events-none z-0"
                >
                  <svg viewBox="0 0 600 450" preserveAspectRatio="none" className="w-full h-full fill-[#dfcaa0]">
                    <circle cx="480" cy="180" r="45" fill="#faedd4" opacity="0.45" />
                    <path d="M 120 450 L 260 210 Q 320 180 380 210 L 520 450 Z" />
                    <path d="M 260 210 Q 320 180 380 210 L 350 230 Q 320 220 290 230 Z" fill="#ffffff" opacity="0.8" />
                  </svg>
                </motion.div>

                {/* Midground Acacia trees */}
                <motion.div 
                  style={{ scale: midScale }}
                  className="absolute inset-0 flex items-end justify-center pointer-events-none z-10"
                >
                  <svg viewBox="0 0 600 450" preserveAspectRatio="none" className="w-full h-full fill-[#cbb997]">
                    <path d="M 0 450 Q 200 360 400 400 T 600 370 L 600 450 Z" />
                    <path d="M 140 380 L 140 340 L 120 320 M 140 340 L 160 320" stroke="#4a3e2b" strokeWidth="3" />
                    <ellipse cx="140" cy="315" rx="35" ry="8" fill="#4a543f" />
                  </svg>
                </motion.div>

                {/* River */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-25">
                  <svg viewBox="0 0 600 450" preserveAspectRatio="none" className="w-full h-full fill-none">
                    <path d="M 350 450 C 310 400, 260 360, 280 300 C 300 240, 220 210, 215 195 C 210 180, 225 160, 220 140" stroke="#0e3b68" strokeWidth="38" strokeLinecap="round" />
                    <path d="M 350 450 C 310 400, 260 360, 280 300 C 300 240, 220 210, 215 195 C 210 180, 225 160, 220 140" stroke="#16518a" strokeWidth="32" strokeLinecap="round" />
                  </svg>
                </div>

                <canvas ref={canvasRef} width={600} height={450} className="absolute inset-0 w-full h-full pointer-events-none z-26" />

                {/* Low-Poly Giraffe */}
                <motion.div
                  variants={{
                    walking: { x: [-30, 95], y: [130, 140] },
                    drinking: { x: 95, y: 140 },
                    rippling: { x: 95, y: 140 }
                  }}
                  animate={animalState}
                  transition={{ duration: 3, ease: "linear" }}
                  className="absolute w-36 h-36 pointer-events-none z-27"
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
                    <polygon points="40,50 70,50 62,70 45,70" fill="#dfae40" />
                    <rect x="46" y="54" width="6" height="5" rx="1" fill="#8c5820" />
                    <line x1="45" y1="70" x2="42" y2="105" stroke="#dfae40" strokeWidth="4.5" />
                    <line x1="45" y1="70" x2="42" y2="105" stroke="#8c5820" strokeWidth="2.5" />
                    <line x1="60" y1="70" x2="58" y2="105" stroke="#dfae40" strokeWidth="4.5" />
                    <line x1="60" y1="70" x2="58" y2="105" stroke="#8c5820" strokeWidth="2.5" />
                    <motion.g
                      animate={animalState === "drinking" || animalState === "rippling" ? { rotate: 50, x: -10, y: 15 } : { rotate: 0, x: 0, y: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      style={{ transformOrigin: "65px 52px" }}
                    >
                      <polygon points="62,54 70,54 82,10 74,10" fill="#dfae40" />
                      <polygon points="74,10 90,14 86,22 74,16" fill="#dfae40" />
                    </motion.g>
                  </svg>
                </motion.div>

                {/* Left & Right foreground leaves */}
                <motion.div 
                  style={{ x: fgLeftX, scale: fgLeftScale }}
                  className="absolute inset-y-0 left-[-20px] w-1/3 flex items-end pointer-events-none z-30 filter drop-shadow-[6px_0_12px_rgba(0,0,0,0.35)] origin-bottom-left"
                >
                  <svg viewBox="0 0 200 450" preserveAspectRatio="none" className="w-full h-[110%] fill-[#3d4434]">
                    <polygon points="0,0 80,450 0,450" />
                    <path d="M 0 100 Q 120 180 0 240 Z" fill="#2d3326" />
                  </svg>
                </motion.div>

                <motion.div 
                  style={{ x: fgRightX, scale: fgRightScale }}
                  className="absolute inset-y-0 right-[-20px] w-1/3 flex items-end pointer-events-none z-30 filter drop-shadow-[-6px_0_12px_rgba(0,0,0,0.35)] origin-bottom-right"
                >
                  <svg viewBox="0 0 200 450" preserveAspectRatio="none" className="w-full h-[110%] fill-[#3d4434]">
                    <polygon points="200,0 120,450 200,450" />
                    <path d="M 200 130 Q 100 200 200 270 Z" fill="#2d3326" />
                  </svg>
                </motion.div>
              </div>

              <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[9px] tracking-widest font-mono text-m-charcoal select-none z-50 font-semibold">
                <span>LOC // SERENGETI_SAFARI_KENYA</span>
                <span>DEPTH // ZOOM_ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
