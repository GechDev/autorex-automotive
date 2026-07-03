"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "dummy-token-from-url" // In a real app, this would come from searchParams
    }
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError(null);
    setSuccess(false);
    
    // Simulate API call for reset password
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 bg-white py-24">
        <div className="auto-container">
          <div className="max-w-[700px] mx-auto">
            
            <div className="mb-10">
              <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
                Reset your password
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
              </h1>
              <p className="mt-6 text-gray-500">
                Please enter your new password below.
              </p>
            </div>

            {success ? (
              <div className="p-8 bg-green-50 border border-green-200 text-green-800 rounded-sm">
                <h3 className="font-bold text-lg mb-2">Password reset successful</h3>
                <p>Your password has been successfully updated. You can now log in with your new password.</p>
                <div className="mt-6">
                  <Link href="/login" className="inline-block bg-primary hover:bg-[#c90a07] text-white px-8 py-4 rounded-none font-bold text-sm uppercase tracking-wider transition-colors">
                    Go to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {serverError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-sm text-sm">
                    {serverError}
                  </div>
                )}
                
                {/* Hidden token input */}
                <input type="hidden" {...register("token")} />

                <div>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="New password" 
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
                      placeholder="Confirm new password" 
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
                        <Loader2 className="w-5 h-5 animate-spin" /> Resetting...
                      </span>
                    ) : "Reset Password"}
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
