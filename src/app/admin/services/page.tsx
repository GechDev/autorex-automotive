import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function AdminServicesPage() {
  const servicesList = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Services we provide
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        <p className="text-gray-500 text-[15px] leading-relaxed mt-6">
          Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.
        </p>
      </div>
      
      <div className="flex flex-col gap-4 mb-12">
        {servicesList.map((service) => (
          <div key={service.id} className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 bg-white border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 pr-12">
              <h4 className="font-heading font-bold text-[18px] text-[#001659] mb-2">{service.name}</h4>
              <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
              <button className="text-primary hover:text-red-700 transition-colors">
                <Edit className="w-5 h-5" />
              </button>
              <button className="text-gray-900 hover:text-red-600 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {servicesList.length === 0 && (
          <div className="p-8 bg-white border border-gray-100 rounded-sm text-center text-gray-500">
            No services found. Add one below.
          </div>
        )}
      </div>

      <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-100">
        <h3 className="font-heading font-bold text-[22px] text-[#001659] mb-8 relative inline-block">
          Add a new service
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></div>
        </h3>
        
        <form className="space-y-6 max-w-3xl">
          <div>
            <Input 
              type="text" 
              placeholder="Service name" 
              className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
            />
          </div>
          
          <div>
            <textarea 
              placeholder="Service description" 
              className="w-full h-[150px] p-4 text-[15px] border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-gray-400 italic bg-white resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
            >
              ADD SERVICE
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}
