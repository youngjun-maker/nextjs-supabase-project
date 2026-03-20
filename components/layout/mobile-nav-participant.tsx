"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

// 참여자용 네비게이션: "새 이벤트" 탭 제거, "내 이벤트" -> "참여 이벤트"
const navItems = [
  { href: "/events", label: "참여 이벤트", icon: Calendar },
  { href: "/profile", label: "프로필", icon: User },
];

export function MobileNavParticipant() {
  const pathname = usePathname();

  return (
    <nav className="h-16 border-t bg-background shrink-0">
      <div className="flex h-full items-center justify-around px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/events"
              ? pathname === "/events" || pathname.startsWith("/events/")
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
