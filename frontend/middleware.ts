import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // For login page
    if (url.pathname === '/login') {
        if (token) {
            const userRole = token.role;
            if(userRole === "ADMIN"){
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }else if(userRole === "USER"){
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }else if(userRole === "MANAGER"){
                return NextResponse.redirect(new URL('/team-manager/dashboard',request.url));
            }
        }
        return NextResponse.next();
    }

    //For admin to redirect to users dashboard
    if(url.pathname.startsWith('/dashboard')){
        if(token){
            const userRole = token.role;
            if(userRole === "ADMIN"){
                return NextResponse.redirect(new URL('/',request.url));
            }else{
                return NextResponse.redirect(new URL('/dashboard',request.url));
            }
        }
    }

    // For protected routes
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if(!token && url.pathname.startsWith('/admin/')){
        return NextResponse.redirect(new URL('/login',request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/dashboard/:path*',
        '/admin/:path*',
        '/profile/:path*'
    ]
}