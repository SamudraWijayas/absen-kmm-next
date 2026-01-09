import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  /**
   * HOME "/"
   * - boleh diakses sebelum login
   * - setelah login → redirect
   */
  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  /**
   * AUTH PAGES
   * - jika sudah login → redirect
   */
  if (pathname.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  /**
   * PROTECTED PAGES
   * - harus login
   */
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});
