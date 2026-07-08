"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "The Importance Of Engine Detailing For Longevity",
    date: "12 October 2024",
    author: "Admin",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/carhive/service2.jpg",
  },
  {
    id: 2,
    title: "The Power Of A Proper Tune Up On Car",
    date: "10 October 2024",
    author: "Admin",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/carhive/about1.png",
  },
  {
    id: 3,
    title: "Get Some Useful Car Maintenance Tips",
    date: "08 October 2024",
    author: "Admin",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/carhive/service1.jpg",
  },
];

export function BlogSection() {
  return (
    <section className="bg-white pt-[50px] pb-[100px]">
      <div className="auto-container">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 border border-gray-300 whitespace-nowrap">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              OUR ARTICLES
            </div>
            <h2 className="font-heading font-black text-[35px] md:text-[45px] leading-[1.1] text-gray-900 tracking-tight">
              Our Latest Blog & Articles
            </h2>
          </div>
          
          <div className="max-w-md lg:text-right flex flex-col lg:items-end">
            <p className="text-gray-500 mb-6 text-[15px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="/blog"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 inline-block"
            >
              View All Articles
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 group">
              
              {/* Image Box */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlapping Red Arrow Icon */}
                <Link 
                  href="/blog" 
                  className="absolute bottom-0 right-6 translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 z-10"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
              
              {/* Content Box */}
              <div className="p-8 pt-10">
                
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>By {article.author}</span>
                </div>
                
                <h3 className="font-heading font-black text-[22px] leading-snug text-gray-900 mb-4 hover:text-primary transition-colors line-clamp-2">
                  <Link href="/blog">
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
