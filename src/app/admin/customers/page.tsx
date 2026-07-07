import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CustomersTable } from "@/components/admin/CustomersTable";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { addedDate: "desc" },
  });

  // Map flat Customer model → shape CustomersTable expects
  const serialized = customers.map((c) => ({
    customer_id: c.id,
    customer_email: c.email,
    customer_phone_number: c.phoneNumber,
    customer_added_date: c.addedDate.toISOString(),
    info: {
      customer_first_name: c.firstName,
      customer_last_name: c.lastName,
      active_customer_status: 1, // all stored customers are considered active
    },
  }));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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

