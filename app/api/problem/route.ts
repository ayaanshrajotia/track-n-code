import {
  addProblemHandler,
  getAllProblems,
} from "@/server/controllers/problem.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

// getting all inventory items
export async function GET(req: NextRequest) {
  return auth_middleware(getAllProblems, req);
}

export async function POST(req: NextRequest) {
  return auth_middleware(addProblemHandler, req);
}
