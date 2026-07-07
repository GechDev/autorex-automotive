"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createService } from "@/lib/actions/services";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ServiceForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await createService(data);

    if (!result.success) {
      setError(result.error || "Failed to create service.");
      toast.error(result.error || "Failed to create service.");
      setIsSubmitting(false);
    } else {
      toast.success("Service created successfully!");
      router.push("/admin/services");
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
          type="text" 
          placeholder="Service name" 
          {...register("name")}
          className="w-full h-[52px] px-4 text-[15px] border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      
      <div>
        <textarea 
          placeholder="Service description" 
          {...register("description")}
          className="w-full h-32 p-4 text-[15px] border-gray-200 border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 italic bg-white resize-none"
        />
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#c90a07] text-white px-8 py-6 rounded-none font-bold text-[14px] uppercase tracking-wider"
        >
          {isSubmitting ? "ADDING..." : "ADD SERVICE"}
        </Button>
      </div>
    </form>
  );
}
