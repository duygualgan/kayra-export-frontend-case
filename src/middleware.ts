import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/tr/cart") || pathname.startsWith("/en/cart")) {
      if (!token) {
        return NextResponse.redirect(new URL("/tr/login", req.url));
      }
    }
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

export const config = {
  matcher: ["/:locale/(admin|cart)"],
};