"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createEmployee } from "@/lib/actions/employees";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  role: z.enum(["Admin", "Manager", "Employee"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function EmployeeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "Employee",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await createEmployee(data);

    if (!result.success) {
      setError(result.error || "Failed to create employee.");
      setIsSubmitting(false);
    } else {
      router.push("/admin/employees");
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
          placeholder="Employee email" 
          {...register("email")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Employee first name" 
          {...register("firstName")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Employee last name" 
          {...register("lastName")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
      </div>
      
      <div>
        <Input 
          type="text" 
          placeholder="Employee phone (555-555-5555)" 
          {...register("phone")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
      </div>

      <div>
        <select 
          {...register("role")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary text-gray-900 bg-white"
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
      </div>

      <div>
        <Input 
          type="password" 
          placeholder="Employee password" 
          {...register("password")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          {isSubmitting ? "ADDING..." : "ADD EMPLOYEE"}
        </Button>
      </div>
    </form>
  );
}
