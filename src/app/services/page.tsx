import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutComponent } from "@/components/sections/AboutComponent";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BottomBanner } from "@/components/sections/BottomBanner";
import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";

export const metadata = {
  title: "Services | AutoRex Automotive",
  description: "View all automotive services offered by AutoRex Automotive - Engine repair, brake service, transmission, and more.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16">
        <AboutComponent />
        <ServicesSection />
        <WhyChooseUs />
        <BottomBanner />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}