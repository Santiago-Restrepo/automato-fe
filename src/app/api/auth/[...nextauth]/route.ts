import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInOptions } from "next-auth/react";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as SignInOptions;
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
            {
              username,
              password,
            }
          );
          if (res.status === 200 && res.data?.access_token) {
            return res.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  cookies: {
    sessionToken: {
      name: "token",
      options: {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt(params) {
      const { token } = params;
      const user = params.user as any;
      if (user) {
        token.username = user.username;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session(params) {
      const { token } = params;
      const user = params.session?.user as any;
      if (user) {
        user.username = token.username as string;
        user.access_token = token.accessToken as string;
      }
      console.log("params.session", params.session);
      return params.session;
    },
  },
});

export { handler as GET, handler as POST };
