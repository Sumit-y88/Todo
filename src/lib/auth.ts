import { cookies, headers } from "next/headers";
import connectDB from "@/lib/db";
import User, { IUser } from "@/models/User";
import { verifyAccessToken } from "@/lib/jwt";

/**
 * Extracts and verifies the user ID from either the HTTP-only cookie or Authorization header.
 */
export async function getUserIdFromToken(): Promise<string | null> {
    // 1. Check cookies first
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")?.value;

    // 2. Fallback to Authorization: Bearer header
    if (!token) {
        const headersList = await headers();
        const authHeader = headersList.get("authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7).trim();
        }
    }

    if (!token) {
        return null;
    }

    const decoded = verifyAccessToken(token);
    return decoded?.userId || null;
}

/**
 * Retrieves the full user document (excluding password) for the currently authenticated user.
 */
export async function getCurrentUser(): Promise<IUser | null> {
    const userId = await getUserIdFromToken();
    if (!userId) {
        return null;
    }

    await connectDB();
    const user = await User.findById(userId);
    return user;
}