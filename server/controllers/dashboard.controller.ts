import { NextRequest, NextResponse } from "next/server";

export const editDashboardHandler = async (req: NextRequest) => {
  console.log(req.user);
  
  return NextResponse.json({
    h: "these are users",
  });
};
