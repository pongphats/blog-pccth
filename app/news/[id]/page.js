"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";

export default function NewsPage() {
  const [news, setNews] = useState(null);
  const { id } = useParams();

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/" },
    { label: "หน้าข่าวสาร", href: "/news" },
    { label: "ข่าวสาร", href: `/news/${id}` },
  ];

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        try {
          const response = await fetch(`/api/news/${id}`);
          const data = await response.json();
          setNews(data);
        } catch (error) {
          console.error("Error fetching news item:", error);
        }
      };

      fetchNewsItem();
    }
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4 mt-5 ">ข้อมูลข่าวสาร</h1>
      <div className="border rounded-lg shadow-md p-4 mb-4 relative">
        <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
        <div
          className="text-gray-700 text-xl my-3 dark:text-white"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
        <div className="flex flex-row justify-between">
          <p className="text-gray-500 text-md  dark:text-white">
            วันที่: {news.date}
          </p>
          <Link href={`/news/editor/${id}`}>
            <div className=" flex items-center text-black dark:text-white cursor-pointer hover:text-blue-500">
              <span>แก้ไข</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
