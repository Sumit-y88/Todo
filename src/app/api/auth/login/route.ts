import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
    try {
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
        }

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        await connectDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (!user.password) {
            return NextResponse.json(
                { error: "This account was created using Google or GitHub. Please sign in with your social account." },
                { status: 401 }
            );
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        // Set tokens in HTTP-only cookies
        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 15,
            path: "/",
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        // Clear legacy refresh cookie scoped to /api/auth (pre-path-change sessions)
        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
            path: "/api/auth",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
