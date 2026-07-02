"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config/business";

export function Hero() {
  return (
    <section className="relative pt-[30px] pb-[120px] lg:pt-[60px] lg:pb-[180px] overflow-hidden bg-[#111] mt-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/carhive/hero_bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80 z-0" />

      <div className="auto-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Text) */}
          <div className="text-left">
            <h1 className="font-heading font-black text-[50px] md:text-[70px] leading-[1.1] mb-6 tracking-tight">
              <span className="text-white block">Trusted Auto</span>
              <span className="text-primary block">Repairs Experts</span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
              Professional car service and auto repair solutions. We provide certified technicians and advanced diagnostic tools to ensure your vehicle stays in perfect condition.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/appointment"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105 inline-flex items-center gap-2"
              >
                Schedule An Appointment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Need Help</div>
                  <div className="text-gray-400 text-sm">{business.phoneDisplay}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column (Floating Cards) */}
          <div className="relative h-[400px] hidden lg:block">
            {/* Top Right Floating Card */}
            <div className="absolute top-0 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-[280px] shadow-2xl animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Sk Samiul" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Sk Samiul</div>
                    <div className="text-gray-400 text-xs">Co founder</div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" /></svg>
                </div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Professional car service and auto repair solutions designed to keep your engine running perfectly.
              </p>
            </div>
            
            {/* Middle Floating Card */}
            <div className="absolute top-[160px] right-20 bg-white p-5 rounded-2xl shadow-2xl w-[260px] z-20">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=1" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=2" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=3" alt="User" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">1K+</div>
                </div>
              </div>
              <div className="font-bold text-gray-900 text-lg">Happy Customers</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-primary">
                  {"★★★★★".split("").map((star, i) => <span key={i} className="text-sm">{star}</span>)}
                </div>
                <span className="text-gray-500 text-xs font-medium">1264+ reviews</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Red Car Overlapping Image */}
      <div className="absolute bottom-[-50px] right-1/4 lg:right-1/3 transform translate-x-1/2 z-30 pointer-events-none hidden md:block">
        <Image
          src="/images/carhive/red_car.jpg"
          alt="Sports Car"
          width={600}
          height={300}
          className="object-cover rounded-3xl mix-blend-lighten opacity-90 shadow-2xl"
        />
      </div>
    </section>
  );
}