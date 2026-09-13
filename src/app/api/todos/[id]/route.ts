import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { getUserIdFromToken } from "@/lib/auth";
import { updateTodoSchema } from "@/lib/validations/todo";

async function handleUpdate(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
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

        const validation = updateTodoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        await connectDB();

        // Update only the fields provided in validation.data
        const todo = await Todo.findOneAndUpdate(
            {
                _id: id,
                userId,
            },
            {
                $set: validation.data,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ todo }, { status: 200 });
    } catch (err) {
        console.error("Update todo error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
        }

        await connectDB();

        const todo = await Todo.findOne({
            _id: id,
            userId,
        });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ todo }, { status: 200 });
    } catch (err) {
        console.error("Get todo error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    return handleUpdate(req, context);
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    return handleUpdate(req, context);
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
        }

        await connectDB();

        const todo = await Todo.findOneAndDelete({
            _id: id,
            userId,
        });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Todo deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Delete todo error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
