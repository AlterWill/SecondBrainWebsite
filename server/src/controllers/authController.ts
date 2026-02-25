import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "15");
const convertDaysToMilliSeconds = 24 * 60 * 60 * 1000;

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

async function hashCompare(password: string, hashPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashPassword);
}

export const signup = async (req: Request, res: Response) => {
  const { username, password, repassword } = req.body;
  if (!username || !password || !repassword) {
    return res.status(400).send({ error: "empty values" });
  }
  if (password != repassword) {
    return res.status(400).send({ error: "Non matching passwords" });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({ username, passwordHash: hashedPassword });
    
    // @ts-ignore - mongoose _id type compatibility
    const accessToken = createAccessToken(user._id);
    // @ts-ignore
    const refreshToken = createRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, { refreshToken: [refreshToken] });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * convertDaysToMilliSeconds,
    });

    res.status(200).send({ accessToken });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ error: "values can't be blank" });
  }

  try {
    const userDBInfo = await UserModel.findOne({ username });
    if (!userDBInfo) {
      return res.status(400).send({ error: "user don't exist" });
    }

    const isSamePassword = await hashCompare(password, userDBInfo.passwordHash);
    if (!isSamePassword) {
      return res.status(400).send({ error: "Incorrect password" });
    }

    // @ts-ignore
    const accessToken = createAccessToken(userDBInfo._id);
    // @ts-ignore
    const refreshToken = createRefreshToken(userDBInfo._id);

    // Note: This logic overwrites previous tokens. Consider $push if you want multiple sessions.
    await UserModel.findByIdAndUpdate(userDBInfo._id, { refreshToken: [refreshToken] });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * convertDaysToMilliSeconds,
    });

    res.status(200).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const logout = (req: Request, res: Response) => {
    // Implement logout logic (e.g., clearing cookie, removing refresh token from DB)
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
};

export const refresh = (req: Request, res: Response) => {
    // Implement refresh logic
    res.json({ message: "Refresh endpoint" });
};
