import React from "react";
import { prisma } from "@/lib/prisma";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";

export default async function AdminAppointmentsPage() {
  const appointmentsData = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Map to match the component's expected shape
  const appointments = appointmentsData.map(a => ({
    id: a.id,
    customerName: a.customerName,
    email: a.email,
    phone: a.phone,
    vehicleInfo: a.vehicleInfo,
    serviceId: null, // Service ID is not in current schema
    preferredDate: a.preferredDate,
    preferredTime: a.preferredTime,
    message: a.message,
    status: a.status,
    createdAt: a.createdAt,
    service: null,
  }));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Appointments
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>

      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
