import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-utils";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ClipboardList, CarFront, FileText, CheckCircle } from "lucide-react";

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Both ADMIN and ADVISOR can access the advisor module
    await requireRole(["ADMIN", "ADVISOR"]);
  } catch (error) {
    redirect("/login");
  }

  const advisorMenuItems = [
    { name: "Check In", href: "/advisor/check-in", icon: <CarFront className="w-5 h-5" /> },
    { name: "Jobs", href: "/advisor/jobs", icon: <ClipboardList className="w-5 h-5" /> },
    { name: "Estimates", href: "/advisor/estimates", icon: <FileText className="w-5 h-5" /> },
    { name: "Deliveries", href: "/advisor/deliveries", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar title="ADVISOR MENU" items={advisorMenuItems} />

        <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
