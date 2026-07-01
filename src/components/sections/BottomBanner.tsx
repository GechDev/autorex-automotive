"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";

export function BottomBanner() {
  return (
    <section className="cta-section relative py-[70px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: "url('/images/background/bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/shape/shape-1.png"
          alt=""
          className="absolute top-10 left-5 w-40 opacity-30 animate-pulse"
          width={160}
          height={160}
        />
        <Image
          src="/images/shape/shape-3.png"
          alt=""
          className="absolute bottom-20 right-10 w-32 opacity-30 animate-spin slow"
          width={128}
          height={128}
        />
      </div>

      <div className="auto-container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h5 className="text-white font-heading font-bold uppercase tracking-wider mb-4 text-lg">
            Working since 1992
          </h5>
          <h2 className="text-white font-heading font-black text-[48px] leading-[58px] mb-8">
            We are leader <br /> in Car Mechanical Work
          </h2>
          <div className="video-box flex flex-col items-center gap-6 mb-10">
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
          <Link
            href="/appointment"
            className="btn-style-one inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            <span>Schedule Appointment</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}