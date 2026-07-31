"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { ServiceCard } from "@/components/admin/ServiceCard";
import { CommonService } from "@/generated/prisma";

export function ServicesTable({ services }: { services: CommonService[] }) {
  const columns: ColumnDef<CommonService>[] = [
    {
      key: "id",
      header: "ID",
      render: (s) => <span className="font-mono text-[13px] text-gray-500">#{s.id}</span>,
      className: "w-16",
    },
    {
      key: "name",
      header: "Service Name",
      render: (s) => (
        <span className="font-semibold text-gray-900 text-[14px]">{s.name}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (s) => (
        <span className="text-gray-500 text-[13px] line-clamp-2">
          {s.description || <span className="italic text-gray-400">No description</span>}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-36",
      render: (s) => <ServiceCard service={s} tableMode />,
    },
  ];

  return (
    <DataTable
      data={services}
      columns={columns}
      rowKey={(s) => s.id.toString()}
      searchFields={(s) => [s.name, s.description].filter(Boolean).join(" ")}
      searchPlaceholder="Search services by name or description..."
      emptyMessage="No services found. Click 'NEW SERVICE' to add one."
    />
  );
}
