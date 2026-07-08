"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { createOrder } from "@/lib/actions/orders";
import toast from "react-hot-toast";

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
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");

  // Filter vehicles by selected customer
  const filteredVehicles = vehicles.filter(v => v.customer_id === parseInt(customerId));

  const customerOptions = customers.map(c => ({
    value: c.customer_id.toString(),
    label: `${c.info?.customer_first_name} ${c.info?.customer_last_name}`,
    subLabel: c.customer_email
  }));

  const vehicleOptions = filteredVehicles.map(v => ({
    value: v.vehicle_id.toString(),
    label: `${v.vehicle_year} ${v.vehicle_make} ${v.vehicle_model}`,
    subLabel: v.vehicle_tag
  }));

  const employeeOptions = employees.map(e => ({
    value: e.employee_id.toString(),
    label: `${e.info?.employee_first_name} ${e.info?.employee_last_name}`,
    subLabel: e.roles?.[0]?.role?.company_role_name || "Employee"
  }));

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
      toast.error(result.error || "Failed to create order.");
      setIsSubmitting(false);
    } else {
      toast.success("Order created successfully!");
      router.push("/admin/orders");
      router.refresh();
    }
  };

  const toggleService = (id: number) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(id);
      const newSelected = isSelected ? prev.filter(sId => sId !== id) : [...prev, id];
      // Automatically update the total price ($75 per service as a baseline)
      setTotalPrice((newSelected.length * 75).toFixed(2));
      return newSelected;
    });
  };

  const filteredServices = services.filter(s => 
    s.service_name.toLowerCase().includes(serviceSearchQuery.toLowerCase())
  );

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
          <Combobox
            value={customerId}
            onChange={(val) => {
              setCustomerId(val);
              setVehicleId(""); // Reset vehicle when customer changes
            }}
            options={customerOptions}
            placeholder="Select a customer..."
            emptyText="No customers found."
            triggerClassName="h-[52px] border-gray-300 rounded-sm focus-within:ring-primary focus-within:border-primary bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle</label>
          <Combobox
            value={vehicleId}
            onChange={(val) => setVehicleId(val)}
            options={vehicleOptions}
            placeholder="Select a vehicle..."
            emptyText={customerId ? "No vehicles found." : "Please select a customer first."}
            disabled={!customerId}
            triggerClassName="h-[52px] border-gray-300 rounded-sm focus-within:ring-primary focus-within:border-primary bg-white"
          />
          {customerId && filteredVehicles.length === 0 && (
            <p className="text-sm text-yellow-600 mt-1">This customer has no vehicles. Please add a vehicle first.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Assigned Employee</label>
          <Combobox
            value={employeeId}
            onChange={(val) => setEmployeeId(val)}
            options={employeeOptions}
            placeholder="Select an employee..."
            emptyText="No employees found."
            triggerClassName="h-[52px] border-gray-300 rounded-sm focus-within:ring-primary focus-within:border-primary bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Total Price ($)</label>
          <input 
            type="number" 
            min="0"
            step="0.01"
            className="w-full h-[52px] px-4 text-[15px] border-gray-300 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Select Services</label>
        <div className="border border-gray-300 rounded-sm bg-white overflow-hidden flex flex-col focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <div className="p-3 border-b border-gray-300 bg-gray-50/50">
            <input 
              type="text" 
              placeholder="Search services..." 
              value={serviceSearchQuery}
              onChange={(e) => setServiceSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-[14px] bg-white border border-gray-300 rounded-sm focus:border-primary focus:outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="p-4 max-h-[240px] overflow-y-auto">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {filteredServices.map(s => (
                  <label key={s.service_id} className="flex items-start space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedServices.includes(s.service_id)}
                      onChange={() => toggleService(s.service_id)}
                      className="mt-0.5 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer transition-colors"
                    />
                    <span className="text-gray-700 text-[14px] leading-tight group-hover:text-gray-900 transition-colors">{s.service_name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-gray-500 py-6 text-center">
                {services.length === 0 ? "No services available. Please add services first." : "No services found."}
              </p>
            )}
          </div>
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
