import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { Wrench, ChevronRight, AlertCircle, Clock } from "lucide-react";
import { requireRole } from "@/lib/auth-utils";

export const metadata = {
  title: "My Assigned Work | Technician Bay",
};

export default async function TechnicianJobsPage() {
  const session = await requireRole(["ADMIN", "TECHNICIAN"]);

  // Fetch jobs assigned specifically to this technician
  const jobs = await prisma.order.findMany({
    where: {
      status: {
        in: ["INSPECTION", "IN_REPAIR"]
      },
      technicianId: parseInt(session.id as string)
    },
    include: {
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Assigned Work</h1>
          <p className="text-muted-foreground mt-1">Vehicles queued for inspection and active repair.</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Wrench className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium text-slate-700">Your bay is clear!</p>
            <p className="text-sm mt-1">No vehicles are currently assigned to you.</p>
          </div>
        ) : (
          <div className="divide-y">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="flex gap-6 items-center">
                  <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                    job.status === 'INSPECTION' 
                      ? 'bg-blue-50 border border-blue-100 text-blue-700' 
                      : 'bg-purple-50 border border-purple-100 text-purple-700'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {job.status === 'INSPECTION' ? 'Insp' : 'Rpr'}
                    </span>
                    <span className="text-lg font-black">#{job.id}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-500">
                      {job.complaints && (
                        <div className="flex items-center gap-1 text-orange-600 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {job.complaints.length > 30 ? job.complaints.substring(0, 30) + '...' : job.complaints}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Assigned: {format(new Date(job.updatedAt), "h:mm a")}
                      </div>
                      <div className="flex items-center gap-1">
                        {job.items.length} tasks recorded
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full 
                      ${job.status === 'INSPECTION' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}
                  >
                    {job.status.replace(/_/g, ' ')}
                  </span>
                  <Link 
                    href={`/technician/jobs/${job.id}`} 
                    className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                  >
                    {job.status === 'INSPECTION' ? 'Start Inspection' : 'Continue Repair'}
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
