"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Kevin Adam",
    role: "Software Engineer",
    review: "Absolutely stellar service! They were upfront about the costs and got my car running smoother than it has in years.",
    image: "https://i.pravatar.cc/150?img=11", 
  },
  {
    id: 2,
    name: "Charlie Momen",
    role: "Local Business Owner",
    review: "I bring all my delivery vans here. They always prioritize getting my fleet back on the road quickly without cutting corners.",
    image: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Teacher",
    review: "As someone who knows nothing about cars, I really appreciated how they took the time to explain everything before starting the repair.",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#111] relative z-0 pt-24 pb-[100px] overflow-hidden">
      
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/carhive/hero_bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />

      <div className="auto-container relative z-10">
        
        {/* Header Area */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gray-300 font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 border border-white/20 whitespace-nowrap">
            OUR TESTIMONIALS
          </div>
          <h2 className="font-heading font-black text-[35px] md:text-[50px] leading-[1.1] text-white tracking-tight">
            What Our Clients Say <br /> About Us!
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-lg p-8 pt-12 relative text-center mt-10 shadow-2xl">
              
              {/* Avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-100">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Quote Icon Box */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-primary rounded-tr-lg rounded-bl-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>

              {/* Content */}
              <h4 className="font-heading font-black text-xl text-gray-900 mb-1">{t.name}</h4>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{t.role}</p>
              
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {t.review}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
