import mongoose, { Schema, Document } from "mongoose";

// Ratings Subschema
interface IRating {
  platform: string;
  rating: string;
  link: string;
}

// User Interface
export interface IUser extends Document {
  full_name: string;
  email: string;
  username: string;
  password: string;
  ratings: IRating[];
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ratings: [
      {
        platform: { type: String, required: true },
        rating: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);