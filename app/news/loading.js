import SkeletonNews from "../components/SkeletonNews";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
import { SquarePlus } from "lucide-react";

export default function Loading() {
  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/" },
    { label: "หน้าข่าวสาร", href: "/news" },
  ];

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
        <Link
          href="/news/editor"
          className="inline-flex items-center px-4 py-3 border border-green-500 rounded mb-4 mt-5 hover:bg-green-500 hover:text-white"
        >
          <SquarePlus className="mr-2" /> เพิ่มข่าวสาร
        </Link>
      </div>
      <ul>
        {[...Array(3)].map((_, index) => (
          <SkeletonNews key={index} />
        ))}
      </ul>
    </div>
  );
}
