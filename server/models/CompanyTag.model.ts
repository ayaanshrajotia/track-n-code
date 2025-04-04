import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyTag extends Document {
  company_tag_name: string;
}

// Tag Schema
const CompanyTagSchema = new Schema<ICompanyTag>(
  {
    company_tag_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CompanyTag ||
  mongoose.model<ICompanyTag>("CompanyTag", CompanyTagSchema);
