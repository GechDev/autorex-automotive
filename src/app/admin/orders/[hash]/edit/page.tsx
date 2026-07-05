import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditOrderPage({ params }: { params: { hash: string } }) {
  const order = await prisma.order.findFirst({
    where: { order_hash: params.hash },
    include: {
      customer: { include: { info: true } },
      vehicle: true,
      info: true,
      services: { include: { service: true } },
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Order Details
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Order #{order.order_id}</h2>
        <div className="space-y-4">
          <p><strong>Customer:</strong> {order.customer?.info?.customer_first_name} {order.customer?.info?.customer_last_name}</p>
          <p><strong>Vehicle:</strong> {order.vehicle?.vehicle_year} {order.vehicle?.vehicle_make} {order.vehicle?.vehicle_model}</p>
          <p><strong>Total Price:</strong> ${order.info?.order_total_price}</p>
          <p><strong>Status:</strong> {order.active_order === 1 ? "Active" : "Completed"}</p>
        </div>
        
        <h3 className="text-lg font-bold mt-8 mb-2">Services Requested</h3>
        <ul className="list-disc pl-5">
          {order.services.map(s => (
            <li key={s.order_service_id}>{s.service?.service_name}</li>
          ))}
        </ul>

        {/* Note: Edit Order Form would go here, currently rendering read-only details for brevity */}
      </div>
      
    </div>
  );
}
