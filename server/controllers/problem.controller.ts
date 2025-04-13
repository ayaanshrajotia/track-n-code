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
      user_id: user._id,
      problem_title: data.problem_title,
    });

    if (existingProblem) {
      throw new Error("Problem with the same name already exists");
    }

    // check if the tags array is present
    if (!Array.isArray(data.tags) || data.tags.length == 0) {
      throw new Error("Please add at least one tag");
    }

    // check if the inventories array is present
    if (!Array.isArray(data.inventories) || data.inventories.length == 0) {
      throw new Error("Please add at least one inventory");
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
          companies: data.companies || [],
          tags: data.tags || [],
          inventories: data.inventories || [],
        },
      ],
      {
        session: session,
      }
    );

    await session.commitTransaction();
    await session.endSession();

    return NextResponse.json({
      success: true,
      result: problems[0],
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

export const getSingleProblemHandler = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;
    const url = new URL(req.url);
    const problem_id = url.searchParams.get("problem_id");

    if (isNullOrEmpty(problem_id) || isStringEmpty(problem_id || "")) {
      throw new Error("Problem id is required");
    }

    // check if the problem exists
    const problem = await Problem.findOne({
      user_id: user._id,
      problem_id: problem_id,
    });

    if (!problem) {
      throw new Error("Problem not found");
    }

    return NextResponse.json({
      success: true,
      result: problem,
      message: "Problem fetched successfully",
      error: null,
    });
  } catch (error: any) {
    console.error("Error in getSingleProblemHandler: ", error);
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

export const deleteProblemHandler = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;
    const url = new URL(req.url);
    const problem_id = url.searchParams.get("problem_id");

    if (isNullOrEmpty(problem_id) || isStringEmpty(problem_id || "")) {
      throw new Error("Problem id is required");
    }

    // check if the problem exists
    const problem = await Problem.findOne({
      user_id: user._id,
      problem_id: problem_id,
    });

    if (!problem) {
      throw new Error("Problem not found");
    }

    // delete the problem
    await Problem.deleteOne({
      user_id: user._id,
      problem_id: problem_id,
    });

    return NextResponse.json({
      success: true,
      result: null,
      message: "Problem deleted successfully",
      error: null,
    });
  } catch (error: any) {
    console.error("Error in deleteProblemHandler: ", error);
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


export const updateProblemHandler = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;
    const url = new URL(req.url);
    const problem_id = url.searchParams.get("problem_id");
    const data = await req.json();

    if (isNullOrEmpty(problem_id) || isStringEmpty(problem_id || "")) {
      throw new Error("Problem id is required");
    }

    // check if the problem exists
    const problem = await Problem.findOne({
      user_id: user._id,
      problem_id: problem_id,
    });

    if (!problem) {
      throw new Error("Problem not found");
    }

    // check if the problem title already exists
    const existingProblem = await Problem.findOne({
      user_id: user._id,
      problem_title: data.problem_title,
    });

    // check if the inventories array is present
    if (!Array.isArray(data.inventories) || data.inventories.length == 0) {
      throw new Error("Inventories array is not correct or empty");
    }

    // check if the tags array is present
    if (!Array.isArray(data.tags) || data.tags.length == 0) {
      throw new Error("Please add at least one tag");
    }

    await Problem.updateOne(
      { problem_id: problem_id, user_id: user._id },
      {
        problem_title: data.problem_title,
        url: data.url || "",
        difficulty: data.difficulty || existingProblem.difficulty,
        is_rev: data.is_rev || existingProblem.is_rev,
        notes: data.notes || existingProblem.notes,
        time_complexity: data.time_complexity || existingProblem.time_complexity,
        space_complexity: data.space_complexity || existingProblem.space_complexity,
        platform_name: data.platform_name || existingProblem.platform_name,
        resources: data.resources || existingProblem.resources,
        companies: data.companies || existingProblem.companies,
        tags: data.tags || existingProblem.tags,
        inventories: data.inventories || existingProblem.inventories,
      },
    )
  }catch(error: any) {
    console.error("Error in updateProblemHandler: ", error);
    return NextResponse.json(
      {
        success: false,
        result: null,
        error: isVariableObject(error) ? error.message : error,
      },
      { status: 500 }
    );
  }
}