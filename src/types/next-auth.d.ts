/* eslint-disable */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }

  interface User {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
  }
}
