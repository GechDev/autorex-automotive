import { prisma } from "@/lib/prisma";

export default async function AdminEmployeesPage() {
  const employees = await prisma.user.findMany({
    where: { role: { in: ["EMPLOYEE", "MANAGER", "ADMIN"] } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
      
      <div className="bg-white rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {employees.map((e) => (
              <tr key={e.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{e.name || "N/A"}</td>
                <td className="px-6 py-4 text-gray-500">{e.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${e.role === "ADMIN" ? "bg-purple-100 text-purple-800" : e.role === "MANAGER" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                    {e.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary cursor-pointer hover:underline">Edit</span>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
