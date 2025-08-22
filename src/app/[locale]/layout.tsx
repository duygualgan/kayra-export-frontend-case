import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { getMessages } from "next-intl/server";
import ClientProviders from "./providers";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <ClientProviders messages={messages} locale={locale}>
          <Header />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </ClientProviders>
      </body>
    </html>
  );
}
//TODO: burdaki uyarı locale ile alakalı çözülücek...