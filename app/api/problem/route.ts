import {
    deleteInventoryHandler,
    editInventoryHandler,
    getAllInventoryHandler,
  } from "@/server/controllers/inventory.controller";
import { addProblemHandler } from "@/server/controllers/problem.controller";
  import { auth_middleware } from "@/server/middlewares/auth_middleware";
  import { NextRequest } from "next/server";
  
  // getting all inventory items
  export async function GET(req: NextRequest) {
    return auth_middleware(getAllInventoryHandler, req);
  }
  
  export async function POST(req: NextRequest) {
    return auth_middleware(addProblemHandler, req);
  }
  
  export async function DELETE(req: NextRequest) {
    return auth_middleware(deleteInventoryHandler, req);
  }
  
  export async function PUT(req: NextRequest) {
    return auth_middleware(editInventoryHandler, req);
  }
  