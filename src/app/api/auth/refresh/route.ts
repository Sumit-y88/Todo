import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "@/lib/jwt";

export async function POST() {
    try {
        const cookieStore = await cookies();
        // A cookie with the new path "/" and a legacy cookie with path
        // "/api/auth" can both arrive as "refreshToken" — try each until
        // one verifies so sessions from before the path change keep working.
        const refreshTokens = cookieStore
            .getAll()
            .filter((cookie) => cookie.name === "refreshToken")
            .map((cookie) => cookie.value);

        let decoded: { userId: string } | null = null;
        for (const token of refreshTokens) {
            decoded = verifyRefreshToken(token);
            if (decoded?.userId) break;
        }

        if (!decoded || !decoded.userId) {
            return NextResponse.json(
                { error: "Invalid or expired refresh token" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(decoded.userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user._id.toString());
        const newRefreshToken = generateRefreshToken(user._id.toString());

        const response = NextResponse.json(
            {
                message: "Token refreshed successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        // Update accessToken cookie (15 mins)
        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 15,
            path: "/",
        });

        // Rotate refreshToken cookie (7 days) — path "/" so middleware can
        // see it and keep the user signed in between access-token expiries
        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        // Clear legacy refresh cookie scoped to /api/auth
        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
            path: "/api/auth",
        });

        return response;
    } catch (error) {
        console.error("Token refresh error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
