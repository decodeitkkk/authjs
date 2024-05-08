import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    let path = request.nextUrl.pathname;
    let token = request?.cookies?.get("token")?.value || "";
    console.log(token)
    let publicPath =
        path === "/login" ||
        path === "/register" 
        // path.includes("resetpassword");

    let protectedPaths = path.startsWith("/profile");

    if (publicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (token === "" && protectedPaths) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/profile",
        "/profile/:path*",
        "/verifyemail",
        "/resetpassword",
        "/forgotpassword",
    ],
};
