import { NextRequest, NextResponse } from "next/server";
import Inventory from "@/server/models/Inventory.model";
import Problem from "@/server/models/Problem.model";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export const addInventoryHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;
  try {
    const data = await req.json();
    if (
      !data.inventory_name ||
      data.inventory_name === "" ||
      !data.inventory_name.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Inventory name is required",
        },
        { status: 400 }
      );
    }

    // check if inventory with the same name already exists
    const inventoryExists = await Inventory.findOne({
      inventory_name: data.inventory_name,
      user_id: user._id,
    });

    if (inventoryExists) {
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Inventory with the same name already exists",
        },
        { status: 400 }
      );
    }

    data.user_id = user._id;
    // generate a unique id for inventory
    data.inventory_id = uuidv4();

    const inventory = await Inventory.create(data);

    inventory.user_id = undefined;
    inventory.__v = undefined;

    return NextResponse.json({
      success: true,
      result: inventory,
      message: "Inventory added successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in addInventoryHandler: ", error);
    return NextResponse.json(
      {
        success: false,
        result: null,
        message: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const editInventoryHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;
  // transaction

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const data = await req.json();
    console.log(data);
    if (!data.inventory_id || data.inventory_id === "") {
      return NextResponse.json(
        {
          success: false,
          result: null,
          message: null,
          error: "Inventory ID is required",
        },
        { status: 400 }
      );
    }

    const inventory = await Inventory.findOne({
      inventory_id: data.inventory_id,
      user_id: user._id,
    });

    if (!inventory) {
      session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Inventory not found",
        },
        { status: 404 }
      );
    }

    if (data.inventory_name && data.inventory_name !== "") {
      inventory.inventory_name = data.inventory_name;
    }

    if (data.inventory_desc !== undefined) {
      inventory.inventory_desc = data.inventory_desc;
    }

    await inventory.save();

    // also update the inventory name in all the problems that are using this inventory_name
    await Problem.updateMany(
      { user_id: user._id, "inventories.inventory_id": inventory._id },
      {
        $set: {
          "inventories.$[elem].inventory_name": data.inventory_name,
        },
      },
      {
        arrayFilters: [{ "elem.inventory_id": inventory._id }],
      }
    );

    inventory.user_id = undefined;
    inventory.__v = undefined;

    await session.commitTransaction();
    await session.endSession();
    return NextResponse.json({
      success: true,
      result: inventory,
      message: "Inventory updated successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in editDashboardHandler: ", error);
    session.abortTransaction();
    session.endSession();
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

export const getAllInventoryHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;

  try {
    let inventories = await Inventory.find({ user_id: user._id }).select(
      "-user_id -__v"
    );

    // also for each inventory also calculate the count of number of problems inside tht inventory

    inventories = inventories.map((inventory) => {
      inventory.user_id = undefined;
      inventory.__v = undefined;
      return {
        ...inventory.toObject(),
        problem_count: 0,
      };
    });

    await Promise.all(
      inventories.map(async (inventory) => {
        const count = await Problem.countDocuments({
          user_id: user._id,
          inventories: { $elemMatch: { inventory_id: inventory._id } },
        });

        inventory.problem_count = count;
      })
    );

    return NextResponse.json({
      success: true,
      result: inventories,
      error: null,
    });
  } catch (error) {
    console.error("Error in getAllInventoryHandler: ", error);
    return NextResponse.json(
      {
        success: false,
        result: null,
        message: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const deleteInventoryHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = req.user;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = await req.json();
    if (!data.inventory_id || data.inventory_id === "") {
      return NextResponse.json(
        {
          success: false,
          result: null,
          message: null,
          error: "Inventory ID is required",
        },
        { status: 400 }
      );
    }

    const inventory = await Inventory.findOneAndDelete({
      inventory_id: data.inventory_id,
      user_id: user._id,
    });

    if (!inventory) {
      session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Inventory not found",
        },
        { status: 404 }
      );
    }

    // also delete the inventory from all the problems that are using this inventory_name
    await Problem.updateMany(
      { user_id: user._id },
      {
        $pull: {
          inventories: {
            inventory_id: inventory._id,
          },
        },
      }
    );

    await session.commitTransaction();
    await session.endSession();
    return NextResponse.json({
      success: true,
      result: null,
      message: "Inventory deleted successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in deleteInventoryHandler: ", error);
    session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        success: false,
        result: null,
        message: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
