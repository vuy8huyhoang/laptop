
import { NextResponse } from 'next/server';
export async function middleware(request: any) {
    const token = request.cookies.get('accessToken');
    
    if (!token) {

            return NextResponse.redirect(new URL('/login', request.url));
        
    }

    return NextResponse.next();
}
    export const config = {
        matcher: ['/baitapnho/info','/profile'],

    };