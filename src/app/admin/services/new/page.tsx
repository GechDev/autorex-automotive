import React from "react";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function AddServicePage() {
  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Add a new service
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="max-w-3xl">
        <ServiceForm />
      </div>
      
    </div>
  );
}
