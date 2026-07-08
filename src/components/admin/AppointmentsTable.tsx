"use client";

import React, { useState } from "react";
import { Check, X, Calendar, Clock, RefreshCw } from "lucide-react";
import { DataTable, ColumnDef, formatDate } from "@/components/ui/data-table";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/appointment";
import toast from "react-hot-toast";

type Appointment = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  vehicleInfo: string | null;
  serviceId: number | null;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: string;
  createdAt: Date;
  service?: {
    service_name: string;
  } | null;
};

function StatusBadge({ status }: { status: string }) {
  const styles = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-100 bg-yellow-500",
    APPROVED: "bg-blue-50 text-blue-700 border-blue-100 bg-blue-500",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100 bg-emerald-500",
    CANCELLED: "bg-red-50 text-red-700 border-red-100 bg-red-500",
  }[status] || "bg-gray-50 text-gray-700 border-gray-100 bg-gray-500";

  const [bg, text, border, dot] = styles.split(" ");

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${bg} ${text} text-[12px] font-semibold rounded-full border ${border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} />
      {status}
    </span>
  );
}

export function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const handleUpdateStatus = async (id: number, status: string) => {
    setIsUpdating(id);
    try {
      const res = await updateAppointmentStatus(id, status);
      if (res.success) {
        toast.success(`Appointment marked as ${status}`);
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(null);
    }
  };

  const columns: ColumnDef<Appointment>[] = [
    {
      key: "id",
      header: "ID",
      render: (a) => <span className="font-mono text-[13px] text-gray-500">#{a.id}</span>,
      className: "w-16",
    },
    {
      key: "customerName",
      header: "Customer",
      render: (a) => (
        <div>
          <div className="font-semibold text-gray-900 text-[14px]">{a.customerName}</div>
          <div className="text-[12px] text-gray-500">{a.email}</div>
          <div className="text-[12px] text-gray-500">{a.phone}</div>
        </div>
      ),
    },
    {
      key: "vehicleService",
      header: "Vehicle & Service",
      render: (a) => (
        <div>
          <div className="font-medium text-gray-800 text-[13px]">{a.vehicleInfo || "N/A"}</div>
          <div className="text-[12px] text-primary">{a.service?.service_name || "General Inquiry"}</div>
        </div>
      ),
    },
    {
      key: "preferredTime",
      header: "Requested Date",
      render: (a) => (
        <div>
          <div className="flex items-center gap-1 text-[13px] text-gray-800 font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {a.preferredDate}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {a.preferredTime}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (a) => (
        <div className="flex items-center gap-2">
          {a.status === "PENDING" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "APPROVED")}
              disabled={isUpdating === a.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              Approve
            </button>
          )}
          {a.status === "APPROVED" && (
            <button
              onClick={() => handleUpdateStatus(a.id, "COMPLETED")}
              disabled={isUpdating === a.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              Complete
            </button>
          )}
          {(a.status === "PENDING" || a.status === "APPROVED") && (
            <button
              onClick={() => handleUpdateStatus(a.id, "CANCELLED")}
              disabled={isUpdating === a.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={appointments}
      columns={columns}
      rowKey={(a) => a.id}
      searchFields={(a) =>
        [a.customerName, a.email, a.phone, a.vehicleInfo]
          .filter(Boolean)
          .join(" ")
      }
      searchPlaceholder="Search by name, email, phone, or vehicle..."
      emptyMessage="No appointments found."
    />
  );
}
