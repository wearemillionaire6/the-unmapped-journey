"use client";

import React, { useEffect, useState } from "react";
import { Compass, Watch, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Section1Hero from "@/components/Section1Hero";
import Section2Departure from "@/components/Section2Departure";
import Section3Immersion from "@/components/Section3Immersion";
import Section4Sanctuary from "@/components/Section4Sanctuary";
import Section5Metamorphosis from "@/components/Section5Metamorphosis";
import TelemetryOverlay from "@/components/TelemetryOverlay";

export default function Home() {
  const [activeSection, setActiveSection] = useState("awakening");
  const [telemetryMode, setTelemetryMode] = useState(false);

  // Track active scroll section for the floating header indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["awakening", "departure", "immersion", "sanctuary", "metamorphosis"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-m-charcoal text-m-cream selection:bg-a-amber selection:text-m-charcoal">
      {telemetryMode && <TelemetryOverlay />}

      {/* Floating Header */}
      <header className="fixed top-6 inset-x-6 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-m-charcoal/45 border border-white/5 shadow-paper-depth-1 backdrop-blur-md rounded-full max-w-7xl mx-auto select-none">
        
        {/* Logo and Icon */}
        <a href="#awakening" className="flex items-center gap-2.5 sm:gap-3 text-m-cream hover:text-a-volt transition-colors">
          <Compass className="w-5 h-5 text-a-volt animate-spin-slow" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-medium hidden md:inline">THE UNMAPPED JOURNEY</span>
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-medium md:hidden">T.U.J.</span>
        </a>

        {/* Navigation Indicators */}
        <nav className="flex items-center gap-1.5 sm:gap-4 md:gap-6">
          {[
            { id: "awakening", label: "01" },
            { id: "departure", label: "02" },
            { id: "immersion", label: "03" },
            { id: "sanctuary", label: "04" },
            { id: "metamorphosis", label: "05" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
                activeSection === item.id 
                  ? "text-a-volt font-semibold" 
                  : "text-m-sepia hover:text-m-cream"
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
                !telemetryMode ? "text-m-charcoal font-bold" : "text-m-sepia hover:text-m-cream"
              }`}
            >
              PAPERCUT
              {!telemetryMode && (
                <motion.span
                  layoutId="header-pill"
                  className="absolute inset-0 bg-m-cream rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
            <button
              onClick={() => setTelemetryMode(true)}
              className={`px-2.5 py-1.5 rounded-full transition-colors relative z-10 ${
                telemetryMode ? "text-m-charcoal font-bold" : "text-a-volt"
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
            href="#metamorphosis" 
            className="text-[9px] font-mono tracking-widest border border-a-volt/35 px-4 py-2 rounded-full text-a-volt hover:bg-a-volt hover:text-m-charcoal transition-all hidden sm:inline-block"
          >
            CONTACT
          </a>
        </div>
      </header>

      {/* Sections */}
      <main className="w-full flex flex-col">
        <div id="awakening">
          <Section1Hero />
        </div>
        <div id="departure">
          <Section2Departure />
        </div>
        <div id="immersion">
          <Section3Immersion />
        </div>
        <div id="sanctuary">
          <Section4Sanctuary />
        </div>
        <div id="metamorphosis">
          <Section5Metamorphosis />
        </div>
      </main>
      
    </div>
  );
}
