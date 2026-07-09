import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { DollarSign, Clock, Car, Search, ChevronRight } from "lucide-react";
import NotifyCustomerButton from "@/components/ui/NotifyCustomerButton";

export const metadata = {
  title: "Payment Queue | Cashier",
};

export default async function CashierQueuePage() {
  await requireRole(["ADMIN", "CASHIER"]);

  // Fetch orders that are ready for payment or already paid but not yet completed
  const jobs = await prisma.order.findMany({
    where: {
      status: {
        in: ["READY_FOR_PAYMENT", "PAID"]
      }
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
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout & Payments</h1>
        <p className="text-muted-foreground mt-1">Process customer payments and vehicle handovers.</p>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="relative flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center overflow-hidden transition-all focus-within:border-slate-300 focus-within:shadow-md w-full max-w-sm">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by customer name, plate, or order ID..." 
              className="border-0 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-sm h-12 w-full bg-transparent px-4 placeholder:text-slate-400"
            />
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <DollarSign className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="font-medium text-lg text-slate-600">The payment queue is clear.</p>
            <p className="text-sm">No vehicles are currently ready for checkout.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {jobs.map((job) => {
              const totalAmount = job.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0) * 1.08; // 8% tax
              
              return (
                <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${job.status === 'PAID' ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
                      <Car className={`w-6 h-6 ${job.status === 'PAID' ? 'text-emerald-600' : 'text-orange-500'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">
                          {job.customer.firstName} {job.customer.lastName}
                        </h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          job.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {job.status === 'PAID' ? 'PAID - READY FOR HANDOVER' : 'AWAITING PAYMENT'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium mb-1">
                        {job.vehicle.year} {job.vehicle.make} {job.vehicle.model} &bull; <span className="text-slate-800">{job.vehicle.licensePlate}</span>
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Job Completed: {new Date(job.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Due</p>
                      <p className={`text-2xl font-black ${job.status === 'PAID' ? 'text-emerald-600 line-through opacity-70' : 'text-slate-900'}`}>
                        ${totalAmount.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {job.status !== 'PAID' && (
                        <NotifyCustomerButton 
                          email={job.customer.email || ""} 
                          subject="Your vehicle is ready for pickup"
                          message={`Hi ${job.customer.firstName},\n\nYour ${job.vehicle.year} ${job.vehicle.make} is ready for pickup!\n\nTotal due: $${totalAmount.toFixed(2)}.`}
                        />
                      )}
                      <Link 
                        href={`/cashier/settle/${job.id}`}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all shadow-sm
                          ${job.status === 'PAID' 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20' 
                            : 'bg-primary hover:bg-[#c90a07] text-white shadow-red-600/20'
                          }`}
                      >
                        {job.status === 'PAID' ? 'Process Handover' : 'Collect Payment'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
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
