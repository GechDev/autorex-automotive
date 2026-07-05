import type { Metadata } from "next";
import { Poppins, Yantramanav } from "next/font/google";
import { AppSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const yantramanav = Yantramanav({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-yantramanav",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoRex Automotive | Professional Automotive Service & Repair",
  description: "AutoRex Automotive - Professional automotive service and repair. Quality service, certified mechanics, fair prices.",
  metadataBase: new URL("https://autorex.com"),
};

import { auth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en" className={`${poppins.variable} ${yantramanav.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AppSessionProvider session={session}>{children}</AppSessionProvider>
      </body>
    </html>
  );
}