import { NextRequest, NextResponse } from "next/server";
import Inventory from "@/server/models/Inventory.model";
import { v4 as uuidv4 } from "uuid";

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
  try {
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

    console.log(inventory);

    if (!inventory) {
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

    inventory.user_id = undefined;
    inventory.__v = undefined;

    return NextResponse.json({
      success: true,
      result: inventory,
      message: "Inventory updated successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in editDashboardHandler: ", error);
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
    const inventories = await Inventory.find({ user_id: user._id }).select(
      "-user_id -__v"
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
      return NextResponse.json(
        {
          success: false,
          result: null,
          error: "Inventory not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result: null,
      message: "Inventory deleted successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error in deleteInventoryHandler: ", error);
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
