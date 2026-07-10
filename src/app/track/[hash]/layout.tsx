import React from "react";
import Link from "next/link";
import { Car } from "lucide-react";

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Public Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#001659] rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-[#001659]">
            AutoRex<span className="text-primary">.</span>
          </span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} AutoRex Automotive Services. All rights reserved.
      </footer>
    </div>
  );
}
