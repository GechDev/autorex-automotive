"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBanner } from "@/components/ui/PageBanner";
import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { MapPin, Mail, Phone } from "lucide-react";

import { business } from "@/lib/config/business";

const businessInfo = {
  address: business.address.full,
  email: business.email,
  phone: business.phone,
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PageBanner title="Contact Us" breadcrumb="Contact Us" bgImage="/images/banner/banner1.jpg" />

        <section className="contact-section py-[70px] bg-white">
          <div className="auto-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Contact Form */}
              <div className="form-column lg:col-span-7">
                <div className="contact-form bg-white p-8 md:p-10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100">
                  <h3 className="font-heading font-black text-[28px] leading-[36px] text-[#001659] mb-8">Send us a Message</h3>

                  {isSubmitSuccessful && (
                    <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <p>Thank you for your message! We will get back to you soon.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-[#222] mb-2">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...register("name")}
                          className={errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-[#222] mb-2">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email")}
                          className={errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-[#222] mb-2">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...register("phone")}
                          className={errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="subject" className="block text-sm font-medium text-[#222] mb-2">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Service Inquiry"
                          {...register("subject")}
                          className={errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                          aria-invalid={Boolean(errors.subject)}
                          aria-describedby={errors.subject ? "subject-error" : undefined}
                        />
                        {errors.subject && (
                          <p id="subject-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-4 h-4" />
                            {errors.subject.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-[#222] mb-2">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us about your automotive needs..."
                        {...register("message")}
                        className={errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="btn-style-one w-full md:w-auto px-10 py-4 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info & Map */}
              <div className="info-column lg:col-span-5">
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100 h-full">
                    <h4 className="font-heading font-black text-[24px] leading-[32px] text-[#001659] mb-6">Our Address</h4>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-[#222]">Address</p>
                          <address className="text-body not-italic">{businessInfo.address}</address>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-[#222]">Email</p>
                          <a href={`mailto:${businessInfo.email}`} className="text-body hover:text-primary transition-colors">{businessInfo.email}</a>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-[#222]">Phone</p>
                          <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="text-body font-bold text-lg hover:text-primary transition-colors">{businessInfo.phone}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Map */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <iframe
                      src={business.map}
                      width="600"
                      height="450"
                      style={{ border: 0, width: "100%", height: "100%" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${business.shortName} Location`}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}
