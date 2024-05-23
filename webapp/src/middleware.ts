// export function middleware(request: Request) {
//   // Store current request url in a custom header, which you can read later
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-url", request.url);
//   return NextResponse.next({
//     request: {
//       // Apply new request headers
//       headers: requestHeaders,
//     },
//   });
// }
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY } from "./common/constants/variables";

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const currentUser = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  console.log("currentUser", currentUser);

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
