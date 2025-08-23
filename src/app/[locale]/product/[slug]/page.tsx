import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getIdFromSlug } from "@/utils/slug";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function getProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    return null;
  }
  const product = await response.json();
  return product;
}

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "project",
  });

  const id = getIdFromSlug(params.slug);
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const title = `${product.title} | FakeStore`;
  const description = product.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/product/${params.slug}`,
      languages: {
        en: `${SITE_URL}/en/product/${params.slug}`,
        tr: `${SITE_URL}/tr/product/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default function Page({ params }: ProductPageProps) {
  const id = getIdFromSlug(params.slug);
  return <ProductDetailClient id={id} />;
}
