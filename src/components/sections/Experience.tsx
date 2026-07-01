"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config/business";

export function Experience() {
  return (
    <section className="py-[100px] bg-white overflow-hidden relative">
      <div className="auto-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column (Text & Features) */}
          <div className="lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 border border-gray-200 whitespace-nowrap">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              ABOUT US
            </div>
            
            <h2 className="font-heading font-black text-[28px] sm:text-[40px] lg:text-[48px] xl:text-[50px] leading-[1.1] text-gray-900 mb-8 tracking-tight whitespace-nowrap">
              Driven By Passion <br />
              Powered By Precision
            </h2>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Fuel system repair
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Fuel system repair
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Air conditioning
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Air conditioning
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Wheel alignment
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Wheel alignment
              </div>
            </div>

            <p className="text-gray-500 mb-10 leading-relaxed text-[15px]">
              At AutoRex Automotive, we believe every vehicle deserves expert care. Our state-of-the-art diagnostic tools and certified master technicians ensure your car is repaired efficiently, effectively, and safely, keeping you on the road with total peace of mind.
            </p>

            {/* Badges */}
            <div className="inline-flex flex-col sm:flex-row items-start sm:items-center bg-[#111] text-white rounded-xl mb-10 overflow-hidden shadow-2xl">
              {/* Left Side: Avatar */}
              <div className="flex items-center gap-4 px-6 py-4 border-b sm:border-b-0 sm:border-r border-white/10 w-full sm:w-auto">
                <img className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white/5" src="https://i.pravatar.cc/150?img=11" alt="Brooklyn Simmons" />
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xl leading-none mb-1 tracking-wide">Brooklyn Simmons</span>
                  <span className="text-gray-400 text-sm font-medium">Co-Founder</span>
                </div>
              </div>
              
              {/* Right Side: ISO Badge */}
              <div className="flex items-center gap-4 px-6 py-4 w-full sm:w-auto">
                <svg className="w-9 h-9 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
                </svg>
                <div className="flex flex-col uppercase">
                  <span className="font-heading font-black text-[17px] leading-tight tracking-wide">ISO CERTIFICATE</span>
                  <span className="font-heading font-black text-[17px] leading-tight tracking-wide text-gray-300">MANUFACTURER</span>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-500/30"
              >
                More About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary border border-red-100 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-lg leading-tight">Need Help</div>
                  <div className="text-gray-500 text-sm leading-tight">{business.phoneDisplay}</div>
                </div>
              </div>
            </div>

          </div>
          
          {/* Right Column (Image) */}
          <div className="relative pt-10 pl-10 h-full w-full">
            <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-gray-100 rounded-[30px] z-0 hidden lg:block" />
            <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-[30px] overflow-hidden shadow-2xl">
              <Image
                src="/images/carhive/about1.png"
                alt="Mechanic working on engine"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Experience Card Overlay */}
            <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20 flex flex-col items-center justify-center w-[180px]">
              <div className="text-primary font-black text-5xl tracking-tighter mb-1">20+</div>
              <div className="text-gray-800 font-bold text-sm text-center leading-tight">
                Years Of Experience
              </div>
            </div>
          </div>

        </div>
        
        {/* Trusted Partners Section */}
        <div className="mt-[100px] border border-gray-200 rounded-2xl py-6 px-8 flex flex-wrap items-center justify-between gap-8 bg-white shadow-sm">
          <div className="font-bold text-gray-900 text-lg flex-shrink-0">
            Your Trusted Partner:
          </div>
          <div className="flex items-center justify-between flex-1 opacity-50 grayscale gap-8 overflow-hidden">
            {/* Mock logos text */}
            <div className="flex items-center gap-2 font-bold text-xl"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> Logoipsum</div>
            <div className="flex items-center gap-2 font-bold text-xl"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> logo<span className="font-light">ipsum</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect width="16" height="16" x="4" y="4"/></svg> Logoipsum</div>
            <div className="flex items-center gap-2 font-bold text-xl"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> LOGO<span className="font-light">IPSUM</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> logoipsum</div>
          </div>
        </div>

      </div>
    </section>
  );
}