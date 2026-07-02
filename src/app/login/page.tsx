import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Login | AutoRex Automotive",
  description: "Login to your AutoRex Automotive account.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 bg-white py-24">
        <div className="auto-container">
          <div className="max-w-[700px] mx-auto">
            
            <div className="mb-10">
              <h1 className="font-heading font-bold text-[35px] text-[#001659] mb-4 relative inline-block">
                Login to your account
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary"></div>
              </h1>
            </div>

            <form className="space-y-6">
              <div>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full h-14 px-4 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full h-14 px-4 text-base border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-[#c90a07] text-white px-12 py-7 rounded-none font-bold text-base uppercase tracking-wider"
                >
                  Login
                </Button>
              </div>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
