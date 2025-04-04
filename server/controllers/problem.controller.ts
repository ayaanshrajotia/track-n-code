import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Problem from "@/server/models/Problem.model";
import CompanyProblemLookup from "../models/CompanyProblemLookup";
import TagProblemLookup from "../models/TagProblemLookup.model";
import ProblemInventoryLookup from "../models/ProblemInventoryLookup";

export const addProblemHandler = async (req: NextRequest) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;

    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Invalid data",
        },
        { status: 400 }
      );
    }

    if (
      !data.problem_title ||
      data.problem_title === "" ||
      !data.problem_title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Problem title is required",
        },
        { status: 400 }
      );
    }

    // check if problem title exist
    const exist_problem = await Problem.findOne({
      problem_title: data.problem_title,
    });

    if (exist_problem) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Problem title already exists",
        },
        { status: 400 }
      );
    }

    const { inventory_ids, company_ids, tag_ids } = data;

    if (!inventory_ids || inventory_ids.length == 0) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Provide at least one inventory id",
        },
        { status: 400 }
      );
    }

    data.user_id = user._id;

    data.inventory_id = undefined;
    data.company_ids = undefined;
    data.tag_ids = undefined;
    // generate a unique id for problem
    data.problem_id = uuidv4();

    // create the problem
    const problem = await Problem.create(data);

    // if the problem contains company_ids, then add them CompanyProblemLookup

    if (company_ids && company_ids.length > 0) {
      const company_problem_lookups = company_ids.map((id: string) => ({
        company_tag_id: id,
        problem_id: problem._id,
      }));

      await CompanyProblemLookup.insertMany(company_problem_lookups);
    }

    // add data in TagProblemLookup
    if (tag_ids && tag_ids.length > 0) {
      const tag_problem_lookups = tag_ids.map((id: string) => ({
        tag_id: id,
        problem_id: problem._id,
        user_id: user._id,
      }));

      await TagProblemLookup.insertMany(tag_problem_lookups);
    }

    // add data in in problem inventory lookup
    const problem_inventory_lookups = inventory_ids.map((id: string) => ({
      inventory_id: id,
      problem_id: problem._id,
    }));

    await ProblemInventoryLookup.insertMany(problem_inventory_lookups);

    problem.user_id = undefined;
    problem.__v = undefined;

    return NextResponse.json({
      success: true,
      result: problem,
      message: "Problem added successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in addProblemHandler: ", error);
    return NextResponse.json(
      {
        success: false,
        result: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
