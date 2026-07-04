import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-foreground">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <ShieldAlert className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-[#001659] mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          You do not have permission to view this page. If you believe this is a mistake, please contact your administrator.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-primary text-white rounded-md font-bold hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
