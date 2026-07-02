"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function AboutComponent() {
  return (
    <section className="page-title relative min-h-[350px] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: "url('/images/banner/banner1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/shape/shape-1.png"
          alt=""
          className="absolute top-10 left-5 w-40 opacity-30 animate-pulse"
          width={160}
          height={160}
        />
        <Image
          src="/images/shape/shape-2.png"
          alt=""
          className="absolute bottom-20 right-10 w-48 opacity-30 animate-bounce"
          width={192}
          height={192}
        />
      </div>

      <div className="auto-container relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-heading font-black text-[48px] leading-[58px] mb-4">
              About us
            </h2>
            <ul className="page-breadcrumb flex items-center gap-2 text-white/80 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">home</Link>
              </li>
              <li className="text-primary">About us</li>
            </ul>
          </div>
          <h1 className="text-white/20 font-heading font-black text-[120px] leading-none tracking-tight hidden lg:block" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
            Car Repairing
          </h1>
        </div>
      </div>
    </section>
  );
}