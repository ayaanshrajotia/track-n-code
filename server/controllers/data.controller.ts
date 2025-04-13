import Tag from "@/server/models/Tag.model";
import { NextRequest, NextResponse } from "next/server";
import CompanyTag from "../models/Company.model";
import Inventory from "../models/Inventory.model";

export const getTCIData = async (req: NextRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = req.user;

    try {
        let tags = await Tag.find({}).select("-__v -createdAt -updatedAt");

        // convert them into tag_id and tag_name
        tags = tags.map((tag) => {
            return {
                tag_id: tag._id,
                tag_name: tag.tag_name,
            };
        });

        // also give company tags

        let companyTags = await CompanyTag.find().select(
            "-__v -createdAt -updatedAt"
        );

        // convert to company_id and company_name
        companyTags = companyTags.map((tag) => {
            return {
                company_id: tag._id,
                company_name: tag.company_name,
            };
        });

        let inventories = await Inventory.find({
            user_id: user._id,
        }).select("-user_id -__v -createdAt -updatedAt");

        // convert them into inventory_id and inventory_name
        inventories = inventories.map((inventory) => {
            return {
                inventory_id: inventory._id,
                inventory_name: inventory.inventory_name,
            };
        });

        return NextResponse.json(
            {
                success: true,
                result: {
                    tags: tags,
                    companies: companyTags,
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
