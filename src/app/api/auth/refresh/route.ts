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
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: "Refresh token is missing" },
                { status: 401 }
            );
        }

        const decoded = verifyRefreshToken(refreshToken);

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

        // Rotate refreshToken cookie (7 days)
        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
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
