import React from "react";
import { EmployeeForm } from "@/components/admin/EmployeeForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEmployeePage({ params }: PageProps) {
  const resolvedParams = await params;
  const employeeId = parseInt(resolvedParams.id);
  
  if (isNaN(employeeId)) {
    notFound();
  }

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    notFound();
  }

  const initialData = {
    email: employee.email,
    firstName: employee.firstName,
    lastName: employee.lastName,
    phone: employee.phoneNumber || "",
    role: employee.role,
  };

  return (
    <div className="max-w-4xl py-8">
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Edit Staff Member
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>

      <div className="max-w-3xl">
        <EmployeeForm employeeId={employee.id} initialData={initialData} />
      </div>
    </div>
  );
}
