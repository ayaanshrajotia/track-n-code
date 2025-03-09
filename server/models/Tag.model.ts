import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tag_name: string;
  user_id: string; // FK reference to User
}

// Tag Schema
const TagSchema = new Schema<ITag>(
  {
    tag_name: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
