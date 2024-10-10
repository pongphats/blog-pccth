"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsPage() {
  const [news, setNews] = useState(null);
  const { id } = useParams();

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
      <div className="border rounded-lg shadow-md p-4 mb-4 relative">
        <Link href={`/news/editor/${id}`}>
          <div className="absolute top-4 right-4 flex items-center text-black dark:text-white cursor-pointer hover:text-blue-500">
            <span>แก้ไข</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-700 text-xl my-3 dark:text-white">
          {news.content}
        </p>
        <p className="text-gray-500 text-md my-2 dark:text-white">
          วันที่: {news.date}
        </p>
      </div>
    </div>
  );
}
