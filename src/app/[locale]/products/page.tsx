import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductsPageClient from "./ProductsPageClient";

export const revalidate = 300;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "project",
  });

   const title = t("products.title");
  const description = t("products.description");

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/products`,
      languages: {
        en: `${SITE_URL}/en/products`,
        tr: `${SITE_URL}/tr/products`,
      },
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default function Page() {
  return <ProductsPageClient />;
}
