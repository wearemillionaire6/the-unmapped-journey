"use client";

import React, { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { MotionValue } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";

export default function Panel4Matrix({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Performance metrics data
  const metrics = [
    { title: "HISTORICAL LOSS RATE", value: "< 0.12%", desc: "Proven downside shielding models", trend: [10, 8, 5, 3, 1, 1, 0.5, 0.12] },
    { title: "TARGET NET IRR", value: "18-22%", desc: "Net returns projected to investors", trend: [12, 14, 16, 18, 19, 20, 21, 22] }
  ];

  return (
    <div 
      className="w-[100vw] h-full flex items-center justify-center bg-[#06101E] px-16 md:px-24 relative overflow-hidden select-none border-r border-white/5"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Risk Principles */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-[10px] font-mono font-bold">
            <ShieldAlert className="w-4 h-4 text-[#0077FF]" />
            <span>SAPPHIRE LTD // RISK MITIGATION</span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
            Capital Preservation <br />
            <span className="italic text-a-volt font-normal">Principles.</span>
          </h2>
          
          <div className="mb-6">
            <ScrollRevealText
              text="Every deployment within the Sapphire pipeline is evaluated against rigid structural downside stress models. We manage capital on behalf of Tier-1 international endowments and local pension systems, maintaining a disciplined risk-neutral stance."
              className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-xl"
              scrollProgress={scrollProgress}
              range={[0.71, 0.94]}
            />
          </div>
        </div>

        {/* Right Side: Large Stats stacked on micro-charts */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full max-w-lg">
          {metrics.map((metric, i) => (
            <div
              key={`metric-${i}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border border-white/10 bg-black/45 p-6 rounded-lg backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-[#0077FF]/30 shadow-paper-depth-2"
            >
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0077FF]/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#0077FF]/50" />

              <span className="text-[9px] font-mono text-[#60738A] uppercase tracking-widest block mb-1">
                {metric.title}
              </span>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white block tracking-tighter mb-1">
                    {metric.value}
                  </span>
                  <span className="text-slate-400 text-xs font-light block">
                    {metric.desc}
                  </span>
                </div>

                {/* Subtle interactive micro-chart (SVG line graph) */}
                <div className="w-32 h-12 flex items-end">
                  <svg viewBox="0 0 100 30" className="w-full h-full text-[#48CAE4] overflow-visible">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      points={metric.trend.map((val, idx) => {
                        const x = (idx / (metric.trend.length - 1)) * 100;
                        const maxVal = Math.max(...metric.trend);
                        const minVal = Math.min(...metric.trend);
                        const y = 30 - ((val - minVal) / (maxVal - minVal || 1)) * 25 - 2;
                        return `${x},${y}`;
                      }).join(" ")}
                    />
                    {/* Fill Area */}
                    <polygon
                      fill="rgba(72, 202, 228, 0.05)"
                      points={`0,30 ${metric.trend.map((val, idx) => {
                        const x = (idx / (metric.trend.length - 1)) * 100;
                        const maxVal = Math.max(...metric.trend);
                        const minVal = Math.min(...metric.trend);
                        const y = 30 - ((val - minVal) / (maxVal - minVal || 1)) * 25 - 2;
                        return `${x},${y}`;
                      }).join(" ")} 100,30`}
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
