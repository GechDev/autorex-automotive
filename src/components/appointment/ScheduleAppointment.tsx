"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { business } from "@/lib/config/business";

export function ScheduleAppointment() {
  return (
    <section className="cta-section py-[70px] bg-white">
      <div className="auto-container">
        <div className="wrapper-box bg-primary rounded-xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="left-column text-center lg:text-left">
            <h3 className="text-white font-heading font-black text-[30px] leading-[40px] mb-4">
              Schedule Your Appointment Today
            </h3>
            <div className="text-white/90 text-lg font-medium">
              Your Automotive Repair & Maintenance Service Specialist
            </div>
          </div>
          <div className="right-column flex flex-col sm:flex-row items-center justify-center gap-6 w-full lg:w-auto">
            <div className="phone flex items-center gap-3 text-white/90 bg-white/10 px-6 py-4 rounded-lg">
              <Phone className="w-6 h-6 text-white" />
              <div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Call Now</div>
                <div className="text-2xl font-heading font-bold whitespace-nowrap">{business.phoneDisplay}</div>
              </div>
            </div>
            <Link
              href="/appointment"
              className="btn-style-one bg-white text-primary hover:bg-white/90 inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <span>Appointment</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}