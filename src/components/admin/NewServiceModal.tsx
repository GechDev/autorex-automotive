"use client";

import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createService } from "@/lib/actions/services";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function NewServiceModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const result = await createService(data);
    setIsSubmitting(false);
    if (!result.success) {
      toast.error(result.error || "Failed to create service.");
    } else {
      toast.success("Service created successfully!");
      reset();
      setOpen(false);
      router.refresh();
    }
  };

  const close = () => { setOpen(false); reset(); };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary hover:bg-[#c90a07] text-white px-6 py-3 rounded-none font-bold text-[14px] uppercase tracking-wider transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        NEW SERVICE
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in fade-in-80 zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h2 className="font-heading font-bold text-[22px] text-[#001659]">
                  Add New Service
                </h2>
                <p className="text-gray-500 text-[13px] mt-0.5">
                  Fill in the details for the new service.
                </p>
              </div>
              <button
                onClick={close}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Service Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oil Change, Brake Inspection..."
                  {...register("name")}
                  className="w-full h-[50px] px-4 text-[15px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-gray-400 bg-white transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-[13px] mt-1.5">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of the service..."
                  {...register("description")}
                  className="w-full h-28 p-4 text-[15px] border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-gray-400 bg-white resize-none transition-all"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={close}
                  className="px-6 py-3 text-[14px] font-bold text-gray-500 hover:text-gray-800 border border-gray-300 hover:border-gray-300 rounded-none uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 text-[14px] font-bold text-white bg-primary hover:bg-[#c90a07] rounded-none uppercase tracking-wider transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Adding...</>
                  ) : (
                    "Add Service"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
