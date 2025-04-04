import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tag_name: string;
  user_id?: string;
  tag_type?: string;
}

// Tag Schema
const TagSchema = new Schema<ITag>(
  {
    tag_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tag_type: {
      type: String,
      enum: ["atomic", "cosmos"],
      default: "atomic",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
