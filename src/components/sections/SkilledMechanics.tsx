"use client";

import React from "react";
import Image from "next/image";

export function SkilledMechanics() {
  return (
    <section className="py-[100px] bg-white relative">
      <div className="auto-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column (Text) */}
          <div className="lg:pr-8">
            <h2 className="font-heading font-black text-[35px] md:text-[45px] leading-[1.2] text-[#001659] mb-6 tracking-tight">
              We are highly skilled mechanics for your car repair
            </h2>
            
            <p className="text-gray-500 mb-6 leading-relaxed text-[15px]">
              Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.
            </p>

            <p className="text-gray-500 leading-relaxed text-[15px]">
              Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information heading towards a streamlined cloud solution. User generated content in real-time will have multiple.
            </p>
          </div>
          
          {/* Right Column (Image) */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/carhive/about1.png"
              alt="Mechanic changing tire"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
