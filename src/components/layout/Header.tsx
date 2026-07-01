"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, MessageCircle, Send } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? "loading";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-[9999] transition-all duration-300", isScrolled && "bg-white shadow-[0_0_15px_rgba(0,0,0,0.10)]")}>
      {/* Header Top */}
      <div className="bg-[#08194a] hidden md:block">
        <div className="auto-container">
          <div className="flex items-center justify-between h-[48px]">
            <div className="flex items-center">
              <div className="bg-primary px-[35px] py-[12px] text-white text-sm font-medium">
                Enjoy the Beso while we fix your car
              </div>
              <div className="ml-[35px] text-white text-sm">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="flex items-center">
              {status === "loading" ? (
                <div className="animate-pulse bg-white/20 h-6 w-48 rounded"></div>
              ) : session ? (
                <div className="text-white text-lg font-bold">
                  Welcome <span className="font-medium">{session.user?.name || "User"}</span>
                </div>
              ) : (
                <div className="text-white text-lg font-medium">
                  Schedule Appointment: <strong className="text-xl font-bold ml-2">1800 456 7890</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Upper */}
      <div className="bg-white relative">
        <div className="auto-container px-[55px] md:px-[55px]">
          <div className="flex items-center justify-between min-h-[80px]">
            {/* Logo */}
            <div className="logo-box z-10 flex-shrink-0">
              <Link href="/" className="block py-[25px]">
                <Image
                  src="/images/custom/logo.png"
                  alt="AutoRex Automotive"
                  width={180}
                  height={60}
                  priority
                />
              </Link>
            </div>

            {/* Right Column - Navigation + Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center" role="navigation" aria-label="Main navigation">
                <ul className="flex items-center">
                  {navItems.map((item) => (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        className="block py-[28.5px] px-0 text-[17px] font-bold uppercase text-[#000] transition-colors duration-300 hover:text-primary relative"
                      >
                        {item.label}
                        <span className="absolute bottom-[30px] left-0 w-[23px] h-[1px] bg-primary opacity-0 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Auth Actions */}
              <div className="flex items-center gap-4 ml-4">
                {status === "loading" ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
                ) : session ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/admin"
                      className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-700 transition-colors"
                    >
                      Go To Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-style-one text-sm px-4 py-2"
                    >
                      <span>Log out</span>
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="btn-style-one text-sm px-4 py-2">
                    <span>Login</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-[50px] h-[50px] text-white bg-primary rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[99901] bg-white shadow-[0_0_15px_rgba(0,0,0,0.10)] transition-all duration-300",
          isScrolled ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        aria-hidden={!isScrolled}
      >
        <div className="auto-container px-[55px] md:px-[55px]">
          <div className="flex items-center justify-between min-h-[70px]">
            <div className="logo-box z-10 flex-shrink-0">
              <Link href="/" className="block py-[13.5px]">
                <Image
                  src="/images/custom/logo.png"
                  alt="AutoRex Automotive"
                  width={160}
                  height={50}
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center" role="navigation" aria-label="Sticky navigation">
              <ul className="flex items-center">
                {navItems.map((item) => (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className="block py-[17px] px-0 text-[17px] font-bold uppercase text-[#000] transition-colors duration-300 hover:text-primary relative"
                    >
                      {item.label}
                      <span className="absolute bottom-[20px] left-0 w-[23px] h-[1px] bg-primary opacity-0 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-700 transition-colors"
                  >
                    Go To Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-style-one text-sm px-4 py-2"
                  >
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" className="btn-style-one text-sm px-4 py-2">
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed right-0 top-0 w-[300px] max-w-full h-full z-[999999] transition-all duration-700",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed right-0 top-0 w-full h-full bg-primary/70 z-1 transition-all duration-700",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Box */}
        <div
          className={cn(
            "absolute left-0 top-0 w-full h-full max-h-full overflow-y-auto bg-[#202020] p-0 z-5 transition-all duration-700",
            isMobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          )}
        >
          <button
            className="absolute right-5 top-5 text-white text-4xl leading-none"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>

          <div className="nav-logo px-6 py-8 border-b border-white/10">
            <Link href="/" className="block">
              <Image
                src="/images/logo-two.png"
                alt="AutoRex Automotive"
                width={160}
                height={50}
              />
            </Link>
          </div>

          <nav className="px-6 py-4">
            <ul className="space-y-0">
              {navItems.map((item) => (
                <li key={item.href} className="border-t border-white/10">
                  <Link
                    href={item.href}
                    className="block py-4 px-4 text-white font-medium uppercase text-[15px] transition-colors duration-500 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 py-6 border-t border-white/10">
            <div className="flex justify-center gap-4">
              <a href="#" className="text-white text-xl hover:text-primary transition-colors" aria-label="Website">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="text-white text-xl hover:text-primary transition-colors" aria-label="Messages">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-white text-xl hover:text-primary transition-colors" aria-label="Contact">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transition-transform duration-75" style={{ transform: "scale(1)" }} aria-hidden="true" />
      <div className="fixed top-0 left-0 w-12 h-12 bg-white/30 rounded-full pointer-events-none z-[10000] transition-transform duration-150" aria-hidden="true" />
    </header>
  );
}