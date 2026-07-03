import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Register | AutoRex Automotive",
  description: "Create your AutoRex Automotive account.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 bg-white py-24">
        <div className="auto-container">
          <div className="max-w-[700px] mx-auto">
            
            <div className="mb-10">
              <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
                Create an account
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
              </h1>
            </div>

            <RegisterForm />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
