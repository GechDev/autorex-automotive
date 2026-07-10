import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBanner } from "@/components/ui/PageBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AdditionalServicesSection } from "@/components/sections/AdditionalServicesSection";
import { VideoBanner } from "@/components/sections/VideoBanner";
import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";

export const metadata = {
  title: "Services | AutoRex Automotive",
  description: "View all automotive services offered by AutoRex Automotive - Engine repair, brake service, transmission, and more.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PageBanner title="Our Services" breadcrumb="Services" bgImage="/images/banner/banner1.jpg" />
        <ServicesSection />
        <AdditionalServicesSection />
        <VideoBanner />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}
