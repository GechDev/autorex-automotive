"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createVehicle } from "@/lib/actions/vehicles";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function VehicleForm({ customerId, onCancel }: { customerId: number, onCancel: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    year: "", make: "", model: "", type: "", mileage: "", tag: "", serial: "", color: ""
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await createVehicle({
      customerId,
      year: parseInt(formData.year) || 0,
      make: formData.make,
      model: formData.model,
      type: formData.type,
      mileage: parseInt(formData.mileage) || 0,
      tag: formData.tag,
      serial: formData.serial,
      color: formData.color,
    });

    if (!result.success) {
      setError(result.error || "Failed to create vehicle.");
      toast.error(result.error || "Failed to create vehicle.");
      setIsSubmitting(false);
    } else {
      toast.success("Vehicle created successfully!");
      router.push(`/admin/customers/${customerId}`);
      router.refresh();
    }
  };

  const handleCancel = () => {
    router.push(`/admin/customers/${customerId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="space-y-4 bg-gray-50 p-6 border border-gray-200 rounded-sm mt-4" onSubmit={onSubmit}>
      <h3 className="font-heading font-bold text-xl text-[#001659] mb-4">Add a new vehicle</h3>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="year" type="number" placeholder="Year" value={formData.year} onChange={handleChange} required />
        <Input name="make" placeholder="Make" value={formData.make} onChange={handleChange} required />
        <Input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
        <Input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
        <Input name="mileage" type="number" placeholder="Mileage" value={formData.mileage} onChange={handleChange} required />
        <Input name="tag" placeholder="Tag" value={formData.tag} onChange={handleChange} required />
        <Input name="serial" placeholder="Serial" value={formData.serial} onChange={handleChange} required />
        <Input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
      </div>

      <div className="flex gap-4 pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#c90a07] text-white px-6 py-2 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          {isSubmitting ? "SAVING..." : "ADD VEHICLE"}
        </Button>
        <Button 
          type="button" 
          onClick={handleCancel}
          variant="outline"
          className="px-6 py-2 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
}
