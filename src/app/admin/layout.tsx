import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { requireRole } from "@/lib/auth-utils";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Wrench, 
  UserCircle 
} from "lucide-react";

import { AppSidebar } from "@/components/layout/AppSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireRole(["ADMIN"]);
  } catch (error) {
    // If not authenticated or wrong role, redirect to login
    redirect("/login");
  }

  const adminMenuItems = [
    { name: "Dashboard", href: "/admin", exact: true, icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Appointments", href: "/admin/appointments", icon: <CalendarCheck className="w-5 h-5" /> },
    { name: "Customers", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
    { name: "Services", href: "/admin/services", icon: <Wrench className="w-5 h-5" /> },
    { name: "Staff Management", href: "/admin/staff", icon: <UserCircle className="w-5 h-5" /> },
    { name: "Reports", href: "/admin/reports", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Wrench className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar title="ADMIN MENU" items={adminMenuItems} />

        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
