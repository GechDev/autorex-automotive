import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import EstimateBuilderForm from "./EstimateBuilderForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Build Estimate | Service Advisor",
};

export default async function EstimateBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(["ADMIN", "ADVISOR"]);

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
  
  if (job.status !== "PENDING_APPROVAL") {
    // If it's no longer pending approval, just redirect to the general job view
    redirect(`/advisor/jobs/${job.id}`);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link href="/advisor/estimates" className="flex items-center gap-2 text-[13px] font-bold text-gray-400 hover:text-[#001659] transition-colors w-fit uppercase tracking-wider">
        <ChevronLeft className="w-4 h-4" /> Back to Estimates Queue
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-300 pb-6">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-[#001659]">Build Estimate</h1>
          <p className="text-[15px] text-gray-500 mt-1 italic">Review items for Job #{job.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Vehicle</h4>
          <p className="font-semibold text-gray-900 text-[15px]">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</p>
          <p className="text-[13px] text-gray-500 mt-1">VIN: {job.vehicle.vin || 'N/A'}</p>
        </div>
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Customer</h4>
          <p className="font-semibold text-gray-900 text-[15px]">{job.customer.firstName} {job.customer.lastName}</p>
          <p className="text-[13px] text-gray-500 mt-1">{job.customer.phoneNumber}</p>
        </div>
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Initial Complaint</h4>
          <p className="text-[14px] text-gray-700 italic">"{job.complaints || 'No specific complaints'}"</p>
        </div>
      </div>
      
      <div className="pt-4">
        <EstimateBuilderForm 
          orderId={job.id} 
          initialItems={job.items} 
          customerEmail={job.customer.email || ""} 
          orderHash={job.orderHash}
        />
      </div>
    </div>
  );
}
