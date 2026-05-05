"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "../_lib/constants";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoSrc = `${basePath}/mensa-empresarios-logo.svg`;

type TopBarProps = {
  navItems: NavItem[];
};

export function TopBar({ navItems }: TopBarProps) {
  const pathname = usePathname();

  const isNavItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="linkedin-topbar sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-md px-1 py-1 transition hover:bg-slate-100/70">
          <Image
            src={logoSrc}
            alt="Logo Mensa Empresarios"
            width={34}
            height={34}
            priority
          />
          <p className="text-sm font-semibold text-slate-900">Mensa Empresarios</p>
        </Link>

        <div className="ml-auto flex w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-xs uppercase tracking-wide text-slate-500">Buscar</span>
          <p className="truncate text-sm text-slate-500">Perfiles, experiencias, ideas</p>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`linkedin-nav-item ${
                isNavItemActive(item.href) ? "is-active" : ""
              }`}
            >
              <span className="linkedin-nav-dot" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
