"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Performance Upgrade",
    category: "Service and Repairs",
    icon: "/images/icons/icon-1.png",
    iconAlt: "Performance upgrade icon",
  },
  {
    id: 2,
    title: "Transmission Services",
    category: "Service and Repairs",
    icon: "/images/icons/icon-2.png",
    iconAlt: "Transmission services icon",
  },
  {
    id: 3,
    title: "Brake Repair & Service",
    category: "Service and Repairs",
    icon: "/images/icons/icon-3.png",
    iconAlt: "Brake repair icon",
  },
  {
    id: 4,
    title: "Engine Service & Repair",
    category: "Service and Repairs",
    icon: "/images/icons/icon-4.png",
    iconAlt: "Engine service icon",
  },
  {
    id: 5,
    title: "Tire & Wheels",
    category: "Service and Repairs",
    icon: "/images/icons/icon-5.png",
    iconAlt: "Tire and wheels icon",
  },
  {
    id: 6,
    title: "Denting & Painting",
    category: "Service and Repairs",
    icon: "/images/icons/icon-6.png",
    iconAlt: "Denting and painting icon",
  },
];

export function ServicesSection() {
  return (
    <section className="services-section py-[70px] bg-white">
      <div className="auto-container">
        <div className="sec-title text-center mb-12">
          <h2 className="font-heading font-black text-[36px] leading-[45px] text-[#001659] inline-block relative">
            Our Featured Services
          </h2>
          <div className="text-body max-w-2xl mx-auto mt-4">
            We provide comprehensive automotive services using the latest diagnostic equipment
            and certified technicians. Quality service and customer satisfaction guaranteed.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-block-one group relative"
            >
              <Link
                href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-").replace("&", "")}`}
                className="block h-full"
              >
                <div className="inner-box hvr-float-shadow bg-white border border-gray-100 p-6 h-full transition-all duration-500 hover:shadow-card-hover relative overflow-hidden group">
                  <h5 className="text-primary font-heading font-bold uppercase tracking-wider text-sm mb-2">
                    {service.category}
                  </h5>
                  <h2 className="font-heading font-black text-[22px] leading-[30px] text-[#001659] mb-4">
                    {service.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="read-more font-heading font-bold text-primary uppercase text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      read more
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <div className="icon w-16 h-16 flex items-center justify-center">
                      <Image
                        src={service.icon}
                        alt={service.iconAlt}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Bottom border animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}