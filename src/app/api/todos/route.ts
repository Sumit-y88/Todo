import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";
import { createTodoSchema } from "@/lib/validations/todo";

export async function GET() {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        console.error("Fetch todos error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        const validation = createTodoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { title, description } = validation.data;

        await connectDB();

        const todo = await Todo.create({
            title,
            description,
            userId,
        });

        return NextResponse.json(
            { todo },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create todo error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}