import Link from "next/link";
import Image from "next/image";
import { business } from "@/lib/config/business";

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 relative pt-[200px] mt-[150px]">
      
      {/* Overlapping Newsletter Box */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-10">
        <div className="bg-[#1a1a1a] rounded-2xl p-10 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Background overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ backgroundImage: "url('/images/carhive/about1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-80" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-white font-heading font-black text-3xl md:text-4xl mb-4">Subscribe To Our Newsletter</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              Get the latest news, updates, and special offers delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full sm:flex-1 bg-white text-gray-900 placeholder:text-gray-500 px-6 h-[42px] rounded-md focus:outline-none shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary text-white font-bold px-8 h-[42px] rounded-md hover:bg-primary-dark transition-colors uppercase text-sm tracking-wider shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="auto-container relative z-0 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Column 1: Logo & About */}
          <div>
            <Link href="/" className="block mb-6">
              <Image
                src="/images/logo.png"
                alt={business.name}
                width={160}
                height={50}
                className="h-auto w-[160px]"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Professional automotive service and repair. Quality service, certified mechanics, and fair prices. We ensure your vehicle performs safely and optimally.
            </p>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a href="#" className="w-9 h-9 bg-primary flex items-center justify-center rounded-md text-white hover:bg-white hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="w-9 h-9 bg-primary flex items-center justify-center rounded-md text-white hover:bg-white hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 bg-primary flex items-center justify-center rounded-md text-white hover:bg-white hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 bg-primary flex items-center justify-center rounded-md text-white hover:bg-white hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="text-white font-heading font-black text-xl mb-6">Pages</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <svg className="w-3 h-3 fill-current text-primary" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-heading font-black text-xl mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "Auto Cleaning",
                "Engine Services",
                "Mechanical Repairs",
                "Tires & Wheels",
                "Engine Diagnostics",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <svg className="w-3 h-3 fill-current text-primary" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-white font-heading font-black text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-gray-400 text-sm leading-relaxed">{business.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-gray-400 hover:text-primary transition-colors text-sm">{business.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href={`mailto:${business.email}`} className="text-gray-400 hover:text-primary transition-colors text-sm">{business.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-gray-400 text-sm">{business.hours.weekdays}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="bg-[#0a0a0a] border-t border-white/5 py-5 relative z-0">
        <div className="auto-container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© Copyright {new Date().getFullYear()} {business.shortName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <span className="text-gray-700">|</span>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="text-gray-700">|</span>
            <Link href="#" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
