"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config/business";

export function BottomBanner() {
  return (
    <section className="relative py-[80px] bg-white overflow-hidden">
      
      <div className="auto-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side Text Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.64 5.23L12 3l.36 2.23C12.63 7.15 14.85 9.37 16.77 9.64L19 10l-2.23.36c-1.92.27-4.14 2.49-4.41 4.41L12 17l-.36-2.23c-.27-1.92-2.49-4.14-4.41-4.41L5 10l2.23-.36c1.92-.27 4.14-2.49 4.41-4.41z" /></svg>
              CONTACT US
            </div>
            
            <h2 className="text-gray-900 font-heading font-black text-4xl lg:text-[42px] leading-[1.1] mb-6 tracking-tight">
              Don't Wait, Get Your Car <br />
              Back in Top Shape
            </h2>
            
            <p className="text-gray-500 mb-10 text-[15px] leading-relaxed max-w-lg">
              We offer comprehensive auto repair services tailored to meet all your vehicle's needs. Trust our expert technicians to provide quick and reliable solutions.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-500/20"
              >
                More About Us
              </Link>
            </div>
          </div>

          {/* Right Side Appointment Form */}
          <div className="w-full max-w-md ml-auto lg:mr-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-8 rounded-2xl">
            <h3 className="text-gray-900 font-heading font-black text-2xl mb-2">Book Your Appointment</h3>
            <p className="text-gray-500 text-sm mb-6">Schedule your visit today and let our experts take care of your vehicle.</p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm shadow-inner"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm shadow-inner"
                  required
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm resize-none shadow-inner"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 w-full md:w-auto shadow-lg shadow-red-500/20 mt-2"
              >
                Submit Now
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
