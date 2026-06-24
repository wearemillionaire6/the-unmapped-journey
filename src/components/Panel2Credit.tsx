"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Train, Layers, Info } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Panel2Credit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas glowing particle flow along the credit line
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Spawn capital flows
    const spawnFlow = () => {
      particles.push({
        x: 0,
        y: canvas.height * 0.72, //坐落于光流水平线
        speed: 1.5 + Math.random() * 2.5,
        size: 1.5 + Math.random() * 2,
        alpha: 0.6 + Math.random() * 0.4,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.25) {
        spawnFlow();
      }

      // Draw horizontal credit flow base line
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(72, 202, 228, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.moveTo(0, canvas.height * 0.72);
      ctx.lineTo(canvas.width, canvas.height * 0.72);
      ctx.stroke();

      // Glowing core line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 0.5;
      ctx.moveTo(0, canvas.height * 0.72);
      ctx.lineTo(canvas.width, canvas.height * 0.72);
      ctx.stroke();
      ctx.restore();

      // Update and draw flowing capital particles
      particles = particles.map((p) => {
        p.x += p.speed;
        
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `rgba(72, 202, 228, ${p.alpha})`;
        ctx.shadowColor = "#48CAE4";
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        return p;
      }).filter((p) => p.x < canvas.width);

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-[100vw] h-full flex items-center justify-center bg-gradient-to-r from-[#122046] via-[#152554] to-[#1C2541] px-12 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Content & Direct Lending Metrics */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <Layers className="w-4 h-4 text-a-volt" />
            <span>SAPPHIRE LTD // CREDIT & DEBT</span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
            Structured Credit <br />
            <span className="italic text-a-volt font-normal">& Direct Lending</span>
          </h2>
          
          <StaggeredText
            text="Financing across the full capital ecosystem. We engineer bespoke debt structures that enable middle-market champions to execute strategic milestones and maintain operational flexibility."
            el="p"
            className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
            delay={0.2}
          />

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mb-6">
            <div className="border border-white/10 bg-black/30 p-4 rounded backdrop-blur-sm">
              <span className="text-[9px] font-mono text-slate-400 block mb-1">TICKET SIZES</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">₹50 Cr - ₹500 Cr</span>
            </div>
            <div className="border border-white/10 bg-black/30 p-4 rounded backdrop-blur-sm">
              <span className="text-[9px] font-mono text-slate-400 block mb-1">TARGET MARKET</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">Mid-Market Companies</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sweeping Geometric Slate & Glass Terraces */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <div className="relative w-full aspect-[4/3] border border-white/10 p-4 bg-black/45 shadow-paper-depth-3 backdrop-blur-md rounded-lg overflow-hidden group">
            
            {/* Tech telemetry corner markings */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[SYS_TERRACE_02]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[CAPITAL_STRUCTURE]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-a-volt/40 pointer-events-none z-30" />

            <div className="relative w-full h-full bg-[#080d1a] rounded overflow-hidden">
              
              {/* Backing structural grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:100%_2rem]" />

              {/* Layered Terraces (slate and sapphire glass SVGs) */}
              {/* Slate Terraces - Dark Grey/Blue */}
              <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="absolute bottom-0 inset-x-0 w-full h-[60%] fill-[#1C2541] opacity-70 z-0">
                <path d="M 0 300 L 120 180 L 220 200 L 320 120 L 420 160 L 500 80 L 500 300 Z" />
              </svg>

              {/* Sapphire Glass Terraces - Translucent Blue */}
              <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="absolute bottom-0 inset-x-0 w-full h-[50%] fill-[#0E1E46] opacity-90 border-t border-[#48CAE4]/20 z-10">
                <path d="M 0 300 L 150 190 L 250 210 L 350 130 L 450 170 L 500 100 L 500 300 Z" />
              </svg>

              {/* Glowing Ice-Blue horizontal line canvas particle stream overlay */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-screen" />
              
            </div>

            {/* Bottom canvas telemetry */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[9px] tracking-widest font-mono text-slate-400 select-none">
              <span>LOC // MUMBAI_HQ</span>
              <span>STRUCTURE // DIRECT_LENDING</span>
              <span>SYS_FLOW // ACTIVE_STREAM</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
