import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_JWT_SECRET: string = process.env.ACCESS_JWT_SECRET || "default-secret-fallback";
const REFRESH_JWT_SECRET: string = process.env.REFRESH_JWT_SECRET || "refresh-secret-fallback";

export function createAccessToken(userId: Types.ObjectId): string {
  return jwt.sign({ id: userId.toString() }, ACCESS_JWT_SECRET, { expiresIn: "30m" });
}

export function verifyAccessToken(accessToken: string): string | jwt.JwtPayload | null {
  try {
    return jwt.verify(accessToken, ACCESS_JWT_SECRET);
  } catch {
    return null;
  }
}

export function createRefreshToken(userId: Types.ObjectId): string {
  return jwt.sign({ id: userId.toString() }, REFRESH_JWT_SECRET, { expiresIn: "7d" });
}

export function verifyRefreshToken(refreshToken: string): string | jwt.JwtPayload | null {
  try {
    return jwt.verify(refreshToken, REFRESH_JWT_SECRET);
  } catch {
    return null;
  }
}
