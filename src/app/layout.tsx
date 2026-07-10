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
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en" className={`${poppins.variable} ${yantramanav.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <AppSessionProvider session={session}>
          {children}
          <Toaster 
            position="top-center"
            containerStyle={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'fixed'
            }}
            toastOptions={{
              duration: 1100,
              style: {
                padding: '24px 32px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                minWidth: '300px',
                textAlign: 'center',
                zIndex: 9999,
              },
              success: {
                style: {
                  background: '#10b981',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#ef4444',
                },
              },
            }}
          />
        </AppSessionProvider>
      </body>
    </html>
  );
}
