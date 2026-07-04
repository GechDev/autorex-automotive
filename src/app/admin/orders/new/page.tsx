import React from "react";
import { OrderForm } from "@/components/admin/OrderForm";
import { prisma } from "@/lib/prisma";

export default async function NewOrderPage() {
  const customers = await prisma.customerIdentifier.findMany({ include: { info: true } });
  const vehicles = await prisma.customerVehicleInfo.findMany();
  const employees = await prisma.employee.findMany({ include: { info: true } });
  const services = await prisma.commonService.findMany();

  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Create New Order
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
        <OrderForm 
          customers={customers} 
          vehicles={vehicles} 
          employees={employees} 
          services={services} 
        />
      </div>
      
    </div>
  );
}
