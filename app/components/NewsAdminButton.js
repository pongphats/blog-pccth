"use client";

import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsAdminButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserProfile = async (params) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_KEYCLOAK_HOST}/api/app/getprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        const realData = data.data;
        const isAdmin =
          realData.clientMappings["sso-client-api"].mappings[0].name ===
          "client_admin";
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  if (!isAdmin) {
    return <></>;
  }
  return (
    <>
      <Link
        href="/news/editor"
        className="inline-flex items-center px-2 py-2 border border-green-500 bg-green-500 rounded mb-4 mt-5 text-white hover:bg-green-600 transition-colors"
      >
        <SquarePlus className="mr-2" /> เพิ่มข่าวสาร
      </Link>
    </>
  );
}
