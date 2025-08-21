import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
