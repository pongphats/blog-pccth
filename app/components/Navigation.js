'use client'

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import ThemeToggle from './ThemeToggle';
import NotificationButton from './NotificationButton';

const navLinks = [
  { href: '/', label: 'หน้าหลัก' },
  { href: '/users', label: 'รายชื่อผู้ใช้' },
  { href: '/comment', label: 'แสดงความคิดเห็น' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/blogs', label: 'บล็อก' },
  { href: '/news', label: 'ข่าวสาร' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-gray-800">

      {/* size : < md */}
      <NavbarContent className="flex md:hidden justify-end text-white">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
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
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
