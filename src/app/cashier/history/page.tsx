import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Receipt, CreditCard, Banknote, Landmark, ExternalLink } from "lucide-react";
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";

export const metadata = {
  title: "Transaction History | Cashier Desk",
};

export default async function CashierHistoryPage() {
  await requireRole(["ADMIN", "CASHIER"]);

  const payments = await prisma.payment.findMany({
    include: {
      order: {
        include: {
          customer: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Transaction History</h1>
          <p className="text-muted-foreground mt-1">Log of all processed payments and settlements.</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Receipt className="w-12 h-12 mx-auto mb-4 opacity-20 text-emerald-500" />
            <p className="font-medium text-slate-700">No transactions yet.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-600">Date</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Customer</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Order ID</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Method</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">Amount</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-slate-600">
                    {format(new Date(payment.createdAt), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-900">
                    {payment.order.customer.firstName} {payment.order.customer.lastName}
                  </td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">
                    #{payment.orderId}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {payment.paymentMethod === 'CARD_POS' ? <CreditCard className="w-4 h-4 text-slate-400" /> :
                       payment.paymentMethod === 'CASH' ? <Banknote className="w-4 h-4 text-slate-400" /> :
                       <Landmark className="w-4 h-4 text-slate-400" />}
                      <span className="text-slate-600">{payment.paymentMethod.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link 
                      href={`/cashier/receipt/${payment.orderId}`}
                      className="inline-flex items-center gap-1 text-primary hover:text-[#c90a07] font-semibold transition-colors"
                    >
                      <Receipt className="w-4 h-4" /> Receipt
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
