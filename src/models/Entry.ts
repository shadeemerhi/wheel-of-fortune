import mongoose, { Model } from "mongoose";
import { Entry } from "../util/gameTypes";

export const EntrySchema = new mongoose.Schema(
  {
    category: Object,
    spinAmount: Number,
    question: Object,
    providedAnswer: String,
    isCorrect: Boolean,
  },
  { timestamps: { createdAt: "createdAt" } }
);

export const EntryModel: Model<Entry> =
  mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
