/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tag_name: string;
  user_id?: mongoose.Schema.Types.ObjectId;
  tag_type?: string;
}

// Tag Schema
const TagSchema = new Schema<ITag>(
  {
    tag_name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
