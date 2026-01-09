import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import environment from "@/config/environment";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

// buat handler NextAuth
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        if (!credentials) {
          console.error("Tidak ada kredensial yang diterima");
          return null;
        }

        const { identifier, password } = credentials;
        console.log(
          "Mencoba login dengan identifier:",
          identifier,
          "dan password: [hidden]"
        ); // Log untuk debug

        try {
          const result = await authServices.login({ identifier, password });
          console.log("Hasil dari authServices.login:", result); // Log selengkapnya

          if (result.status !== 200) {
            console.error(
              "authServices.login gagal: Status =",
              result.status,
              "Pesan:"
            );
            return null;
          }

          const accessToken = result.data.data;
          const me = await authServices.getProfileWithToken(accessToken);
          console.log("Hasil dari authServices.getProfileWithToken:", me);

          if (me.status !== 200) {
            console.error("authServices.getProfile gagal: Status =", me.status);
            return null;
          }

          const user = me.data.data;

          if (accessToken && user.id) {
            user.accessToken = accessToken;
            return user;
          } else {
            console.error("AccessToken atau user.id tidak valid");
            return null;
          }
        } catch (error) {
          console.error("Error umum di authorize:", error); // Log error apa saja
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) token.user = user;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};

// export handler untuk metode HTTP sesuai App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
