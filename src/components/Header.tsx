"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";

const Header = () => {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("project");

  const switchHref = useMemo(() => {
    const parts = pathname.split("/");
    if (parts.length > 1) parts[1] = locale === "tr" ? "en" : "tr";
    return parts.join("/") || `/${locale === "tr" ? "en" : "tr"}`;
  }, [pathname, locale]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link
          href={`/${locale}`}
          className="text-xl font-bold tracking-tight hover:opacity-90 transition"
          aria-label="FakeStore Home"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            FakeStore
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            {t("home.home")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            {t("home.all_product")}
          </Link>

          <Link
            href={switchHref}
            aria-label="Switch language"
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 px-1 transition hover:bg-gray-300"
          >
            <span
              className={[
                "pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
                locale === "tr" ? "translate-x-0" : "translate-x-8",
              ].join(" ")}
            />
            <span className="pointer-events-none absolute left-2 text-[10px] font-semibold">
              TR
            </span>
            <span className="pointer-events-none absolute right-2 text-[10px] font-semibold">
              EN
            </span>
          </Link>

          <button className="relative">
            <FaShoppingCart size={20} />
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-4">
          <Link
            href={`/${locale}`}
            className="block hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            {t("home.home")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="block hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            {t("home.all_product")}
          </Link>

          <Link
            href={switchHref}
            aria-label="Switch language"
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 px-1 transition hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <span
              className={[
                "pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
                locale === "tr" ? "translate-x-0" : "translate-x-8",
              ].join(" ")}
            />
            <span className="pointer-events-none absolute left-2 text-[10px] font-semibold">
              TR
            </span>
            <span className="pointer-events-none absolute right-2 text-[10px] font-semibold">
              EN
            </span>
          </Link>

          <button
            className="relative"
            onClick={() => setIsOpen(false)}
            aria-label="Cart"
          >
            <FaShoppingCart size={20} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
//TODO : code review yapılıcak...