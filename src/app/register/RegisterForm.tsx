"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    setSuccess(false);
    
    const result = await registerAction(data);
    
    if (result.error) {
      setServerError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 text-green-800 rounded-sm text-center">
        <h3 className="font-bold text-lg mb-2">Registration Successful!</h3>
        <p>You can now log in to your account. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-sm text-sm">
          {serverError}
        </div>
      )}

      <div>
        <Input 
          type="text" 
          placeholder="Full Name" 
          {...register("name")}
          className={`w-full h-14 px-4 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input 
          type="email" 
          placeholder="Email" 
          {...register("email")}
          className={`w-full h-14 px-4 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <div className="relative">
          <Input 
            type={showPassword ? "text" : "password"}
            placeholder="Password" 
            {...register("password")}
            className={`w-full h-14 px-4 pr-12 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input 
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password" 
            {...register("confirmPassword")}
            className={`w-full h-14 px-4 pr-12 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          <button 
            type="button" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-primary hover:bg-[#c90a07] text-white px-12 py-7 rounded-none font-bold text-base uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Registering...
            </span>
          ) : "Register"}
        </Button>
      </div>

      <div className="pt-4 text-center sm:text-left text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Login here</Link>
      </div>
    </form>
  );
}
