// create a tagProblemLookup
import mongoose, { Schema } from "mongoose";

export interface ICompanyProblemLookup {
  company_tag_id: Schema.Types.ObjectId | string;
  problem_id: Schema.Types.ObjectId | string;
  user_id: Schema.Types.ObjectId | string;
}

const CompanyProblemLookupSchema = new Schema<ICompanyProblemLookup>({
  company_tag_id: {
    type: Schema.Types.ObjectId,
    ref: "CompanyTag",
  },
  problem_id: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.CompanyProblemLookup ||
  mongoose.model<ICompanyProblemLookup>(
    "CompanyProblemLookup",
    CompanyProblemLookupSchema
  );
