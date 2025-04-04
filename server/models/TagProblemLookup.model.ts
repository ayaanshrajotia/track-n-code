// create a tagProblemLookup
import mongoose, { Schema } from "mongoose";

export interface ITagProblemLookup {
  tag_id: Schema.Types.ObjectId | string;
  problem_id: Schema.Types.ObjectId | string;
  user_id: Schema.Types.ObjectId | string;
}

const TagProblemLookupSchema = new Schema<ITagProblemLookup>({
  tag_id: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
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
export default mongoose.models.TagProblemLookup ||
  mongoose.model<ITagProblemLookup>("TagProblemLookup", TagProblemLookupSchema);
