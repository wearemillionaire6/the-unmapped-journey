"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Compass, Cpu, Sliders, Layers, BarChart } from "lucide-react";
import StaggeredText from "./StaggeredText";
import Marquee from "./Marquee";

export default function Section3Immersion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 80 });

  // Parallax zoom maps: simulates moving past the frame
  const [parallaxIntensity, setParallaxIntensity] = useState(60); // Dynamic slider binding (staged from 0 to 100)
  const parallaxMultiplier = parallaxIntensity / 100;

  const bgScale = useTransform(smoothScroll, [0.1, 0.8], [1, 1 + 0.15 * parallaxMultiplier]);
  const midScale = useTransform(smoothScroll, [0.1, 0.8], [1, 1 + 0.3 * parallaxMultiplier]);
  
  // Foreground framing objects translate outwards and scale up
  const fgLeftX = useTransform(smoothScroll, [0.1, 0.6], [0, -60 * parallaxMultiplier]);
  const fgLeftScale = useTransform(smoothScroll, [0.1, 0.6], [1, 1 + 0.45 * parallaxMultiplier]);
  
  const fgRightX = useTransform(smoothScroll, [0.1, 0.6], [0, 60 * parallaxMultiplier]);
  const fgRightScale = useTransform(smoothScroll, [0.1, 0.6], [1, 1 + 0.45 * parallaxMultiplier]);

  // Giraffe animation states
  const [animalState, setAnimalState] = useState<"walking" | "drinking" | "rippling">("walking");

  // Interactive Sliders State
  const [shadowDepth, setShadowDepth] = useState(3); // Shadow depth scale

  // Drag state for dial
  const [dialRotation, setDialRotation] = useState(0);

  // Monitor visibility (Performance Constraint)
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Update shadow depth variable in CSS based on slider
  useEffect(() => {
    const intensity = shadowDepth * 0.1;
    document.documentElement.style.setProperty(
      "--shadow-paper-depth-3",
      `0 14px 28px rgba(0, 0, 0, ${0.15 + intensity}), 0 10px 10px rgba(0, 0, 0, ${0.12 + intensity})`
    );
  }, [shadowDepth]);

  // Giraffe movement sequence
  useEffect(() => {
    if (!isIntersecting) return;
    
    // Sequence: walk for 3s, drink for 2s, ripple, then repeat
    const interval = setInterval(() => {
      setAnimalState("walking");
      setTimeout(() => {
        setAnimalState("drinking");
        setTimeout(() => {
          setAnimalState("rippling");
        }, 1500);
      }, 3000);
    }, 8500);

    return () => clearInterval(interval);
  }, [isIntersecting]);

  // Canvas ripple loop
  useEffect(() => {
    if (animalState !== "rippling") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    // Ripple centered at the Giraffe's drinking coordinates: x: 215, y: 220
    let localRipples = [{ x: 215, y: 220, r: 0, opacity: 0.95 }];

    const drawRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & Draw ripples
      localRipples = localRipples.map((rip) => {
        rip.r += 1.8;
        rip.opacity -= 0.015;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 59, 104, ${rip.opacity})`; // Sapphire blue ripples
        ctx.lineWidth = 2.5;
        
        // Oval shapes to simulate perspective
        ctx.ellipse(rip.x, rip.y, rip.r * 1.5, rip.r * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();

        return rip;
      }).filter(rip => rip.opacity > 0);

      // Spawn subsequent waves
      if (localRipples.length > 0 && localRipples[localRipples.length - 1].r > 20 && localRipples.length < 3) {
        localRipples.push({
          x: 215,
          y: 220,
          r: 0,
          opacity: 0.95 - localRipples.length * 0.25
        });
      }

      if (localRipples.length > 0) {
        animationId = requestAnimationFrame(drawRipples);
      } else {
        setAnimalState("walking");
      }
    };

    drawRipples();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [animalState]);
  return (
    <section 
      id="immersion"
      ref={sectionRef}
      className="relative min-h-screen bg-m-charcoal py-24 px-6 md:px-12 lg:px-20 border-b border-white/5 overflow-hidden"
    >
      <div className="editorial-grid-line left-[20%]" />
      <div className="editorial-grid-line right-[20%]" />
      
      {/* Infinite scrolling outlined text background (Lando Norris style) */}
      <div className="absolute top-[5%] inset-x-0 z-0 opacity-15 overflow-hidden select-none pointer-events-none">
        <Marquee text="SERENGETI SAFARI WILDERNESS PORTAL KENYA" speed={40} colorClass="stroke-white/5" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-6 text-a-volt uppercase tracking-[0.25em] text-xs font-semibold">
            <Cpu className="w-4 h-4" />
            <span>Showcase Chapter 03 / Serengeti, Kenya</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-m-cream mb-6 leading-tight">
            Interlocking Bento Systems & <br />
            <span className="italic text-a-teal font-normal">Savanna Expanses</span>
          </h2>
          
          <StaggeredText
            text="Explore our technical playground. Adjust the sliders below to alter Z-axis parallax depth, or scroll to travel deeper into our papercut savanna wilderness, showcasing detailed vector layering."
            el="p"
            className="text-m-sepia text-base md:text-lg font-light leading-relaxed"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* LARGE CARD (8-span): The 3D Savanna Valley Collage */}
          <div className="md:col-span-8 group relative aspect-[4/3] bg-[#121110] border border-white/10 rounded-lg overflow-hidden shadow-paper-depth-3">
            {/* Tech Corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[LN_SYS_03]</span>
            <span className="absolute top-2 right-2 text-[8px] font-mono text-white/20 select-none">[1.9863S 34.8219E]</span>
            <span className="absolute bottom-6 left-6 w-2 h-2 border-t border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-t border-r border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 left-6 w-2 h-2 border-b border-l border-a-volt/40 pointer-events-none z-30" />
            <span className="absolute top-6 right-6 w-2 h-2 border-b border-r border-a-volt/40 pointer-events-none z-30" />
            
            {/* Parallax Container */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#eae1cc] overflow-hidden">
              
              {/* Layer 1: Distant Kilimanjaro Silhouette & Golden Sky */}
              <motion.div 
                style={{ scale: bgScale }}
                className="absolute inset-0 flex items-end justify-center pointer-events-none z-0"
              >
                <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#dfcaa0] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {/* Savanna Sky Sun */}
                  <circle cx="480" cy="180" r="45" fill="#faedd4" opacity="0.45" />
                  {/* Mount Kilimanjaro silhouette */}
                  <path d="M 120 450 L 260 210 Q 320 180 380 210 L 520 450 Z" />
                  <path d="M 260 210 Q 320 180 380 210 L 350 230 Q 320 220 290 230 Z" fill="#ffffff" opacity="0.8" />
                </svg>
              </motion.div>

              {/* Layer 2: Midground Acacia hills */}
              <motion.div 
                style={{ scale: midScale }}
                className="absolute inset-0 flex items-end justify-center pointer-events-none z-10"
              >
                <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-[#cbb997]">
                  {/* Savanna ridges */}
                  <path d="M 0 450 Q 200 360 400 400 T 600 370 L 600 450 Z" />
                  
                  {/* Midground Acacia trees silhouette */}
                  {/* Trunk */}
                  <path d="M 140 380 L 140 340 L 120 320 M 140 340 L 160 320" stroke="#4a3e2b" strokeWidth="3" />
                  {/* Flat flat umbrella canopy */}
                  <ellipse cx="140" cy="315" rx="35" ry="8" fill="#4a543f" />
                  
                  <path d="M 450 370 L 450 330 L 430 310 M 450 330 L 470 310" stroke="#4a3e2b" strokeWidth="3" />
                  <ellipse cx="450" cy="305" rx="40" ry="10" fill="#4a543f" />
                </svg>
              </motion.div>

              {/* Layer 3: Sapphire Winding Savanna River (Vector cut) */}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-25">
                <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full fill-none">
                  {/* River Path */}
                  <path 
                    d="M 350 450 C 310 400, 260 360, 280 300 C 300 240, 220 210, 215 195 C 210 180, 225 160, 220 140" 
                    stroke="#0e3b68" 
                    strokeWidth="38" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M 350 450 C 310 400, 260 360, 280 300 C 300 240, 220 210, 215 195 C 210 180, 225 160, 220 140" 
                    stroke="#16518a" 
                    strokeWidth="32" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>

              {/* Ripple Canvas overlay */}
              <canvas 
                ref={canvasRef}
                width={600}
                height={450}
                className="absolute inset-0 w-full h-full pointer-events-none z-26"
              />

              {/* Layer 4: The Low-Poly African Giraffe */}
              {/* Walks in from the left, bends long neck to drink */}
              <motion.div
                variants={{
                  walking: { x: [-30, 95], y: [130, 140] },
                  drinking: { x: 95, y: 140 },
                  rippling: { x: 95, y: 140 }
                }}
                animate={animalState}
                transition={{ duration: 3, ease: "linear" }}
                className="absolute w-36 h-36 pointer-events-none z-27"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
                  {/* Giraffe Body Torso (yellow ochre with brown spots) */}
                  <polygon points="40,50 70,50 62,70 45,70" fill="#dfae40" />
                  {/* Spots */}
                  <rect x="46" y="54" width="6" height="5" rx="1" fill="#8c5820" />
                  <rect x="56" y="58" width="5" height="6" rx="1" fill="#8c5820" />
                  <rect x="52" y="64" width="7" height="4" rx="1" fill="#8c5820" />
                  
                  {/* Long Legs */}
                  <line x1="45" y1="70" x2="42" y2="105" stroke="#dfae40" strokeWidth="4.5" />
                  <line x1="45" y1="70" x2="42" y2="105" stroke="#8c5820" strokeWidth="2.5" />
                  
                  <line x1="50" y1="70" x2="52" y2="105" stroke="#c0942e" strokeWidth="4.5" />
                  
                  <line x1="60" y1="70" x2="58" y2="105" stroke="#dfae40" strokeWidth="4.5" />
                  <line x1="60" y1="70" x2="58" y2="105" stroke="#8c5820" strokeWidth="2.5" />
                  
                  <line x1="62" y1="70" x2="65" y2="105" stroke="#c0942e" strokeWidth="4.5" />

                  {/* Tail */}
                  <line x1="40" y1="52" x2="35" y2="75" stroke="#8c5820" strokeWidth="2.5" />

                  {/* Long Neck & Head (Bends down to drink) */}
                  {/* Pivot point at front of chest: x: 65, y: 52 */}
                  <motion.g
                    animate={animalState === "drinking" || animalState === "rippling" ? { rotate: 50, x: -10, y: 15 } : { rotate: 0, x: 0, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "65px 52px" }}
                  >
                    {/* Neck */}
                    <polygon points="62,54 70,54 82,10 74,10" fill="#dfae40" />
                    {/* Neck spots */}
                    <rect x="70" y="32" width="4" height="6" rx="0.5" fill="#8c5820" transform="rotate(-15 70 32)" />
                    <rect x="74" y="20" width="4" height="5" rx="0.5" fill="#8c5820" transform="rotate(-15 74 20)" />
                    
                    {/* Ears and Horns */}
                    <path d="M 76 10 L 78 2 M 77 9 L 83 6" stroke="#8c5820" strokeWidth="2" />
                    
                    {/* Head */}
                    <polygon points="74,10 90,14 86,22 74,16" fill="#dfae40" />
                    <polygon points="86,14 90,14 86,22" fill="#8c5820" />
                  </motion.g>
                </svg>
              </motion.div>

              {/* Layer 5: Foreground acacia trees & foliage (Framing) */}
              <motion.div 
                style={{ x: fgLeftX, scale: fgLeftScale }}
                className="absolute inset-y-0 left-[-20px] w-1/3 flex items-end pointer-events-none z-30 filter drop-shadow-[6px_0_12px_rgba(0,0,0,0.35)] origin-bottom-left"
              >
                <svg viewBox="0 0 200 450" preserveAspectRatio="xMidYMid slice" className="w-full h-[110%] fill-[#3d4434]">
                  {/* Left Acacia frame */}
                  <polygon points="0,0 80,450 0,450" />
                  <path d="M 0 100 Q 120 180 0 240 Z" fill="#2d3326" />
                  <path d="M 0 220 Q 140 300 0 350 Z" fill="#2d3326" />
                  <path d="M 0 310 Q 160 380 0 450 Z" fill="#2d3326" />
                </svg>
              </motion.div>

              <motion.div 
                style={{ x: fgRightX, scale: fgRightScale }}
                className="absolute inset-y-0 right-[-20px] w-1/3 flex items-end pointer-events-none z-30 filter drop-shadow-[-6px_0_12px_rgba(0,0,0,0.35)] origin-bottom-right"
              >
                <svg viewBox="0 0 200 450" preserveAspectRatio="xMidYMid slice" className="w-full h-[110%] fill-[#3d4434]">
                  {/* Right Acacia frame */}
                  <polygon points="200,0 120,450 200,450" />
                  <path d="M 200 130 Q 100 200 200 270 Z" fill="#2d3326" />
                  <path d="M 200 240 Q 80 320 200 380 Z" fill="#2d3326" />
                </svg>
              </motion.div>

              {/* Inner shadows for card stock feel */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.35)] pointer-events-none z-50" />
            </div>

            {/* Bottom canvas metadata indicators */}
            <div className="absolute bottom-3 right-6 left-6 flex justify-between items-center text-[10px] tracking-widest font-mono text-m-charcoal select-none z-50 font-semibold">
              <span>LOC // SERENGETI_SAFARI_KENYA</span>
              <span>ANIMAL_MODE // GIRAFFE_DRINKING</span>
              <span>DEPTH // ZOOM_ACTIVE</span>
            </div>
          </div>

          {/* CARD 2 (4-span): Tactile controls widget */}
          <div className="md:col-span-4 bg-m-charcoal border border-white/10 p-6 rounded-lg shadow-paper-depth-2 flex flex-col justify-between relative">
            {/* Tech Corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[CONTROLS_03]</span>
            <span className="absolute top-6 left-6 w-2 h-2 border-t border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute top-6 right-6 w-2 h-2 border-t border-r border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-6 left-6 w-2 h-2 border-b border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-a-volt/35 pointer-events-none" />
            
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4 text-a-volt">
                <Sliders className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Tactile Controls</span>
              </div>
              
              <h3 className="font-serif text-xl text-m-cream font-light mb-4">
                Alter the Parallax Scale
              </h3>
              
              <p className="text-m-sepia text-xs font-light leading-relaxed mb-6">
                Adjust the sliders below to physically modify CSS variables and parallax scale. Control Z-depth offset or cardstock shadow intensity in real-time.
              </p>

              {/* Slider 1: Parallax zoom factor */}
              <div className="mb-6">
                <div className="flex justify-between text-[10px] font-mono mb-2 text-m-grey">
                  <span>Z-DEPTH PARALLAX SCALE</span>
                  <span className="text-a-volt">{parallaxIntensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={parallaxIntensity} 
                  onChange={(e) => setParallaxIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-a-volt"
                />
              </div>

              {/* Slider 2: Shadows */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] font-mono mb-2 text-m-grey">
                  <span>CARDSTOCK SHADOW STRENGTH</span>
                  <span className="text-a-volt">x{shadowDepth}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={shadowDepth} 
                  onChange={(e) => setShadowDepth(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-a-volt"
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-m-sepia uppercase">
              // REACT STATE BINDINGS // COMPLETE
            </div>
          </div>

          {/* CARD 3 (4-span): Live B2B dial widget */}
          <div className="md:col-span-4 bg-[#141212] border border-white/10 p-6 rounded-lg shadow-paper-depth-1 flex flex-col justify-between relative">
            {/* Tech Corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[TELEMETRY_03]</span>
            <span className="absolute top-6 left-6 w-2 h-2 border-t border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute top-6 right-6 w-2 h-2 border-t border-r border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-6 left-6 w-2 h-2 border-b border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-a-volt/35 pointer-events-none" />
            
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4 text-a-volt">
                <Layers className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Asset Layer Stack</span>
              </div>
              
              <h3 className="font-serif text-xl text-m-cream font-light mb-4">
                Interactive Layer Dial
              </h3>
              
              <p className="text-m-sepia text-xs font-light leading-relaxed mb-6">
                Drag the compass dial to adjust vector orientation. Demonstrates continuous drag triggers mapped to layout projections.
              </p>

              {/* Rotatable Dial */}
              <div className="flex justify-center items-center py-4">
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  onDrag={(event, info) => {
                    const rot = (info.offset.x + info.offset.y) % 360;
                    setDialRotation(rot);
                  }}
                  animate={{ rotate: dialRotation }}
                  className="w-24 h-24 rounded-full border-2 border-a-volt bg-m-charcoal flex items-center justify-center cursor-grab active:cursor-grabbing relative"
                >
                  <div className="w-2 h-2 rounded-full bg-a-volt absolute top-2" />
                  <Compass className="w-8 h-8 text-a-volt opacity-60" />
                </motion.div>
              </div>
            </div>

            <div className="text-[9px] font-mono text-m-sepia uppercase flex justify-between">
              <span>DRAG DIAL</span>
              <span className="text-a-volt">{Math.round(dialRotation)} DEG</span>
            </div>
          </div>

          {/* CARD 4 (8-span): Case Study details */}
          <div className="md:col-span-8 bg-gradient-to-br from-[#101416] to-[#0a0d0e] border border-white/10 p-8 rounded-lg shadow-paper-depth-2 flex flex-col justify-between relative">
            {/* Tech Corners */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-white/20 select-none">+[DATA_STREAM]</span>
            <span className="absolute top-8 left-8 w-2 h-2 border-t border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute top-8 right-8 w-2 h-2 border-t border-r border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-8 left-8 w-2 h-2 border-b border-l border-a-volt/35 pointer-events-none" />
            <span className="absolute bottom-8 right-8 w-2 h-2 border-b border-r border-a-volt/35 pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
              
              <div className="sm:col-span-7">
                <div className="flex items-center gap-2 mb-4 text-a-volt">
                  <BarChart className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider">Premium Case Study</span>
                </div>
                
                <h3 className="font-serif text-2xl text-m-cream font-light mb-4 leading-tight">
                  Serengeti National Park: <br />
                  Interactive Safari Portal
                </h3>
                
                <p className="text-m-sepia text-sm font-light leading-relaxed">
                  We engineered an immersive booking gateway for a luxury safari camp in Kenya. By implementing our 3D papercut framework with lightweight asset structures, mobile reservation rates rose by **42%** while decreasing loading latency down to **1.1 seconds**.
                </p>
              </div>

              <div className="sm:col-span-5 flex justify-center">
                <div className="border border-white/10 bg-m-charcoal/40 p-4 rounded text-center w-full">
                  <div className="text-[10px] tracking-widest font-mono text-m-grey mb-2 uppercase">LCP LAUNCH SPEED</div>
                  <div className="text-4xl font-serif text-a-volt font-light mb-2">1.1s</div>
                  <div className="text-[10px] tracking-wider font-mono text-a-volt uppercase">42% CONVERSION GAIN</div>
                </div>
              </div>
              
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-m-grey">
              <span>CLIENT // SAFARI RESORT GROUP</span>
              <span>YEAR // 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
