"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Flame, ShieldCheck, Zap } from "lucide-react";
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

  // Intersection observer to handle GPU optimization (auto-pause out of viewport)
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
      // Fire position: Center-left bottom area of the canvas
      // Near x: 260, y: 310
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
        
        // Horizontal erratic motion using sine wave noise
        s.x += s.vx + Math.sin(s.angle) * s.noise;
        s.y += s.vy;
        s.angle += s.angleSpeed;

        ctx.save();
        ctx.beginPath();
        const progress = s.life / s.maxLife;
        const opacity = Math.max(0, 1 - progress);

        const hue = Math.floor(20 + Math.random() * 25); // orange-red spectrum
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
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-m-charcoal border-b border-white/5 overflow-hidden"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-20 gap-16">
        
        {/* Left Side: Sticky Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-24 h-fit">
          <div className="flex items-center gap-2 mb-6 text-a-amber uppercase tracking-[0.25em] text-xs font-semibold">
            <Flame className="w-4 h-4 text-a-amber" />
            <span>Showcase Chapter 04 / Santorini, Greece</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-m-cream mb-6 leading-tight">
            Sovereign Sanctuary: <br />
            <span className="italic text-a-amber font-normal">Caldera Eco-Villas</span>
          </h2>

          <StaggeredText
            text="We design automated booking channels and responsive portals for luxury hospitality brands, capturing the cliffside beauty of Greece. The systems run silently, securing customer loyalty while reducing load overhead."
            el="p"
            className="text-m-sepia text-base md:text-lg font-light leading-relaxed mb-8"
            delay={0.2}
          />

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded bg-a-amber/10 border border-a-amber/20 flex items-center justify-center text-a-amber">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-m-cream tracking-wide uppercase mb-1">Secure Architectures</h4>
                <p className="text-xs text-m-sepia leading-relaxed">
                  Enterprise-grade data security with integrated headless commerce APIs (Stripe, Shopify) protecting client reservations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded bg-a-amber/10 border border-a-amber/20 flex items-center justify-center text-a-amber">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-m-cream tracking-wide uppercase mb-1">Instant Responses</h4>
                <p className="text-xs text-m-sepia leading-relaxed">
                  Edge-side API functions executing state sync in &lt;100ms, triggering real-time customer feedback loops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Fidelity Santorini Cave Villa Collage */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] max-w-xl border border-white/10 p-4 bg-[#141211] shadow-paper-depth-3 rounded-lg overflow-hidden"
          >
            {/* Visual Art Canvas */}
            <div className="relative w-full h-full bg-[#0d1620] rounded overflow-hidden">
              
              {/* Layer 1: Sky & Crescent Moon over deep blue Aegean Sea */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#090e15] to-[#122235] z-0 flex justify-end p-8">
                
                {/* Crescent Moon */}
                <motion.div 
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-16 h-16 pointer-events-none filter drop-shadow-[0_0_12px_rgba(255,235,180,0.35)]"
                >
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#faedd4]">
                    <path d="M 50 10 C 68 10, 80 20, 80 40 C 72 40, 60 30, 48 34 C 36 38, 30 50, 32 66 C 18 64, 10 50, 10 40 C 10 20, 28 10, 50 10 Z" />
                  </svg>
                </motion.div>
              </div>

              {/* Layer 2: Whitewashed papercut cliffside (Santorini architecture) */}
              <div className="absolute inset-y-0 left-0 w-[45%] pointer-events-none z-10 filter drop-shadow-[8px_0_16px_rgba(0,0,0,0.45)]">
                <svg viewBox="0 0 200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#eeeeee]">
                  {/* Santorini white cliffs */}
                  <path d="M 0 0 C 40 40, 70 80, 65 140 C 60 180, 100 220, 85 280 C 70 330, 120 370, 100 400 L 0 400 Z" />
                  {/* Layered grey shadows */}
                  <path d="M 0 0 C 20 20, 40 60, 35 110 C 30 150, 60 180, 50 240 C 40 290, 80 340, 60 400 L 0 400 Z" fill="#dddddd" opacity="0.8" />
                  
                  {/* Santorini Blue Dome Roof */}
                  <path d="M 0 150 C 10 110, 40 110, 50 150 Z" fill="#0e3b68" />
                  <rect x="22" y="130" width="6" height="15" fill="#faedd4" />
                </svg>
              </div>

              {/* Layer 3: Minimalist Glass-Fronted Eco-Cabin (Santorini Cave Villa) */}
              {/* Nestled perfectly on the edge of the whitewashed cliff */}
              <div className="absolute top-[35%] left-[30%] w-[45%] aspect-[1.3/1] z-20 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
                
                {/* Cabin Frame and Glass Facade */}
                <div className="relative w-full h-full bg-[#100e0d] border-2 border-[#eeeeee] rounded p-2 flex flex-col justify-end">
                  
                  {/* Glass window with shifting gradient mask (Breeze Effect) */}
                  <div className="absolute inset-1.5 bg-[#171f25] border border-white/5 rounded overflow-hidden">
                    
                    {/* Breeze Gradient Mask Animation */}
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        opacity: [0.35, 0.45, 0.35]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 8, 
                        ease: "easeInOut" 
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"
                    />

                    {/* Inside Cabin Silhouette (Tiny glowing light, table, traveler) */}
                    <div className="absolute bottom-2 left-6 w-3 h-4 bg-a-amber/80 blur-[2px] rounded-full animate-pulse" />
                    
                    {/* Window partitions (Minimalist outline) */}
                    <div className="absolute inset-y-0 left-1/3 w-0.5 bg-[#eeeeee]/30" />
                    <div className="absolute inset-y-0 left-2/3 w-0.5 bg-[#eeeeee]/30" />
                  </div>

                  {/* Cabin Base */}
                  <div className="absolute bottom-[-6px] inset-x-[-4px] h-2 bg-[#eeeeee] rounded" />
                </div>
              </div>

              {/* Layer 4: Campfire Canvas Sparks Overlay */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-30"
              />

              {/* Layer 5: Tiny campfire outline and logs */}
              {/* Position matches fire source coordinates: x: 260, y: 310 */}
              <div className="absolute top-[68%] left-[45%] w-16 h-16 pointer-events-none z-30 flex flex-col items-center justify-end">
                <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                  {/* Campfire logs */}
                  <line x1="15" y1="52" x2="45" y2="44" stroke="#4d3220" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="45" y1="52" x2="15" y2="44" stroke="#352215" strokeWidth="4.5" strokeLinecap="round" />
                  
                  {/* Static papercut fire core */}
                  <path d="M 24 45 C 22 36, 28 26, 30 22 C 32 26, 38 36, 36 45 Z" fill="#9e2a2b" opacity="0.8" />
                  <path d="M 27 45 C 25 39, 29 32, 30 28 C 31 32, 35 39, 33 45 Z" fill="#ffb800" opacity="0.9" />
                </svg>
              </div>

              {/* Layer 6: Tiny paper-cut figure sitting by the fire */}
              {/* Sitting left of campfire: x: 230, y: 310 */}
              <div className="absolute top-[68%] left-[34%] w-10 h-16 pointer-events-none z-30">
                <svg viewBox="0 0 40 60" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                  {/* Silhouette of traveler sitting */}
                  <path 
                    d="M 28 50 C 28 42, 22 38, 20 38 C 18 38, 14 34, 14 30 C 14 26, 18 24, 22 24 C 26 24, 28 22, 28 18 C 28 14, 24 12, 20 12 C 16 12, 12 14, 12 18 C 12 22, 10 24, 8 28 C 6 32, 8 42, 10 50 Z" 
                    fill="#050505" 
                  />
                  {/* Sitting knees bent */}
                  <path d="M 10 50 L 16 44 L 28 50" stroke="#050505" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Physical Border Shadow Mask around the papercut edges */}
              <div className="absolute inset-0 border-[8px] border-[#141211] pointer-events-none rounded" />
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.85)] pointer-events-none" />
            </div>

            {/* Bottom canvas metadata indicators */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-m-sepia select-none z-50">
              <span>LOC // SANTORINI_CALDERA_GREECE</span>
              <span>BREEZE_SIM // ACTIVE</span>
              <span>ASSET_REF: SANTORINI_VILLA</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
