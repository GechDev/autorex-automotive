"use client";

import React from "react";

export function WhyChooseUs() {
  return (
    <section className="pb-10 bg-white relative">
      <div className="auto-container">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-[1000px] mx-auto">
          
          {/* Stat 1 */}
          <div>
            <h2 className="font-heading font-black text-6xl md:text-[80px] text-primary mb-2 tracking-tighter leading-none">
              3.8K+
            </h2>
            <div className="text-gray-900 font-black text-lg uppercase tracking-wide">
              Vehicles Serviced
            </div>
          </div>
          
          {/* Stat 2 */}
          <div>
            <h2 className="font-heading font-black text-6xl md:text-[80px] text-primary mb-2 tracking-tighter leading-none">
              12K+
            </h2>
            <div className="text-gray-900 font-black text-lg uppercase tracking-wide">
              Happy Clients
            </div>
          </div>
          
          {/* Stat 3 */}
          <div>
            <h2 className="font-heading font-black text-6xl md:text-[80px] text-primary mb-2 tracking-tighter leading-none">
              98%
            </h2>
            <div className="text-gray-900 font-black text-lg uppercase tracking-wide">
              On-Time Delivery
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
