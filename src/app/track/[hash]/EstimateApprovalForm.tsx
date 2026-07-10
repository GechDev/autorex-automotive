"use client";

import { useState } from "react";
import { approveEstimate } from "@/app/actions/customer";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function EstimateApprovalForm({
  job,
  subtotal,
  tax,
  grandTotal
}: {
  job: any;
  subtotal: number;
  tax: number;
  grandTotal: number;
}) {
  const [isApproving, setIsApproving] = useState(false);

  async function handleApprove() {
    setIsApproving(true);
    try {
      await approveEstimate(job.orderHash);
      // Next.js revalidatePath will refresh the page to show the new status
    } catch (err) {
      alert("Something went wrong while approving. Please call the shop.");
      setIsApproving(false);
    }
  }

  function handleReject() {
    alert("Please call the shop to discuss your estimate or arrange pickup.");
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-primary" />
        <h3 className="font-bold text-2xl text-slate-800">Action Required: Estimate Approval</h3>
      </div>
      
      <p className="text-slate-600 mb-8 max-w-2xl">
        Our technicians have completed the inspection of your {job.vehicle.year} {job.vehicle.make}. 
        Below is the itemized breakdown of recommended repairs. Please review and authorize the work to begin.
      </p>

      <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
        <table className="w-full text-left text-sm mb-6">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 font-semibold text-slate-600">Task / Part</th>
              <th className="pb-3 font-semibold text-slate-600 text-center">Qty</th>
              <th className="pb-3 font-semibold text-slate-600 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {job.items.map((item: any) => (
              <tr key={item.id}>
                <td className="py-4">
                  <p className="font-medium text-slate-800">{item.itemName}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{item.itemType}</p>
                </td>
                <td className="py-4 text-center text-slate-600">{item.quantity}</td>
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
          <div className="flex justify-between text-xl mt-4 pt-4 border-t border-slate-200 font-bold">
            <span className="text-slate-800">Total Estimate</span>
            <span className="text-primary">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <button 
          onClick={handleReject}
          disabled={isApproving}
          className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          Decline / Call Shop
        </button>
        <button 
          onClick={handleApprove}
          disabled={isApproving}
          className="px-8 py-3 rounded-xl bg-primary text-white font-black hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
        >
          {isApproving ? "Processing..." : (
            <>
              <CheckCircle className="w-5 h-5" />
              Authorize Work
            </>
          )}
        </button>
      </div>
    </div>
  );
}
