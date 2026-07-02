"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const whyChooseFeatures = [
  {
    title: "Certified Expert Mechanics",
    icon: (
      <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </svg>
    ),
  },
  {
    title: "Fast And Quality Service",
    icon: (
      <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Best Prices in Town",
    icon: (
      <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    title: "Awarded Workshop",
    icon: (
      <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10" />
        <path d="M3 4h2l1 9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-9h2" />
      </svg>
    ),
  },
];

const additionalServicesList = [
  "General Auto Repair & Maintenance",
  "Transmission Repair & Replacement",
  "Tire Repair and Replacement",
  "State Emissions Inspection",
  "Break Job / Break Services",
  "Electrical Diagnostics",
  "Fuel System Repairs",
  "Starting and Charging Repair",
  "Steering and Suspension Work",
  "Emission Repair Facility",
  "Wheel Alignment",
  "Computer Diagnostic Testing",
];

export function AdditionalServicesSection() {
  return (
    <section className="py-[100px] bg-white relative">
      <div className="auto-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Why Choose Us */}
          <div>
            <div className="sec-title mb-8">
              <h2 className="text-[32px] md:text-[40px] text-[#001659] leading-tight mb-4">
                Why Choose Us
              </h2>
            </div>
            
            <p className="text-gray-500 mb-10 leading-relaxed text-[15px]">
              Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation heading towards.
            </p>

            <div className="space-y-2">
              {whyChooseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-6 py-4 border-b border-gray-100 last:border-0 group">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <div className="text-primary group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-heading font-bold text-[20px] text-[#001659]">
                    {feature.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Additional Services */}
          <div>
            <div className="sec-title mb-8">
              <h2 className="text-[32px] md:text-[40px] text-[#001659] leading-tight mb-4">
                Additional Services
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Image half */}
              <div className="w-full sm:w-[40%] relative aspect-[3/4] sm:aspect-auto sm:h-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/carhive/about1.png"
                  alt="Classic car"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* List half */}
              <div className="w-full sm:w-[60%]">
                <ul className="space-y-3">
                  {additionalServicesList.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-[15px] font-medium leading-relaxed">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
