import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      info: true,
      roles: { include: { role: true } }
    },
    orderBy: { added_date: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Employees
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden mt-8">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#fafafa] text-gray-900 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-[14px]">Active</th>
              <th className="px-6 py-4 font-bold text-[14px]">First Name</th>
              <th className="px-6 py-4 font-bold text-[14px]">Last Name</th>
              <th className="px-6 py-4 font-bold text-[14px]">Email</th>
              <th className="px-6 py-4 font-bold text-[14px]">Phone</th>
              <th className="px-6 py-4 font-bold text-[14px]">Added Date</th>
              <th className="px-6 py-4 font-bold text-[14px]">Role</th>
              <th className="px-6 py-4 font-bold text-[14px]">Edit/Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((e, i) => (
              <tr key={e.employee_id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}`}>
                <td className="px-6 py-4 text-gray-600">{e.active_employee === 1 ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{e.info?.employee_first_name || "Unknown"}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{e.info?.employee_last_name || ""}</td>
                <td className="px-6 py-4 text-gray-600">{e.employee_email}</td>
                <td className="px-6 py-4 text-gray-600">{e.info?.employee_phone || "N/A"}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(e.added_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ' - ')} | {new Date(e.added_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </td>
                <td className="px-6 py-4 text-gray-600">{e.roles[0]?.role?.company_role_name || 'Employee'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/employees/${e.employee_id}/edit`} className="text-gray-900 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="text-gray-900 hover:text-primary transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
