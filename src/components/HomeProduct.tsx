import React from "react";
import ProductsList from "./ProductsCard";
import useSWR from "swr";
// import Image from "next/image"
import { Product } from "@/types/product";
import { fetcher } from "@/lib/fetcher";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com";

const HomeProducts = () => {
  const { data, error, isLoading } = useSWR<Product[], Error>(
    `${BASE}/products`,
    (url) => fetcher<Product[]>(url),
    {
      revalidateOnFocus: true,
      dedupingInterval: 60_000, 
    }
  )

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-600">Hata: {error.message}</div>;
  if (!data || data.length === 0) return <div>Ürün bulunamadı.</div>;

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {data.map((product, index) => (
          <ProductsList key={index} product={product} />
        ))}
      </div>
      <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
