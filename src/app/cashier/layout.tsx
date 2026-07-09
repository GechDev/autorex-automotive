import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { requireRole } from "@/lib/auth-utils";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Wallet, History } from "lucide-react";

export default async function CashierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireRole(["ADMIN", "CASHIER"]);
  } catch (error) {
    redirect("/login");
  }

  const cashierMenuItems = [
    { name: "Queue", href: "/cashier/queue", icon: <Wallet className="w-5 h-5" /> },
    { name: "History", href: "/cashier/history", icon: <History className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-foreground">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar title="CASHIER DESK" items={cashierMenuItems} />

        <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
