"use client";

import { Printer } from "lucide-react";

export default function PrintReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#001659] hover:bg-[#001659]/90 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
    >
      <Printer className="w-5 h-5" />
      Print Receipt
    </button>
  );
}
