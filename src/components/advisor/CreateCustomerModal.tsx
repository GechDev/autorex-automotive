"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCustomer } from "@/lib/actions/customers";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type FormData = z.infer<typeof formSchema>;

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (customerId: number, customerName: string, phone: string) => void;
}

export function CreateCustomerModal({ open, onClose, onCreated }: CreateCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const result = await createCustomer(data);

    if (!result.success) {
      toast.error(result.error || "Failed to create customer.");
      setIsSubmitting(false);
    } else {
      toast.success("Customer created successfully!");
      onCreated(result.customerId!, result.customerName!, data.phone);
      reset();
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 shadow-2xl border border-gray-300 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#001659] flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#001659]">New Customer</h2>
              <p className="text-xs text-muted-foreground">Add a customer to the system</p>
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                First Name <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                placeholder="John"
                {...register("firstName")}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Last Name <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Email Address <span className="text-primary">*</span>
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Phone Number <span className="text-primary">*</span>
            </label>
            <Input
              type="tel"
              placeholder="+251 9XX XXX XXX"
              {...register("phone")}
              className="w-full h-[44px] px-3 text-[14px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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
                  Creating...
                </>
              ) : (
                "Add Customer"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
