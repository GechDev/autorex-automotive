import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CashierPaymentForm from "./CashierPaymentForm";

export const metadata = {
  title: "Process Payment | Cashier Desk",
};

export default async function CashierPaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(["ADMIN", "CASHIER"]);

  const resolvedParams = await params;
  const orderId = parseInt(resolvedParams.id, 10);
  if (isNaN(orderId)) notFound();

  const job = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      vehicle: true,
      items: true,
    }
  });

  if (!job) notFound();

  if (job.status === "PAID") {
    redirect("/cashier/history");
  } else if (job.status !== "READY_FOR_PAYMENT") {
    redirect("/cashier/payments");
  }

  const totalAmount = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = totalAmount * 0.08; // Example 8% tax
  const grandTotal = totalAmount + tax;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/cashier/payments" className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors w-fit">
        <ChevronLeft className="w-4 h-4" /> Back to Pending
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
            Final Invoice & Settlement
          </h1>
          <p className="text-muted-foreground mt-1">Order #{job.id} - {job.customer.firstName} {job.customer.lastName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Invoice Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">AutoRex Repair Garage</h3>
                <p className="text-sm text-slate-500">123 Mechanic Blvd, Auto City, AC 12345</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Invoice #{job.id}</p>
                <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Billed To</h4>
                  <p className="font-semibold text-slate-800">{job.customer.firstName} {job.customer.lastName}</p>
                  <p className="text-sm text-slate-500">{job.customer.phoneNumber}</p>
                  <p className="text-sm text-slate-500">{job.customer.email}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Vehicle</h4>
                  <p className="font-semibold text-slate-800">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
                  <p className="text-sm text-slate-500">VIN: {job.vehicle.vin || 'N/A'}</p>
                  <p className="text-sm text-slate-500">License: {job.vehicle.licensePlate}</p>
                </div>
              </div>

              <table className="w-full text-left text-sm mb-8">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 font-semibold text-slate-600">Description</th>
                    <th className="pb-3 font-semibold text-slate-600 text-center">Qty</th>
                    <th className="pb-3 font-semibold text-slate-600 text-right">Unit Price</th>
                    <th className="pb-3 font-semibold text-slate-600 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {job.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <p className="font-medium text-slate-800">{item.itemName}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.itemType}</p>
                      </td>
                      <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-4 text-right text-slate-600">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-4 text-right font-medium text-slate-800">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t border-slate-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-800 font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Tax (8%)</span>
                  <span className="text-slate-800 font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg mt-4 pt-4 border-t border-slate-100">
                  <span className="font-bold text-slate-800">Total Due</span>
                  <span className="font-black text-emerald-700">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Processing Panel */}
        <div className="lg:col-span-1">
          <CashierPaymentForm orderId={job.id} totalAmount={grandTotal} />
        </div>

      </div>
    </div>
  );
}
