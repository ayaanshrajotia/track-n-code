import mongoose, { Schema, Document } from "mongoose";

//  Clodudinary Config Schema
interface IProfileImage {
  public_id: string;
  url: string;
  secure_url: string;
}
// Ratings Subschema
interface IRating {
  platform: string;
  username: string;
  show: boolean;
}

// User Interface
export interface IUser extends Document {
  full_name: string;
  email: string;
  username: string;
  password: string;
  provider: string;
  profile_image: IProfileImage;
  ratings: IRating[];
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
    provider: { type: String, required: true },
    ratings: [
      {
        provider: { type: String, required: true },
        rating: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    profile_image: {
      public_id: { type: String },
      url: { type: String },
      secure_url: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
