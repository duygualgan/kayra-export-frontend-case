"use client";

import HomeProducts from "@/components/HomeProduct";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("project");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("home.title")}</h1>
      <h3 className="text-2xl font-bold mb-6">{t("home.description")}</h3>
      <HomeProducts />
    </div>
  );
}
