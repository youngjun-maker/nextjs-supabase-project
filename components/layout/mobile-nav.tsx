"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/events", label: "내 이벤트", icon: Calendar },
  { href: "/events/new", label: "새 이벤트", icon: Plus },
  { href: "/profile", label: "프로필", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-background">
      <div className="flex h-full items-center justify-around px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/events"
              ? pathname === "/events" || (pathname.startsWith("/events") && pathname !== "/events/new")
              : pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors",
                isActive
                  ? "text-emerald-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={22} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
