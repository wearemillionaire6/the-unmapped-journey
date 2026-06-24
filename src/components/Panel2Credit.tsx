"use client";

import React, { useRef } from "react";
import { Layers } from "lucide-react";

export default function Panel2Credit() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-[100vw] h-full flex flex-col justify-center bg-[#06101E] px-16 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      {/* Structural layout grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full z-10">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
          <Layers className="w-4 h-4 text-[#0077FF]" />
          <span>SAPPHIRE LTD // PORTFOLIO ASSET CLASS 01</span>
        </div>

        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F6F9] mb-12 uppercase leading-tight">
          Direct Lending & Custom Debt Solutions
        </h2>

        {/* 3-Column Asymmetric Layout Grid divided by 1px steel borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t border-[#60738A]/20 pt-8">
          
          {/* Column A */}
          <div className="md:px-8 first:pl-0 flex flex-col justify-between h-80">
            <div>
              <span className="text-[9px] font-mono text-[#60738A] uppercase tracking-widest block mb-4">// SUB_CLASS_A</span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Senior Secured Lending</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                First-lien senior debt vehicles optimized for lower middle-market scalability. Providing senior capital access with robust covenant protection.
              </p>
            </div>
            
            <div className="font-mono text-xs text-[#60738A] border-t border-[#60738A]/10 pt-4">
              <div className="mb-2">
                <span className="text-[#0077FF] font-bold block text-sm">₹50 Cr — ₹250 Cr</span>
                <span>TICKET SIZES</span>
              </div>
              <div>
                <span className="text-[#F4F6F9] block font-light">Flexible Amortization, Tailored Covenants</span>
                <span>STRUCTURE PARAMETERS</span>
              </div>
            </div>
          </div>

          {/* Column B */}
          <div className="md:px-8 border-t md:border-t-0 md:border-l border-[#60738A]/20 flex flex-col justify-between h-80 pt-8 md:pt-0">
            <div>
              <span className="text-[9px] font-mono text-[#60738A] uppercase tracking-widest block mb-4">// SUB_CLASS_B</span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Subordinated & Mezzanine</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Junior capital layers tailored for sponsor-backed buyouts, recapitalizations, and significant cross-border corporate scale-ups.
              </p>
            </div>
            
            <div className="font-mono text-xs text-[#60738A] border-t border-[#60738A]/10 pt-4">
              <div className="mb-2">
                <span className="text-[#0077FF] font-bold block text-sm">₹100 Cr — ₹400 Cr</span>
                <span>TICKET SIZES</span>
              </div>
              <div>
                <span className="text-[#F4F6F9] block font-light">Subordinated Junior Debt Stack</span>
                <span>STRUCTURE PARAMETERS</span>
              </div>
            </div>
          </div>

          {/* Column C */}
          <div className="md:px-8 border-t md:border-t-0 md:border-l border-[#60738A]/20 flex flex-col justify-between h-80 pt-8 md:pt-0 last:pr-0">
            <div>
              <span className="text-[9px] font-mono text-[#60738A] uppercase tracking-widest block mb-4">// SUB_CLASS_C</span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Asset-Backed Finance</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Special-situation capital optimization pipelines backed by strong infrastructure assets and strategic operating receivables.
              </p>
            </div>
            
            <div className="font-mono text-xs text-[#60738A] border-t border-[#60738A]/10 pt-4">
              <div className="mb-2">
                <span className="text-[#0077FF] font-bold block text-sm">Custom Sizing</span>
                <span>TICKET SIZES</span>
              </div>
              <div>
                <span className="text-[#F4F6F9] block font-light">Asset Contours, Strategic Receivables</span>
                <span>STRUCTURE PARAMETERS</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
