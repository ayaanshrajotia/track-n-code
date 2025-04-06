import mongoose, { Schema, Document } from "mongoose";

export interface IProblem extends Document {
  problem_id: string;
  user_id: mongoose.Schema.Types.ObjectId; // FK reference to User
  problem_title: string;
  platform_name: string;
  time_complexity: string;
  space_complexity: string;
  resources: string[];
  notes: string;
  url: string;
  is_rev: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Unknown";
}

// Problem Schema
const ProblemSchema = new Schema<IProblem>(
  {
    problem_id: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    problem_title: { type: String, required: true },
    platform_name: { type: String, required: true },
    time_complexity: { type: String, default: "Unknown" },
    space_complexity: { type: String, default: "Unknown" },
    resources: [{ type: String }],
    notes: { type: String },
    url: { type: String },
    is_rev: { type: Boolean, required: true, default: false },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Unknown"],
      default: "Unknown",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Problem ||
  mongoose.model<IProblem>("Problem", ProblemSchema);
