import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import environment from "./config/environment";
import authServices from "./service/auth.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        try {
          const result = await authServices.login({
            identifier,
            password,
          });

          if (result.status !== 200) return null;

          const accessToken = result.data.data;
          const me = await authServices.getProfileWithToken(accessToken);

          if (me.status !== 200) return null;

          const user = me.data.data;

          return {
            ...user,
            accessToken,
          };
        } catch (err) {
          console.error("Credentials login error:", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: environment.AUTH_SECRET,
  trustHost: true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.provider = "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
      };
      return session;
    },
  },
});
