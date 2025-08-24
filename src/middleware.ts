/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from "next-auth/middleware";
import { NextResponse, type NextFetchEvent } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function middleware() {
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
    pages: {
      signIn: "/tr/login",
    },
  }
);

export default async function middleware(req: any, event: NextFetchEvent) {
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isAuthCallback = req.nextUrl.pathname.startsWith("/api/auth/callback");

  if (!isAuthRoute && !isAuthCallback) {
    const nextIntlResult = nextIntlMiddleware(req);
    if (nextIntlResult) {
      return nextIntlResult;
    }
  }

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};