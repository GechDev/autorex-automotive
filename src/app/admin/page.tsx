import React from "react";
import Link from "next/link";
import { Wrench, Users, Calendar, ShoppingCart, DollarSign, Activity, ChevronDown, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-utils";

export const metadata = {
  title: "Dashboard | AutoRex Admin",
};

export default async function AdminDashboard() {
  await requireRole(["ADMIN"]);

  // Fetch real metrics based on the new schema
  const totalOrders = await prisma.order.count({ 
    where: { status: { notIn: ["COMPLETED", "PAID"] } } 
  });
  const totalCustomers = await prisma.customer.count();
  const upcomingAppointments = await prisma.appointment.count({
    where: { status: { in: ["PENDING", "APPROVED"] } }
  });

  // Calculate revenue from completed payments
  const revenueAggregation = await prisma.payment.aggregate({
    _sum: { amount: true }
  });
  const totalRevenue = revenueAggregation._sum.amount || 0;

  // Recent activity
  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      vehicle: true,
      payments: true
    }
  });

  const metrics = [
    {
      title: "Active Orders",
      value: totalOrders,
      subtitle: "Orders currently in progress",
      icon: <ShoppingCart className="w-5 h-5 text-gray-700" />,
      accent: "bg-primary", // Red
      badge: "+12%"
    },
    {
      title: "Pending Appointments",
      value: upcomingAppointments,
      subtitle: "Waiting for approval",
      icon: <Calendar className="w-5 h-5 text-gray-700" />,
      accent: "bg-[#001659]", // Dark Blue
      badge: "+5%"
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      subtitle: "Registered in system",
      icon: <Users className="w-5 h-5 text-gray-700" />,
      accent: "bg-primary",
      badge: "+18%"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: "From completed orders",
      icon: <DollarSign className="w-5 h-5 text-gray-700" />,
      accent: "bg-[#001659]",
      badge: "+22%"
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto py-8 px-4 bg-gray-50/50 min-h-screen">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="font-heading font-bold text-[32px] text-[#001659] mb-1">
            Good Morning Admin
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-[14px]">
            Your workshop update
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#001659] mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col h-[180px]">
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-16 rounded-l-full ${metric.accent}`} />
              
              <div className="flex items-center justify-between mb-auto">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-gray-100 bg-gray-50/50">
                  {metric.icon}
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-gray-50 text-[11px] font-bold text-gray-600 bg-white">
                  {metric.badge}
                </div>
              </div>

              <div>
                <div className="text-[13px] font-medium text-gray-400 mb-1">{metric.title}</div>
                <div className="text-[32px] font-bold text-[#001659] leading-none mb-2">{metric.value}</div>
                <div className="text-[11px] text-gray-400">{metric.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        
        {/* Large Feature Card */}
        <div className="lg:col-span-1">
          <h2 className="text-[18px] font-bold text-[#001659] mb-4">Performance</h2>
          <div className="bg-[#001659] rounded-[32px] p-8 text-white relative overflow-hidden h-[380px] flex flex-col shadow-[0_12px_40px_rgba(0,22,89,0.2)]">
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="text-[14px] text-gray-300 font-medium">Monthly Target</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="relative w-48 h-24 mx-auto mb-8 overflow-hidden z-10">
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-white/10 border-t-primary border-r-primary border-l-primary transform -rotate-45"></div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[28px] font-bold">85%</div>
            </div>

            <div className="mt-auto relative z-10 text-center">
              <div className="text-[13px] text-gray-300 mb-1">Target Revenue</div>
              <div className="text-[36px] font-bold text-white leading-none">${((Number(totalRevenue) || 10000) * 1.15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-[12px] text-gray-400 mt-2">Current Financial Year</div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#001659]">Recent Appointments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[380px] overflow-hidden">
            {recentAppointments.slice(0, 4).map((app, index) => (
              <div key={app.id} className="bg-white p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col h-full max-h-[180px]">
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-l-full ${index % 2 === 0 ? 'bg-primary' : 'bg-[#001659]'}`} />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    app.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' : 
                    app.status === 'APPROVED' ? 'bg-blue-50 text-blue-600' :
                    app.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {app.status}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="text-[16px] font-bold text-[#001659] truncate">{app.customerName}</div>
                  <div className="text-[12px] font-medium text-gray-500 mt-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {app.preferredDate} at {app.preferredTime}
                  </div>
                </div>
              </div>
            ))}
            
            {Array.from({ length: Math.max(0, 4 - recentAppointments.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-white/50 border border-dashed border-gray-300 p-6 rounded-[24px] flex items-center justify-center h-full max-h-[180px]">
                <span className="text-gray-400 text-sm">No appointment</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-10 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-[#001659]">Order History</h2>
        </div>
        
        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.02)] text-center text-gray-500 text-sm">
              No recent orders found.
            </div>
          ) : (
            recentOrders.map(order => {
              const orderTotal = order.payments.reduce((sum, p) => sum + p.amount, 0);

              return (
                <div key={order.id} className="bg-white rounded-[20px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 px-6 flex items-center justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow cursor-pointer">
                  
                  <div className="flex items-center gap-4 w-1/4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="font-bold text-[#001659] text-sm">
                        {order.customer.firstName[0]}
                      </span>
                    </div>
                    <div className="truncate">
                      <div className="text-[14px] font-bold text-[#001659] truncate">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                    </div>
                  </div>

                  <div className="text-[13px] text-gray-500 font-medium hidden md:block w-1/6">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>

                  <div className="text-[14px] font-bold text-gray-700 hidden lg:block w-1/5 truncate">
                    {order.vehicle.make} {order.vehicle.model}
                  </div>

                  <div className="text-[14px] font-bold text-[#001659] w-1/6">
                    ${orderTotal.toFixed(2)}
                  </div>

                  <div className="w-1/6 text-right">
                    <span className={`inline-flex px-4 py-1.5 text-[12px] font-bold rounded-full ${
                      order.status !== 'COMPLETED'
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.status !== 'COMPLETED' ? "In Progress" : "Completed"}
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
