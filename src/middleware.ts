import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // 2. Get the current path
  const { pathname } = request.nextUrl;

  // 3. Define paths that should NOT be accessible if logged in
  const authRoutes = ["/login", "/register"];

  // 4. Logic: If user has a token AND is trying to access login/register
  if (token && authRoutes.includes(pathname)) {
    // Redirect them to home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// 5. Configuration: Only run this middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)login
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
