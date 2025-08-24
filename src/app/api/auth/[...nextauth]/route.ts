/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { decodeJwt } from "jose";


if (
    !process.env.AUTH0_CLIENT_ID ||
    !process.env.AUTH0_CLIENT_SECRET ||
    !process.env.AUTH0_ISSUER ||
    !process.env.NEXTAUTH_SECRET
) {
    throw new Error(
        "Auth0 ve NextAuth ortam değişkenleri eksik. Lütfen .env.local dosyasını kontrol edin."
    );
}

const handler = NextAuth({
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account && account.id_token) {
                try {
                    const decodedToken = decodeJwt(account.id_token);
                    const role = (decodedToken as any)["http://localhost:3000/tr/admin"];

                    if (role) {
                        token.role = role;
                    }
                } catch (error) {
                    console.error("Token çözümleme hatası:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token.role) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/tr/login",
    },
});

export { handler as GET, handler as POST };