"use client";

import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="px-3 border-b">
      <div className="flex h-14 items-center gap-6">
        <NavLink href="/home" active={isActive("/home")}>
          MAIN
        </NavLink>

        <NavLink href="/post" active={isActive("/post")}>
          POST
        </NavLink>

        <Link href="/my" className="ml-auto">
          <LayoutGrid />
        </Link>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-full items-center text-sm text-neutral-600 transition-colors",
        active && "font-bold text-neutral-900"
      )}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-neutral-900" />
      )}
    </Link>
  );
}
