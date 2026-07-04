import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminEmployeesPage() {
  const employees = await prisma.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "MANAGER", "EMPLOYEE"]
      }
    },
    orderBy: { createdAt: "desc" },
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
              <tr key={e.id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}`}>
                <td className="px-6 py-4 text-gray-600">Yes</td>
                <td className="px-6 py-4 font-bold text-gray-900">{e.name?.split(' ')[0] || "Unknown"}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{e.name?.split(' ').slice(1).join(' ') || ""}</td>
                <td className="px-6 py-4 text-gray-600">{e.email}</td>
                <td className="px-6 py-4 text-gray-600">{"N/A"}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(e.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ' - ')} | {new Date(e.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </td>
                <td className="px-6 py-4 text-gray-600">{e.role === 'ADMIN' ? 'Admin' : e.role === 'MANAGER' ? 'Manager' : 'Employee'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/employees/${e.id}/edit`} className="text-gray-900 hover:text-primary transition-colors">
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
