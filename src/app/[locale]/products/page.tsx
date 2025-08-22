"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import Container from "@/components/Container";
import ProductsCard from "@/components/ProductsCard";
import FiltersBar from "@/components/FiltersBar";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"none" | "price-asc" | "price-desc">(
    "none"
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const { categories, isLoading: catLoading } = useCategories();
  const { products, isLoading, isError } = useProducts(selectedCategory);

  const filteredAndSorted = useMemo(() => {
    let list: Product[] = products ?? [];

    const min = minPrice ? parseFloat(minPrice) : Number.NEGATIVE_INFINITY;
    const max = maxPrice ? parseFloat(maxPrice) : Number.POSITIVE_INFINITY;

    list = list.filter((p) => p.price >= min && p.price <= max);

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, minPrice, maxPrice, sortBy]);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError)
    return <div className="text-red-600">Hata: {isError.message}</div>;
  if (!products || products.length === 0) return <div>Ürün bulunamadı.</div>;

  return (
    <Container className="flex items-start justify-between">
      <div className="w-full flex flex-col gap-6 pt-6">
        <FiltersBar
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          categories={catLoading ? [] : categories}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filteredAndSorted.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
}
