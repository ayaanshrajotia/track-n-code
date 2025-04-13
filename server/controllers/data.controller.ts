import Tag from "@/server/models/Tag.model";
import { NextRequest, NextResponse } from "next/server";
import CompanyTag from "../models/Company.model";
import Inventory from "../models/Inventory.model";

export const getTCIData = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;

  try {
    const tags = await Tag.find({}).select("-__v -createdAt -updatedAt");

    // also give company tags

    const companyTags = await CompanyTag.find().select(
      "-__v -createdAt -updatedAt"
    );

    const inventories = await Inventory.find({
      user_id: user._id,
    }).select("-user_id -__v -createdAt -updatedAt");

    return NextResponse.json(
      {
        success: true,
        result: {
          tags: tags,
          company_tags: companyTags,
          inventories: inventories,
        },
        message: "Tags fetched successfully",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getAllTagsController: ", error);
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
