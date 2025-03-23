// write a simple route to edit the dashboard in nextjs backend
import { editDashboardHandler } from "@/server/controllers/dashboard.controller";
import { auth_middleware } from "@/server/libs/auth_middleware";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return auth_middleware(editDashboardHandler, req);
}
