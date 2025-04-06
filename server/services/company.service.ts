/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import CompanyProblemLookup from "../models/CompanyProblemLookup";
import CompanyTag from "../models/CompanyTag.model";

export const addToCompanyProblemLookup = async (
  companyTags: string[],
  problemId: string,
  userId: string,
  session: any
) => {
  try {
    // first fetching all the company tags from the database
    const allCompanies = await CompanyTag.find({}).select(
      "_id company_tag_name"
    );

    const companyTagIds = allCompanies.map((tag) => tag._id.toString());

    // filtering and matching the string ids with the company tag ids
    const matchingTags = companyTags.filter((tag) =>
      companyTagIds.includes(tag)
    );

    const companies = allCompanies.filter((tag) =>
      matchingTags.includes(tag._id.toString())
    );
    // now add the ids to the company problem lookup collection
    await CompanyProblemLookup.insertMany(
      matchingTags.map((tag) => ({
        company_tag_id: new mongoose.Types.ObjectId(tag),
        problem_id: problemId,
        user_id: userId,
      })),
      { session }
    );

    return companies;
  } catch (error) {
    console.error("Error adding to CompanyProblemLookup:", error);
    throw error;
  }
};
