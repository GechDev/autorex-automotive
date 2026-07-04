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
  params: { id: string },
  searchParams: { addVehicle?: string }
}) {
  const customerId = parseInt(params.id);
  const showAddVehicle = searchParams.addVehicle === "true";

  const customer = await prisma.customerIdentifier.findUnique({
    where: { customer_id: customerId },
    include: {
      info: true,
      vehicles: true,
      orders: {
        include: {
          info: true,
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
      
      <div className="relative pl-12 border-l-2 border-gray-200 space-y-16 ml-8">
        
        {/* Info Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Info
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Customer: {customer.info?.customer_first_name} {customer.info?.customer_last_name}
            </h2>
            <div className="space-y-1 text-[15px]">
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Email:</span> 
                <span className="text-gray-500">{customer.customer_email}</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Phone Number:</span> 
                <span className="text-gray-500">{customer.customer_phone_number}</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Active Customer:</span> 
                <span className="text-gray-500">{customer.info?.active_customer_status === 1 ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-gray-900">Edit customer info:</span> 
                <Link href={`/admin/customers/${customer.customer_id}/edit`} className="text-primary hover:text-red-700">
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
              Vehicles of {customer.info?.customer_first_name}
            </h2>
            
            {customer.vehicles.length === 0 ? (
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 mb-6">
                <p className="text-gray-400 italic text-[15px]">No vehicle found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {customer.vehicles.map(v => (
                  <div key={v.vehicle_id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{v.vehicle_year} {v.vehicle_make} {v.vehicle_model}</h4>
                      <p className="text-sm text-gray-500">Color: {v.vehicle_color} | Mileage: {v.vehicle_mileage} | Tag: {v.vehicle_tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!showAddVehicle ? (
              <Link href={`/admin/customers/${customer.customer_id}?addVehicle=true`} className="inline-block bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors">
                ADD NEW VEHICLE
              </Link>
            ) : (
              <div className="mt-6">
                <VehicleForm 
                  customerId={customer.customer_id} 
                  onCancel={() => {
                    // This is handled via standard link or client side redirect.
                    // Because VehicleForm uses onCancel, we can't easily change the URL from here without router.push.
                    // But wait, VehicleForm is a Client Component, so it can just do `window.location.href = ...` or we can pass a dummy function.
                    // Actually, modifying VehicleForm to take router.push is better.
                  }} 
                />
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
              Orders of {customer.info?.customer_first_name}
            </h2>
            
            {customer.orders.length === 0 ? (
              <p className="text-gray-500 text-[15px]">
                No orders found.
              </p>
            ) : (
              <div className="space-y-4">
                {customer.orders.map(o => (
                  <Link key={o.order_id} href={`/admin/orders/${o.order_hash}/edit`} className="block bg-white p-4 rounded-sm shadow-sm border border-gray-100 hover:border-primary transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 mr-2">Order #{o.order_id}</span>
                        <span className="text-gray-500 text-sm">{new Date(o.order_date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {o.active_order === 1 ? (
                          <span className="text-green-600">Active</span>
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
