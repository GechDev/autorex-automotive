"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setServerError(null);
    setSuccess(false);
    
    // Simulate API call for forgot password since we don't have email configured
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, we would call a server action here to generate a token and send an email.
      // We will pretend it was successful and show the success message.
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
                Forgot password
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
              </h1>
              <p className="mt-6 text-gray-500">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
            </div>

            {success ? (
              <div className="p-8 bg-green-50 border border-green-200 text-green-800 rounded-sm">
                <h3 className="font-bold text-lg mb-2">Check your email</h3>
                <p>We've sent a password reset link to your email address. Please check your inbox and spam folder.</p>
                <div className="mt-6">
                  <Link href="/login" className="text-primary hover:underline font-bold">
                    Return to Login
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

                <div>
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    {...register("email")}
                    className={`w-full h-14 px-4 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </span>
                    ) : "Send Reset Link"}
                  </Button>
                </div>

                <div className="pt-4 text-sm text-gray-600">
                  Remember your password? <Link href="/login" className="text-primary hover:underline font-bold">Login here</Link>
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
