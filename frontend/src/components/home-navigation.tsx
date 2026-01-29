"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Order", href: "/order" },
  { title: "Products", href: "/products" },
  { title: "Sales", href: "/sales" },
  { title: "Settings", href: "/settings" },
];

export const HomeNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 border-t px-4 bg-secondary rounded-full shadow-xs">
      {menuItems.map((item) => {
        const isActive =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "text-muted-foreground hover:text-foreground",
              isActive &&
                "border-b-2 border-primary text-foreground"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
