import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutComponent } from "@/components/sections/AboutComponent";
import { Experience } from "@/components/sections/Experience";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BottomBanner } from "@/components/sections/BottomBanner";
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
      <main className="flex-1 pt-16">
        <AboutComponent />
        <Experience />
        <WhyChooseUs />
        <BottomBanner />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}