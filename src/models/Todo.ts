import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
    title: string;
    description?: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;