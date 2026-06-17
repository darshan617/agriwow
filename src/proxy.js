import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("userToken")?.value;
  const { pathname } = request.nextUrl;

  //   const publicRoutes = ["/auth/login", "/auth/signup"];

  //   const protectedRoutes = ["/my-order", "/my-profile"];

  //   // Protected route
  //   if (protectedRoutes.includes(pathname) && !token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   // Logged-in user shouldn't visit login/signup
  //   if (publicRoutes.includes(pathname) && token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}
export const config = {
  matcher: ["/my-order/:path*", "/my-profile/:path*"],
};
