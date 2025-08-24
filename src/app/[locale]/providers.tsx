"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
};

export default function ClientProviders({ children, messages, locale }: Props) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
