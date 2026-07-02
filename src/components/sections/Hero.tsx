"use client";

import React from "react";
import Image from "next/image";
import { Play, ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="video-section relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: "url('/images/banner/banner1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/shape/shape-1.png"
          alt=""
          className="absolute top-10 left-5 w-40 opacity-50 animate-pulse"
          width={160}
          height={160}
          priority
        />
        <Image
          src="/images/shape/shape-2.png"
          alt=""
          className="absolute bottom-20 right-10 w-48 opacity-50 animate-bounce"
          width={192}
          height={192}
        />
        <Image
          src="/images/shape/shape-3.png"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 opacity-30 animate-spin slow"
          width={128}
          height={128}
        />
      </div>

      <div className="auto-container relative z-10 py-20">
        <div className="text-center">
          <h5 className="text-white font-heading font-bold uppercase tracking-wider mb-4 text-lg">
            Working since 1999
          </h5>
          <h2 className="text-white font-heading font-black text-[75px] leading-[70px] mb-8 max-w-3xl mx-auto">
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div className="video-box flex flex-col items-center gap-6">
            <div className="video-btn relative">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="overlay-link lightbox-image video-fancybox ripple inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch intro video about us"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </a>
            </div>
            <div className="text-white/90 text-lg font-medium">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronRight className="w-8 h-8 text-white/70 rotate-90" />
      </div>
    </section>
  );
}