"use server";

import { cookies } from "next/headers";

export async function setTokenCookie(accessToken, refreshToken) {
  const cookieStore = await cookies();
  cookieStore.set("token", accessToken);
  cookieStore.set("refresh_token", refreshToken);
}

export async function getNewAccessToken(refresh_token) {
  try {
    console.log("refresh token in progress");

    const result = await fetch(
      `${process.env.KEYCLOAK_HOST}/api/app/refresh-token?refresh_token=${refresh_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {},
      }
    );
    if (!result.ok) {
      throw new Error("Error when refresh token");
    }

    const res = await result.json();

    // console.log(res);
    
    
    return {
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
    };
  } catch (error) {
    console.error(error);
    return { access_token: null, refresh_token: null };
  }
}
