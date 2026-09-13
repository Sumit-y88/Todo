import jwt from "jsonwebtoken";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export function generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15m" });
}

export function generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, accessTokenSecret) as { userId: string };
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, refreshTokenSecret) as { userId: string };
    } catch {
        return null;
    }
}
