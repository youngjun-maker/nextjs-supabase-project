"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { href: "/admin/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/events", label: "이벤트 관리", icon: Calendar },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/analytics", label: "통계 분석", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <aside className="flex h-screen w-60 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center px-6 border-b border-gray-700">
        <span className="text-lg font-bold text-emerald-400">Gather Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-12 items-center gap-3 rounded-lg px-4 text-sm transition-colors",
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex h-12 w-full items-center gap-3 rounded-lg px-4 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
