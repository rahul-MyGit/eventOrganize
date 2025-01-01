import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const checkPublicPath = path == '/login' || path == "/signup" || path == "/"

    const getCookies = cookies();
    const token = (await getCookies).get("token")?.value || ""

    if(checkPublicPath && token != "") {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if(!checkPublicPath && token === ""){
        return NextResponse.redirect(new URL('/signup', request.nextUrl))
    }

    
}

export const config = {
    matcher: ['login', 'signup']
}