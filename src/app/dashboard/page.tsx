import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirector() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  switch (session.user.role) {
    case "ADMIN":
      redirect("/admin");
    case "ADVISOR":
      redirect("/advisor/jobs");
    case "TECHNICIAN":
      redirect("/technician/jobs");
    case "CASHIER":
      redirect("/cashier/queue");
    default:
      redirect("/login");
  }
}
