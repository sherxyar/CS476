import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("user");
    
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ["//:path*"] }; // still need to work on this