import axios from "axios";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      username: string;
    } & DefaultSession["user"];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        access_token: { label: "Access Token", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials;
          const res = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
            {
              username,
              password,
            }
          );
          if (res.status === 200 && res.data?.access_token) return res.data;

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      const token = params.token;
      const user = params.user as any;
      if (user) {
        token.access_token = user.access_token as string;
        token.username = user.username as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.access_token = token.access_token as string;
      return session;
    },
  },
});
