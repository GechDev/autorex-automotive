import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Car, Wrench, DollarSign, Clock, AlertCircle } from "lucide-react";
import EstimateApprovalForm from "./EstimateApprovalForm";

export const metadata = {
  title: "Vehicle Status | AutoRex",
};

export default async function TrackPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  const job = await prisma.order.findUnique({
    where: { orderHash: hash },
    include: {
      customer: true,
      vehicle: true,
      items: true,
    }
  });

  if (!job) notFound();

  const statuses = [
    { id: "CHECKED_IN", label: "Checked In", desc: "Vehicle dropped off" },
    { id: "INSPECTION", label: "Inspection", desc: "Technician diagnostics" },
    { id: "PENDING_APPROVAL", label: "Estimate Ready", desc: "Awaiting your review" },
    { id: "IN_REPAIR", label: "In Repair", desc: "Work in progress" },
    { id: "READY_FOR_PAYMENT", label: "Ready", desc: "Repairs complete" },
    { id: "PAID", label: "Paid", desc: "Payment processed" },
    { id: "COMPLETED", label: "Completed", desc: "Keys handed over" }
  ];

  const currentIndex = statuses.findIndex(s => s.id === job.status);

  const subtotal = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header Info */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001659] mb-1">
            Hi, {job.customer.firstName}!
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Here's the status of your {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}.
          </p>
        </div>
        <div className="bg-[#001659]/5 px-6 py-4 rounded-xl border border-[#001659]/10 text-center">
          <p className="text-xs font-bold text-[#001659] uppercase tracking-wider mb-1">Order #</p>
          <p className="text-2xl font-black text-[#001659]">{job.id}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-xl text-slate-800 mb-8">Service Timeline</h3>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 rounded-full hidden md:block" />
          <div 
            className="absolute top-5 left-8 h-1 bg-primary rounded-full hidden md:block transition-all duration-1000" 
            style={{ width: `${Math.max(0, (currentIndex / (statuses.length - 1)) * 100)}%` }} 
          />
          
          <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
            {statuses.map((status, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={status.id} className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 md:text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 bg-white transition-colors duration-300
                    ${isCompleted ? 'border-primary text-primary' : 
                      isCurrent ? 'border-primary text-primary shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 
                      'border-slate-200 text-slate-300'}
                  `}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-current" /> : 
                     isCurrent ? <Circle className="w-4 h-4 fill-current" /> : 
                     <Circle className="w-3 h-3" />}
                  </div>
                  <div className="md:mt-2">
                    <p className={`font-bold text-sm ${isCurrent ? 'text-primary' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                      {status.label}
                    </p>
                    <p className="text-xs text-slate-400 hidden md:block mt-1">{status.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Action Section based on Status */}
      {job.status === "PENDING_APPROVAL" ? (
        <EstimateApprovalForm job={job} subtotal={subtotal} tax={tax} grandTotal={grandTotal} />
      ) : job.status === "IN_REPAIR" ? (
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <Wrench className="w-12 h-12 text-primary mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Work in Progress!</h3>
          <p className="text-slate-600 max-w-lg">
            Our technicians are currently working on your vehicle based on the approved estimate. We will notify you once the repairs are complete and your vehicle is ready for pickup.
          </p>
        </div>
      ) : job.status === "READY_FOR_PAYMENT" ? (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <Car className="w-12 h-12 text-emerald-600 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready for Pickup!</h3>
          <p className="text-slate-600 max-w-lg mb-6">
            Your vehicle's repairs are complete! Please head to the Cashier desk at our shop to settle your invoice of <strong className="text-slate-900">${grandTotal.toFixed(2)}</strong> and retrieve your keys.
          </p>
        </div>
      ) : job.status === "INSPECTION" ? (
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Inspection Underway</h3>
          <p className="text-slate-600 max-w-lg">
            Our master technicians are currently running full diagnostics on your vehicle. Once complete, an estimate will appear here for your review.
          </p>
        </div>
      ) : null}

      {/* Invoice Breakdown (Visible if estimate is ready or later) */}
      {currentIndex >= 2 && job.status !== "PENDING_APPROVAL" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-slate-400" />
            Approved Estimate Details
          </h3>
          
          <table className="w-full text-left text-sm mb-6">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 font-semibold text-slate-600">Task / Part</th>
                <th className="pb-3 font-semibold text-slate-600 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {job.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <p className="font-medium text-slate-800">{item.itemName}</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{item.itemType}</p>
                  </td>
                  <td className="py-4 text-right font-medium text-slate-800">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-slate-200 pt-4 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-slate-800 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax</span>
              <span className="text-slate-800 font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mt-2 pt-2 border-t border-slate-100 font-bold">
              <span className="text-slate-800">Total</span>
              <span className="text-primary">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
