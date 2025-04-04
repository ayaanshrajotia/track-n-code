import mongoose, { Schema, Document } from "mongoose";

export interface IProblemInventory extends Document {
  inventory_id: string; // FK reference to Inventory
  problem_id: string; // FK reference to Problem
}

// ProblemInventory Schema
const ProblemInventoryLookupSchema = new Schema<IProblemInventory>(
  {
    inventory_id: { type: String, required: true, ref: "Inventory" },
    problem_id: { type: String, required: true, ref: "Problem" },
  },
  { timestamps: true }
);

export default mongoose.models.ProblemInventoryLookup ||
  mongoose.model<IProblemInventory>("ProblemInventoryLookup", ProblemInventoryLookupSchema);
