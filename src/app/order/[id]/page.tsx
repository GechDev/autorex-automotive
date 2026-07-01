import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Order Status | AutoRex Automotive",
  description: "Track your vehicle repair order status.",
};

const requestedServices = [
  {
    id: 1,
    title: "Tire repairs and changes",
    description: "Without good, inflated tires, you loose speed, control, and fuel efficiency, hence the need to get them patched if there's a leak (for example, if you run over a nail), or replaced if they're too worn.",
    status: "In progress"
  },
  {
    id: 2,
    title: "Brake work",
    description: "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
    status: "In progress"
  },
  {
    id: 3,
    title: "Spark Plug replacement",
    description: "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
    status: "In progress"
  },
  {
    id: 4,
    title: "Brake work",
    description: "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
    status: "In progress"
  },
  {
    id: 5,
    title: "Additional request",
    description: "Additional",
    status: "In progress"
  }
];

export default function OrderStatusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 bg-[#f8f9fa] py-16">
        <div className="auto-container max-w-[1000px]">
          
          {/* Header Info */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
                Jasmine Albeshir
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></div>
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl mt-6">
                You can track the progress of your order using this page. We will constantly update this page to let you know how we are progressing. As soon as we are done with the order, the status will turn green. That means, you car is ready for pickup.
              </p>
            </div>
            
            <div className="bg-[#ffc107] text-[#001659] font-bold px-6 py-2 rounded-full text-sm shrink-0 shadow-sm self-start md:self-auto">
              In progress
            </div>
          </div>

          {/* Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* Customer Info */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-b-2 border-primary">
              <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">CUSTOMER</div>
              <h3 className="font-heading font-bold text-[22px] text-[#001659] mb-6">Jasmine Albeshir</h3>
              
              <div className="space-y-2 text-[15px]">
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Email:</span> 
                  <span className="text-gray-500">jasmine@gmail.com</span>
                </div>
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Phone Number:</span> 
                  <span className="text-gray-500">240835487</span>
                </div>
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Active Customer:</span> 
                  <span className="text-gray-500">Yes</span>
                </div>
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-b-2 border-primary">
              <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">CAR IN SERVICE</div>
              <h3 className="font-heading font-bold text-[22px] text-[#001659] mb-6">BMW X7 (Gold)</h3>
              
              <div className="space-y-2 text-[15px]">
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Vehicle tag:</span> 
                  <span className="text-gray-500">0101AD</span>
                </div>
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Vehicle year:</span> 
                  <span className="text-gray-500">2020</span>
                </div>
                <div className="flex text-gray-700">
                  <span className="font-bold w-[120px]">Vehicle mileage:</span> 
                  <span className="text-gray-500">12000</span>
                </div>
              </div>
            </div>

          </div>

          {/* Requested Service Section */}
          <div className="bg-white p-10 rounded-lg shadow-sm">
            <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">BMW X7</div>
            <h3 className="font-heading font-bold text-[22px] text-[#001659] mb-8">Requested service</h3>
            
            <div className="flex flex-col gap-6">
              {requestedServices.map((service, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-[18px] text-[#001659] mb-2">{service.title}</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="bg-[#ffc107] text-[#001659] font-bold px-4 py-1.5 rounded-full text-[13px] shrink-0 self-start">
                    {service.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
