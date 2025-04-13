import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyTag extends Document {
  company_name: string;
}

// Tag Schema
const CompanySchema = new Schema<ICompanyTag>(
  {
    company_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Company ||
  mongoose.model<ICompanyTag>("Company", CompanySchema);
