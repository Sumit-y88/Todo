import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
    try {
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
        }

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;

        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error: unknown) {
        console.error("Registration error:", error);
        if (typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 11000) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}