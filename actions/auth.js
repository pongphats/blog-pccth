"use server";

import { cookies } from "next/headers";

export async function setTokenCookie(token, rfToken) {
  cookies().set({
    name: "token",
    value: token,
  });

  cookies().set({
    name: "refresh_token",
    value: rfToken,
  });
}

export async function getNewAccessToken(refresh_token) {
  try {
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

    const res = await result.json();

    if (!res.success) {
      throw new Error("Error when refresh token");
    }

    return ({ access_token, refresh_token } = res.data);
  } catch (error) {
    console.error(error);
    return { access_token: null, refresh_token: null };
  }
}


