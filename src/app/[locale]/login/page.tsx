"use client";

import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { FaGoogle } from "react-icons/fa";
export default function LoginPage() {
  const t = useTranslations("project");
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {t("login.title")}
        </h1>
        <p className="mb-6 text-center text-gray-600">
          {t("login.description")}
        </p>

        <button
          onClick={() =>
            signIn("auth0", { callbackUrl: `/${locale}/products` })
          }
          className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          <FaGoogle />
          {t("login.button")}
        </button>
      </div>
    </div>
  );
}
