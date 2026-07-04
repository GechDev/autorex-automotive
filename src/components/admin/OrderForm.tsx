"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/orders";

export function OrderForm({ 
  customers, 
  vehicles, 
  employees, 
  services 
}: { 
  customers: any[], 
  vehicles: any[], 
  employees: any[], 
  services: any[] 
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // Filter vehicles by selected customer
  const filteredVehicles = vehicles.filter(v => v.customer_id === parseInt(customerId));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!customerId || !vehicleId || !employeeId || !totalPrice || selectedServices.length === 0) {
      setError("Please fill all required fields and select at least one service.");
      setIsSubmitting(false);
      return;
    }

    const result = await createOrder({
      customerId: parseInt(customerId),
      vehicleId: parseInt(vehicleId),
      employeeId: parseInt(employeeId),
      totalPrice: parseFloat(totalPrice),
      serviceIds: selectedServices,
    });

    if (!result.success) {
      setError(result.error || "Failed to create order.");
      setIsSubmitting(false);
    } else {
      router.push("/admin/orders");
      router.refresh();
    }
  };

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Customer</label>
          <select 
            className="w-full h-[52px] px-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value);
              setVehicleId(""); // Reset vehicle when customer changes
            }}
          >
            <option value="">Select a customer</option>
            {customers.map(c => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.info?.customer_first_name} {c.info?.customer_last_name} ({c.customer_email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle</label>
          <select 
            className="w-full h-[52px] px-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            disabled={!customerId}
          >
            <option value="">Select a vehicle</option>
            {filteredVehicles.map(v => (
              <option key={v.vehicle_id} value={v.vehicle_id}>
                {v.vehicle_year} {v.vehicle_make} {v.vehicle_model} ({v.vehicle_tag})
              </option>
            ))}
          </select>
          {customerId && filteredVehicles.length === 0 && (
            <p className="text-sm text-yellow-600 mt-1">This customer has no vehicles. Please add a vehicle first.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Assigned Employee</label>
          <select 
            className="w-full h-[52px] px-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select an employee</option>
            {employees.map(e => (
              <option key={e.employee_id} value={e.employee_id}>
                {e.info?.employee_first_name} {e.info?.employee_last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Total Price ($)</label>
          <input 
            type="number" 
            min="0"
            step="0.01"
            className="w-full h-[52px] px-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Select Services</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-gray-200 p-4 rounded-sm">
          {services.map(s => (
            <label key={s.service_id} className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedServices.includes(s.service_id)}
                onChange={() => toggleService(s.service_id)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-gray-700 text-sm">{s.service_name}</span>
            </label>
          ))}
          {services.length === 0 && (
            <p className="text-sm text-gray-500">No services available. Please add services first.</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          {isSubmitting ? "CREATING..." : "CREATE ORDER"}
        </Button>
      </div>
    </form>
  );
}
