import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes accessible only by unauthenticated users
const authRoutes = ["/login", "/register"];

// Routes that require authentication
const protectedRoutes = ["/todos", "/dashboard"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check custom JWT cookies as well as all Auth.js/NextAuth session cookies (including chunked ones)
    const hasAuthToken = request.cookies.getAll().some((cookie) =>
        cookie.name === "accessToken" ||
        cookie.name === "refreshToken" ||
        cookie.name.includes("session-token")
    );

    const isAuthRoute = authRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    // 1. If user is authenticated and tries to access /login or /register, redirect to /todos
    if (isAuthRoute && hasAuthToken) {
        return NextResponse.redirect(new URL("/todos", request.url));
    }

    // 2. If user is unauthenticated and tries to access protected routes, redirect to login
    if (isProtectedRoute && !hasAuthToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Support middleware export alias for backward compatibility
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
