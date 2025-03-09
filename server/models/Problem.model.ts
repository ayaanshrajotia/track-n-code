import mongoose, { Schema, Document } from "mongoose";

export interface IProblem extends Document {
  user_id: string; // FK reference to User
  problem_title: string;
  platform_name: string;
  time_complexity: string;
  space_complexity: string;
  resources: string[];
  notes: string;
  url: string;
  is_rev: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  problem_tags: mongoose.Types.ObjectId[]; // References Tag model
  is_solved: boolean;
  tag_ids: string[];
}

// Problem Schema
const ProblemSchema = new Schema<IProblem>(
  {
    user_id: { type: String, required: true, ref: "User" },
    problem_title: { type: String, required: true },
    platform_name: { type: String, required: true },
    time_complexity: { type: String, required: true },
    space_complexity: { type: String, required: true },
    resources: [{ type: String }],
    notes: { type: String },
    url: { type: String },
    is_rev: { type: Boolean, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    problem_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    is_solved: { type: Boolean, default: true },
    tag_ids: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Problem || mongoose.model<IProblem>("Problem", ProblemSchema);
