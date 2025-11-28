import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      nickname: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    userId: string;
    nickname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      userId: string;
      nickname: string;
    };
  }
}
