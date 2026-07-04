import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

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

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      <div className="mb-10 flex justify-between items-center">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Orders
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <Link 
          href="/admin/orders/new" 
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          NEW ORDER
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#fafafa] text-gray-900 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-[14px]">Order ID</th>
              <th className="px-6 py-4 font-bold text-[14px]">Customer</th>
              <th className="px-6 py-4 font-bold text-[14px]">Vehicle</th>
              <th className="px-6 py-4 font-bold text-[14px]">Date</th>
              <th className="px-6 py-4 font-bold text-[14px]">Total</th>
              <th className="px-6 py-4 font-bold text-[14px]">Status</th>
              <th className="px-6 py-4 font-bold text-[14px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o, i) => (
              <tr key={o.order_id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}`}>
                <td className="px-6 py-4 font-bold text-gray-900">#{o.order_id}</td>
                <td className="px-6 py-4 text-gray-600">
                  {o.customer?.info?.customer_first_name} {o.customer?.info?.customer_last_name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {o.vehicle?.vehicle_year} {o.vehicle?.vehicle_make} {o.vehicle?.vehicle_model}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(o.order_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  ${o.info?.order_total_price || 0}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {o.active_order === 1 ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-sm">Active</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-sm">Completed</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/orders/${o.order_hash}/edit`} className="text-gray-900 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
