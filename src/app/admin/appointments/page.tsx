import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
      
      <div className="bg-white rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Contact</th>
              <th className="px-6 py-3 font-medium">Date & Time</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {appointments.map((apt) => (
              <tr key={apt.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{apt.customerName}</div>
                  <div className="text-gray-500">{apt.vehicleInfo}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div>{apt.email}</div>
                  <div>{apt.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div>{apt.preferredDate}</div>
                  <div>{apt.preferredTime}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {apt.service?.name || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : apt.status === "CONFIRMED" ? "bg-green-100 text-green-800" : apt.status === "COMPLETED" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary cursor-pointer hover:underline">View / Edit</span>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
