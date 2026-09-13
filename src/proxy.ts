import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes accessible only by unauthenticated users
const authRoutes = ["/login", "/register"];

// Routes that require authentication
const protectedRoutes = ["/todos", "/dashboard"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const isAuthenticated = Boolean(accessToken || refreshToken);

    const isAuthRoute = authRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    // 1. If user is authenticated and tries to access /login or /register, redirect to home
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. If user is unauthenticated and tries to access protected routes, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Next.js also supports `middleware` as alias for backward compatibility
export const middleware = proxy;

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (/api/*) -> handled by API route handlers directly
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static assets (.svg, .png, .jpg, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
