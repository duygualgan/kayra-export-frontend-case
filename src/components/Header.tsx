"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";

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

  const totalCount = useAppSelector((s) =>
    s.cart.items.reduce((acc, it) => acc + it.quantity, 0)
  );

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
            aria-label="anasayfa"
          >
            {t("home.home")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="text-sm text-gray-700 hover:text-gray-900 transition"
            aria-label="Tüm Ürünler"
          >
            {t("home.all_product")}
          </Link>

          <Link
            href={switchHref}
            aria-label="Dil değiştir"
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

          <Link href={`/${locale}/cart`} className="relative" aria-label="sepet sayfasına git">
            <FaShoppingCart size={20} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {totalCount}
              </span>
            )}
          </Link>
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
            aria-label="anasayfa"
          >
            {t("home.home")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="block hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
            aria-label="tüm ürünler"
          >
            {t("home.all_product")}
          </Link>

          <Link
            href={switchHref}
            aria-label="Dil değiştir"
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

          <Link href={`/${locale}/cart`} className="relative" aria-label="Sepet sayfasına git">
            <FaShoppingCart size={20} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
//TODO : code review yapılıcak...
