import React from "react";
import { prisma } from "@/lib/prisma";
import { EmployeeForm } from "@/components/admin/EmployeeForm";
import { notFound } from "next/navigation";

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id);
  if (isNaN(employeeId)) return notFound();

  const employee = await prisma.employee.findUnique({
    where: { employee_id: employeeId },
    include: {
      info: true,
      roles: { include: { role: true } }
    }
  });

  if (!employee) return notFound();

  const initialData = {
    email: employee.employee_email,
    firstName: employee.info?.employee_first_name || "",
    lastName: employee.info?.employee_last_name || "",
    phone: employee.info?.employee_phone || "",
    role: employee.roles[0]?.role?.company_role_name || "Employee",
  };

  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Edit employee
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="max-w-3xl">
        <EmployeeForm employeeId={employeeId} initialData={initialData} />
      </div>
      
    </div>
  );
}
