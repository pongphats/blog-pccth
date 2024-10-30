import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import ThemeToggle from "./ThemeToggle";
import NotificationButton from "./NotificationButton";

import UserProfileIcon from "./UserProfileIcon";

const navLinks = [
  { href: "/home", label: "หน้าหลัก" },
  { href: "/users", label: "รายชื่อผู้ใช้" },
  { href: "/comment", label: "แสดงความคิดเห็น" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blogs", label: "บล็อก" },
  { href: "/news", label: "ข่าวสาร" },
];

const Navigation = () => {
  return (
    <Navbar isBordered className="bg-gray-800">
      {/* size : < md */}
      <NavbarContent className="flex md:hidden justify-end text-white">
        <NavbarMenuToggle />
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
        <UserProfileIcon />
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
