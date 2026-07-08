"use client";

import React from "react";
import Link from "next/link";
import { Edit, ExternalLink } from "lucide-react";
import { DataTable, ColumnDef, formatDate } from "@/components/ui/data-table";

type Customer = {
  customer_id: number;
  customer_email: string;
  customer_phone_number: string;
  customer_added_date: string;
  info?: {
    customer_first_name: string;
    customer_last_name: string;
    active_customer_status: number;
  } | null;
};

function ActiveBadge({ active }: { active: number }) {
  return active === 1 ? (
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

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const columns: ColumnDef<Customer>[] = [
    {
      key: "customer_id",
      header: "ID",
      render: (c) => <span className="font-mono text-[13px] text-gray-500">#{c.customer_id}</span>,
      className: "w-16",
    },
    {
      key: "name",
      header: "Name",
      render: (c) => (
        <span className="font-semibold text-gray-900 text-[14px]">
          {c.info?.customer_first_name} {c.info?.customer_last_name}
        </span>
      ),
    },
    {
      key: "customer_email",
      header: "Email",
      render: (c) => <span className="text-gray-600 text-[14px]">{c.customer_email}</span>,
    },
    {
      key: "customer_phone_number",
      header: "Phone",
      render: (c) => <span className="text-gray-600 text-[14px]">{c.customer_phone_number}</span>,
    },
    {
      key: "customer_added_date",
      header: "Added",
      render: (c) => <span className="text-gray-500 text-[13px] whitespace-nowrap">{formatDate(c.customer_added_date)}</span>,
    },
    {
      key: "active",
      header: "Status",
      render: (c) => <ActiveBadge active={c.info?.active_customer_status ?? 0} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (c) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/customers/${c.customer_id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-primary hover:bg-red-50 rounded-lg transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </Link>
          <Link
            href={`/admin/customers/${c.customer_id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-[#001659] hover:bg-blue-50 rounded-lg transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={customers}
      columns={columns}
      rowKey={(c) => c.customer_id}
      searchFields={(c) =>
        [c.info?.customer_first_name, c.info?.customer_last_name, c.customer_email, c.customer_phone_number]
          .filter(Boolean)
          .join(" ")
      }
      searchPlaceholder="Search by name, email, or phone..."
      bulkActions={[
        { label: "Activate Selected", onClick: (ids) => console.log("activate", ids) },
        { label: "Deactivate Selected", onClick: (ids) => console.log("deactivate", ids) },
        { label: "Delete Selected", onClick: (ids) => console.log("delete", ids), variant: "danger" },
      ]}
      emptyMessage="No customers found."
    />
  );
}
