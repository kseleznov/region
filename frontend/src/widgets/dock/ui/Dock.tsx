"use client";

import { cn } from "@/shared/lib/cn";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HIDDEN_ROUTES, NAV_ITEMS } from "../model/constants";

export function Dock() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname as (typeof HIDDEN_ROUTES)[number])) {
    return null;
  }

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-28px)] max-w-[452px] bg-white/70 backdrop-blur-xl rounded-[26px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-around px-4 py-3 z-50">
      {NAV_ITEMS.map(({ icon: Icon, href, label }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} aria-label={label}>
            <div
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-[18px] transition-all duration-200",
                isActive && "bg-[#ede9fe]",
              )}
            >
              <Icon
                size={29}
                strokeWidth={1.5}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-[#5b21b6]" : "text-brand-gray",
                )}
              />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
