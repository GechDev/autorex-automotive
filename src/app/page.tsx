import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BottomBanner } from "@/components/sections/BottomBanner";
import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16">
        <Hero />
        <Experience />
        <ServicesSection />
        <WhyChooseUs />
        <BottomBanner />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}