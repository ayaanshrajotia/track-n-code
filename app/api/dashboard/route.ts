// write a simple route to edit the dashboard in nextjs backend
import { getDashboardHandler } from "@/server/controllers/dashboard.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return auth_middleware(getDashboardHandler, req);
}
