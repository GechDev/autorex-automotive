import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import { format } from "date-fns";
import PrintReceiptButton from "./PrintReceiptButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Receipt | AutoRex",
};

export default async function ReceiptPage({ params }: { params: Promise<{ jobId: string }> }) {
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

  const subtotal = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const payment = job.payments[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Hide this back link when printing */}
      <div className="print:hidden">
        <Link href="/cashier/history" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit">
          <ChevronLeft className="w-4 h-4" /> Back to History
        </Link>
      </div>

      <div className="bg-white border border-slate-200 p-10 shadow-sm print:shadow-none print:border-none print:p-0">
        
        {/* Receipt Header */}
        <div className="text-center border-b border-dashed border-slate-300 pb-8 mb-8">
          <h1 className="text-4xl font-black text-[#001659] mb-2 tracking-tighter">AutoRex<span className="text-primary">.</span></h1>
          <p className="text-slate-500 text-sm">123 Mechanic Blvd, Auto City, AC 90210</p>
          <p className="text-slate-500 text-sm">Phone: (555) 012-3456 | Web: www.autorex.com</p>
          <p className="text-slate-500 text-sm mt-4 font-medium uppercase tracking-widest">Official Receipt</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider mb-1 text-xs">Billed To</p>
            <p className="font-bold text-slate-900">{job.customer.firstName} {job.customer.lastName}</p>
            <p className="text-slate-600">{job.customer.phoneNumber}</p>
            <p className="text-slate-600">{job.customer.email}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 font-bold uppercase tracking-wider mb-1 text-xs">Invoice Details</p>
            <p className="text-slate-900"><span className="font-medium text-slate-500">Order #:</span> {job.id}</p>
            <p className="text-slate-900"><span className="font-medium text-slate-500">Date:</span> {format(job.updatedAt, "MMM d, yyyy h:mm a")}</p>
            <p className="text-slate-900"><span className="font-medium text-slate-500">Status:</span> <span className="font-bold text-emerald-600">{job.status}</span></p>
          </div>
        </div>

        <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100 print:bg-transparent print:border-slate-300 print:rounded-none">
          <p className="text-slate-400 font-bold uppercase tracking-wider mb-1 text-xs">Vehicle Information</p>
          <p className="font-bold text-slate-900 text-lg">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
          <p className="text-slate-600 font-mono text-sm mt-1">Plate: {job.vehicle.licensePlate} | VIN: {job.vehicle.vin || 'N/A'}</p>
        </div>

        {/* Line Items */}
        <table className="w-full text-left text-sm mb-8">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="pb-3 font-bold text-slate-800 uppercase text-xs tracking-wider">Description</th>
              <th className="pb-3 font-bold text-slate-800 uppercase text-xs tracking-wider text-center">Qty</th>
              <th className="pb-3 font-bold text-slate-800 uppercase text-xs tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 border-b-2 border-slate-200">
            {job.items.map((item) => (
              <tr key={item.id}>
                <td className="py-4">
                  <p className="font-bold text-slate-900">{item.itemName}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{item.itemType}</p>
                </td>
                <td className="py-4 text-center text-slate-600 font-medium">{item.quantity}</td>
                <td className="py-4 text-right font-bold text-slate-900">${(item.unitPrice * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Tax (8%)</span>
              <span className="text-slate-900 font-bold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl border-t-2 border-slate-900 pt-3 mt-3">
              <span className="font-black text-slate-900">Total</span>
              <span className="font-black text-[#001659]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {payment && (
          <div className="border-t border-dashed border-slate-300 pt-8 mt-8 flex justify-between items-end">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider mb-2 text-xs">Payment Record</p>
              <p className="text-sm text-slate-700"><span className="font-medium text-slate-500">Method:</span> {payment.paymentMethod.replace('_', ' ')}</p>
              {payment.referenceNumber && (
                <p className="text-sm text-slate-700 mt-1"><span className="font-medium text-slate-500">Ref:</span> {payment.referenceNumber}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Amount Paid</p>
              <p className="text-2xl font-black text-emerald-600">${payment.amount.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-12 text-slate-400 text-sm italic">
          Thank you for trusting AutoRex with your vehicle!
        </div>
      </div>

      <div className="print:hidden flex justify-end">
        <PrintReceiptButton />
      </div>
    </div>
  );
}
