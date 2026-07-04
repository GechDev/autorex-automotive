import React from "react";
import { EmployeeForm } from "@/components/admin/EmployeeForm";

export default function AddEmployeePage() {
  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Add a new employee
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="max-w-3xl">
        <EmployeeForm />
      </div>
      
    </div>
  );
}
