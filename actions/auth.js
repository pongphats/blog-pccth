"use server";

import { cookies } from "next/headers";

export async function setTokenCookie(token) {
  // สามารถกำหนด options เพิ่มเติมได้
  cookies().set({
    name: "token",
    value: token,
  });
}
