"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, CalendarCheck2, CalendarDays, Circle, CreditCard, FileCheck2, GraduationCap, Home, LayoutGrid, Megaphone, UserSquare2, Users, Video, Wallet, WalletCards } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/masterclass", label: "Masterclass", icon: Video, exact: true },
  { href: "/dashboard/masterclass-zoom-join", label: "Masterclass Zoom Join", icon: Video, exact: true },
  { href: "/dashboard/students", label: "Students", icon: GraduationCap },
  { href: "/dashboard/batches", label: "Batches", icon: LayoutGrid },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/attendance", label: "Attendance", icon: CalendarCheck2 },
  { href: "/dashboard/influencer", label: "Influencer", icon: Megaphone },
  { href: "/dashboard/affiliate", label: "Affiliate", icon: WalletCards },
  { href: "/dashboard/certificates", label: "Certificates", icon: FileCheck2 },
  { href: "/dashboard/employees", label: "Employees", icon: Briefcase },

  {
    label: "Team Hub",
    href: "/dashboard/team",
  },
  {
    label: "Employees",
    href: "/dashboard/employees",
  },
  {
    label: "Attendance",
    href: "/dashboard/employees/attendance",
  },
  {
    label: "Students",
    href: "/dashboard/students",
  },
  {
    label: "Collections",
    href: "/dashboard/students/collections",
  },

];

export default function SidebarNav() {
  const pathname = usePathname() || "";

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="mt-6 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon || Circle;
        const active = isActive(item.href, item.exact);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              active
                ? "bg-[#0F172A] text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            ].join(" ")}
          >
            {(() => { const SafeIcon = Icon as any; return <SafeIcon className="h-4 w-4 shrink-0" />; })()}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
