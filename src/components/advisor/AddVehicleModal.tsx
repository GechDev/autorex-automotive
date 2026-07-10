"use client";

import React, { useState } from "react";
import { X, Loader2, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createVehicle } from "@/lib/actions/vehicles";
import toast from "react-hot-toast";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  customerId: number;
  customerName: string;
  onCreated: (vehicleId: number, vehicleLabel: string) => void;
}

export function AddVehicleModal({ open, onClose, customerId, customerName, onCreated }: AddVehicleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    year: "", make: "", model: "", mileage: "", tag: "", serial: "", color: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setFormData({ year: "", make: "", model: "", mileage: "", tag: "", serial: "", color: "" });
    setError(null);
    onClose();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic client-side validation
    if (!formData.year || !formData.make || !formData.model || !formData.mileage || !formData.tag) {
      setError("Year, Make, Model, Mileage, and License Plate are required.");
      setIsSubmitting(false);
      return;
    }

    const result = await createVehicle({
      customerId,
      year: parseInt(formData.year) || 0,
      make: formData.make,
      model: formData.model,
      mileage: parseInt(formData.mileage) || 0,
      tag: formData.tag,
      serial: formData.serial || undefined,
      color: formData.color || undefined,
    });

    if (!result.success) {
      setError(result.error || "Failed to create vehicle.");
      toast.error(result.error || "Failed to create vehicle.");
      setIsSubmitting(false);
    } else {
      toast.success("Vehicle added successfully!");
      onCreated(result.vehicleId!, result.vehicleLabel!);
      setFormData({ year: "", make: "", model: "", mileage: "", tag: "", serial: "", color: "" });
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl mx-4 shadow-2xl border border-gray-300 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#001659] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#001659]">Add Vehicle</h2>
              <p className="text-xs text-muted-foreground">
                For <span className="font-semibold text-slate-700">{customerName}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-sm text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Year <span className="text-primary">*</span>
              </label>
              <Input
                name="year"
                type="number"
                placeholder="2024"
                value={formData.year}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Make <span className="text-primary">*</span>
              </label>
              <Input
                name="make"
                placeholder="Toyota"
                value={formData.make}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Model <span className="text-primary">*</span>
              </label>
              <Input
                name="model"
                placeholder="Corolla"
                value={formData.model}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                License Plate <span className="text-primary">*</span>
              </label>
              <Input
                name="tag"
                placeholder="ABC-1234"
                value={formData.tag}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Current Mileage <span className="text-primary">*</span>
              </label>
              <Input
                name="mileage"
                type="number"
                placeholder="45000"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">VIN / Serial</label>
              <Input
                name="serial"
                placeholder="Optional"
                value={formData.serial}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Color</label>
              <Input
                name="color"
                placeholder="Optional"
                value={formData.color}
                onChange={handleChange}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-6">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="px-5 py-2 rounded-sm font-bold text-[13px] uppercase tracking-wider"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-[#c90a07] text-white px-5 py-2 rounded-sm font-bold text-[13px] uppercase tracking-wider flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Vehicle"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
