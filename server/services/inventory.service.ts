/* eslint-disable @typescript-eslint/no-explicit-any */
import Inventory from "../models/Inventory.model";
import { v4 } from "uuid";
import ProblemInventoryLookup from "../models/ProblemInventoryLookup";
export const addInventoryToProblem = async (
  inventory_names: string[],
  user_id: string,
  problem_id: string,
  session: any
) => {
  try {
    // first get all the inventories of the user

    const inventories = await Inventory.find({
      user_id: user_id,
    }).select("_id inventory_name ");

    const allInventoryNames = inventories.map((inventory) =>
      inventory.inventory_name.toLowerCase()
    );

    // now filter the inventories to only include the ones that are not in the database
    const filteredInventoryNames = inventory_names.filter(
      (inventory_name) =>
        !allInventoryNames.includes(inventory_name.toLowerCase())
    );

    // now if the filteredInventories is not empty then create the inventory
    let createdInventories = [];

    if (filteredInventoryNames.length > 0) {
      const inventoryData = filteredInventoryNames.map((inventory_name) => ({
        inventory_name,
        inventory_id: v4(),
        user_id,
      }));

      createdInventories = await Inventory.insertMany(inventoryData, {
        session,
      });
    }

    const allInventories = [...inventories, ...createdInventories];

    const filteredInventories = allInventories.filter((inventory) =>
      inventory_names.includes(inventory.inventory_name)
    );

    const filteredInventoriesLookups = filteredInventories.map((inventory) => ({
      inventory_id: inventory._id,
      problem_id: problem_id,
      user_id: user_id,
    }));

    // mow create the inventory problem lookup
    await ProblemInventoryLookup.insertMany(filteredInventoriesLookups, {
      session,
    });

    return filteredInventories;
  } catch (error) {
    console.error("Error in addInventoryToProblem:", error);
    throw error;
  }
};
