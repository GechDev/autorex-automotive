import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { ChevronLeft, DollarSign, Car, CreditCard, Banknote, Smartphone } from "lucide-react";
import CashierSettleForm from "./CashierSettleForm";

export const metadata = {
  title: "Settle Payment | Cashier",
};

export default async function CashierSettlePage({ params }: { params: Promise<{ jobId: string }> }) {
  await requireRole(["ADMIN", "CASHIER"]);

  const resolvedParams = await params;
  const orderId = parseInt(resolvedParams.jobId, 10);
  if (isNaN(orderId)) notFound();

  const job = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      vehicle: true,
      items: true,
      payments: true,
    }
  });

  if (!job) notFound();

  // Calculate totals
  const subtotal = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/cashier/queue" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit">
        <ChevronLeft className="w-4 h-4" /> Back to Queue
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {job.status === 'PAID' ? 'Vehicle Handover' : 'Settle Invoice'}
        </h1>
        <p className="text-muted-foreground mt-1">Order #{job.id} - {job.customer.firstName} {job.customer.lastName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Col: Invoice Details */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <Car className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vehicle</p>
              <p className="font-bold text-slate-900">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
              <p className="text-sm text-slate-500">{job.vehicle.licensePlate} &bull; {job.vehicle.vin || 'No VIN'}</p>
            </div>
          </div>
          
          <div className="p-6">
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

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-800 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax (8%)</span>
                <span className="text-slate-800 font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl mt-4 pt-4 border-t border-slate-200 font-bold">
                <span className="text-slate-900">Total Due</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Payment / Handover Action */}
        <div>
          <CashierSettleForm orderId={job.id} status={job.status} grandTotal={grandTotal} />
        </div>
      </div>
    </div>
  );
}
