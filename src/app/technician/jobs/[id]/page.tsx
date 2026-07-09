import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { ChevronLeft, AlertCircle } from "lucide-react";
import TechnicianWorkspace from "./TechnicianWorkspace";

export const metadata = {
  title: "Service Workspace | Technician Bay",
};

export default async function TechnicianJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(["ADMIN", "TECHNICIAN"]);

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

  return (
    <div className="max-w-5xl py-8">
      <Link href="/technician/jobs" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit mb-6 uppercase tracking-wider font-bold">
        <ChevronLeft className="w-4 h-4" /> Back to My Work
      </Link>
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
            {job.status === 'INSPECTION' ? 'Multi-Point Inspection' : 'Active Repair Workspace'}
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">Order #{job.id} - {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
        </div>
        <div className={`px-6 py-2 rounded-sm text-[14px] font-bold tracking-wider uppercase border
          ${job.status === 'INSPECTION' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
            job.status === 'IN_REPAIR' ? 'bg-purple-50 text-purple-700 border-purple-200' :
            'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {job.status.replace(/_/g, ' ')}
        </div>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-[#001659]">Vehicle Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Vehicle</label>
                <p className="font-semibold text-slate-900 text-lg">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">VIN</label>
                  <p className="text-slate-800 font-medium">{job.vehicle.vin || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Plate</label>
                  <p className="text-slate-800 font-medium">{job.vehicle.licensePlate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Mileage</label>
                  <p className="text-slate-800 font-medium">{job.checkInMileage} mi</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Fuel Level</label>
                  <p className="text-slate-800 font-medium">{job.fuelLevel}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-[#001659]">Customer Complaint</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200 h-[calc(100%-3.5rem)]">
              <p className="text-base text-gray-800 font-medium italic">
                "{job.complaints || 'No specific complaints noted by advisor.'}"
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>
        
        <div>
          <TechnicianWorkspace orderId={job.id} initialItems={job.items} status={job.status} />
        </div>
      </div>
    </div>
  );
}
