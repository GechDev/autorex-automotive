import React from "react";
import { prisma } from "@/lib/prisma";
import { DollarSign, FileText, Wrench, TrendingUp, Calendar, CreditCard } from "lucide-react";


export default async function ReportsPage() {
  // Fetch some metrics from Prisma
  const [
    totalRevenueResult,
    totalOrders,
    pendingOrders,
    recentPayments,
  ] = await Promise.all([
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.order.count(),
    prisma.order.count({
      where: { status: { notIn: ["COMPLETED", "PAID"] } },
    }),
    prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        order: {
          include: { customer: true, vehicle: true },
        },
      },
    }),
  ]);

  const totalRevenue = totalRevenueResult._sum.amount || 0;

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+12.5%",
      trendColor: "text-emerald-600"
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+8.2%",
      trendColor: "text-emerald-600"
    },
    {
      title: "Active Jobs",
      value: pendingOrders.toString(),
      icon: Wrench,
      color: "text-amber-600",
      bg: "bg-amber-50",
      trend: "-2.4%",
      trendColor: "text-red-500"
    },
    {
      title: "Avg. Ticket Size",
      value: totalOrders > 0 ? `$${(totalRevenue / totalOrders).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "+5.1%",
      trendColor: "text-emerald-600"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading font-bold text-[35px] text-[#001659] relative inline-block">
          Operational Reports
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
        </h1>
        
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`font-semibold ${stat.trendColor}`}>{stat.trend}</span>
                <span className="text-gray-400">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Chart Coming Soon</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              We are working on integrating advanced charting libraries to display your revenue growth over time.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Payments</h2>
          </div>
          <div className="flex-1 p-0 flex flex-col">
            {recentPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No recent payments</div>
            ) : (
              recentPayments.map((payment, index) => (
                <div key={payment.id} className={`p-4 flex items-center justify-between ${index !== recentPayments.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{payment.order.customer.firstName} {payment.order.customer.lastName}</p>
                      <p className="text-xs text-gray-500">{payment.order.vehicle.year} {payment.order.vehicle.make}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">+${payment.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{new Date(payment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
