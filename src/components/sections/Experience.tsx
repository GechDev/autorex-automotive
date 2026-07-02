"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Experience() {
  return (
    <section className="about-section py-[70px] bg-white">
      <div className="auto-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div className="relative">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/misc/vban1.jpg"
                  alt="AutoRex workshop"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-8 right-8 aspect-[4/3] max-w-[60%] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/misc/vban2.jpg"
                  alt="AutoRex team working"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 30vw"
                />
              </div>
            </div>

            {/* Experience Badge */}
            <div
              className="absolute bottom-8 left-8 bg-primary text-white px-6 py-5 rounded text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              style={{ transform: "rotate(-2deg)" }}
            >
              <div className="font-heading font-black text-5xl leading-none">24</div>
              <div className="font-medium text-sm uppercase tracking-wider mt-1">years</div>
              <div className="font-medium text-sm uppercase tracking-wider">Experience</div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:pl-12 pt-8 lg:pt-0">
            <div className="sec-title mb-8">
              <h5 className="text-primary font-heading font-bold uppercase tracking-wider mb-3 text-lg">
                Welcome to Our workshop
              </h5>
              <h2 className="font-heading font-black text-[36px] leading-[45px] text-[#001659] mb-6">
                We have 24 years experience
              </h2>
              <div className="text-body max-w-xl">
                <p className="mb-4">
                  We utilize the most recent diagnostic equipment to ensure your vehicle is
                  fixed or adjusted appropriately and in a timely manner. We are a member of
                  Professional Auto Service, a top-class performance network, where independent service
                  facilities share common goals of being world-class automotive service centers.
                </p>
                <p className="mb-6">
                  Our certified mechanics provide quality service with attention to detail.
                  We believe in transparent pricing and honest recommendations.
                </p>
              </div>
              <Link
                href="/about"
                className="btn-style-one inline-flex items-center gap-2"
              >
                <span>About Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}