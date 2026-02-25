import mongoose, { Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  paragraph: string;
  userId: mongoose.Types.ObjectId;
}

const ContentSchema = new mongoose.Schema<IContent>(
  {
    title: { type: String, index: true, required: true },
    paragraph: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ContentSchema.index({ userId: 1, title: 1 }, { unique: true });

export const ContentModel = mongoose.model<IContent>("Content", ContentSchema);
