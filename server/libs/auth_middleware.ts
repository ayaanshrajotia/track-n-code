import { NextRequest, NextResponse } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: unknown;
  }
}

import { conn_middleware } from "./conn_middleware";
import { getToken } from "next-auth/jwt";
import User from "@/server/models/User.model";

export async function auth_middleware(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest
) {
  return conn_middleware(async (next_req: NextRequest) => {
    const token = await getToken({
      req: next_req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    next_req.user = user;
    return handler(next_req);
  }, req);
}
