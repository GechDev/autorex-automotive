import { getActiveJobs } from "@/app/actions/advisor";
import Link from "next/link";
import ActiveJobsList from "@/components/advisor/ActiveJobsList";

export const metadata = {
  title: "Active Job Cards | Service Advisor",
};

export default async function AdvisorJobsPage() {
  const jobs = await getActiveJobs();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-heading font-bold text-[32px] text-[#001659] relative inline-block">
            Active Job Cards
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
          </h1>
        </div>
        <Link 
          href="/advisor/check-in" 
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-sm font-bold text-[14px] uppercase tracking-wider transition-colors shadow-sm"
        >
          NEW CHECK-IN
        </Link>
      </div>

      <ActiveJobsList jobs={jobs} />
    </div>
  );
}
