import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Globe, MessageCircle, Send } from "lucide-react";

import { business } from "@/lib/config/business";

const businessInfo = {
  name: business.name,
  shortName: business.shortName,
  address: business.address.full,
  email: business.email,
  phone: business.phone,
  hours: business.hours.weekdays,
};

const footerLinks = {
  useful: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/appointment", label: "Appointment" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact Us" },
  ],
  services: [
    { href: "/services", label: "Performance Upgrade" },
    { href: "/services", label: "Transmission Service" },
    { href: "/services", label: "Brake Repair & Service" },
    { href: "/services", label: "Engine Service & Repair" },
    { href: "/services", label: "Tire & Wheels" },
  ],
};

export function Footer() {
  return (
    <footer className="main-footer bg-[#08194a] text-white">
      {/* Upper Box */}
      <div className="upper-box border-b border-white/10">
        <div className="auto-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div className="footer-info-box">
              <div className="flex items-start gap-4">
                <div className="icon w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text">
                  <p className="font-medium text-lg mb-1">{businessInfo.address.split(",")[0]}</p>
                  <p className="text-white/80">{businessInfo.address.split(",").slice(1).join(",")}</p>
                </div>
              </div>
            </div>
            <div className="footer-info-box">
              <div className="flex items-start gap-4">
                <div className="icon w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text">
                  <p className="font-medium text-lg mb-1">Email us</p>
                  <a href={`mailto:${businessInfo.email}`} className="text-white/80 hover:text-primary transition-colors">{businessInfo.email}</a>
                </div>
              </div>
            </div>
            <div className="footer-info-box">
              <div className="flex items-start gap-4">
                <div className="icon w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text">
                  <p className="font-medium text-lg mb-1">Call us on</p>
                  <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="text-white font-bold text-lg hover:text-primary transition-colors">{businessInfo.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Section */}
      <div className="widgets-section py-16">
        <div className="auto-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Widget */}
            <div className="footer-column lg:col-span-1">
              <div className="widget widget_about">
                <Link href="/" className="block mb-6">
                  <Image
                    src="/images/logo-three.png"
                    alt="AutoRex Automotive"
                    width={180}
                    height={60}
                  />
                </Link>
                <p className="text-white/70 leading-relaxed">
                  Professional automotive service and repair. Quality service, certified mechanics, and fair prices.
                </p>
              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-column lg:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="widget widget_links">
                  <h4 className="widget_title font-heading font-bold text-lg mb-4">Useful Links</h4>
                  <ul className="list space-y-2">
                    {footerLinks.useful.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-white/70 hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget widget_links">
                  <h4 className="widget_title font-heading font-bold text-lg mb-4">Our Services</h4>
                  <ul className="list space-y-2">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-white/70 hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-column lg:col-span-1">
              <div className="widget widget_newsletter">
                <h4 className="widget_title font-heading font-bold text-lg mb-4">Newsletter</h4>
                <p className="text-white/70 mb-4">Get latest updates and offers.</p>
                <form className="newsletter-form flex gap-2 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded focus:outline-none focus:border-primary focus:bg-white/20"
                    aria-label="Email address"
                  />
                  <button type="submit" className="btn-style-one px-4 py-3">
                    <span>Subscribe</span>
                  </button>
                </form>
                <ul className="social-links flex gap-4">
                  <li>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors" aria-label="Website">
                      <Globe className="w-5 h-5" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors" aria-label="Messages">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors" aria-label="Contact">
                      <Send className="w-5 h-5" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom border-t border-white/10">
        <div className="auto-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
            <p className="copyright-text text-white/60 text-sm">
              © Copyright <span className="font-medium">{businessInfo.shortName}</span> 2025. All right reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}