import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Fetch current user error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
