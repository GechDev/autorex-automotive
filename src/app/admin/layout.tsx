import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { requireRole } from "@/lib/auth-utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireRole(["Admin", "Manager", "Employee"]);
  } catch (error) {
    // If not authenticated or wrong role, redirect to login
    redirect("/login");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-[#1b2032] text-white hidden md:block flex-shrink-0 h-full overflow-y-auto">
          <div className="py-6 px-6 border-b border-white/10">
            <h2 className="text-sm tracking-[0.2em] font-medium text-gray-400">ADMIN MENU</h2>
          </div>
          <nav className="flex flex-col">
            <Link href="/admin" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Orders
            </Link>
            <Link href="/admin/orders/new" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              New order
            </Link>
            <Link href="/admin/employees/new" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Add employee
            </Link>
            <Link href="/admin/employees" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Employees
            </Link>
            <Link href="/admin/customers/new" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Add customer
            </Link>
            <Link href="/admin/customers" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Customers
            </Link>
            <Link href="/admin/services" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Services
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
