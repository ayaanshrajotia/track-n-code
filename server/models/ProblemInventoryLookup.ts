import mongoose, { Schema, Document } from "mongoose";

export interface IProblemInventory extends Document {
  inventory_id: mongoose.Schema.Types.ObjectId; // FK reference to Inventory
  problem_id: mongoose.Schema.Types.ObjectId; // FK reference to Problem
  user_id: mongoose.Schema.Types.ObjectId; // FK reference to User
}

// ProblemInventory Schema
const ProblemInventoryLookupSchema = new Schema<IProblemInventory>({
  inventory_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Inventory",
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Problem",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.models.ProblemInventoryLookup ||
  mongoose.model<IProblemInventory>(
    "ProblemInventoryLookup",
    ProblemInventoryLookupSchema
  );
