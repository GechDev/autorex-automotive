"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createAppointment } from "@/lib/actions/appointment";

const appointmentSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vehicleInfo: z.string().optional(),
  serviceId: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AppointmentPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const [submitResult, setSubmitResult] = React.useState<{ success: boolean; message: string } | null>(null);

  const onSubmit = async (data: AppointmentFormData) => {
    setSubmitResult(null);
    const result = await createAppointment(data);
    if (result.success) {
      setSubmitResult({ success: true, message: result.message });
      reset();
    } else {
      setSubmitResult({ success: false, message: result.error });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-[70px] bg-white">
          <div className="auto-container max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="text-center mb-10">
                <h2 className="font-heading font-black text-[32px] md:text-[40px] leading-[1.1] text-[#001659] mb-4">
                  Schedule Your Appointment
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below to request an appointment. We'll get back to you to confirm.
                </p>
              </div>

              {submitResult && (
                <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
                  submitResult.success ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                  {submitResult.success ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                  <p>{submitResult.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input id="customerName" {...register("customerName")} placeholder="John Doe" />
                    {errors.customerName && <p className="mt-1 text-sm text-red-500">{errors.customerName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...register("phone")} placeholder="+1 (555) 123-4567" />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="vehicleInfo">Vehicle Information</Label>
                    <Input id="vehicleInfo" {...register("vehicleInfo")} placeholder="Year, Make, Model" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input id="preferredDate" type="date" {...register("preferredDate")} />
                    {errors.preferredDate && <p className="mt-1 text-sm text-red-500">{errors.preferredDate.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <Input id="preferredTime" type="time" {...register("preferredTime")} />
                    {errors.preferredTime && <p className="mt-1 text-sm text-red-500">{errors.preferredTime.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea id="message" rows={4} {...register("message")} placeholder="Describe the issue or service needed..." />
                </div>

                <div className="text-center pt-4">
                  <Button type="submit" disabled={isSubmitting} className="btn-style-one px-10 py-4 text-lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Request Appointment"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
