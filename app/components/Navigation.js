"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";
import NotificationButton from "./NotificationButton";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/users", label: "รายชื่อผู้ใช้" },
  { href: "/comment", label: "แสดงความคิดเห็น" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blogs", label: "บล็อก" },
  { href: "/news", label: "ข่าวสาร" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gray-800"
    >
      {/* size : < md */}
      <NavbarContent className="flex md:hidden justify-end text-white">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="bg-gray-700 bg-opacity-70">
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <Link href={link.href} className="text-white">
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarMenu>

      {/* start */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-bold text-white">
            <span className="text-green-600 text-xl">PCC</span> Training
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* center */}
      {/* size : > md */}
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <Link href={link.href} className="text-white">
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* end */}
      <NavbarContent justify="end" className="text-white">
        <NavbarItem>
          <NotificationButton aria-label="แจ้งเตือน" />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle aria-label="เปลี่ยนธีม" />
        </NavbarItem>
        <NavbarItem>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button variant="light" isIconOnly className="text-white">
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150"
                  className="cursor-pointer"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-64">
              <div className="flex flex-col items-center gap-4">
                <Avatar src="https://i.pravatar.cc/150" className="w-20 h-20" />
                {userProfile && (
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {userProfile.name}
                    </h3>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                )}
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleLogout}
                  className="w-full mt-2"
                  size="sm"
                >
                  ออกจากระบบ
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
