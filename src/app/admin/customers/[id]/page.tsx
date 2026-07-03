import React from "react";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function CustomerProfilePage() {
  return (
    <div className="max-w-4xl py-8">
      
      <div className="relative pl-12 border-l-2 border-gray-200 space-y-16 ml-8">
        
        {/* Info Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Info
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Customer: Adugna Bekele
            </h2>
            <div className="space-y-1 text-[15px]">
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Email:</span> 
                <span className="text-gray-500">test@evangadi.com</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Phone Number:</span> 
                <span className="text-gray-500">2023862702</span>
              </div>
              <div className="flex">
                <span className="font-bold w-[130px] text-gray-900">Active Customer:</span> 
                <span className="text-gray-500">Yes</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-gray-900">Edit customer info:</span> 
                <Link href="/admin/customers/1/edit" className="text-primary hover:text-red-700">
                  <Edit className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Cars
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Vehicles of Adugna
            </h2>
            
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 mb-6">
              <p className="text-gray-400 italic text-[15px]">No vehicle found</p>
            </div>
            
            <button className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors">
              ADD NEW VEHICLE
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="relative">
          <div className="absolute -left-[86px] top-0 w-[72px] h-[72px] bg-[#ee0d09] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            Orders
          </div>
          
          <div>
            <h2 className="font-heading font-bold text-[28px] text-[#001659] mb-4">
              Orders of Adugna
            </h2>
            <p className="text-gray-500 text-[15px]">
              Orders will be displayed here
            </p>
          </div>
        </div>

      </div>
      
    </div>
  );
}
