"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export function VideoBanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-black overflow-hidden flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/carhive/hero_bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="auto-container relative z-10 w-full">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white font-bold text-[15px] tracking-wide">Working since 1992</span>
            <div className="w-12 h-[2px] bg-primary"></div>
          </div>
          
          <h2 className="font-heading font-black text-[40px] md:text-[50px] lg:text-[60px] leading-[1.1] text-white mb-10 tracking-tight">
            We are leader <br /> in Car Mechanical Work
          </h2>
          
          <div className="flex items-center gap-6">
            <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(238,13,9,0.4)] relative group">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-75"></div>
            </button>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wider uppercase">Watch Intro Video</span>
              <span className="text-gray-400 text-xs font-medium tracking-widest uppercase mt-1">About Us</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
