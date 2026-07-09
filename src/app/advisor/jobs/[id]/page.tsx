import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Wrench, PenTool, Calculator } from "lucide-react";

export default async function JobCardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);
  
  if (isNaN(jobId)) return notFound();

  const order = await prisma.order.findUnique({
    where: { id: jobId },
    include: {
      customer: true,
      vehicle: true,
      advisor: true,
      technician: true,
      items: true,
    }
  });

  if (!order) return notFound();

  // Calculate total if any prices are set
  const totalAmount = order.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-6">
        <Link href="/advisor/jobs" className="text-sm text-primary flex items-center font-medium hover:underline w-fit">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Active Jobs
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#001659]">
            Job Card #{order.id}
          </h1>
          <p className="text-slate-500 mt-1">
            {order.vehicle.year} {order.vehicle.make} {order.vehicle.model} - {order.customer.firstName} {order.customer.lastName}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full
            ${order.status === 'CHECKED_IN' ? 'bg-amber-100 text-amber-700' :
              order.status === 'INSPECTION' ? 'bg-blue-100 text-blue-700' :
              order.status === 'PENDING_APPROVAL' ? 'bg-orange-100 text-orange-700' :
              order.status === 'IN_REPAIR' ? 'bg-purple-100 text-purple-700' :
              'bg-emerald-100 text-emerald-700'
            }`}
          >
            {order.status.replace(/_/g, ' ')}
          </span>
          {order.status === 'PENDING_APPROVAL' && (
            <Link 
              href={`/advisor/estimates/${order.id}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Build Estimate
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Details</h2>
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">{order.customer.firstName} {order.customer.lastName}</p>
            <p className="text-sm text-slate-500">{order.customer.phoneNumber}</p>
            <p className="text-sm text-slate-500">{order.customer.email}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vehicle Details</h2>
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">{order.vehicle.year} {order.vehicle.make} {order.vehicle.model}</p>
            <p className="text-sm text-slate-500">Plate: {order.vehicle.licensePlate}</p>
            <p className="text-sm text-slate-500">VIN: {order.vehicle.vin || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Intake Info</h2>
          <div className="space-y-1 text-sm">
            <p><span className="text-slate-500">Mileage:</span> <span className="font-medium text-slate-800">{order.checkInMileage || 'N/A'}</span></p>
            <p><span className="text-slate-500">Fuel Level:</span> <span className="font-medium text-slate-800">{order.fuelLevel || 'N/A'}</span></p>
            <p><span className="text-slate-500">Technician:</span> <span className="font-medium text-slate-800">{order.technician?.firstName} {order.technician?.lastName}</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-sm mb-8">
        <h2 className="text-sm font-bold text-slate-800 mb-3 border-b border-gray-100 pb-2">Customer Complaints</h2>
        <p className="text-slate-700 whitespace-pre-wrap text-[15px]">
          {order.complaints || 'No initial complaints recorded.'}
        </p>
      </div>
      
      {/* Items Section */}
      <div className="bg-white rounded-sm border border-gray-300 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-[#001659]">Service Items & Parts</h2>
          {totalAmount > 0 && (
            <span className="font-bold text-lg text-slate-800">
              Total: ${totalAmount.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="p-6">
          {order.items.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Wrench className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>No items have been added to this job card yet.</p>
              <p className="text-sm mt-1">The technician will add items during inspection.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-md gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {item.itemType === 'PART' ? <Wrench className="w-4 h-4 text-orange-500" /> : <PenTool className="w-4 h-4 text-blue-500" />}
                      <span className="font-bold text-slate-800">{item.itemName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {item.itemType}
                      </span>
                      {item.isApproved && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Approved
                        </span>
                      )}
                    </div>
                    {item.technicianNotes && (
                      <p className="text-sm text-slate-500 mt-1 flex items-start gap-1">
                        <span className="font-medium text-slate-400">Tech Note:</span> 
                        {item.technicianNotes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <span className="block text-xs text-slate-400 font-semibold uppercase">Qty</span>
                      <span className="font-medium text-slate-800">{item.quantity}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xs text-slate-400 font-semibold uppercase">Price</span>
                      <span className="font-medium text-slate-800">${item.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-right w-20">
                      <span className="block text-xs text-slate-400 font-semibold uppercase">Total</span>
                      <span className="font-bold text-slate-800">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
