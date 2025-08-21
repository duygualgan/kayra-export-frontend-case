import React from "react";
import ProductsCard from "./ProductsCard";
import Link from "next/link";
import { useLocale } from "next-intl";
import Container from "./Container";
import { useProducts } from "@/hooks/useProducts";
import { useTranslations } from "next-intl";


const HomeProducts = () => {
  const locale = useLocale();

  const t = useTranslations("project");

  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError)
    return <div className="text-red-600">Hata: {isError.message}</div>;
  if (!products || products.length === 0) return <div>Ürün bulunamadı.</div>;

  return (
    <Container className="flex items-center justify-between">
      <div className="flex flex-col items-center pt-14">
        <p className="text-2xl font-medium text-left w-full">
          {t("home.popular_product")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col items-center gap-6 mt-6 pb-14 w-full">
          {products.slice(0, 4).map((product, index) => (
            <ProductsCard key={index} product={product} />
          ))}
        </div>
        <Link href={`/${locale}/products`}>
          <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            {t("home.see_more")}
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default HomeProducts;
