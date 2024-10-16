"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";

export default function NewsPage() {
  const [news, setNews] = useState(null);
  const { id } = useParams();
  const router = useRouter();

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        router.push("/news"); // Redirect to news list page after deletion
      } else {
        console.error("Failed to delete news item");
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };

  if (!news) return <div>Loading...</div>;

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4 mt-5 ">ข้อมูลข่าวสาร</h1>
      <div className="border rounded-lg shadow-md p-4 mb-4 relative">
        <h1 className="text-xl font-bold mb-4">{news.newsHeader}</h1>
        <div
          className="text-gray-700 my-3 dark:text-white"
          dangerouslySetInnerHTML={{ __html: news.newsBody }}
        />
        <div className="flex flex-row justify-between">
          <p className="text-gray-500 dark:text-white">
            วันที่: {new Date(news.newsCreateDate).toLocaleDateString("th-TH")}
          </p>

          <div className="flex flex-row gap-2">
            <Link href={`/news/editor/${news.newsId}`}>
              <div className="flex items-center text-black dark:text-white cursor-pointer hover:text-green-500">
                <span>แก้ไข</span>
              </div>
            </Link>
            <div
              onClick={handleDelete}
              className="flex items-center text-black dark:text-white cursor-pointer hover:text-red-500"
            >
              <span>ลบ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
