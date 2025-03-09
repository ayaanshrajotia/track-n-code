import { NextRequest, NextResponse } from "next/server";
import { conn_middleware } from "@/server/libs/conn_middleware";
import User from "@/server/models/User.model";

// 🔹 GET: Fetch all users
export async function GET(req: NextRequest) {
  return conn_middleware(async () => {
    try {
      const new_user = new User({
        full_name: "Hello World",
        email: "abc@gmail.com",
        username: "abc",
        password: "check_check",
      });

      await new_user.save();

      return NextResponse.json({
        h: "these are users",
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error },
        { status: 500 }
      );
    }
  }, req);
}

// 🔹 POST: Create a new user
export async function POST(req: NextRequest) {
  return conn_middleware(async () => {
    return NextResponse.json({
      h: "these are users",
    });
  }, req);
}
