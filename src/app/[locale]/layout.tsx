import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { getMessages } from "next-intl/server";
import './globals.css';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
  );
}
