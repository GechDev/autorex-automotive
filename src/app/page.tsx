import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ScheduleAppointment } from "@/components/appointment/ScheduleAppointment";
import { WorkingProcess } from "@/components/sections/WorkingProcess";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 overflow-hidden pb-0">
        <Hero />
        <Experience />
        <ServicesSection />
        <WhyChooseUs />
        <WorkingProcess />
        <Testimonials />
        <ScheduleAppointment />
      </main>
      <Footer />
    </div>
  );
}