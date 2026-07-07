import React from "react";
import { prisma } from "@/lib/prisma";
import { CustomerForm } from "@/components/admin/CustomerForm";
import { notFound } from "next/navigation";

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const customerId = parseInt(resolvedParams.id);
  
  const customer = await prisma.customer.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    notFound();
  }

  const initialData = {
    email: customer.email,
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    phone: customer.phoneNumber,
  };

  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Edit customer
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="max-w-3xl">
        <CustomerForm 
          initialData={initialData} 
          customerId={resolvedParams.id}
        />
      </div>
      
    </div>
  );
}
