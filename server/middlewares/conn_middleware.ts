import { NextRequest, NextResponse } from "next/server";
import MongoConnection from "../db/MongoDB";
import { ConnectionConfig } from "../constants/constants";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export async function conn_middleware(handler: Function, req: NextRequest) {
  try {
    await MongoConnection.connect();
    return handler(req); // Call the original handler
  } catch (error) {
    console.error(ConnectionConfig.CONN_ERR_MESSAGE, error);
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
}
