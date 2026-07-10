"use client";

import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { FileText, ChevronRight, Clock, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

// Simplified type for the jobs prop to avoid complex Prisma imports in client component
type Job = any; 

export default function ActiveJobsList({ jobs }: { jobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredJobs = jobs.filter((job) => {
    // Status filter
    if (statusFilter !== "ALL" && job.status !== statusFilter) {
      return false;
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const customerName = `${job.customer.firstName} ${job.customer.lastName}`.toLowerCase();
      const vehicleInfo = `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`.toLowerCase();
      const plate = job.vehicle.licensePlate.toLowerCase();
      const jobIdStr = job.id.toString();
      
      return (
        customerName.includes(term) ||
        vehicleInfo.includes(term) ||
        plate.includes(term) ||
        jobIdStr.includes(term)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center overflow-hidden transition-all focus-within:border-slate-300 focus-within:shadow-md">
          <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
          <Input 
            type="text" 
            placeholder="Search by customer, vehicle, or job ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-base h-12 w-full bg-transparent px-4"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 px-5 rounded-xl border border-slate-200 shadow-sm bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:ring-0 focus:border-slate-300 cursor-pointer transition-all hover:shadow-md min-w-[200px]"
        >
          <option value="ALL">All Active Statuses</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="INSPECTION">Inspection</option>
          <option value="PENDING_APPROVAL">Pending Approval</option>
          <option value="IN_REPAIR">In Repair</option>
          <option value="READY_FOR_PAYMENT">Ready For Payment</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        {filteredJobs.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No active jobs match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Order</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Vehicle</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Technician</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Checked In</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="py-5 px-6 font-semibold text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-5 px-6 align-middle">
                      <span className="font-bold text-[#001659]">#{job.id}</span>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="font-bold text-slate-900">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{job.vehicle.licensePlate}</div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="font-medium text-slate-700 whitespace-nowrap">
                        {job.customer.firstName} {job.customer.lastName}
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/50 px-2.5 py-1 rounded-md font-medium text-xs w-fit whitespace-nowrap">
                        <User className="w-3.5 h-3.5" />
                        {job.technician ? `${job.technician.firstName} ${job.technician.lastName}` : 'Unassigned'}
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(job.createdAt), "MMM d, h:mm a")}
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <span className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap inline-flex items-center
                        ${job.status === 'CHECKED_IN' ? 'bg-amber-100 text-amber-700' :
                          job.status === 'INSPECTION' ? 'bg-blue-100 text-blue-700' :
                          job.status === 'PENDING_APPROVAL' ? 'bg-orange-100 text-orange-700' :
                          job.status === 'IN_REPAIR' ? 'bg-purple-100 text-purple-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {job.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-5 px-6 align-middle text-right">
                      <Link 
                        href={`/advisor/jobs/${job.id}`} 
                        className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#001659] hover:text-white hover:border-[#001659] px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm whitespace-nowrap"
                      >
                        View
                        <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
