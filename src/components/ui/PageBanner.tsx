"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  bgImage?: string;
}

export function PageBanner({ title, breadcrumb, bgImage = "/images/banner/banner1.jpg" }: PageBannerProps) {
  return (
    <section className="page-title relative min-h-[350px] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: `url('${bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }}
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

      <div className="auto-container relative z-10 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-heading font-black text-[48px] leading-[58px] mb-4">
              {title}
            </h2>
            <ul className="page-breadcrumb flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-wide">
              <li>
                <Link href="/" className="hover:text-primary transition-colors text-white">Home</Link>
              </li>
              <li className="text-white/40 px-1">{'>'}</li>
              <li className="text-white">{breadcrumb}</li>
            </ul>
          </div>
          <h1 className="text-white/20 font-heading font-black text-[100px] xl:text-[120px] leading-none tracking-tight hidden lg:block uppercase" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)", color: "transparent" }}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
