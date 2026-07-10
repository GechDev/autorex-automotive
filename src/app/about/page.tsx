import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBanner } from "@/components/ui/PageBanner";
import { SkilledMechanics } from "@/components/sections/SkilledMechanics";
import { Experience } from "@/components/sections/Experience";
import { AdditionalServicesSection } from "@/components/sections/AdditionalServicesSection";
import { VideoBanner } from "@/components/sections/VideoBanner";

import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";

import { business } from "@/lib/config/business";

export const metadata = {
  title: "About Us | AutoRex Automotive",
  description: `Learn about AutoRex Automotive - ${business.yearsExperience} years of professional automotive service and repair experience.`,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PageBanner title="About Us" breadcrumb="About Us" />
        <SkilledMechanics />
        <Experience />
        <AdditionalServicesSection />
        <VideoBanner />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}
