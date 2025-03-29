import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        // If a token is provided, verify it locally using the shared secret.
        if (credentials.token) {
          try {
            console.log("Received JWT:", credentials.token);
            const decoded = jwt.verify(
              credentials.token,
              process.env.JWT_SECRET
            );
            console.log("Decoded JWT:", decoded);
            return {
              id: decoded.id,
              email: decoded.email, // Now available from updated JWT
              confirmed: true,
              jwt: credentials.token,
            };
          } catch (error) {
            console.error("JWT verification error:", error);
            return null;
          }
        }

        // Normal email/password authentication...
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const data = await res.json();
        if (res.ok && data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            confirmed: data.user.confirmed,
            jwt: data.jwt,
          };
        }
        return null;
      },
    }),
    // Google & Facebook providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;

        if (
          account &&
          (account.provider === "google" || account.provider === "facebook")
        ) {
          token.confirmed = true;
        } else {
          token.confirmed = user.confirmed;
        }
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        confirmed: token.confirmed,
        jwt: token.jwt,
      };
      return session;
    },
  },
  httpOptions: {
    timeout: 10000,
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
