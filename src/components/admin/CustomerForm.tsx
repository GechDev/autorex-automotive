"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createCustomer, updateCustomer } from "@/lib/actions/customers";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type FormData = z.infer<typeof formSchema>;

export function CustomerForm({ 
  initialData, 
  customerId 
}: { 
  initialData?: FormData; 
  customerId?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!customerId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    let result;
    if (isEditMode && customerId) {
      result = await updateCustomer(customerId, data);
    } else {
      result = await createCustomer(data);
    }

    if (!result.success) {
      setError(result.error || `Failed to ${isEditMode ? 'update' : 'create'} customer.`);
      setIsSubmitting(false);
    } else {
      router.push(isEditMode ? `/admin/customers/${customerId}` : "/admin/customers");
      router.refresh();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <div>
        <Input 
          type="email" 
          placeholder="Customer email" 
          {...register("email")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Customer first name" 
          {...register("firstName")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Customer last name" 
          {...register("lastName")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Customer phone (555-555-5555)" 
          {...register("phone")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          {isSubmitting ? (isEditMode ? "UPDATING..." : "ADDING...") : (isEditMode ? "UPDATE CUSTOMER" : "ADD CUSTOMER")}
        </Button>
      </div>
    </form>
  );
}
