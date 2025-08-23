import React from "react";
import ProductsCard from "./ProductsCard";
import Link from "next/link";
import { useLocale } from "next-intl";
import Container from "./Container";
import { useProducts } from "@/hooks/useProducts";
import { useTranslations } from "next-intl";
import Spinner from "./Spinner";

const HomeProducts = () => {
  const locale = useLocale();

  const t = useTranslations("project");

  const { products, isLoading } = useProducts();

  return (
    <>
      {!products ? null : (
        <Container className="flex items-center justify-between">
          {isLoading ? (
            <Container className="flex items-center justify-center min-h-[60vh]">
              <Spinner />
            </Container>
          ) : (
            <div className="flex flex-col items-center pt-14">
              <p className="text-2xl font-medium text-left w-full">
                {t("home.popular_product")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col items-center gap-6 mt-6 pb-14 w-full">
                {products.slice(0, 4).map((product, index) => (
                  <ProductsCard key={index} product={product} />
                ))}
              </div>
              <Link
                href={`/${locale}/products`}
                aria-label="Daha fazla ürün gör"
                className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
              >
                {t("home.see_more")}
              </Link>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default HomeProducts;
