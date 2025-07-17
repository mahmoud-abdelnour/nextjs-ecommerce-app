import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPaths = [
  "/user/dashboard", 
  "/user/orders", 
  "/user/address", 
  "/user/update-profile", 
  "/user/change-password", 
  "/user/logout",
  "/user/order",
];

const guestPaths = [
  "/auth/login",
  "/auth/register"
];




export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an API route or static file

  const token = await getToken({
    req: request,
   // secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isGuestPath = guestPaths.some((path) => pathname.startsWith(path));

  if (isAuthPath) {
    if (!token) {
      const signInUrl = new URL("/auth/login", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isGuestPath) {
    if (token) {
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  

  return NextResponse.next();
}

// Optionally specify paths middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/user/:path*",
    "/order/:path*",
    "/checkout/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};