import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function session(req: NextRequest) {
    const loggedIn = req.cookies.has("user");
    const pathname = req.nextUrl.pathname;
    if (!loggedIn && pathname.startsWith("/")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ["//:path*"] };