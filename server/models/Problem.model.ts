/* eslint-disable @typescript-eslint/no-explicit-any */
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
  tags: {
    tag_id: mongoose.Schema.Types.ObjectId; // FK reference to Tag
    tag_name: string;
  }[]; // FK reference to Tag
  inventories: {
    inventory_id: mongoose.Schema.Types.ObjectId; // FK reference to Inventory
    inventory_name: string;
  }[]; // FK reference to Inventory
  companies: {
    company_id: mongoose.Schema.Types.ObjectId; // FK reference to Company
    company_name: string;
  }[]; // FK reference to
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
    tags: [
      {
        tag_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tag",
        },
        tag_name: { type: String },
      },
    ],
    inventories: [
      {
        inventory_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory",
        },
        inventory_name: { type: String },
      },
    ],
    companies: [
      {
        company_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
        company_name: { type: String },
      },
    ],
  },
  { timestamps: true }
);

ProblemSchema.index({ user_id: 1, inventories: 1 });
ProblemSchema.index({ user_id: 1, "tags.tag_id": 1 });
ProblemSchema.index({ user_id: 1, "companies.company_id": 1 });
ProblemSchema.index({ user_id: 1, problem_id: 1 }, { unique: true });
ProblemSchema.index({ user_id: 1, difficulty: 1 });
ProblemSchema.index({ user_id: 1, platform_name: 1 });
ProblemSchema.index({ user_id: 1, problem_title: 1 });
ProblemSchema.index({ problem_title: "text" });
ProblemSchema.index({ user_id: 1, is_rev: 1 });

// deletng the problem will erase its tagslookups and inventorylookups and companylookups

export default mongoose.models.Problem ||
  mongoose.model<IProblem>("Problem", ProblemSchema);
