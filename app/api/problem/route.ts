import {
  addProblemHandler,
} from "@/server/controllers/problem.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return auth_middleware(addProblemHandler, req);
}