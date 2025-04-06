/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Problem from "@/server/models/Problem.model";
import {
  isNullOrEmpty,
  isStringEmpty,
  isVariableObject,
} from "../utils/data_validator.util";
import mongoose from "mongoose";
import { addInventoryToProblem } from "../services/inventory.service";
import { addManyTags } from "../services/tag.service";
import { addToCompanyProblemLookup } from "../services/company.service";
// import { addManyTags } from "../services/tag.service";

export const addProblemHandler = async (req: NextRequest) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;
    const data = await req.json();

    if (
      isNullOrEmpty(data.problem_title) ||
      isStringEmpty(data.problem_title)
    ) {
      throw new Error("Problem title is required");
    }

    // check if the platform is present in the request body
    if (
      isNullOrEmpty(data.platform_name) ||
      isStringEmpty(data.platform_name)
    ) {
      throw new Error("Platform name is required");
    }

    // check if the inventories array is present
    if (!Array.isArray(data.inventories) || data.inventories.length == 0) {
      throw new Error("Inventories array is not correct or empty");
    }

    // check if the problem title already exists
    const existingProblem = await Problem.findOne({
      problem_title: data.problem_title,
      user_id: user._id,
    });

    if (existingProblem) {
      throw new Error("Problem with the same title already exists");
    }

    // generate a unique id for the problem and create the problem
    const problems = await Problem.insertMany(
      [
        {
          problem_title: data.problem_title,
          user_id: user._id,
          problem_id: uuidv4(),
          url: data.url || "",
          difficulty: data.difficulty || "Unknown",
          is_rev: data.is_rev || false,
          notes: data.notes || "",
          time_complexity: data.time_complexity || "Unknown",
          space_complexity: data.space_complexity || "Unknown",
          platform_name: data.platform_name,
          resources: data.resources || [],
        },
      ],
      {
        session: session,
      }
    );

    const problem = problems[0].toObject();
    problem.user_id = undefined;
    problem.__v = undefined;

    // adding the inventory to the problems
    problem.inventories = await addInventoryToProblem(
      data.inventories,
      user._id,
      problem._id,
      session
    );

    // adding the tags to the problem
    problem.tags = await addManyTags(
      data.tags || [],
      user._id,
      session,
      problem._id
    );

    // adding company tags to the problem
    if (Array.isArray(data.company_tags) && data.company_tags.length > 0) {
      problem.company_tags = await addToCompanyProblemLookup(
        data.company_tags,
        problem._id,
        user._id,
        session
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return NextResponse.json({
      success: true,
      result: problem,
      message: "Problem added successfully",
      error: null,
    });
  } catch (error: any) {
    console.error("Error in addProblemHandler: ", error);
    await session.abortTransaction();
    await session.endSession();
    return NextResponse.json(
      {
        success: false,
        result: null,
        error: isVariableObject(error) ? error.message : error,
      },
      { status: 500 }
    );
  }
};
