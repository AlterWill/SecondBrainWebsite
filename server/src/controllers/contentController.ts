import { Request, Response } from "express";
import { ContentModel } from "../models/Content";

interface AuthRequest extends Request {
  userId?: string;
}

export const getUserContent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized: User ID not found in token" });
  }

  try {
    const result = await ContentModel.find({ userId: userId });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ success: false, error: "Error fetching content" });
  }
};

export const addContent = async (req: AuthRequest, res: Response) => {
  const { title, note } = req.body;
  const userId = req.userId; 

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized: User ID not found in token" });
  }
  if (!title?.trim() || !note?.trim()) {
    return res.status(400).json({ success: false, error: "Title and note are required" });
  }

  try {
    const newContent = await ContentModel.create({
      title: title.trim(),
      paragraph: note.trim(), 
      userId
    });

    return res.status(201).json({ success: true, data: newContent });

  } catch (error: any) {
    console.error("Error saving content:", error);
    if (error.code === 11000) {
     return res.status(400).json({ success: false, error: "You already have a note with this title." });
    }
    return res.status(500).json({ success: false, error: "Error saving content" });
  }
};
