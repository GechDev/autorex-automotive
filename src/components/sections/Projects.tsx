"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Interior Detailing",
    category: "Auto Repair",
    image: "/images/carhive/service3.jpg",
    span: 2,
  },
  {
    id: 2,
    title: "Interior Detailing",
    category: "Auto Repair",
    image: "/images/carhive/service1.jpg",
    span: 2,
  },
  {
    id: 3,
    title: "Car Washing",
    category: "Auto Repair",
    image: "/images/carhive/service2.jpg",
    span: 2,
  },
  {
    id: 4,
    title: "Parts Replace",
    category: "Auto Repair",
    image: "/images/carhive/about1.png",
    span: 3,
  },
  {
    id: 5,
    title: "Dent & Scratch Repair",
    category: "Auto Repair",
    image: "/images/service-car.png",
    span: 3,
  },
];

export function Projects() {
  return (
    <section className="bg-white py-[100px]">
      <div className="auto-container">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 border border-gray-200 whitespace-nowrap">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM4 20v-8h16v8H4z"/></svg>
              OUR PROJECTS
            </div>
            <h2 className="font-heading font-black text-[35px] md:text-[45px] leading-[1.1] text-gray-900 tracking-tight">
              Explore Our Auto Repair <br /> Service Project
            </h2>
          </div>
          
          <div className="max-w-md lg:text-right flex flex-col lg:items-end">
            <p className="text-gray-500 mb-6 text-[15px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="/projects"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {projects.map((p) => (
            <div 
              key={p.id} 
              className={`relative rounded-xl overflow-hidden group aspect-[4/3] lg:aspect-auto lg:h-[350px] col-span-1 md:col-span-1 lg:col-span-${p.span}`}
            >
              <Image 
                src={p.image} 
                alt={p.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Arrow Button */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M8 7h9v9" /></svg>
              </div>

              {/* Text Info */}
              <div className="absolute bottom-6 left-6 right-6 border-l-4 border-primary pl-4">
                <p className="text-white/80 text-sm font-medium mb-1">{p.category}</p>
                <h3 className="text-white font-heading font-black text-2xl tracking-wide">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
