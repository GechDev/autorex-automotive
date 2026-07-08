"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Exterior Detailing",
    description: "Restore your vehicle's factory shine with premium washing, polishing, and ceramic coating.",
    image: "/images/carhive/service1.jpg",
  },
  {
    id: 2,
    title: "Mechanical Repairs",
    description: "From engine diagnostics to transmission rebuilds, we handle all major mechanical issues.",
    image: "/images/carhive/service2.jpg",
  },
  {
    id: 3,
    title: "Interior Repairs",
    description: "Deep interior cleaning, upholstery repair, and odor elimination for a fresh cabin.",
    image: "/images/carhive/service3.jpg",
  },
];

export function ServicesSection() {
  return (
    <section className="relative bg-white pt-[100px]">
      
      {/* Full-width Dark Background Block */}
      <div className="bg-[#111] pt-16 pb-48 relative z-0 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-50 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/service-car.png')", backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/95 z-0" />
        
        <div className="auto-container relative z-10 flex flex-col lg:flex-row justify-between items-start gap-10 px-4">
          {/* Left Header */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gray-300 font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 border border-white/20 whitespace-nowrap">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M11.64 5.23L12 3l.36 2.23C12.63 7.15 14.85 9.37 16.77 9.64L19 10l-2.23.36c-1.92.27-4.14 2.49-4.41 4.41L12 17l-.36-2.23c-.27-1.92-2.49-4.14-4.41-4.41L5 10l2.23-.36c1.92-.27 4.14-2.49 4.41-4.41z" /></svg>
              OUR SERVICES
            </div>
            
            <h2 className="font-heading font-black text-[28px] sm:text-[40px] lg:text-[50px] leading-[1.1] text-white tracking-tight whitespace-nowrap">
              Trusted Car Care, From <br />
              Detailing To Repairs
            </h2>
          </div>
          
          {/* Right Text & Button */}
          <div className="max-w-md lg:text-right flex flex-col lg:items-end justify-center">
            <Link
              href="/services"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center gap-2 w-max"
            >
              More Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Service Cards (Overlapping) */}
      <div className="bg-white pb-[100px]">
        <div className="auto-container relative z-10 -mt-[140px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group transition-transform duration-500 hover:-translate-y-2 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading font-black text-[22px] leading-tight text-gray-900 mb-2 truncate">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed w-full line-clamp-2 min-h-[40px]">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M8 7h9v9" /></svg>
                  </Link>
                </div>
                
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mt-auto">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
