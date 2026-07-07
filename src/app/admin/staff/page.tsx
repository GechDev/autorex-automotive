import React from "react";
import { prisma } from "@/lib/prisma";
import { EmployeesTable } from "@/components/admin/EmployeesTable";
import Link from "next/link";

export default async function StaffPage() {
  const employeesList = await prisma.employee.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Staff Management
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <Link
          href="/admin/staff/new"
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors"
        >
          NEW EMPLOYEE
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <EmployeesTable employees={employeesList} />
      </div>
    </div>
  );
}
