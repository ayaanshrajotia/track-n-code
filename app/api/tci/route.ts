import { getTCIData } from "@/server/controllers/data.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return auth_middleware(getTCIData, req);
}
