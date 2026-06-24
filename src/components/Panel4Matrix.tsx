"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Grid } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Panel4Matrix() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Matrix cubes data
  const cubes = [
    { title: "MGR_CONC", value: "18 Active Managers", desc: "Top-tier mid-market GPs" },
    { title: "CAP_ALLC", value: "₹2,500 Cr Allocated", desc: "Diversified capital stack" },
    { title: "NET_ALGN", value: "100% Sub-Continent", desc: "Focused geography alignment" },
    { title: "RISK_DIV", value: "0% Single GP Risk", desc: "Aggressive portfolio layering" },
  ];

  return (
    <div 
      className="w-[100vw] h-full flex items-center justify-center bg-gradient-to-r from-[#0B132B] via-[#091024] to-[#080E20] px-12 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Institutional Matrix Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <Grid className="w-4 h-4 text-a-volt" />
            <span>SAPPHIRE LTD // PORTFOLIO MATRIX</span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
            Fund of Funds <br />
            <span className="italic text-a-volt font-normal">& Institutional Matrix</span>
          </h2>
          
          <StaggeredText
            text="Structured capital allocation and network alignment. Neatly aligned to show massive capital diversification and institutional network alignment across the subcontinent."
            el="p"
            className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
            delay={0.2}
          />

          {/* Interactive data card display based on hovered cube */}
          <div className="h-28 border border-white/10 bg-black/45 p-4 rounded backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-a-volt to-transparent" />
            {hoveredIndex !== null ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-slate-300"
              >
                <div className="text-[10px] text-a-volt uppercase mb-1 font-bold">
                  {cubes[hoveredIndex].title} // METRIC_ENGAGED
                </div>
                <div className="text-white text-base font-bold mb-1">
                  {cubes[hoveredIndex].value}
                </div>
                <div className="text-slate-400 text-[10px] uppercase tracking-wide">
                  {cubes[hoveredIndex].desc}
                </div>
              </motion.div>
            ) : (
              <div className="font-mono text-xs text-slate-400 flex items-center justify-center h-full gap-2">
                <BarChart className="w-4 h-4 text-a-volt/50" />
                <span>HOVER OVER MATRIX CUBES TO VIEW TELEMETRY</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Matrix Grid of Translucent Floating Cubes */}
        <div className="lg:col-span-7 flex items-center justify-center relative">
          <div className="relative w-full aspect-[4/3] border border-white/10 p-4 bg-black/45 shadow-paper-depth-3 backdrop-blur-md rounded-lg overflow-hidden group">
            
            {/* Tech telemetry corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[SYS_MATRIX_04]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[INSTITUTIONAL_DIVERSIFICATION]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-a-volt/40 pointer-events-none z-30" />

            <div className="relative w-full h-full bg-[#050812] rounded overflow-hidden flex items-center justify-center p-8">
              
              {/* Organized 2x2 matrix grid of 3D-like cubes */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md aspect-square">
                {cubes.map((cube, i) => (
                  <motion.div
                    key={`cube-${i}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.05 }}
                    className="border border-white/15 bg-gradient-to-br from-[#1C2541]/40 to-transparent rounded p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden group/cube shadow-paper-depth-1"
                  >
                    {/* Glowing highlight indicator */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-a-volt opacity-40 group-hover/cube:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-a-volt opacity-40 group-hover/cube:opacity-100 transition-opacity" />

                    {/* soft internal cyan glow */}
                    <div className="absolute inset-0 bg-[#48CAE4]/3 opacity-0 group-hover/cube:opacity-10 transition-opacity duration-300 pointer-events-none" />

                    {/* SVG Cube outline (shows F1 structured lines) */}
                    <div className="w-12 h-12 mb-4 text-[#48CAE4] opacity-50 group-hover/cube:opacity-100 transition-opacity">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* 3D projection cube outlines */}
                        <polygon points="50,15 85,32 50,50 15,32" fill="none" stroke="currentColor" strokeWidth="2" />
                        <polygon points="15,32 50,50 50,85 15,68" fill="none" stroke="currentColor" strokeWidth="2" />
                        <polygon points="85,32 50,50 50,85 85,68" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="font-mono text-left select-none">
                      <div className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                        {cube.title}
                      </div>
                      <div className="text-white text-xs font-bold leading-tight uppercase">
                        {cube.value.split(" ")[0]} <br />
                        <span className="text-[10px] text-slate-300 font-light lowercase">
                          {cube.value.split(" ").slice(1).join(" ")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
            </div>

            {/* Bottom canvas telemetry */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[9px] tracking-widest font-mono text-slate-400 select-none">
              <span>LOC // NATIONWIDE_MATRIX</span>
              <span>GRID_STATUS // STABLE</span>
              <span>SYS_DIVERSIFICATION // 100%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
