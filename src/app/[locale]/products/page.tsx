"use client"

import { useProducts } from "@/hooks/useProducts";
import ProductsCard from "@/components/ProductsCard";
import Container from "@/components/Container";
import { useLocale } from "next-intl";

const ProductsPage = () => {
 
  const locale = useLocale();

  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError)
    return <div className="text-red-600">Hata: {isError.message}</div>;
  if (!products || products.length === 0) return <div>Ürün bulunamadı.</div>;

  return (
    <Container className="flex items-center justify-between">
      <div className="flex flex-col items-center pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col items-center gap-6 mt-6 pb-14 w-full">
          {products.map((product, index) => (
            <ProductsCard key={index} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductsPage;
