import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddCustomerPage() {
  return (
    <div className="max-w-4xl py-8">
      
      <div className="mb-10">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
          Add a new customer
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
      </div>
      
      <div className="max-w-3xl">
        <form className="space-y-6">
          <div>
            <Input 
              type="email" 
              placeholder="Customer email" 
              className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
            />
          </div>
          
          <div>
            <Input 
              type="text" 
              placeholder="Customer first name" 
              className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
            />
          </div>
          
          <div>
            <Input 
              type="text" 
              placeholder="Customer last name" 
              className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
            />
          </div>
          
          <div>
            <Input 
              type="text" 
              placeholder="Customer phone (555-555-5555)" 
              className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
            />
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
            >
              ADD CUSTOMER
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}
