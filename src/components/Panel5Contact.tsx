"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Send, ShieldCheck, Heart } from "lucide-react";
import StaggeredText from "./StaggeredText";
import Marquee from "./Marquee";

export default function Panel5Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    <div 
      className="w-[100vw] h-full flex flex-col justify-between bg-[#0B132B] py-16 px-12 md:px-24 relative overflow-hidden select-none"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />

      {/* Abstract topological background lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 1000 600" className="w-full h-full stroke-a-volt fill-none strokeWidth-1">
          <path d="M 100,500 Q 250,450 400,480 T 700,430 T 900,460" />
          <path d="M 100,470 Q 280,420 450,440 T 750,390 T 900,420" />
          <path d="M 100,440 Q 300,380 480,400 T 780,350 T 900,380" />
          <path d="M 100,410 Q 320,340 500,360 T 800,310 T 900,340" />
        </svg>
      </div>

      {/* Background horizontal scrolling marquee */}
      <div className="absolute bottom-[28%] inset-x-0 z-0 opacity-10 overflow-hidden select-none pointer-events-none">
        <Marquee text="SAPPHIRE LTD INSTITUTIONAL CAPITAL ALLOCATION FUND OF FUNDS PRIVATE CREDIT" speed={25} colorClass="stroke-white/5" />
      </div>

      {/* ================= TOP PANEL LOGO ================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-2.5 text-white">
          <Compass className="w-5 h-5 text-a-volt animate-spin-slow" />
          <span className="font-serif text-sm tracking-[0.2em] font-medium">SAPPHIRE LTD</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400">STATUS // ALLOCATION_STB</span>
      </div>

      {/* ================= MID B2B CTA BLOCK ================= */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 z-10 py-8">
        
        {/* Left Side: Call to Action Details */}
        <div className="max-w-md text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-a-volt uppercase tracking-[0.25em] text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Connect / Partnership Request</span>
          </div>

          <h3 className="font-sans text-3xl md:text-4xl text-white font-extrabold mb-4 leading-tight uppercase">
            Architects of <br />
            <span className="italic text-a-volt font-normal">Indian Capital</span>
          </h3>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Our investment committee reviews capital request submissions and manager proposals on a rolling basis. Partner with Sapphire Ltd.
          </p>
        </div>

        {/* Right Side: Form intake */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative flex items-center border border-white/10 bg-black/45 rounded focus-within:border-a-volt/50 transition-colors backdrop-blur-sm">
              <input
                type="email"
                required
                placeholder="ENTER INSTITUTIONAL EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 py-3.5 text-xs font-mono tracking-widest text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={submitted}
                className="px-4 py-3.5 text-a-volt hover:text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-a-volt" />
              {submitted ? "SYS_STATUS // SUBMISSION STAGED" : "SYS_STATUS // SECURE ACCESS PORTAL"}
            </span>
          </form>
        </div>
      </div>

      {/* ================= COPYRIGHT / FOOTER DETAILS ================= */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-widest border-t border-white/5 pt-8 gap-4 z-10 select-none">
        <span>© 2026 SAPPHIRE LTD PARTNERSHIP</span>
        <div className="flex items-center gap-1.5">
          <span>BUILT WITH</span>
          <Heart className="w-3 h-3 text-a-volt animate-pulse" />
          <span>AND NEXT.JS</span>
        </div>
        <span>COORD // 12.9716N 77.5946E</span>
      </div>
    </div>
  );
}
