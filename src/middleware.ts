import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        console.log("No token found");
        return NextResponse.next({
            request
        });
    }
    const userId = await getUserId(token);
    if (!userId) {
        console.log("Invalid token");
        return NextResponse.next({
            request
        });
    }
    const headers = new Headers(request.headers);
    console.log("Setting x-user-id header");
    headers.set("x-user-id", userId);
    return NextResponse.next({
        request: {
            headers
        }
    });
}
