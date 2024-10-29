// components/TokenManager.tsx
"use client";
import { getClientSideCookie } from "@/utils/token";
import { useEffect } from "react";

export default function TokenManager() {
  useEffect(() => {
    const accessToken = getClientSideCookie("token");
    const refreshToken = getClientSideCookie("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }
  }, []);

  return null;
}
