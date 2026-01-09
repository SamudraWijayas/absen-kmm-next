import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

/* =========================
   NEXT-AUTH AUGMENTATION
========================= */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      nama?: string;
    };
  }

  interface User {
    id: string;
    nama?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      nama?: string;
      accessToken?: string;
    };
  }
}

/* =========================
   APP TYPES
========================= */
interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  nama?: string;
  avatar?: string | FileList;
  username?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type {
  ILogin,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  IProfile,
  IUpdatePassword,
};
