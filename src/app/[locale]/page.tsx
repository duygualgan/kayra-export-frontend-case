import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
  params: { locale: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "project",
  });

  const title = t("home.title");
  const description = t("home.description");

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
