"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config/business";

export function Experience() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="auto-container px-8 md:px-12 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left Column (Text & Features) */}
          <div className="md:pr-4 lg:pr-8 flex flex-col items-center text-center md:items-start md:text-left w-full mx-auto px-4 sm:px-6 md:px-0">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-bold text-[10px] lg:text-xs uppercase px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mb-3 lg:mb-4 border border-gray-300 whitespace-nowrap">
              ABOUT US
            </div>
            
            <h2 className="font-heading font-black text-[28px] sm:text-[36px] md:text-[30px] lg:text-[48px] xl:text-[50px] leading-[1.1] text-gray-900 mb-6 lg:mb-8 tracking-tight whitespace-nowrap">
              Driven By Passion <br />
              Powered By Precision
            </h2>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-3 lg:gap-y-4 mb-6 lg:mb-8 text-left w-fit mx-auto md:mx-0 text-sm lg:text-base">
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

            <p className="text-gray-500 mb-8 lg:mb-10 leading-relaxed text-[15px] md:text-[13px] lg:text-[17px] px-6 sm:px-10 md:px-0">
              At AutoRex Automotive, our certified master technicians use state-of-the-art tools to ensure your vehicle is repaired safely and efficiently, keeping you on the road with total peace of mind.
            </p>

            {/* Badges */}
            <div className="inline-flex flex-col sm:flex-row items-center bg-[#111] text-white rounded-xl mb-8 lg:mb-10 overflow-hidden shadow-2xl mx-auto md:mx-0">
              {/* Left Side: Avatar */}
              <div className="flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 border-b sm:border-b-0 sm:border-r border-white/10 w-full sm:w-auto">
                <img className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full object-cover border-2 border-white/5" src="https://i.pravatar.cc/150?img=11" alt="Brooklyn Simmons" />
                <div className="flex flex-col">
                  <span className="font-heading font-black text-lg lg:text-xl leading-none mb-1 tracking-wide">Brooklyn Simmons</span>
                  <span className="text-gray-400 text-xs lg:text-sm font-medium">Co-Founder</span>
                </div>
              </div>
              
              {/* Right Side: ISO Badge */}
              <div className="flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 w-full sm:w-auto">
                <svg className="w-7 h-7 lg:w-9 lg:h-9 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
                </svg>
                <div className="flex flex-col uppercase">
                  <span className="font-heading font-black text-[14px] lg:text-[17px] leading-tight tracking-wide">ISO CERTIFICATE</span>
                  <span className="font-heading font-black text-[14px] lg:text-[17px] leading-tight tracking-wide text-gray-300">MANUFACTURER</span>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 lg:gap-6">
              <Link
                href="/about"
                className="bg-primary text-white px-6 py-3 lg:px-8 lg:py-3.5 rounded-full font-bold text-xs lg:text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-500/30"
              >
                More About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-50 rounded-full flex items-center justify-center text-primary border border-red-100 flex-shrink-0">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-base lg:text-lg leading-tight">Need Help</div>
                  <div className="text-gray-500 text-xs lg:text-sm leading-tight">{business.phoneDisplay}</div>
                </div>
              </div>
            </div>

          </div>
          
          {/* Right Column (Image) */}
          <div className="relative pt-8 lg:pt-10 h-full w-full max-w-md mx-auto md:max-w-none md:pl-6 lg:pl-10">
            <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-gray-100 rounded-[30px] z-0 hidden md:block" />
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
            <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 md:left-[-16px] lg:left-[-24px] md:translate-x-0 bg-white p-4 lg:p-6 rounded-2xl shadow-xl border border-gray-100 z-20 flex flex-col items-center justify-center w-[130px] lg:w-[180px]">
              <div className="text-primary font-black text-3xl lg:text-5xl tracking-tighter mb-1">20+</div>
              <div className="text-gray-800 font-bold text-[10px] lg:text-sm text-center leading-tight">
                Years Of Experience
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
