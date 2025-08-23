import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CartPage from "./CartPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

interface CartPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "project",
  });

  const title = t("cart.title"); 
  const description = t("cart.description"); 

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/cart`,
      languages: {
        en: `${SITE_URL}/en/cart`,
        tr: `${SITE_URL}/tr/cart`,
      },
    },
  };
}

export default function Page() {
  return <CartPage />;
}