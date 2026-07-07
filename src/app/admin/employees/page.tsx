import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { EmployeesTable } from "@/components/admin/EmployeesTable";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      info: true,
      roles: { include: { role: true } },
    },
    orderBy: { added_date: "desc" },
  });

  const serialized = employees.map((e) => ({
    ...e,
    added_date: e.added_date.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Employees
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <Link
          href="/admin/employees/new"
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors"
        >
          NEW EMPLOYEE
        </Link>
      </div>

      <EmployeesTable employees={serialized} />
    </div>
  );
}
