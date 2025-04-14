import {
    deleteProblemHandler,
    getSingleProblemHandler,
    updateProblemHandler,
} from "@/server/controllers/problem.controller";
import { auth_middleware } from "@/server/middlewares/auth_middleware";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ problem_id: string }> }
) {
    const { problem_id } = await params; // Await the params once
    return auth_middleware(
        (req: NextRequest) =>
            getSingleProblemHandler(req, { params: { problem_id } }),
        req
    );
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

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ problem_id: string }> }
) {
    const { problem_id } = await params;
    return auth_middleware(
        (req: NextRequest) =>
            updateProblemHandler(req, { params: { problem_id } }),
        req
    );
}

// import {
//     deleteProblemHandler,
//     getSingleProblemHandler,
//     updateProblemHandler,
// } from "@/server/controllers/problem.controller";
// import { auth_middleware } from "@/server/middlewares/auth_middleware";
// import { NextRequest } from "next/server";

// export async function GET(
//     req: NextRequest,
//     { params }: { params: { problem_id: string } }
// ) {
//     return auth_middleware(
//         (req: NextRequest) => getSingleProblemHandler(req, { params }),
//         req
//     );
// }

// export async function DELETE(
//     req: NextRequest,
//     { params }: { params: { problem_id: string } }
// ) {
//     return auth_middleware(
//         (req: NextRequest) => deleteProblemHandler(req, { params }), req
//     );
// }

// export async function POST(
//     req: NextRequest,
//     { params }: { params: { problem_id: string } }
// ) {
//     return auth_middleware(
//         (req: NextRequest) =>
//             updateProblemHandler(req, {
//                 params,
//             }),
//         req
//     );
// }
