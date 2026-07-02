"use client";

import React from "react";
import Image from "next/image";

const whyChooseItems = [
  {
    icon: "/images/icons/icon-7.png",
    iconAlt: "Certified mechanics icon",
    title: "Certified Expert Mechanics",
  },
  {
    icon: "/images/icons/icon-8.png",
    iconAlt: "Fast service icon",
    title: "Fast And Quality Service",
  },
  {
    icon: "/images/icons/icon-9.png",
    iconAlt: "Best prices icon",
    title: "Best Prices in Town",
  },
  {
    icon: "/images/icons/icon-10.png",
    iconAlt: "Awarded workshop icon",
    title: "Awarded Workshop",
  },
];

const additionalServices = [
  "General Auto Repair & Maintenance",
  "Transmission Repair & Replacement",
  "Tire Repair and Replacement",
  "State Emissions Inspection",
  "Brake Job / Brake Services",
  "Electrical Diagnostics",
  "Fuel System Repairs",
  "Starting and Charging Repair",
  "Steering and Suspension Work",
  "Emission Repair Facility",
  "Wheel Alignment",
  "Computer Diagnostic Testing",
];

export function WhyChooseUs() {
  return (
    <section className="why-choose-us py-[70px] bg-white">
      <div className="auto-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Why Choose Us */}
          <div className="lg:pr-8">
            <div className="sec-title mb-8">
              <h2 className="font-heading font-black text-[36px] leading-[45px] text-[#001659] inline-block relative">
                Why Choose Us
              </h2>
              <div className="text-body max-w-xl mt-4">
                We deliver professional automotive service with certified expertise,
                transparent pricing, and a commitment to quality that keeps customers coming back.
              </div>
            </div>

            <div className="space-y-6">
              {whyChooseItems.map((item, index) => (
                <div key={index} className="icon-box flex gap-4">
                  <div className="icon w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.iconAlt}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-[20px] leading-[28px] text-[#001659] mt-2">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Additional Services */}
          <div>
            <div className="sec-title mb-8">
              <h2 className="font-heading font-black text-[36px] leading-[45px] text-[#001659] inline-block relative">
                Additional Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/custom/additional-B9nihJ5u.jpg"
                  alt="Additional automotive services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-3">
                <ul className="list space-y-3">
                  {additionalServices.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-body text-[#222] font-medium relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                    >
                      {service}
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