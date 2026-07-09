import CheckInForm from "./CheckInForm";
import { requireRole } from "@/lib/auth-utils";

export const metadata = {
  title: "Vehicle Intake | Service Advisor",
};

export default async function AdvisorCheckInPage() {
  await requireRole(["ADMIN", "ADVISOR"]);

  return (
    <div className="max-w-4xl pt-2 pb-8 pl-6">
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Vehicle Intake
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>

      <CheckInForm />
    </div>
  );
}
