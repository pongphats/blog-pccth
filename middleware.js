import { NextResponse } from "next/server";
import { getNewAccessToken } from "@/actions/auth";

export async function middleware(request) {
  try {
    const response = NextResponse.next();
    const accessToken = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!accessToken && !refreshToken) {
      throw new Error("No access token");
    }

    const isTokenExpired = checkTokenExpiration(accessToken);
    console.log("is token Expired:", isTokenExpired);
    console.log("current access token:", accessToken);
    console.log("current refresh token:", refreshToken);

    if (isTokenExpired && refreshToken) {
      console.log("refresh is fetching...");

      const tokens = await getNewAccessToken(refreshToken);
      response.cookies.set("token", tokens.access_token);
      response.cookies.set("refresh_token", tokens.refresh_token);

      console.log("refresh is fetch success");
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
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expiry;
  } catch {
    return true;
  }
}
