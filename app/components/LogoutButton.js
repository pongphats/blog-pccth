"use client";

import { clearAuthCookies } from "@/actions/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
      await clearAuthCookies();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      color="danger"
      variant="flat"
      onClick={handleLogout}
      className="w-full mt-2"
      size="sm"
    >
      ออกจากระบบ
    </Button>
  );
}
