import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo-app";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

// Global cached connection interface for Node/Serverless environments
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongooseInstance) => {
                console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
                return mongooseInstance;
            })
            .catch((err) => {
                cached.promise = null; // Clear promise on error so retry is possible
                console.error("MongoDB connection error:", err);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    return cached.conn;
}

export default connectDB;