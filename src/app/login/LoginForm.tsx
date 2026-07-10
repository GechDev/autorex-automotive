"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { loginAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    const result = await loginAction(data);
    
    if (result.error) {
      setServerError(result.error);
    } else {
      if (result.role === "ADVISOR") {
        router.push("/advisor/jobs");
      } else if (result.role === "TECHNICIAN") {
        router.push("/technician/jobs");
      } else if (result.role === "CASHIER") {
        router.push("/cashier/queue");
      } else {
        router.push("/admin"); 
      }
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-sm text-sm">
          {serverError}
        </div>
      )}

      <div>
        <Input 
          type="email" 
          placeholder="Email" 
          {...register("email")}
          className={`w-full h-14 px-4 text-base border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
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
            className={`w-full h-14 px-4 pr-12 text-base border border-gray-300 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
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

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary" />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-primary hover:bg-[#c90a07] text-white px-12 py-7 rounded-none font-bold text-base uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
            </span>
          ) : "Login"}
        </Button>
      </div>

      <div className="pt-4 text-center sm:text-left text-sm text-gray-600">
        Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline font-bold">Register here</Link>
      </div>
    </form>
  );
}
