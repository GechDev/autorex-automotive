import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      customer: { include: { info: true } },
      vehicle: true,
      info: true,
      services: { include: { service: true } },
    },
    orderBy: { order_date: "desc" },
  });

  const serialized = orders.map((o) => ({
    ...o,
    order_date: o.order_date.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Orders
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <Link
          href="/admin/orders/new"
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors"
        >
          NEW ORDER
        </Link>
      </div>

      <OrdersTable orders={serialized} />
    </div>
  );
}
