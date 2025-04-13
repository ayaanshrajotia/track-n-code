import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  user_id: string; // FK reference to User
  inventory_id: string;
  inventory_name: string;
  inventory_desc: string;
}

// Inventory Schema
const InventorySchema = new Schema<IInventory>(
  {
    user_id: { type: String, required: true, ref: "User" },
    inventory_name: { type: String, required: true },
    inventory_desc: { type: String },
    inventory_id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Inventory ||
  mongoose.model<IInventory>("Inventory", InventorySchema);
