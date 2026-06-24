"use client";

import React, { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";
import SapphireEngine from "@/components/SapphireEngine";
import Panel1Hero from "@/components/Panel1Hero";
import Panel2Credit from "@/components/Panel2Credit";
import Panel3Equity from "@/components/Panel3Equity";
import Panel4Matrix from "@/components/Panel4Matrix";
import Panel5Contact from "@/components/Panel5Contact";
import TelemetryOverlay from "@/components/TelemetryOverlay";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [telemetryMode, setTelemetryMode] = useState(false);

  // Track active scroll section for the floating header indicators using bounding client checks
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "credit", "equity", "matrix", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (sectionId === "hero" || sectionId === "contact") {
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              setActiveSection(sectionId);
              break;
            }
          } else {
            // For horizontal sliding panels, the active one is centered horizontally in the viewport
            if (rect.left >= -window.innerWidth / 2 && rect.left <= window.innerWidth / 2) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06101E] text-[#F4F6F9] selection:bg-[#0077FF] selection:text-white">
      {telemetryMode && <TelemetryOverlay />}

      {/* Floating Header */}
      <header className="fixed top-6 inset-x-6 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#06101E]/45 border border-white/5 shadow-paper-depth-1 backdrop-blur-md rounded-full max-w-7xl mx-auto select-none">
        
        {/* Logo and Icon */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 text-white hover:text-a-volt transition-colors">
          <Compass className="w-5 h-5 text-a-volt animate-spin-slow" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-medium hidden md:inline">SAPPHIRE LTD</span>
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-medium md:hidden">SAPPHIRE</span>
        </a>

        {/* Navigation Indicators */}
        <nav className="flex items-center gap-1.5 sm:gap-4 md:gap-6">
          {[
            { id: "hero", label: "01 / HERO" },
            { id: "credit", label: "02 / CREDIT" },
            { id: "equity", label: "03 / EQUITY" },
            { id: "matrix", label: "04 / RISK" },
            { id: "contact", label: "05 / CONTACT" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  // If it's a horizontal panel, scroll to the parent sticky section
                  if (item.id === "credit" || item.id === "equity" || item.id === "matrix") {
                    const sectorParent = document.getElementById("sectors");
                    if (sectorParent) {
                      const offsetTop = sectorParent.offsetTop;
                      const index = ["credit", "equity", "matrix"].indexOf(item.id);
                      window.scrollTo({
                        top: offsetTop + index * window.innerWidth + 50,
                        behavior: "smooth"
                      });
                    }
                  } else {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className={`relative py-1 text-[9px] font-mono tracking-widest transition-colors duration-300 ${
                activeSection === item.id 
                  ? "text-a-volt font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-a-volt" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Group: Toggle + CTA */}
        <div className="flex items-center gap-3">
          {/* Lando Norris Style Dual Toggle Button */}
          <div className="flex items-center gap-0.5 bg-black/35 border border-white/5 rounded-full p-0.5 text-[8px] sm:text-[9px] font-mono tracking-wider relative">
            <button
              onClick={() => setTelemetryMode(false)}
              className={`px-2.5 py-1.5 rounded-full transition-colors relative z-10 ${
                !telemetryMode ? "text-[#06101E] font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              PAPERCUT
              {!telemetryMode && (
                <motion.span
                  layoutId="header-pill"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
            <button
              onClick={() => setTelemetryMode(true)}
              className={`px-2.5 py-1.5 rounded-full transition-colors relative z-10 ${
                telemetryMode ? "text-[#06101E] font-bold" : "text-a-volt"
              }`}
            >
              TELEMETRY
              {telemetryMode && (
                <motion.span
                  layoutId="header-pill"
                  className="absolute inset-0 bg-a-volt rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          </div>

          {/* CTA Link */}
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[9px] font-mono tracking-widest border border-a-volt/35 px-4 py-2 rounded-full text-a-volt hover:bg-a-volt hover:text-[#06101E] transition-all hidden sm:inline-block"
          >
            CONTACT
          </a>
        </div>
      </header>

      {/* Hybrid scroll layout wrapper */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Section (Vertical scroll) */}
        <section id="hero" className="w-full">
          <Panel1Hero />
        </section>

        {/* 2. Sapphire Engine Section (Pins and slides credit, equity, matrix horizontally) */}
        <section id="sectors" className="w-full">
          <SapphireEngine>
            <div id="credit" className="w-[100vw] h-screen flex-shrink-0">
              <Panel2Credit />
            </div>
            <div id="equity" className="w-[100vw] h-screen flex-shrink-0">
              <Panel3Equity />
            </div>
            <div id="matrix" className="w-[100vw] h-screen flex-shrink-0">
              <Panel4Matrix />
            </div>
          </SapphireEngine>
        </section>

        {/* 3. Contact Section (Vertical scroll) */}
        <section id="contact" className="w-full">
          <Panel5Contact />
        </section>
      </main>
      
    </div>
  );
}
