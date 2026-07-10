import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // We allow Customers to see this. Admins/Managers can too, but ideally they use /admin.
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-[#1b2032] text-white hidden md:block flex-shrink-0 h-full overflow-y-auto">
          <div className="py-6 px-6 border-b border-white/10">
            <h2 className="text-sm tracking-[0.2em] font-medium text-gray-400">CUSTOMER PORTAL</h2>
          </div>
          <nav className="flex flex-col">
            <Link href="/dashboard" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px]">
              Overview
            </Link>
            <Link href="/appointment" className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-[15px] text-primary font-bold">
              Book Appointment
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
