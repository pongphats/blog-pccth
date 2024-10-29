import { NextResponse } from "next/server";
import { getNewAccessToken } from "@/actions/auth";
import { saveTokens } from "./utils/token";

export function middleware(request) {
  //   const token = request.cookies.get("token")?.value;
  //   // const token = localStorage.getItem("token");

  //   const { pathname } = request.nextUrl;

  //   // อนุญาตให้เข้าถึงเส้นทาง _next และ /api โดยไม่ตรวจสอบ token
  //   if (pathname.startsWith("/_next") || pathname.includes("/api/")) {
  //     return NextResponse.next();
  //   }

  //   if (token) {
  //     return NextResponse.next();
  //   }

  // Redirect ไปที่หน้า login ถ้าผู้ใช้ไม่มี token ที่ถูกต้อง
  // if (pathname !== '/login' && pathname !== '/register') {
  //     return NextResponse.redirect(new URL('/', request.url));
  // }

  try {
    const response = NextResponse.next();
    const accessToken = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!accessToken) {
      throw new Error("No access token");
    }

    const isTokenExpired = checkTokenExpiration(accessToken);

    if (isTokenExpired && refreshToken) {
      const { access_token, refresh_token } = getNewAccessToken(refreshToken);

      saveTokens(access_token, refresh_token);
      response.cookies.set("access_token", access_token);

      if (refresh_token) {
        response.cookies.set("refresh_token", refresh_token);
      }
      response.headers.set("x-access-token", access_token);
    }
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/api/:path*", "/blogs/:path*", "/news/:path*"],
};

function checkTokenExpiration(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // แปลงเป็น milliseconds
    return Date.now() >= expiry;
  } catch {
    return true;
  }
}
