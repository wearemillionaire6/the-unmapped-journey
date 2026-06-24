"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, ShieldCheck, Zap } from "lucide-react";
import StaggeredText from "./StaggeredText";

interface CampfireSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  angle: number;
  angleSpeed: number;
  noise: number;
}

export default function Section4Sanctuary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Campfire Spark Canvas Loop
  useEffect(() => {
    if (!isIntersecting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let sparks: CampfireSpark[] = [];

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 500;
        canvas.height = canvas.parentElement?.clientHeight || 400;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnSpark = () => {
      sparks.push({
        x: 260 + (Math.random() - 0.5) * 12,
        y: 310,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -1.2 - Math.random() * 1.5,
        size: 1.5 + Math.random() * 2,
        life: 0,
        maxLife: 80 + Math.random() * 50,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.05 + Math.random() * 0.05,
        noise: 0.5 + Math.random() * 0.5,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.45) {
        spawnSpark();
      }

      sparks = sparks.filter((s) => {
        s.life++;
        s.x += s.vx + Math.sin(s.angle) * s.noise;
        s.y += s.vy;
        s.angle += s.angleSpeed;

        ctx.save();
        ctx.beginPath();
        const progress = s.life / s.maxLife;
        const opacity = Math.max(0, 1 - progress);

        const hue = Math.floor(20 + Math.random() * 25);
        ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${opacity})`;
        ctx.shadowBlur = 8;
        
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${opacity})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return s.life < s.maxLife;
      });

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isIntersecting]);

  return (
    <div 
      ref={containerRef}
      className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center bg-m-charcoal relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      
      <div className="max-w-7xl w-full mx-auto px-12 md:px-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Santorini Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
              <Flame className="w-4 h-4 text-a-volt" />
              <span>Showcase Chapter 04 / Santorini, Greece</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-m-cream mb-6 leading-tight">
              Sovereign Sanctuary: <br />
              <span className="italic text-a-volt font-normal">Caldera Eco-Villas</span>
            </h2>

            <StaggeredText
              text="We design automated booking channels and responsive portals for luxury hospitality brands, capturing the cliffside beauty of Greece. The systems run silently, securing customer loyalty while reducing load overhead."
              el="p"
              className="text-m-sepia text-xs sm:text-sm font-light leading-relaxed mb-6"
              delay={0.2}
            />

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-a-volt/10 border border-a-volt/20 flex items-center justify-center text-a-volt">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-m-cream tracking-wide uppercase mb-0.5">Secure Architectures</h4>
                  <p className="text-[11px] text-m-sepia leading-relaxed">
                    Enterprise-grade commerce APIs protecting client reservations.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-a-volt/10 border border-a-volt/20 flex items-center justify-center text-a-volt">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-m-cream tracking-wide uppercase mb-0.5">Instant Responses</h4>
                  <p className="text-[11px] text-m-sepia leading-relaxed">
                    Edge-side API functions executing state sync in &lt;100ms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Santorini Cave Villa Collage */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] max-w-xl border border-white/10 p-4 bg-[#141211] shadow-paper-depth-3 rounded-lg overflow-hidden">
              <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[LN_SYS_04]</span>
              <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[36.4166N 25.4324E]</span>
              
              <div className="relative w-full h-full bg-[#0d1620] rounded overflow-hidden">
                {/* Crescent Moon */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#090e15] to-[#122235] z-0 flex justify-end p-8">
                  <motion.div 
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="w-16 h-16 pointer-events-none filter drop-shadow-[0_0_12px_rgba(255,235,180,0.35)]"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#faedd4]">
                      <path d="M 50 10 C 68 10, 80 20, 80 40 C 72 40, 60 30, 48 34 C 36 38, 30 50, 32 66 C 18 64, 10 50, 10 40 C 10 20, 28 10, 50 10 Z" />
                    </svg>
                  </motion.div>
                </div>

                {/* White Cliff Dome */}
                <div className="absolute inset-y-0 left-0 w-[45%] pointer-events-none z-10 filter drop-shadow-[8px_0_16px_rgba(0,0,0,0.45)]">
                  <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="w-full h-full fill-[#eeeeee]">
                    <path d="M 0 0 C 40 40, 70 80, 65 140 C 60 180, 100 220, 85 280 C 70 330, 120 370, 100 400 L 0 400 Z" />
                    <path d="M 0 0 C 20 20, 40 60, 35 110 C 30 150, 60 180, 50 240 C 40 290, 80 340, 60 400 L 0 400 Z" fill="#dddddd" opacity="0.8" />
                    <path d="M 0 150 C 10 110, 40 110, 50 150 Z" fill="#0e3b68" />
                  </svg>
                </div>

                {/* Glass Eco-Cabin */}
                <div className="absolute top-[35%] left-[30%] w-[45%] aspect-[1.3/1] z-20 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
                  <div className="relative w-full h-full bg-[#100e0d] border-2 border-[#eeeeee] rounded p-2 flex flex-col justify-end">
                    <div className="absolute inset-1.5 bg-[#171f25] border border-white/5 rounded overflow-hidden">
                      <motion.div
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          opacity: [0.35, 0.45, 0.35]
                        }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                        style={{ backgroundSize: "200% 200%" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"
                      />
                      <div className="absolute bottom-2 left-6 w-3 h-4 bg-a-amber/80 blur-[2px] rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Campfire sparks */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-30" />

                {/* Campfire logs */}
                <div className="absolute top-[68%] left-[45%] w-16 h-16 pointer-events-none z-30 flex flex-col items-center justify-end">
                  <svg viewBox="0 0 60 60" className="w-full h-full">
                    <line x1="15" y1="52" x2="45" y2="44" stroke="#4d3220" strokeWidth="4.5" strokeLinecap="round" />
                    <line x1="45" y1="52" x2="15" y2="44" stroke="#352215" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M 24 45 C 22 36, 28 26, 30 22 C 32 26, 38 36, 36 45 Z" fill="#9e2a2b" opacity="0.8" />
                    <path d="M 27 45 C 25 39, 29 32, 30 28 C 31 32, 35 39, 33 45 Z" fill="#ffb800" opacity="0.9" />
                  </svg>
                </div>

                {/* Sitting traveler */}
                <div className="absolute top-[68%] left-[34%] w-10 h-16 pointer-events-none z-30">
                  <svg viewBox="0 0 40 60" className="w-full h-full">
                    <path d="M 28 50 C 28 42, 22 38, 20 38 C 18 38, 14 34, 14 30 C 14 26, 18 24, 22 24 C 26 24, 28 22, 28 18 C 28 14, 24 12, 20 12 C 16 12, 12 14, 12 18 C 12 22, 10 24, 8 28 C 6 32, 8 42, 10 50 Z" fill="#050505" />
                    <path d="M 10 50 L 16 44 L 28 50" stroke="#050505" strokeWidth="5.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.85)] pointer-events-none" />
              </div>

              <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-m-sepia select-none z-50">
                <span>LOC // SANTORINI_CALDERA_GREECE</span>
                <span>BREEZE_SIM // ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
