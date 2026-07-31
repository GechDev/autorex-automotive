"use client";

import React from "react";
import Link from "next/link";
import { Edit } from "lucide-react";
import { DataTable, ColumnDef, formatDate } from "@/components/ui/data-table";
import { DeleteEmployeeButton } from "@/components/admin/DeleteEmployeeButton";
import { Employee } from "@/generated/prisma";

function ActiveBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[12px] font-semibold rounded-full border border-emerald-100">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 text-[12px] font-semibold rounded-full border border-gray-300">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
      Inactive
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "ADMIN";
  const isAdvisor = role === "ADVISOR";
  return (
    <span className={`inline-flex px-2.5 py-1 text-[12px] font-semibold rounded-full border ${
      isAdmin
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : isAdvisor
        ? "bg-blue-50 text-blue-700 border-blue-100"
        : "bg-gray-50 text-gray-600 border-gray-300"
    }`}>
      {role}
    </span>
  );
}

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  const columns: ColumnDef<Employee>[] = [
    {
      key: "name",
      header: "Name",
      render: (e) => (
        <span className="font-semibold text-gray-900 text-[14px]">
          {e.firstName} {e.lastName}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (e) => <span className="text-gray-600 text-[14px]">{e.email}</span>,
    },
    {
      key: "phone",
      header: "Phone",
      render: (e) => <span className="text-gray-600 text-[14px]">{e.phoneNumber || "N/A"}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (e) => <RoleBadge role={e.role} />,
    },
    {
      key: "addedDate",
      header: "Added",
      render: (e) => <span className="text-gray-500 text-[13px] whitespace-nowrap">{formatDate(e.addedDate)}</span>,
    },
    {
      key: "active",
      header: "Status",
      render: (e) => <ActiveBadge active={e.isActive} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (e) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/staff/${e.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-primary hover:bg-red-50 rounded-lg transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </Link>
          <DeleteEmployeeButton employeeId={e.id} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={employees}
      columns={columns}
      rowKey={(e) => e.id.toString()}
      searchFields={(e) =>
        [e.firstName, e.lastName, e.email, e.phoneNumber, e.role]
          .filter(Boolean)
          .join(" ")
      }
      searchPlaceholder="Search by name, email, phone, or role..."
      bulkActions={[
        { label: "Activate Selected", onClick: (ids) => console.log("activate", ids) },
        { label: "Deactivate Selected", onClick: (ids) => console.log("deactivate", ids) },
        { label: "Delete Selected", onClick: (ids) => console.log("delete", ids), variant: "danger" },
      ]}
      emptyMessage="No staff members found."
    />
  );
}
