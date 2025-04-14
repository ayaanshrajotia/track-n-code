import {
    deleteProblemHandler,
    getSingleProblemHandler,
    updateProblemHandler,
} from "@/server/controllers/problem.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: { problem_id: string } }
) {
    return auth_middleware(
        (req: NextRequest) =>
            getSingleProblemHandler(req, { params: context.params }),
        req
    );
}

export async function DELETE(
    req: NextRequest,
    context: { params: { problem_id: string } }
) {
    return auth_middleware(
        (req) => deleteProblemHandler(req, { params: context.params }),
        req
    );
}

export async function POST(
    req: NextRequest,
    context: { params: { problem_id: string } }
) {
    return auth_middleware(
        (req: NextRequest) =>
            updateProblemHandler(req, { params: context.params }),
        req
    );
}
