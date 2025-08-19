"use client";

import HomeProducts from "@/components/HomeProduct";
import ProductsList from "@/components/ProductsCard";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <h3 className="text-2xl font-bold mb-6">{t("description")}</h3>
      <HomeProducts />
    </div>
  );
}
