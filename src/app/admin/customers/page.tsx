import { prisma } from "@/lib/prisma";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
      
      <div className="bg-white rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Phone</th>
              <th className="px-6 py-3 font-medium">Address</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {customers.map((c) => (
              <tr key={c.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{c.firstName} {c.lastName}</td>
                <td className="px-6 py-4 text-gray-500">{c.email}</td>
                <td className="px-6 py-4 text-gray-500">{c.phone}</td>
                <td className="px-6 py-4 text-gray-500">{c.address || "N/A"}</td>
                <td className="px-6 py-4">
                  <span className="text-primary cursor-pointer hover:underline">View</span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
