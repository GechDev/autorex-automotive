import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CustomersTable } from "@/components/admin/CustomersTable";

export default async function AdminCustomersPage() {
  const customers = await prisma.customerIdentifier.findMany({
    include: { info: true },
    orderBy: { customer_added_date: "desc" },
  });

  // Serialize dates so they can be passed to the client component
  const serialized = customers.map((c) => ({
    ...c,
    customer_added_date: c.customer_added_date.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Customers
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <Link
          href="/admin/customers/new"
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors"
        >
          NEW CUSTOMER
        </Link>
      </div>

      <CustomersTable customers={serialized} />
    </div>
  );
}

