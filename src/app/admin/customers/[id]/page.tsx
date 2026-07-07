import React from "react";
import Link from "next/link";
import { Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { notFound } from "next/navigation";

export default async function CustomerProfilePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ addVehicle?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const customerId = parseInt(resolvedParams.id);
  const showAddVehicle = resolvedSearchParams.addVehicle === "true";

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      vehicles: true,
      orders: {
        include: {
          vehicle: true
        }
      }
    }
  });

  if (!customer) {
    notFound();
  }

  return (
    <div className="max-w-4xl py-8">
      
      <div className="relative pl-12 border-l-2 border-gray-300 space-y-16 ml-8">
        
        {/* Info Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Info
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Customer: {customer.firstName} {customer.lastName}
            </h2>
            <div className="space-y-1 text-[15px]">
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Email:</span> 
                <span className="text-gray-500">{customer.email}</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Phone Number:</span> 
                <span className="text-gray-500">{customer.phoneNumber}</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Active Customer:</span> 
                <span className="text-gray-500">Yes</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-gray-900">Edit customer info:</span> 
                <Link href={`/admin/customers/${customer.id}/edit`} className="text-primary hover:text-red-700">
                  <Edit className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Cars
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Vehicles of {customer.firstName}
            </h2>
            
            {customer.vehicles.length === 0 ? (
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 mb-6">
                <p className="text-gray-400 italic text-[15px]">No vehicle found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {customer.vehicles.map(v => (
                  <div key={v.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{v.year} {v.make} {v.model}</h4>
                      <p className="text-sm text-gray-500">Color: {v.color || 'N/A'} | Mileage: {v.mileage} | Tag: {v.licensePlate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!showAddVehicle ? (
              <Link href={`/admin/customers/${customer.id}?addVehicle=true`} className="inline-block bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors">
                ADD NEW VEHICLE
              </Link>
            ) : (
              <div className="mt-6">
                <VehicleForm customerId={customer.id} />
              </div>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Orders
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Orders of {customer.firstName}
            </h2>
            
            {customer.orders.length === 0 ? (
              <p className="text-gray-500 text-[15px]">
                No orders found.
              </p>
            ) : (
              <div className="space-y-4">
                {customer.orders.map(o => (
                  <Link key={o.id} href={`/admin/orders/${o.orderHash}/edit`} className="block bg-white p-4 rounded-sm shadow-sm border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 mr-2">Order #{o.id}</span>
                        <span className="text-gray-500 text-sm">{o.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {o.status !== "COMPLETED" ? (
                          <span className="text-green-600">{o.status}</span>
                        ) : (
                          <span className="text-gray-500">Completed</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
          </div>
        </div>

      </div>
      
    </div>
  );
}
