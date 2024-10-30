"use client";

import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

export default function UserProfileIcon() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserProfile(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !userProfile) return null;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button variant="light" isIconOnly className="text-white">
          <Avatar size="sm" className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-64">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{userProfile.name}</h3>
            <p className="text-sm text-gray-500">{userProfile.email}</p>
          </div>
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
