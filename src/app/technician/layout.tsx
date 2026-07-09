import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { requireRole } from "@/lib/auth-utils";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Wrench } from "lucide-react";

export default async function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireRole(["ADMIN", "TECHNICIAN"]);
  } catch (error) {
    redirect("/login");
  }

  const techMenuItems = [
    { name: "Jobs", href: "/technician/jobs", icon: <Wrench className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar title="TECHNICIAN BAY" items={techMenuItems} />

        <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
