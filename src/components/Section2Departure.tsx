"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Train, Sun } from "lucide-react";
import StaggeredText from "./StaggeredText";
import Marquee from "./Marquee";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  angle: number;
  angleSpeed: number;
  amplitude: number;
}

export default function Section2Departure({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Map scroll progress to the train's horizontal movement across Panel 2
  // Panel 2 is active in scrollProgress range [0.2, 0.4]
  const trainX = useTransform(scrollProgress, [0.2, 0.4], ["-20%", "110%"]);

  // Monitor visibility of the canvas to pause loops when out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Canvas particle engine loop
  useEffect(() => {
    if (!isIntersecting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: SmokeParticle[] = [];

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnParticle = (trainX: number, trainY: number) => {
      // Chimney offset relative to train base
      const chimneyX = trainX + 115;
      const chimneyY = trainY - 28;

      particles.push({
        x: chimneyX,
        y: chimneyY,
        vx: -1.2 - Math.random() * 1.5, // Drift left
        vy: -0.8 - Math.random() * 1.2, // Drift up
        radius: 4 + Math.random() * 6,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.05 + Math.random() * 0.08,
        amplitude: 0.2 + Math.random() * 0.4,
      });
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate responsive train pixel coordinates based on global scroll progress
      const scrollVal = scrollProgress.get();
      const norm = Math.max(0, Math.min(1, (scrollVal - 0.2) / 0.2));
      const currentTrainX = (norm * 1.3 - 0.2) * canvas.width;
      const currentTrainY = canvas.height * (1 - 0.135) - 30; // 13.5% bottom track level

      // Spawn a new particle every 3 frames
      if (Math.random() < 0.35 && currentTrainX > -100 && currentTrainX < canvas.width + 100) {
        spawnParticle(currentTrainX, currentTrainY);
      }

      particles = particles.filter((p) => {
        p.life++;
        p.x += p.vx + Math.sin(p.angle) * p.amplitude;
        p.y += p.vy;
        p.angle += p.angleSpeed;
        p.radius += 0.25; // Paper smoke expands

        ctx.save();
        ctx.beginPath();
        const progress = p.life / p.maxLife;
        const opacity = Math.max(0, 1 - progress);
        
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = `rgba(244, 241, 234, ${opacity * 0.65})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.radius > 6) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
          ctx.arc(p.x - p.radius * 0.25, p.y - p.radius * 0.25, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return p.life < p.maxLife;
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollProgress, isIntersecting]);

  return (
    <>
      {/* ================= PANEL 1: Transition Intro ================= */}
      <div 
        id="departure-intro"
        className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center px-12 md:px-24 bg-gradient-to-r from-m-charcoal via-m-charcoal to-[#faedd4] relative"
      >
        <div className="editorial-grid-line left-[20%]" />
        <div className="editorial-grid-line right-[20%]" />
        
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-xs font-semibold">
              <Train className="w-4 h-4" />
              <span>Showcase Chapter 02 / Swiss Alps, Switzerland</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-m-cream mb-6 leading-tight">
              Climb the Majestic <br />
              <span className="italic text-a-volt font-normal">Alpine Ridges</span>
            </h2>
            
            <StaggeredText
              text="Witness the Swiss Alps via the Glacier Express. Our travel portals guide luxury hospitality brands, alpine resorts, and tourism bureaus out of corporate monotony. We engineer high-performance frontend systems that turn scenery into unforgettable scroll journeys."
              el="p"
              className="text-m-sepia text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl"
              delay={0.2}
            />
          </div>
          
          <div className="md:col-span-5 border-l border-white/10 pl-8 flex flex-col justify-center select-none font-mono">
            <div className="text-[10px] tracking-widest text-a-volt uppercase mb-2">TELEMETRY_REF</div>
            <div className="text-m-cream text-lg font-light">SYSTEM // CH-02</div>
            <div className="text-xs text-m-sepia mt-2 uppercase tracking-widest leading-loose">
              COORD // 46.5760N 8.5290E <br />
              STATUS // TRAIN_ENGAGED <br />
              COMPASS // HEADING_NNE
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ================= PANEL 2: The Swiss Alps Train Collage ================= */}
      <div 
        id="departure-train"
        className="w-[100vw] h-full flex-shrink-0 bg-[#faedd4] relative flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#fbf5e8] pointer-events-none opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)] pointer-events-none" />

        {/* Outlined Ticker */}
        <div className="absolute top-[8%] inset-x-0 z-0 opacity-15 overflow-hidden select-none pointer-events-none">
          <Marquee text="GLACIER EXPRESS SWITZERLAND ALPINE CROSSING" speed={30} colorClass="stroke-black" />
        </div>

        {/* Sky / Sun */}
        <div className="absolute top-[15%] left-[10%] z-0 flex flex-col">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-48 h-48 rounded-full bg-a-crimson shadow-paper-depth-1 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_10px)]" />
          </motion.div>
        </div>

        {/* Mountains */}
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute bottom-[20%] left-0 w-full h-[45%] pointer-events-none z-10 fill-[#dbcdc0] opacity-80 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]">
          <path d="M 0 400 L 150 180 L 300 290 L 500 120 L 720 280 L 950 100 L 1200 360 L 1200 400 Z" />
          <path d="M 200 400 L 350 200 L 600 320 L 850 150 L 1100 300 L 1200 240 L 1200 400 Z" fill="#cbbcad" opacity="0.6" />
        </svg>

        {/* Teal Waves */}
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute bottom-[10%] left-0 w-full h-[25%] pointer-events-none z-20 fill-a-teal filter drop-shadow-[0_-6px_12px_rgba(0,0,0,0.2)]">
          <path d="M 0 200 C 150 160, 200 100, 350 120 C 500 140, 600 80, 750 110 C 900 140, 1050 90, 1200 140 L 1200 200 Z" />
        </svg>

        {/* Crimson Ridge / Rail */}
        <div className="absolute bottom-0 left-0 w-full h-[20%] z-30 filter drop-shadow-[0_-8px_16px_rgba(0,0,0,0.3)]">
          <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className="w-full h-full fill-a-crimson">
            <path d="M 0 150 C 180 110, 300 60, 480 80 C 660 100, 850 40, 1050 70 C 1120 80, 1160 90, 1200 90 L 1200 150 Z" />
            <path d="M 0 135 C 180 95, 300 45, 480 65 C 660 85, 850 25, 1050 55 C 1120 65, 1160 75, 1200 75" fill="none" stroke="#2d2822" strokeWidth="4" />
            <path d="M 0 135 C 180 95, 300 45, 480 65 C 660 85, 850 25, 1050 55 C 1120 65, 1160 75, 1200 75" fill="none" stroke="#faedd4" strokeWidth="3" strokeDasharray="4 12" />
          </svg>
        </div>

        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-normal" />

        {/* Vintage Steam Train */}
        <motion.div 
          style={{ x: trainX, bottom: "13.5%" }}
          className="absolute w-[180px] h-[60px] z-40 pointer-events-none filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]"
        >
          <svg viewBox="0 0 180 60" className="w-full h-full">
            <rect x="10" y="10" width="45" height="40" rx="2" fill="#1b1916" stroke="#faedd4" strokeWidth="1" />
            <rect x="18" y="18" width="20" height="15" rx="1" fill="#dbcdc0" />
            <rect x="55" y="20" width="70" height="30" rx="3" fill="#2d2822" stroke="#faedd4" strokeWidth="1" />
            <rect x="125" y="25" width="25" height="25" rx="1" fill="#0f0e0d" />
            <path d="M 110 20 L 112 5 L 122 3 L 120 20 Z" fill="#1b1916" stroke="#faedd4" strokeWidth="1" />
            <path d="M 150 40 L 165 50 L 150 50 Z" fill="#9e2a2b" />
            <path d="M 5 10 L 60 10 L 55 5 L 10 5 Z" fill="#9e2a2b" />
            <circle cx="28" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
            <circle cx="28" cy="50" r="5" fill="#faedd4" />
            <circle cx="58" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
            <circle cx="58" cy="50" r="5" fill="#faedd4" />
            <circle cx="85" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
            <circle cx="85" cy="50" r="5" fill="#faedd4" />
            <circle cx="112" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
            <circle cx="112" cy="50" r="5" fill="#faedd4" />
            <circle cx="138" cy="50" r="7" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1" />
            <line x1="28" y1="50" x2="112" y2="50" stroke="#faedd4" strokeWidth="2.5" />
          </svg>
        </motion.div>

        <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-a-teal select-none z-50 font-semibold">
          <span>LOC // SWISS_ALPINE_PASS</span>
          <span>SYS // ENGINE_ENGAGED</span>
          <span>TRAIN // GLACIER_EXPRESS</span>
        </div>
      </div>

      {/* ================= PANEL 3: Detail Panel ================= */}
      <div 
        id="departure-details"
        className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center px-12 md:px-24 bg-gradient-to-r from-[#faedd4] via-[#141818] to-[#141818] relative"
      >
        <div className="editorial-grid-line left-[20%]" />
        <div className="editorial-grid-line right-[20%]" />
        
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="text-[10px] tracking-widest font-mono text-a-volt uppercase mb-4">Destination: Swiss Alps, Switzerland</div>
            
            <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-m-cream mb-6">
              High-Performance Alpine Engineering
            </h3>
            
            <p className="text-m-sepia text-sm md:text-base font-light leading-relaxed mb-6">
              To capture the crystalline, deckle-edged feel of the Swiss mountain pass, our asset pipelines optimize vector calculations and layout dimensions. This guarantees that all frames load in under 1.5 seconds, delivering Swiss precision performance with premium B2B digital craftsmanship.
            </p>

            <ul className="space-y-3 text-xs md:text-sm font-mono text-m-grey">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-a-volt animate-pulse" />
                <span>H.265 / WebM Smart Formats</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-a-volt" />
                <span>Aggressive CDN Edge Caching</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-full max-w-xs aspect-square border border-white/5 bg-m-charcoal/50 p-6 rounded shadow-paper-inner flex flex-col justify-between">
              <div className="flex flex-col gap-3 w-full">
                <div className="h-10 w-full border border-a-volt bg-a-volt/10 rounded flex items-center justify-center text-xs tracking-widest font-mono text-a-volt font-bold">
                  GEN ENGINE (DALL-E/MJ)
                </div>
                <div className="h-2 w-2 bg-m-cream mx-auto" />
                <div className="h-10 w-full border border-a-volt bg-a-volt/10 rounded flex items-center justify-center text-xs tracking-widest font-mono text-a-volt font-bold">
                  VECTOR MAPPING (SeeDance)
                </div>
              </div>
              
              <div className="text-[9px] tracking-widest font-mono text-center text-m-sepia uppercase">
                SYS_LOAD_SPEED // &lt; 2.2s
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
