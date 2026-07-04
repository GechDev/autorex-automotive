import React from "react";
import { Search, Edit } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCustomersPage() {
  const customers = await prisma.customerIdentifier.findMany({
    include: {
      info: true
    },
    orderBy: { customer_added_date: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Customers
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for a customer using first name, last name, email address of phone number" 
            className="w-full h-12 pl-4 pr-12 text-sm border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#fafafa] text-gray-900 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-[14px]">ID</th>
              <th className="px-6 py-4 font-bold text-[14px]">First Name</th>
              <th className="px-6 py-4 font-bold text-[14px]">Last Name</th>
              <th className="px-6 py-4 font-bold text-[14px]">Email</th>
              <th className="px-6 py-4 font-bold text-[14px]">Phone</th>
              <th className="px-6 py-4 font-bold text-[14px]">Added Date</th>
              <th className="px-6 py-4 font-bold text-[14px]">Active</th>
              <th className="px-6 py-4 font-bold text-[14px]">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((c, i) => (
              <tr key={c.customer_id} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}`}>
                <td className="px-6 py-4 font-bold text-gray-900">{c.customer_id}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{c.info?.customer_first_name || ""}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{c.info?.customer_last_name || ""}</td>
                <td className="px-6 py-4 text-gray-600">{c.customer_email}</td>
                <td className="px-6 py-4 text-gray-600">{c.customer_phone_number}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(c.customer_added_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ' - ')} | {new Date(c.customer_added_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </td>
                <td className="px-6 py-4 text-gray-600">{c.info?.active_customer_status === 1 ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/customers/${c.customer_id}/edit`} className="text-gray-900 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <Link href={`/admin/customers/${c.customer_id}`} className="text-gray-900 hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="py-6 flex justify-center border-t border-gray-100 bg-[#f8f9fa]">
          <div className="flex bg-white border border-gray-200 rounded-sm">
            <button className="px-6 py-2 text-sm text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-200 flex items-center gap-2">
              <span className="text-gray-300">«</span> First
            </button>
            <button className="px-6 py-2 text-sm text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-200 flex items-center gap-2">
              <span className="text-gray-300">‹</span> Previous
            </button>
            <button className="px-6 py-2 text-sm text-white bg-[#001659] hover:bg-[#001659]/90 transition-colors border-r border-gray-200 flex items-center gap-2">
              <span className="text-white/70">›</span> Next
            </button>
            <button className="px-6 py-2 text-sm text-white bg-[#001659] hover:bg-[#001659]/90 transition-colors flex items-center gap-2">
              <span className="text-white/70">»</span> Last
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
