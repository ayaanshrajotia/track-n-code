import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    // const { nextUrl } = req;
    // const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

    // const protectedRoutes = ["/dashboard", "/inventory"];
    // const publicRoutes = ["/signin", "/signup", "/welcome"];

    // const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
    // const isPublicRoute = publicRoutes.some(route => nextUrl.pathname.startsWith(route));

    // if (isProtectedRoute && !token) {
    //     return NextResponse.redirect(new URL("/signin", req.url));
    // }

    // if (isPublicRoute && token) {
    //     return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/inventory/:path*", "/signin", "/signup", "/welcome"],
};