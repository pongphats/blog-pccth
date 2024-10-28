import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    // const token = localStorage.getItem("token");

    const { pathname } = request.nextUrl;

    // อนุญาตให้เข้าถึงเส้นทาง _next และ /api โดยไม่ตรวจสอบ token
    if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
        return NextResponse.next();
    }

    if (token) {
        return NextResponse.next();
    }

    // Redirect ไปที่หน้า login ถ้าผู้ใช้ไม่มี token ที่ถูกต้อง
    if (pathname !== '/login' && pathname !== '/register') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};