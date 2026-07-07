"use client";

import React from "react";
import Link from "next/link";
import { Edit } from "lucide-react";
import { DataTable, ColumnDef, formatDate } from "@/components/ui/data-table";

type Order = {
  order_id: number;
  order_hash: string;
  order_date: string;
  active_order: number;
  customer?: {
    info?: {
      customer_first_name: string;
      customer_last_name: string;
    } | null;
  } | null;
  vehicle?: {
    vehicle_year: number;
    vehicle_make: string;
    vehicle_model: string;
  } | null;
  info?: {
    order_total_price: number;
  } | null;
  services: { service?: { service_name: string } | null }[];
};

function OrderStatusBadge({ active }: { active: number }) {
  return active === 1 ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[12px] font-semibold rounded-full border border-emerald-100">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 text-[12px] font-semibold rounded-full border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
      Completed
    </span>
  );
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const columns: ColumnDef<Order>[] = [
    {
      key: "order_id",
      header: "Order",
      render: (o) => <span className="font-mono font-bold text-[13px] text-gray-700">#{o.order_id}</span>,
      className: "w-20",
    },
    {
      key: "customer",
      header: "Customer",
      render: (o) => (
        <span className="font-semibold text-gray-900 text-[14px]">
          {o.customer?.info?.customer_first_name} {o.customer?.info?.customer_last_name}
        </span>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (o) => (
        <span className="text-gray-600 text-[14px]">
          {o.vehicle?.vehicle_year} {o.vehicle?.vehicle_make} {o.vehicle?.vehicle_model}
        </span>
      ),
    },
    {
      key: "order_date",
      header: "Date",
      render: (o) => <span className="text-gray-500 text-[13px] whitespace-nowrap">{formatDate(o.order_date)}</span>,
    },
    {
      key: "total",
      header: "Total",
      render: (o) => (
        <span className="font-semibold text-gray-900 text-[14px]">
          ${(o.info?.order_total_price ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (o) => <OrderStatusBadge active={o.active_order} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (o) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/orders/${o.order_hash}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:text-primary hover:bg-red-50 rounded-lg transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={orders}
      columns={columns}
      rowKey={(o) => o.order_id}
      searchFields={(o) =>
        [
          String(o.order_id),
          o.customer?.info?.customer_first_name,
          o.customer?.info?.customer_last_name,
          o.vehicle?.vehicle_make,
          o.vehicle?.vehicle_model,
          String(o.vehicle?.vehicle_year),
        ]
          .filter(Boolean)
          .join(" ")
      }
      searchPlaceholder="Search by order ID, customer name, or vehicle..."
      bulkActions={[
        { label: "Mark Complete", onClick: (ids) => console.log("complete", ids) },
        { label: "Delete Selected", onClick: (ids) => console.log("delete", ids), variant: "danger" },
      ]}
      emptyMessage="No orders found."
    />
  );
}
