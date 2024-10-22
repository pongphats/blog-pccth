"use client";

import { useEffect, useState } from "react";
import NewCard from "../components/Newcard";
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";
import { SquarePlus } from "lucide-react";

export default function NewsListPage() {
  const [newsData, setNewsData] = useState([]);

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/" },
    { label: "หน้าข่าวสาร", href: "/news" },
  ];

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className=" flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
        <Link
          href="/news/editor"
          className="inline-flex items-center px-4 py-3 border border-green-500 rounded  mb-4 mt-5 hover:bg-green-500 hover:text-white"
        >
          <SquarePlus className="mr-2" /> เพิ่มข่าวสาร
        </Link>
      </div>
      <ul>
        {newsData.map((news) => (
          <NewCard key={news.id} news={news} />
        ))}
      </ul>
    </div>
  );
}
