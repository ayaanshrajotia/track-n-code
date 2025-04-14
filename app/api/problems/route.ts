import {
    addProblemHandler,
    deleteProblemHandler,
    getAllProblemsHandler,
} from "@/server/controllers/problem.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return auth_middleware(getAllProblemsHandler, req);
}

export async function POST(req: NextRequest) {
    return auth_middleware(addProblemHandler, req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ problem_id: string }> }
) {
    const { problem_id } = await params;
    return auth_middleware(
        (req: NextRequest) =>
            deleteProblemHandler(req, { params: { problem_id } }),
        req
    );
}
