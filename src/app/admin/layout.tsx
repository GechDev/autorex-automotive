import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Wrench, 
  UserCircle 
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !["ADMIN", "MANAGER"].includes(session.user?.role as string)) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/admin" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/appointments" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <CalendarCheck className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Appointments</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/customers" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <Users className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/services" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <Wrench className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Services</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/employees" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <UserCircle className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Employees</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
