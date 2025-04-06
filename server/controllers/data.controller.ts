import Tag from "@/server/models/Tag.model";
import { NextRequest, NextResponse } from "next/server";
import CompanyTag from "../models/CompanyTag.model";
import Inventory from "../models/Inventory.model";

export const createAtomicTagController = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;

  try {
    const data = await req.json();
    if (!data.tag_name || data.tag_name === "") {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Tag name is required",
        },
        { status: 400 }
      );
    }

    const tag = await Tag.findOne({
      tag_name: data.tag_name,
      user_id: user._id,
      tag_type: "atomic",
    });

    if (tag) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Tag already exists",
        },
        { status: 400 }
      );
    }

    const newTag = await Tag.create({
      tag_name: data.tag_name,
      user_id: user._id,
      tag_type: "atomic",
    });

    newTag.user_id = undefined;
    newTag.__v = undefined;
    newTag.createdAt = undefined;
    newTag.updatedAt = undefined;

    return NextResponse.json(
      {
        success: true,
        result: newTag,
        message: "Tag created successfully",
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createAtomicTagController: ", error);
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

export const getTCIData = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;

  try {
    const tags = await Tag.find({
      $or: [{ user_id: user._id }, { tag_type: "cosmic" }],
    }).select("-user_id -__v -createdAt -updatedAt");

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
          companyTags: companyTags,
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
