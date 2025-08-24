"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { useSession, signOut } from "next-auth/react";

const NavMenu = ({ handleClose }: { handleClose: () => void }) => {
  const t = useTranslations("project");
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const { data: session, status } = useSession();
  const totalCount = useAppSelector((s) =>
    s.cart.items.reduce((acc, it) => acc + it.quantity, 0)
  );

  const switchHref = useMemo(() => {
    const parts = pathname.split("/");
    if (parts.length > 1) parts[1] = locale === "tr" ? "en" : "tr";
    return parts.join("/") || `/${locale === "tr" ? "en" : "tr"}`;
  }, [pathname, locale]);

  return (
    <>
      <Link
        href={`/${locale}`}
        className="text-sm text-gray-700 hover:text-gray-900 transition"
        aria-label={t("home.home")}
        onClick={handleClose}
      >
        {t("home.home")}
      </Link>
      <Link
        href={`/${locale}/products`}
        className="text-sm text-gray-700 hover:text-gray-900 transition"
        aria-label={t("home.all_product")}
        onClick={handleClose}
      >
        {t("home.all_product")}
      </Link>

      {status === "loading" ? (
        <div className="w-5 h-5"></div>
      ) : (
        <>
          {session ? (
            <button
              onClick={() => {
                signOut({ callbackUrl: `/${locale}` });
                handleClose();
              }}
              className="text-sm text-gray-700 hover:text-gray-900 transition"
              aria-label={t("login.logout")}
            >
              {t("login.logout")}
            </button>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="text-sm text-gray-700 hover:text-gray-900 transition"
              aria-label={t("login.login")}
              onClick={handleClose}
            >
              {t("login.login")}
            </Link>
          )}
        </>
      )}

      <Link
        href={switchHref}
        aria-label={t("home.switch_language")}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 px-1 transition hover:bg-gray-300"
        onClick={handleClose}
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

      <Link
        href={`/${locale}/cart`}
        className="relative"
        aria-label={t("home.go_to_cart")}
        onClick={handleClose}
      >
        <FaShoppingCart size={20} />
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
            {totalCount}
          </span>
        )}
      </Link>
    </>
  );
};

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("project");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link
          href={`/${locale}`}
          className="text-xl font-bold tracking-tight hover:opacity-90 transition"
          aria-label={t("home.title")}
        >
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            FakeStore
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavMenu handleClose={() => setIsOpen(false)} />
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t("home.menu_toggle")}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-4 flex flex-col items-start">
          <NavMenu handleClose={() => setIsOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;