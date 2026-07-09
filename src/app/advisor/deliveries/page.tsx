import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { CheckCircle, Key } from "lucide-react";
import { requireRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { DeliveryHandoverButton } from "@/components/advisor/DeliveryHandoverButton";
export const metadata = {
  title: "Delivery & Handover | Service Advisor",
};

export default async function AdvisorDeliveriesPage() {
  await requireRole(["ADMIN", "ADVISOR"]);

  const jobs = await prisma.order.findMany({
    where: {
      status: "PAID" // Cashier has marked it PAID, now ready for key handover
    },
    include: {
      customer: true,
      vehicle: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
            Delivery & Handover
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
          </h1>
          <p className="text-muted-foreground mt-4">Vehicles that have been paid for and are ready for customer pickup.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Key className="w-12 h-12 mx-auto mb-4 opacity-20 text-slate-400" />
            <p className="font-medium text-slate-700">No vehicles waiting for delivery.</p>
          </div>
        ) : (
          <div className="divide-y">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-700 flex-shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider">Paid</span>
                    <span className="text-lg font-black">#{job.id}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        {job.customer.firstName} {job.customer.lastName}
                      </div>
                      <div className="flex items-center gap-1">
                        Paid at: {format(new Date(job.updatedAt), "h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <DeliveryHandoverButton 
                    jobId={job.id} 
                    vehicleName={`${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`} 
                    customerName={`${job.customer.firstName} ${job.customer.lastName}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
