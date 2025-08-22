"use client";

import useSWR from "swr";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export const useCategories = () => {
  const { data, error, isLoading } = useSWR<string[], Error>(
    `${BASE}/products/categories`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    }
  );

  return {
    categories: data ?? [],
    isLoading,
    isError: error,
  };
};
