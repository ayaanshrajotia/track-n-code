import { fetchRating } from "@/server/services/rating.service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const username = searchParams.get("username");

    if (!platform || !username) {
        return NextResponse.json(
            { error: "Missing platform or username" },
            { status: 400 }
        );
    }

    const result = await fetchRating(platform.toLowerCase(), username);
    return NextResponse.json(result);
}