"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Train, Sun, ArrowRight } from "lucide-react";
import StaggeredText from "./StaggeredText";

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

export default function Section2Departure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Monitor vertical scroll progress of the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Smooth scroll progress to eliminate jerky motion
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });

  // Map scroll progress to horizontal translation of the panels
  const xTranslation = useTransform(smoothProgress, [0, 1], ["0%", "-66.66%"]);

  // Map scroll progress to the train's horizontal movement across the second panel
  const trainX = useTransform(smoothProgress, [0.2, 0.85], ["-20%", "110%"]);

  const [isIntersecting, setIsIntersecting] = useState(false);

  // Monitor visibility of the canvas to pause loops when out of viewport (Performance Constraint)
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
      if (canvas && horizontalRef.current) {
        canvas.width = horizontalRef.current.clientWidth;
        canvas.height = horizontalRef.current.clientHeight;
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

      // Calculate responsive train pixel coordinates
      const scrollVal = smoothProgress.get();
      const norm = Math.max(0, Math.min(1, (scrollVal - 0.2) / 0.65));
      const currentTrainX = (canvas.width / 3 - 150) + norm * (canvas.width / 3 + 300);
      const currentTrainY = canvas.height * (1 - 0.135) - 30; // 13.5% bottom track level

      // Spawn a new particle every 3 frames to control density
      if (Math.random() < 0.35 && currentTrainX > -100 && currentTrainX < canvas.width + 100) {
        spawnParticle(currentTrainX, currentTrainY);
      }

      particles = particles.filter((p) => {
        p.life++;
        p.x += p.vx + Math.sin(p.angle) * p.amplitude;
        p.y += p.vy;
        p.angle += p.angleSpeed;
        p.radius += 0.25; // Paper smoke expands

        // Draw particle as stylized layered paper curls
        ctx.save();
        ctx.beginPath();
        const progress = p.life / p.maxLife;
        const opacity = Math.max(0, 1 - progress);
        
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Paper smoke is off-white cardstock tone
        ctx.fillStyle = `rgba(244, 241, 234, ${opacity * 0.65})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight layer to make it look like layered concentric paper
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
  }, [smoothProgress, isIntersecting]);

  return (
    <div 
      id="departure" 
      ref={containerRef} 
      className="relative h-[220vh] bg-m-charcoal"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        
        {/* Horizontal Moving Content Wrapper */}
        <motion.div 
          ref={horizontalRef}
          style={{ x: xTranslation }}
          className="flex h-full w-[300vw] relative"
        >
          
          {/* ================= PANEL 1: Transition Intro ================= */}
          <div className="w-[100vw] h-full flex items-center justify-center px-12 md:px-24 bg-gradient-to-r from-m-charcoal to-[#181212] relative">
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-6 text-a-crimson uppercase tracking-[0.25em] text-xs font-semibold">
                  <Train className="w-4 h-4" />
                  <span>Showcase Chapter 02 / Swiss Alps, Switzerland</span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-m-cream mb-6 leading-tight">
                  Climb the Majestic <br />
                  <span className="italic text-a-crimson font-normal">Alpine Ridges</span>
                </h2>
                
                <StaggeredText
                  text="Witness the Swiss Alps via the Glacier Express. Our travel portals guide luxury hospitality brands, alpine resorts, and tourism bureaus out of corporate monotony. We engineer high-performance frontend systems that turn scenery into unforgettable scroll journeys."
                  el="p"
                  className="text-m-sepia text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl"
                  delay={0.2}
                />
              </div>
              
              <div className="md:col-span-5 border-l border-white/10 pl-8 flex flex-col justify-center">
                <div className="text-[10px] tracking-widest font-mono text-a-crimson uppercase mb-2">SCROLL DIRECTION</div>
                <div className="flex items-center gap-3 text-m-cream text-lg font-light group cursor-pointer">
                  <span>Scroll Vertically to Travel</span>
                  <ArrowRight className="w-5 h-5 text-a-crimson animate-pulse" />
                </div>
              </div>
              
            </div>

            {/* Subtle paper torn edge on the right edge of panel 1 */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/30 pointer-events-none" />
          </div>

          {/* ================= PANEL 2: The Swiss Alps Train Collage ================= */}
          <div className="w-[100vw] h-full bg-[#faedd4] relative flex flex-col justify-end overflow-hidden">
            {/* Ambient noise applied specifically to this panel to increase texture */}
            <div className="absolute inset-0 bg-[#fbf5e8] pointer-events-none opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)] pointer-events-none" />

            {/* Sky Layer: cream paper, crimson sun */}
            <div className="absolute top-[15%] left-[10%] z-0 flex flex-col">
              {/* Crimson Sun: scale pulse animation */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-48 h-48 rounded-full bg-a-crimson shadow-paper-depth-1 flex items-center justify-center relative overflow-hidden"
              >
                {/* Sun paper texture lines */}
                <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_10px)]" />
              </motion.div>
            </div>

            {/* Background Layer: Geometric Mountains made of cardstock */}
            <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="absolute bottom-[20%] left-0 w-full h-[45%] pointer-events-none z-10 fill-[#dbcdc0] opacity-80 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]">
              {/* Mountain Peaks */}
              <path d="M 0 400 L 150 180 L 300 290 L 500 120 L 720 280 L 950 100 L 1200 360 L 1200 400 Z" />
              <path d="M 200 400 L 350 200 L 600 320 L 850 150 L 1100 300 L 1200 240 L 1200 400 Z" fill="#cbbcad" opacity="0.6" />
            </svg>

            {/* Layer 3: Dark Teal Paper Waves */}
            <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" className="absolute bottom-[10%] left-0 w-full h-[25%] pointer-events-none z-20 fill-a-teal filter drop-shadow-[0_-6px_12px_rgba(0,0,0,0.2)]">
              {/* Swirling cresting paper waves */}
              <path d="M 0 200 C 150 160, 200 100, 350 120 C 500 140, 600 80, 750 110 C 900 140, 1050 90, 1200 140 L 1200 200 Z" />
            </svg>

            {/* Layer 4: Crimson Ridge and Railway Track */}
            <div className="absolute bottom-0 left-0 w-full h-[20%] z-30 filter drop-shadow-[0_-8px_16px_rgba(0,0,0,0.3)]">
              <svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-a-crimson">
                {/* Crimson sweeping ridge */}
                <path d="M 0 150 C 180 110, 300 60, 480 80 C 660 100, 850 40, 1050 70 C 1120 80, 1160 90, 1200 90 L 1200 150 Z" />
                
                {/* Railway Track running along the curve */}
                <path 
                  d="M 0 135 C 180 95, 300 45, 480 65 C 660 85, 850 25, 1050 55 C 1120 65, 1160 75, 1200 75" 
                  fill="none" 
                  stroke="#2d2822" 
                  strokeWidth="4" 
                />
                <path 
                  d="M 0 135 C 180 95, 300 45, 480 65 C 660 85, 850 25, 1050 55 C 1120 65, 1160 75, 1200 75" 
                  fill="none" 
                  stroke="#faedd4" 
                  strokeWidth="3" 
                  strokeDasharray="4 12" 
                />
              </svg>
            </div>

            {/* Particle Canvas Overlay spanning panel 2 */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-normal"
            />

            {/* Layer 5: The Miniature Vintage Steam Train */}
            <motion.div 
              style={{ x: trainX, bottom: "13.5%" }}
              className="absolute w-[180px] h-[60px] z-40 pointer-events-none filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]"
            >
              {/* Detailed SVG Steam Train */}
              <svg viewBox="0 0 180 60" className="w-full h-full">
                {/* Engine Cabin - Dark Charcoal Cardboard */}
                <rect x="10" y="10" width="45" height="40" rx="2" fill="#1b1916" stroke="#faedd4" strokeWidth="1" />
                <rect x="18" y="18" width="20" height="15" rx="1" fill="#dbcdc0" />
                
                {/* Boiler Body */}
                <rect x="55" y="20" width="70" height="30" rx="3" fill="#2d2822" stroke="#faedd4" strokeWidth="1" />
                <rect x="125" y="25" width="25" height="25" rx="1" fill="#0f0e0d" />
                
                {/* Chimney */}
                <path d="M 110 20 L 112 5 L 122 3 L 120 20 Z" fill="#1b1916" stroke="#faedd4" strokeWidth="1" />
                
                {/* Front Grill / Cowcatcher */}
                <path d="M 150 40 L 165 50 L 150 50 Z" fill="#9e2a2b" />
                
                {/* Cabin Roof */}
                <path d="M 5 10 L 60 10 L 55 5 L 10 5 Z" fill="#9e2a2b" />

                {/* Steam wheels */}
                <circle cx="28" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
                <circle cx="28" cy="50" r="5" fill="#faedd4" />
                
                <circle cx="58" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
                <circle cx="58" cy="50" r="5" fill="#faedd4" />

                <circle cx="85" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
                <circle cx="85" cy="50" r="5" fill="#faedd4" />
                
                <circle cx="112" cy="50" r="10" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1.5" />
                <circle cx="112" cy="50" r="5" fill="#faedd4" />
                
                <circle cx="138" cy="50" r="7" fill="#0f0e0d" stroke="#faedd4" strokeWidth="1" />
                
                {/* Connector Rods */}
                <line x1="28" y1="50" x2="112" y2="50" stroke="#faedd4" strokeWidth="2.5" />
              </svg>
            </motion.div>

            {/* Bottom canvas metadata indicators */}
            <div className="absolute bottom-2 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-a-teal select-none z-50 font-semibold">
              <span>LOC // SWISS_ALPINE_PASS</span>
              <span>SCROLL PROGRESS // {Math.round(smoothProgress.get() * 100)}%</span>
              <span>TRAIN // GLACIER_EXPRESS</span>
            </div>
          </div>

          {/* ================= PANEL 3: Detail Panel ================= */}
          <div className="w-[100vw] h-full flex items-center justify-center px-12 md:px-24 bg-[#141818] relative">
            
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 flex flex-col justify-center">
                <div className="text-[10px] tracking-widest font-mono text-a-teal uppercase mb-4">Destination: Swiss Alps, Switzerland</div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-m-cream mb-6">
                  High-Performance Alpine Engineering
                </h3>
                
                <p className="text-m-sepia text-sm md:text-base font-light leading-relaxed mb-6">
                  To capture the crystalline, deckle-edged feel of the Swiss mountain pass, our asset pipelines optimize vector calculations and layout dimensions. This guarantees that all frames load in under 1.5 seconds, delivering Swiss precision performance with premium B2B digital craftsmanship.
                </p>

                <ul className="space-y-3 text-xs md:text-sm font-mono text-m-grey">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-a-teal" />
                    <span>H.265 / WebM Smart Formats</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-a-teal" />
                    <span>Aggressive CDN Edge Caching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-a-teal" />
                    <span>Visibility-State Animation Pausing</span>
                  </li>
                </ul>
              </div>

              {/* Decorative diagram representing the automation layers */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative w-full max-w-xs aspect-square border border-white/5 bg-m-charcoal/50 p-6 rounded shadow-paper-inner flex flex-col justify-between">
                  {/* Layer stack graphic */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="h-10 w-full border border-a-teal bg-a-teal/10 rounded flex items-center justify-center text-xs tracking-widest font-mono text-a-teal">
                      GEN ENGINE (DALL-E/MJ)
                    </div>
                    <div className="h-2 w-2 bg-m-cream mx-auto" />
                    <div className="h-10 w-full border border-a-crimson bg-a-crimson/10 rounded flex items-center justify-center text-xs tracking-widest font-mono text-a-crimson">
                      VECTOR MAPPING (SeeDance)
                    </div>
                    <div className="h-2 w-2 bg-m-cream mx-auto" />
                    <div className="h-10 w-full border border-a-amber bg-a-amber/10 rounded flex items-center justify-center text-xs tracking-widest font-mono text-a-amber">
                      DELIVERY CDN (Next.js CDN)
                    </div>
                  </div>
                  
                  <div className="text-[9px] tracking-widest font-mono text-center text-m-sepia uppercase">
                    SYS_LOAD_SPEED // &lt; 2.2s
                  </div>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}
