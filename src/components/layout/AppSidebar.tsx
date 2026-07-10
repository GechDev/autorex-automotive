"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItem {
  name: string;
  href: string;
  exact?: boolean;
  icon?: React.ReactNode;
}

interface AppSidebarProps {
  title: string;
  items: SidebarItem[];
}

export function AppSidebar({ title, items }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#1a1f36] text-white hidden md:block flex-shrink-0 h-full overflow-y-auto">
      <div className="py-6 px-8 border-b border-white/5">
        <h2 className="text-[12px] tracking-[0.2em] font-semibold text-slate-400 uppercase">{title}</h2>
      </div>
      <nav className="flex flex-col">
        {items.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-8 py-4 border-b border-white/5 transition-colors text-[14px] flex items-center ${
                isActive
                  ? "bg-white/10 font-bold text-white"
                  : "hover:bg-white/5 font-medium text-slate-300"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c90a07]" />
              )}
              {item.icon && (
                <span className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
              )}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
