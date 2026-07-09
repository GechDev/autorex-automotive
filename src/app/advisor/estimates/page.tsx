import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { FileText, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { requireRole } from "@/lib/auth-utils";

export const metadata = {
  title: "Estimate Review | Service Advisor",
};

export default async function AdvisorEstimatesPage() {
  await requireRole(["ADMIN", "ADVISOR"]);

  const jobs = await prisma.order.findMany({
    where: {
      status: "PENDING_APPROVAL" // Waiting for advisor to price & dispatch
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
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
            Estimate Review
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
          </h1>
          <p className="text-muted-foreground mt-4">Review technician inspections, apply pricing, and dispatch to customers.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-20 text-emerald-500" />
            <p className="font-medium text-slate-700">All caught up!</p>
            <p className="text-sm mt-1">No estimates are currently awaiting your review.</p>
          </div>
        ) : (
          <div className="divide-y">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-lg bg-orange-50 border border-orange-100 flex flex-col items-center justify-center text-orange-700 flex-shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider">Est</span>
                    <span className="text-lg font-black">#{job.id}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-slate-700">{job.customer.firstName} {job.customer.lastName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Awaiting Price: {format(new Date(job.updatedAt), "h:mm a")}
                      </div>
                      <div className="flex items-center gap-1 font-medium text-orange-600">
                        {job.items.length} Line Items
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link 
                    href={`/advisor/estimates/${job.id}`} 
                    className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                  >
                    Build Estimate
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
