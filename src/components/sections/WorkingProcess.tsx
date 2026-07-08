"use client";

import React from "react";

const steps = [
  {
    id: "01",
    title: "Book Your Service",
    description: "Easily schedule your appointment online or give us a call to find a convenient time.",
  },
  {
    id: "02",
    title: "Expert Inspection & Repair",
    description: "Our certified mechanics perform a thorough inspection and execute precision repairs.",
  },
  {
    id: "03",
    title: "Drive Away Safely",
    description: "Pick up your vehicle feeling confident and secure with our top-tier service guarantee.",
  },
];

export function WorkingProcess() {
  return (
    <section className="py-20 bg-white relative z-10">
      <div className="auto-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
         
          <h2 className="font-heading font-black text-[35px] md:text-[45px] leading-[1.1] text-gray-900 mb-6 tracking-tight">
            How Does We Work
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px]">
            We've streamlined our process to ensure you get the fastest, most reliable automotive service without any hassle or confusion.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-xl p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-black text-2xl mb-6 relative">
                {step.id}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-sm rotate-45"></div>
              </div>
              <h3 className="font-heading font-black text-[22px] leading-tight text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
