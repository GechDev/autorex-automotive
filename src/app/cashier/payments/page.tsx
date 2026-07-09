import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronRight, DollarSign, Clock, CheckCircle } from "lucide-react";
import { requireRole } from "@/lib/auth-utils";

export const metadata = {
  title: "Pending Payments | Cashier Desk",
};

export default async function CashierPaymentsPage() {
  await requireRole(["ADMIN", "CASHIER"]);

  const jobs = await prisma.order.findMany({
    where: {
      status: "READY_FOR_PAYMENT"
    },
    include: {
      customer: true,
      vehicle: true,
      items: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Pending Payments</h1>
          <p className="text-muted-foreground mt-1">Vehicles that have completed repair and are ready for settlement.</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-20 text-emerald-500" />
            <p className="font-medium text-slate-700">All caught up!</p>
            <p className="text-sm mt-1">No customers are currently waiting to pay.</p>
          </div>
        ) : (
          <div className="divide-y">
            {jobs.map((job) => {
              const totalAmount = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

              return (
                <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-700 flex-shrink-0">
                      <span className="text-xs font-bold uppercase tracking-wider">Due</span>
                      <span className="text-lg font-black">#{job.id}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {job.customer.firstName} {job.customer.lastName}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Work Finished: {format(new Date(job.updatedAt), "h:mm a")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Due</p>
                      <p className="text-xl font-black text-emerald-700">${totalAmount.toFixed(2)}</p>
                    </div>

                    <Link 
                      href={`/cashier/payments/${job.id}`} 
                      className="bg-emerald-700 text-white hover:bg-emerald-800 px-5 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Take Payment
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
