import React from "react";
import { prisma } from "@/lib/prisma";
import { ServicesTable } from "@/components/admin/ServicesTable";
import { NewServiceModal } from "@/components/admin/NewServiceModal";

export default async function AdminServicesPage() {
  const servicesList = await prisma.commonService.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Services
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <NewServiceModal />
      </div>

      <ServicesTable services={servicesList} />
    </div>
  );
}
