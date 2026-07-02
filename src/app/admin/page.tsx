import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react"; // Using lucide for icons similar to the design

const dashboardCards = [
  {
    category: "OPEN FOR ALL",
    title: "All Orders",
    linkText: "LIST OF ORDERS +",
    linkHref: "/admin/orders",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "OPEN FOR LEADS",
    title: "New Orders",
    linkText: "ADD ORDER +",
    linkHref: "/admin/orders/new",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "OPEN FOR ADMINS",
    title: "Employees",
    linkText: "LIST OF EMPLOYEES +",
    linkHref: "/admin/employees",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "OPEN FOR ADMINS",
    title: "Add Employee",
    linkText: "READ MORE +",
    linkHref: "/admin/employees/new",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "SERVICE AND REPAIRS",
    title: "Engine Service & Repair",
    linkText: "READ MORE +",
    linkHref: "/admin/services",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "SERVICE AND REPAIRS",
    title: "Tyre & Wheels",
    linkText: "READ MORE +",
    linkHref: "/admin/services",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  },
  {
    category: "SERVICE AND REPAIRS",
    title: "Denting & Painting",
    linkText: "READ MORE +",
    linkHref: "/admin/services",
    icon: <Wrench className="w-12 h-12 text-gray-300 group-hover:text-primary transition-colors" />
  }
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Admin Dashboard
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl mt-6">
          Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white p-8 rounded-md shadow-sm border-b-2 border-primary group hover:shadow-md transition-shadow relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[url('/images/background/pattern-1.png')] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">{card.category}</div>
              <h3 className="font-heading font-bold text-[22px] text-[#001659] mb-12">{card.title}</h3>
              
              <div className="flex items-end justify-between">
                <Link href={card.linkHref} className="text-primary font-bold text-[13px] tracking-wider uppercase hover:text-[#001659] transition-colors">
                  {card.linkText}
                </Link>
                {card.icon}
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  );
}
