"use client";

import HomeProducts from "@/components/HomeProduct";
import { useTranslations } from "next-intl";

export default function HomeClient() {
  const t = useTranslations("project");

  return (
    <>
      <div>
        <div className="w-full min-h-[45vh] flex flex-col items-center justify-center p-8 text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
            {t("home.title")}
          </h1>
          <h3 className="text-xl md:text-2xl font-medium text-center max-w-2xl">
            {t("home.description")}
          </h3>
        </div>
        <HomeProducts />
      </div>
    </>
  );
}
