import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const { auth, handlers } = NextAuth({
  // Auth.js reads each provider's client ID and secret from AUTH_* variables.
  providers: [GitHub({}), Google({})],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name?.trim() || user.email.split("@")[0],
          email: user.email,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) token.userId = dbUser._id.toString();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.userId === "string") {
        session.user.id = token.userId;
      }

      return session;
    },
  },
});
