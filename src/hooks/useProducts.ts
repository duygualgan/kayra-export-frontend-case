import useSWR from "swr";
import { Product } from "@/types/product";
import { fetcher } from "@/lib/fetcher";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com";

export const useProducts = () => {
  const { data, error, isLoading } = useSWR<Product[], Error>(
    `${BASE}/products`,
    fetcher,
    {
      revalidateOnFocus: false, // sayfa değişince tekrar çekmesin
      dedupingInterval: 60_000, // aynı veriyi 1 dk boyunca tekrar fetch etmesin
    }
  );

  return {
    products: data ?? [],
    isLoading,
    isError: error,
  };
};
