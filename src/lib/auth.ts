import { cookies, headers } from "next/headers";
import connectDB from "@/lib/db";
import User, { IUser } from "@/models/User";
import { verifyAccessToken } from "@/lib/jwt";
import { auth } from "@/auth";

/**
 * Extracts and verifies the user ID from either the HTTP-only cookie or Authorization header.
 */
export async function getUserIdFromToken(): Promise<string | null> {
    const session = await auth();
    if (session?.user) {
        if (session.user.id && /^[0-9a-fA-F]{24}$/.test(session.user.id)) {
            return session.user.id;
        }
        if (session.user.email) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) return dbUser._id.toString();
        }
    }

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
    const session = await auth();
    if (session?.user) {
        await connectDB();
        if (session.user.id && /^[0-9a-fA-F]{24}$/.test(session.user.id)) {
            const user = await User.findById(session.user.id);
            if (user) return user;
        }
        if (session.user.email) {
            const user = await User.findOne({ email: session.user.email });
            if (user) return user;
        }
    }

    const userId = await getUserIdFromToken();
    if (!userId) {
        return null;
    }

    await connectDB();
    const user = await User.findById(userId);
    return user;
}
